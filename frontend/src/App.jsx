import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <h1> Welconm </h1>
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
    </>
  );
}

export default App;
