import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSession.js";

import Navbar from "../components/Navbar.jsx";
import WelcomeSection from "../components/WelcomeSection.jsx";
import StatsCards from "../components/StatsCards.jsx";
import ActiveSessions from "../components/ActiceSessions.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModal.jsx";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdSessionData, setCreatedSessionData] = useState(null);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          const nestedSession = data?.session || data?.data?.session;
          const generatedPassword =
            data?.sessionPassword || data?.data?.sessionPassword;
          const sessionId =
            nestedSession?._id ||
            nestedSession?.id ||
            data?.sessionId ||
            data?.data?.sessionId ||
            data?._id ||
            data?.id;

          if (!sessionId) {
            toast.error(
              data?.message ||
                "Session created, but no session id was returned.",
            );
            return;
          }

          toast.success("Session created successfully!");
          setShowCreateModal(false);

          if (generatedPassword) {
            setCreatedSessionData({
              sessionId,
              password: generatedPassword,
            });
            return;
          }

          navigate(`/session/${sessionId}`);
        },
      },
    );
  };

  const handleCopyPassword = async () => {
    if (!createdSessionData?.password) return;

    try {
      await navigator.clipboard.writeText(createdSessionData.password);
      toast.success("Password copied");
    } catch {
      toast.error("Failed to copy password");
    }
  };

  const handleContinueToSession = () => {
    if (!createdSessionData?.sessionId) return;

    const sessionId = createdSessionData.sessionId;
    setCreatedSessionData(null);
    navigate(`/session/${sessionId}`);
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <RecentSessions
            sessions={recentSessions}
            isLoading={loadingRecentSessions}
          />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />

      {createdSessionData && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-2xl mb-3">Session Password</h3>
            <p className="text-base-content/70 mb-5">
              Share this password with the participant. They must enter this to
              join your live session.
            </p>

            <div className="bg-base-200 rounded-xl p-4 mb-5 border border-base-300">
              <p className="text-sm opacity-70 mb-2">8-character password</p>
              <p className="text-2xl font-black tracking-wider">
                {createdSessionData.password}
              </p>
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleCopyPassword}>
                Copy Password
              </button>
              <button
                className="btn btn-primary"
                onClick={handleContinueToSession}
              >
                Continue to Session
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={handleContinueToSession}
          ></div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
