import { Link } from "react-router";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  VideoIcon,
  Code2Icon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function Footer() {
  return (
    <footer className="mt-10 border-t border-primary/20 bg-base-100/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-black">
              Ready for your next technical interview?
            </h3>
            <p className="text-base-content/70 mt-1">
              Start a live coding session with video and collaborate in real
              time.
            </p>
          </div>

          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-linear-to-r from-primary via-secondary to-accent rounded-xl text-primary-content font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer w-fit">
              Start Coding Session
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-2xl font-black bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              InterviewApex
            </h4>
            <p className="text-base-content/70 max-w-xl">
              Real-time coding interviews with HD video, collaborative editor,
              and multi-language execution for faster interview prep.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-outline">Python</span>
              <span className="badge badge-outline">JavaScript</span>
              <span className="badge badge-outline">Java</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-base-content/70">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/problems"
                  className="hover:text-primary transition-colors"
                >
                  Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3">Platform Trust</h5>
            <ul className="space-y-3 text-base-content/70">
              <li className="flex items-center gap-2">
                <ShieldCheckIcon className="size-4 text-success" />
                Secure authentication
              </li>
              <li className="flex items-center gap-2">
                <VideoIcon className="size-4 text-primary" />
                Live video collaboration
              </li>
              <li className="flex items-center gap-2">
                <Code2Icon className="size-4 text-secondary" />
                Real-time code execution
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-base-300 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-base-content/60">
          <p>© 2026 InterviewApex. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
