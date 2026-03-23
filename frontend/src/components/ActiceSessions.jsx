import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils.js";

function ActiveSessions({
  sessions,
  isLoading,
  isRefreshing = false,
  isError = false,
  onRetry,
  isUserInSession,
}) {
  const [statusFilter, setStatusFilter] = useState("all");

  const activeCount = sessions.filter(
    (session) => session.status === "active",
  ).length;
  const completedCount = sessions.filter(
    (session) => session.status === "completed",
  ).length;
  const filteredSessions = useMemo(() => {
    if (statusFilter === "active") {
      return sessions.filter((session) => session.status === "active");
    }

    if (statusFilter === "completed") {
      return sessions.filter((session) => session.status === "completed");
    }

    return sessions;
  }, [sessions, statusFilter]);

  return (
    <div className="lg:col-span-2 card bg-base-100 border-2 border-primary/20 hover:border-primary/30 h-full">
      <div className="card-body">
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-6">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-liner-to-br from-primary to-secondary rounded-xl">
              <ZapIcon className="size-5" />
            </div>
            <h2 className="text-2xl font-black">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 bg-success rounded-full" />
            <span className="text-sm font-medium text-success">
              {activeCount} active • {completedCount} completed
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <button
            className={`btn btn-xs sm:btn-sm ${
              statusFilter === "all" ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All ({sessions.length})
          </button>
          <button
            className={`btn btn-xs sm:btn-sm ${
              statusFilter === "active" ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setStatusFilter("active")}
          >
            Active ({activeCount})
          </button>
          <button
            className={`btn btn-xs sm:btn-sm ${
              statusFilter === "completed" ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setStatusFilter("completed")}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-primary" />
            </div>
          ) : filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div
                key={session._id}
                className="card bg-base-200 border-2 border-base-300 hover:border-primary/50"
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 rounded-xl bg-liner-to-br from-primary to-secondary flex items-center justify-center">
                      <Code2Icon className="size-7 text-white" />
                      <div className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg truncate">
                          {session.problem}
                        </h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(
                            session.difficulty,
                          )}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm opacity-80">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-4" />
                          <span className="font-medium">
                            {session.host?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span className="text-xs">
                            {session.participant ? "2/2" : "1/2"}
                          </span>
                        </div>
                        {session.status === "completed" ? (
                          <span className="badge badge-ghost badge-sm">
                            COMPLETED
                          </span>
                        ) : session.participant && !isUserInSession(session) ? (
                          <span className="badge badge-error badge-sm">
                            FULL
                          </span>
                        ) : (
                          <span className="badge badge-success badge-sm">
                            OPEN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {session.status === "completed" ? (
                    <button className="btn btn-disabled btn-sm">
                      Completed
                    </button>
                  ) : session.participant && !isUserInSession(session) ? (
                    <button className="btn btn-disabled btn-sm">Full</button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="btn btn-primary btn-sm gap-2"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-liner-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-primary/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">
                {isError
                  ? "Failed to fetch sessions"
                  : `No ${statusFilter === "all" ? "sessions" : statusFilter + " sessions"}`}
              </p>
              <p className="text-sm opacity-50">
                {isError
                  ? "Please try again to load live sessions."
                  : statusFilter === "all"
                    ? "Be the first to create one!"
                    : "Try switching the filter to see more sessions."}
              </p>

              <button
                type="button"
                className="btn btn-sm btn-primary mt-4"
                onClick={onRetry}
                disabled={isRefreshing}
              >
                <RefreshCcwIcon
                  className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isError ? "Try Again" : "Refresh Sessions"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ActiveSessions;
