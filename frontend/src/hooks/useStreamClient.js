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

  const sessionCallId = session?.callId;
  const sessionStatus = session?.status;
  const canJoinCall =
    Boolean(sessionCallId) &&
    sessionStatus !== "completed" &&
    (isHost || isParticipant);

  const setActiveCallSession = (callId) => {
    if (callId) {
      window.sessionStorage.setItem("active-video-call-session-id", callId);
    } else {
      window.sessionStorage.removeItem("active-video-call-session-id");
    }

    window.dispatchEvent(new Event("live-session-lock-change"));
  };

  useEffect(() => {
    let isCancelled = false;
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      if (!canJoinCall) {
        setIsInitializingCall(false);
        return;
      }

      setIsInitializingCall(true);

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        if (isCancelled) return;

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

        if (isCancelled) return;
        setStreamClient(client);

        videoCall = client.call("default", sessionCallId);
        await videoCall.join({ create: true });

        setActiveCallSession(sessionCallId);

        if (isCancelled) {
          try {
            await videoCall.leave();
          } catch {
            // Ignore cleanup errors during interrupted init.
          }
          return;
        }
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        if (chatClientInstance.userID !== userId) {
          if (chatClientInstance.userID) {
            await chatClientInstance.disconnectUser();
          }

          await chatClientInstance.connectUser(
            {
              id: userId,
              name: finalUserName,
              image: finalUserImage,
            },
            token,
          );
        }

        if (isCancelled) return;
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          "messaging",
          sessionCallId,
        );
        await chatChannel.watch();

        if (isCancelled) return;
        setChannel(chatChannel);
      } catch (error) {
        if (!isCancelled) {
          toast.error("Failed to join video call");
        }
        console.error("Error init call", error);
      } finally {
        if (!isCancelled) {
          setIsInitializingCall(false);
        }
      }
    };

    if (!loadingSession) initCall();

    // cleanup - performance reasons
    return () => {
      isCancelled = true;
      // iife
      (async () => {
        try {
          if (videoCall) {
            try {
              await videoCall.leave();
            } catch (error) {
              const message = String(error?.message || "");
              if (!message.includes("already been left")) {
                console.error("Cleanup leave error:", error);
              }
            }
          }

          if (chatClientInstance?.userID) {
            await chatClientInstance.disconnectUser();
          }

          await disconnectStreamClient();
          setActiveCallSession(null);

          setCall(null);
          setChannel(null);
          setChatClient(null);
          setStreamClient(null);
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [
    canJoinCall,
    clerkDisplayName,
    loadingSession,
    sessionCallId,
    user?.imageUrl,
  ]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
