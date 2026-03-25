import Session from "../models/session.js";
import { StreamChat } from "stream-chat";
import { chatClient, streamClient } from "../lib/stream.js";
import crypto from "crypto";
import { ENV } from "../lib/env.js";

const PASSWORD_LENGTH = 8;
const ALLOWED_DIFFICULTIES = new Set(["easy", "medium", "hard", "open"]);

function generateSessionPassword(length = PASSWORD_LENGTH) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const randomBytes = crypto.randomBytes(length);
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[randomBytes[i] % chars.length];
  }

  return password;
}

function hashSessionPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function createSession(req, res) {
  try {
    if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
      return res.status(500).json({
        message:
          "Session service is not configured. Missing STREAM_API_KEY or STREAM_API_SECRET.",
      });
    }

    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    const normalizedDifficulty = String(difficulty || "").toLowerCase();

    if (!problem || !normalizedDifficulty) {
      return res
        .status(400)
        .json({ message: "Problem and difficulty are required" });
    }

    if (!ALLOWED_DIFFICULTIES.has(normalizedDifficulty)) {
      return res.status(400).json({
        message: "Invalid difficulty. Allowed values: easy, medium, hard, open",
      });
    }

    //Generate a unique call id for stream video
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const sessionPassword = generateSessionPassword();
    const joinPasswordHash = hashSessionPassword(sessionPassword);

    //This creates session in DB
    const session = await Session.create({
      problem,
      difficulty: normalizedDifficulty,
      host: userId,
      callId,
      joinPasswordHash,
    });

    //This creates stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: {
          problem,
          difficulty: normalizedDifficulty,
          sessionId: session._id.toString(),
        },
      },
    });

    //This creates chat messaging

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    const safeSession = session.toObject();
    delete safeSession.joinPasswordHash;

    res.status(201).json({ session: safeSession, sessionPassword });
  } catch (error) {
    console.log("Error in createSession controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({
      status: { $in: ["active", "completed"] },
    })
      //populate() replace a referenced ObjectId with actual document data from another collection.
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getActiveSessions controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    //Get Sessions where user is either host or participant and we only give sessions which are completed thats why status: "completed"
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getMyRecentSessions controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) {
      return res.status(400).json({ message: "Session not found" });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById  controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    const session = await Session.findById(id).select("+joinPasswordHash");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot join a completed Session" });
    }

    if (!password || typeof password !== "string" || password.length !== 8) {
      return res
        .status(400)
        .json({ message: "Valid 8-character password is required" });
    }

    const submittedPasswordHash = hashSessionPassword(password.trim());
    if (!session.joinPasswordHash) {
      return res.status(400).json({ message: "This session is not joinable" });
    }

    if (submittedPasswordHash !== session.joinPasswordHash) {
      return res.status(401).json({ message: "Incorrect session password" });
    }

    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host connot join their own session as participant" });
    }

    // If another participant already occupies the seat, block join.
    if (
      session.participant &&
      session.participant.toString() !== userId.toString()
    ) {
      return res.status(409).json({ message: "Session is full" });
    }

    // Existing participant can re-verify password and rejoin.
    if (!session.participant) {
      session.participant = userId;
      await session.save();

      //Add this user to stream chat
      const channel = chatClient.channel("messaging", session.callId);
      await channel.addMembers([clerkId]);
    }

    const safeSession = session.toObject();
    delete safeSession.joinPasswordHash;

    res.status(200).json({ session: safeSession });
  } catch (error) {
    console.log("Error in joinSession controllers", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    //Now to end a session check if user is the host or not bcz only host can end the session

    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only host can end the session" });
    }

    //Check if session is already completed or not, if it is we dont want to complete it again
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    //We are deleting stream video call (Bcz now the video-call/Session/Interview is ended)
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    //We are deleting chat channel (Bcz now the video-call/Session/Interview is ended)
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
