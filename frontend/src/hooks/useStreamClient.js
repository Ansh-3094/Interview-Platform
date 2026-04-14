import { useState, useEffect, useMemo } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import {
  initializeStreamClient,
  disconnectStreamClient,
} from "../lib/stream.js";
import { sessionApi } from "../api/sessions.js";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const { user } = useUser();
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  const clerkDisplayName = useMemo(() => {
    const fullName = user?.fullName?.trim();
    if (fullName) return fullName;

    const firstLast = [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    if (firstLast) return firstLast;

    const username = user?.username?.trim();
    if (username) return username;

    const emailPrefix = user?.primaryEmailAddress?.emailAddress
      ?.split("@")[0]
      ?.trim();
    if (emailPrefix) return emailPrefix;

    return "";
  }, [user]);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      if (!session?.callId) return;
      if (!isHost && !isParticipant) return;
      if (session.status === "completed") return;

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        const finalUserName =
          clerkDisplayName || userName?.trim() || userId || "User";
        const finalUserImage = user?.imageUrl || userImage || "";

        const client = await initializeStreamClient(
          {
            id: userId,
            name: finalUserName,
            image: finalUserImage,
          },
          token,
        );

        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: userId,
            name: finalUserName,
            image: finalUserImage,
          },
          token,
        );
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId,
        );
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error init call", error);
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    // cleanup - performance reasons
    return () => {
      // iife
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session, loadingSession, isHost, isParticipant, clerkDisplayName, user]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
