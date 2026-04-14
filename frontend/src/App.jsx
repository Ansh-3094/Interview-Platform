import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import SessionPage from "./pages/SessionPage.jsx";
import useLiveSessionLock from "./hooks/useLiveSessionLock.js";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const { isInLiveSession, liveSessionId, isCheckingLiveSession } =
    useLiveSessionLock();

  const blockedProblemsRedirect = liveSessionId
    ? `/session/${liveSessionId}`
    : "/dashboard";

  //This will get rid of the Flickering Effect
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />

        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/problems"
          element={
            isSignedIn ? (
              isCheckingLiveSession ? null : isInLiveSession ? (
                <Navigate to={blockedProblemsRedirect} replace />
              ) : (
                <ProblemsPage />
              )
            ) : (
              <Navigate to={"/"} />
            )
          }
        />

        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/problem/:id"
          element={
            isSignedIn ? (
              isCheckingLiveSession ? null : isInLiveSession ? (
                <Navigate to={blockedProblemsRedirect} replace />
              ) : (
                <ProblemPage />
              )
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
