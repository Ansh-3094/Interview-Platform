import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSession.js";
import { useProblems } from "../hooks/useProblems.js";
import { executeCode } from "../lib/piston.js";
import Navbar from "../components/Navbar.jsx";
import ChangeSessionProblemModal from "../components/ChangeSessionProblemModal.jsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils.js";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
  EditIcon,
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import OutputPanel from "../components/OutputPanel.jsx";

import useStreamClient from "../hooks/useStreamClient.js";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI.jsx";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [joinPassword, setJoinPassword] = useState("");
  const [hostSessionPassword, setHostSessionPassword] = useState("");
  const [showHostPassword, setShowHostPassword] = useState(false);
  const [hasVerifiedAccess, setHasVerifiedAccess] = useState(false);
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [showChangeProblemModal, setShowChangeProblemModal] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);
  const { data: problemsData } = useProblems();
  const problemsMap = problemsData?.problems || {};

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const needsToJoin = !!session && !!user && !loadingSession && !isHost;
  const canEnterSession = isHost || hasVerifiedAccess;
  const rawHostName = session?.host?.name?.trim();
  const hostLooksLikeClerkId = rawHostName?.startsWith("user_");
  const hostDisplayName = isHost
    ? "You"
    : rawHostName && !hostLooksLikeClerkId
      ? rawHostName.split(" ")[0]
      : "Host";
  const difficultyLabel =
    session?.difficulty?.toLowerCase() === "open"
      ? "Freestyle"
      : session?.difficulty
        ? session.difficulty.slice(0, 1).toUpperCase() +
          session.difficulty.slice(1)
        : "Easy";

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, canEnterSession);

  // Resolve by canonical id first, then fallback to title for older sessions.
  const problemData = session?.problemId
    ? problemsMap[session.problemId]
    : session?.problem
      ? Object.values(problemsMap).find((p) => p.title === session.problem)
      : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || "",
  );

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    // use problem-specific starter code
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    setShowEndSessionDialog(true);
  };

  const handleConfirmEndSession = () => {
    // this will navigate the HOST to dashboard
    endSessionMutation.mutate(id, {
      onSuccess: () => navigate("/dashboard"),
    });
  };

  const handleCancelEndSession = () => {
    if (endSessionMutation.isPending) return;
    setShowEndSessionDialog(false);
  };

  const handleProblemChanged = async (newProblem) => {
    // Clear output panel on problem change
    setOutput(null);

    // Send Stream Chat message to notify participant
    if (channel) {
      try {
        await channel.sendMessage({
          text: `Problem changed to: ${newProblem.title}`,
          type: "notification",
        });
      } catch (error) {
        console.error("Error sending notification message:", error);
      }
    }

    // Refetch session to ensure UI is in sync
    refetch();
  };

  const handleJoinSession = () => {
    if (joinPassword.trim().length !== 8) return;

    joinSessionMutation.mutate(
      {
        id,
        password: joinPassword.trim(),
      },
      {
        onSuccess: () => {
          setJoinPassword("");
          setHasVerifiedAccess(true);
          refetch();
        },
      },
    );
  };

  const handleCloseJoinDialog = () => {
    setJoinPassword("");
    navigate("/dashboard");
  };

  useEffect(() => {
    setHasVerifiedAccess(false);
    setJoinPassword("");
    setHostSessionPassword("");
    setShowHostPassword(false);
  }, [id]);

  useEffect(() => {
    if (!id || !isHost) {
      setHostSessionPassword("");
      return;
    }

    const savedPassword =
      sessionStorage.getItem(`session-password-${id}`) || "";
    setHostSessionPassword(savedPassword);
  }, [id, isHost]);

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      {needsToJoin && session?.status === "active" && !canEnterSession && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-full max-w-md card bg-base-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body">
              <h2 className="card-title text-2xl">Join Protected Session</h2>
              <p className="text-base-content/70">
                Enter the 8-character password shared by the host to join this
                live session.
              </p>

              <label className="form-control mt-4">
                <span className="label-text font-medium mb-3 block">
                  Password
                </span>
                <input
                  type="text"
                  className="input input-bordered w-full py-3 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-sm"
                  value={joinPassword}
                  maxLength={8}
                  onChange={(e) => setJoinPassword(e.target.value)}
                  placeholder="Enter session password"
                />
              </label>

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={handleCloseJoinDialog}
                  disabled={joinSessionMutation.isPending}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleJoinSession}
                  disabled={
                    joinSessionMutation.isPending ||
                    joinPassword.trim().length !== 8
                  }
                >
                  {joinSessionMutation.isPending ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : null}
                  Join Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChangeSessionProblemModal
        isOpen={showChangeProblemModal}
        onClose={() => setShowChangeProblemModal(false)}
        sessionId={id}
        onProblemChanged={handleProblemChanged}
      />

      {showEndSessionDialog && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-full max-w-md card bg-base-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body">
              <h2 className="card-title text-2xl">End Session?</h2>
              <p className="text-base-content/70">
                Are you sure you want to end this session? All participants will
                be notified.
              </p>

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={handleCancelEndSession}
                  disabled={endSessionMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={handleConfirmEndSession}
                  disabled={endSessionMutation.isPending}
                >
                  {endSessionMutation.isPending ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : null}
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM DSC PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200">
                  {/* HEADER SECTION */}
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-3xl font-bold text-base-content">
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <p className="text-base-content/60 mt-1">
                            {problemData.category}
                          </p>
                        )}
                        <p className="text-base-content/60 mt-2">
                          Host: {session ? hostDisplayName : "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {isHost && hostSessionPassword && (
                          <div className="flex items-center gap-2 bg-base-200 border border-base-300 rounded-lg px-2.5 py-1.5">
                            <span className="text-xs font-medium text-base-content/70">
                              Session Password:
                            </span>
                            <code className="text-sm font-bold tracking-wider min-w-20 text-base-content">
                              {showHostPassword
                                ? hostSessionPassword
                                : "••••••••"}
                            </code>
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs"
                              onClick={() =>
                                setShowHostPassword((prev) => !prev)
                              }
                              title={
                                showHostPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showHostPassword ? (
                                <EyeOffIcon className="w-4 h-4" />
                              ) : (
                                <EyeIcon className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}

                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(
                            session?.difficulty,
                          )}`}
                        >
                          {difficultyLabel}
                        </span>
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={() => setShowChangeProblemModal(true)}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-primary btn-sm gap-2"
                          >
                            <EditIcon className="w-4 h-4" />
                            Change Problem
                          </button>
                        )}
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-error btn-sm gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* problem desc */}
                    {problemData?.description && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">
                          Description
                        </h2>
                        <div className="space-y-3 text-base leading-relaxed">
                          <p className="text-base-content/90">
                            {problemData.description.text}
                          </p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-base-content/90">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* examples section */}
                    {problemData?.examples &&
                      problemData.examples.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                          <h2 className="text-xl font-bold mb-4 text-base-content">
                            Examples
                          </h2>

                          <div className="space-y-4">
                            {problemData.examples.map((example, idx) => (
                              <div key={idx}>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="badge badge-sm">
                                    {idx + 1}
                                  </span>
                                  <p className="font-semibold text-base-content">
                                    Example {idx + 1}
                                  </p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                  <div className="flex gap-2">
                                    <span className="text-primary font-bold min-w-17.5">
                                      Input:
                                    </span>
                                    <span>{example.input}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span className="text-secondary font-bold min-w-17.5">
                                      Output:
                                    </span>
                                    <span>{example.output}</span>
                                  </div>
                                  {example.explanation && (
                                    <div className="pt-2 border-t border-base-300 mt-2">
                                      <span className="text-base-content/60 font-sans text-xs">
                                        <span className="font-semibold">
                                          Explanation:
                                        </span>{" "}
                                        {example.explanation}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Constraints */}
                    {problemData?.constraints &&
                      problemData.constraints.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                          <h2 className="text-xl font-bold mb-4 text-base-content">
                            Constraints
                          </h2>
                          <ul className="space-y-2 text-base-content/90">
                            {problemData.constraints.map((constraint, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-primary">•</span>
                                <code className="text-sm">{constraint}</code>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO CALLS & CHAT */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-base-200 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">
                        Unable to connect to the video call
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI
                        chatClient={chatClient}
                        channel={channel}
                        isHost={isHost}
                        onHostEndCall={handleEndSession}
                      />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;
