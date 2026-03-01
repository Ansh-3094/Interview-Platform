import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();

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
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
