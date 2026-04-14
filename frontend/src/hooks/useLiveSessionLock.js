import { useEffect, useState } from "react";

function useLiveSessionLock() {
  const [liveSessionId, setLiveSessionId] = useState(() =>
    window.sessionStorage.getItem("active-video-call-session-id"),
  );

  useEffect(() => {
    const syncLock = () => {
      setLiveSessionId(
        window.sessionStorage.getItem("active-video-call-session-id"),
      );
    };

    window.addEventListener("storage", syncLock);
    window.addEventListener("live-session-lock-change", syncLock);

    return () => {
      window.removeEventListener("storage", syncLock);
      window.removeEventListener("live-session-lock-change", syncLock);
    };
  }, []);

  return {
    isCheckingLiveSession: false,
    isInLiveSession: Boolean(liveSessionId),
    liveSessionId,
  };
}

export default useLiveSessionLock;
