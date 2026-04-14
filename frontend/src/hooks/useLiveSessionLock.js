import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { useActiveSessions } from "./useSession.js";

function useLiveSessionLock() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { data, isLoading } = useActiveSessions();

  const liveSession = useMemo(() => {
    if (!isSignedIn || !user?.id) return null;

    const sessions = data?.sessions || [];
    return (
      sessions.find(
        (session) =>
          session.status === "active" &&
          (session.host?.clerkId === user.id ||
            session.participant?.clerkId === user.id),
      ) || null
    );
  }, [data, isSignedIn, user?.id]);

  return {
    isCheckingLiveSession: isSignedIn && (!isLoaded || isLoading),
    isInLiveSession: Boolean(liveSession),
    liveSessionId: liveSession?._id || liveSession?.id || null,
  };
}

export default useLiveSessionLock;
