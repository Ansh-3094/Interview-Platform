import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";
const HomePage = () => {
  return (
    <div>
      <h1 className="bg-amber-500"> Welcome </h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign Up</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <button
        className="btn btn-primary"
        onClick={() => toast.error("This is a success toast")}
      >
        Click here
      </button>
    </div>
  );
};

export default HomePage;
