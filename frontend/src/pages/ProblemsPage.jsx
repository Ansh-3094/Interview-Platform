import { Link, useSearchParams } from "react-router";
import Navbar from "../components/Navbar.jsx";
import { ArrowLeftIcon, ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils.js";
import { useProblems } from "../hooks/useProblems.js";

const TRACKS = [
  {
    id: "stack",
    title: "Stack Challenges",
    matcher: (problem) => problem.category.toLowerCase().includes("stack"),
  },
  {
    id: "queue",
    title: "Queue Challenges",
    matcher: (problem) => problem.category.toLowerCase().includes("queue"),
  },
  {
    id: "linked-list",
    title: "Linked List Challenges",
    matcher: (problem) =>
      problem.category.toLowerCase().includes("linked list"),
  },
  {
    id: "tree-graph",
    title: "Tree and Graph Challenges",
    matcher: (problem) => {
      const category = problem.category.toLowerCase();
      return category.includes("tree") || category.includes("graph");
    },
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming Challenges",
    matcher: (problem) =>
      problem.category.toLowerCase().includes("dynamic programming"),
  },
  {
    id: "sliding-window-two-pointers",
    title: "Sliding Window and Two Pointers",
    matcher: (problem) => {
      const category = problem.category.toLowerCase();
      return (
        category.includes("sliding window") || category.includes("two pointers")
      );
    },
  },
  {
    id: "array-hashing",
    title: "Array and Hashing",
    matcher: (problem) => {
      const category = problem.category.toLowerCase();
      return (
        category.includes("array") ||
        category.includes("hash table") ||
        category.includes("prefix/suffix") ||
        category.includes("in-place hashing")
      );
    },
  },
  {
    id: "string-patterns",
    title: "String Patterns",
    matcher: (problem) => problem.category.toLowerCase().includes("string"),
  },
  {
    id: "binary-search",
    title: "Binary Search",
    matcher: (problem) =>
      problem.category.toLowerCase().includes("binary search"),
  },
  {
    id: "random",
    title: "Random Mix Practice",
    matcher: (problem) => problem.id !== "practice-freely",
  },
];

const ORDERED_TRACKS = [
  ...TRACKS.filter((track) => track.id !== "random"),
  TRACKS.find((track) => track.id === "random"),
].filter(Boolean);

const DIFFICULTY_ORDER = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const sortProblemsByDifficulty = (problems) =>
  [...problems].sort((a, b) => {
    const aOrder = DIFFICULTY_ORDER[a.difficulty] ?? 99;
    const bOrder = DIFFICULTY_ORDER[b.difficulty] ?? 99;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.title.localeCompare(b.title);
  });

function ProblemsPage() {
  const { data: problemsData, isLoading, isError } = useProblems();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTrackId = searchParams.get("track");
  const selectedTrack = ORDERED_TRACKS.find(
    (track) => track.id === selectedTrackId,
  );

  const problemsMap = problemsData?.problems || {};
  const allProblems = Object.values(problemsMap);
  const practiceFreely = problemsMap["practice-freely"];

  const getTrackProblems = (track) => {
    if (!track) return [];

    const nonFreestyleProblems = allProblems.filter(
      (problem) => problem.id !== "practice-freely",
    );

    if (track.id === "random") {
      return sortProblemsByDifficulty(nonFreestyleProblems);
    }

    const matchedProblems = sortProblemsByDifficulty(
      nonFreestyleProblems.filter((problem) => track.matcher(problem)),
    );
    return matchedProblems;
  };

  const sortedTrackProblems = selectedTrack
    ? getTrackProblems(selectedTrack)
    : [];

  const problems = selectedTrack
    ? [
        practiceFreely,
        ...sortedTrackProblems.filter(
          (problem) => problem.id !== "practice-freely",
        ),
      ]
    : [];

  const safeProblems = problems.filter(Boolean);

  const openTrack = (trackId) => {
    setSearchParams({ track: trackId });
  };

  const resetTrack = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">
            Practice Problems
          </h1>
          <p className="text-base-content/70">
            Pick a category card to explore matching problems
          </p>
        </div>

        {!selectedTrack && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORDERED_TRACKS.map((track) => {
              const trackCount = getTrackProblems(track).length + 1;

              return (
                <button
                  key={track.id}
                  onClick={() => openTrack(track.id)}
                  className={`card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left cursor-pointer min-h-56 ${
                    track.id === "random" ? "lg:col-start-2 mb-10" : ""
                  }`}
                >
                  <div className="card-body p-7 justify-between">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">{track.title}</h2>
                      <Code2Icon className="size-6 text-primary" />
                    </div>
                    <p className="text-base-content/60 text-base">
                      {trackCount} problem{trackCount === 1 ? "" : "s"}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-primary font-medium">
                      <span>View Problems</span>
                      <ChevronRightIcon className="size-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {selectedTrack && (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <button className="btn btn-ghost gap-2" onClick={resetTrack}>
                <ArrowLeftIcon className="size-4" />
                Back to Categories
              </button>
              <div className="badge badge-primary badge-lg">
                {selectedTrack.title}
              </div>
            </div>

            <div className="space-y-4">
              {safeProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="card bg-base-100 hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Code2Icon className="size-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-bold">
                                {problem.title}
                              </h2>
                              <span
                                className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                              >
                                {problem.mode === "freestyle"
                                  ? "Freestyle"
                                  : problem.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-base-content/60">
                              {problem.category}
                            </p>
                          </div>
                        </div>
                        <p className="text-base-content/80 mb-3">
                          {problem.description.text}
                        </p>
                      </div>

                      <div
                        className={`flex items-center gap-2 ${
                          problem.mode === "freestyle"
                            ? "text-success"
                            : "text-primary"
                        }`}
                      >
                        <span className="font-medium">
                          {problem.mode === "freestyle" ? "Practice" : "Solve"}
                        </span>
                        <ChevronRightIcon className="size-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {safeProblems.length <= 1 && !isLoading && (
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body">
                    <p className="text-base-content/70">
                      No matching category problems yet. Practice Freely is
                      available above.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {isLoading && (
          <div className="card bg-base-100 border border-base-300 mt-6">
            <div className="card-body">
              <p className="text-base-content/70">Loading problems...</p>
            </div>
          </div>
        )}

        {isError && (
          <div className="card bg-base-100 border border-error/40 mt-6">
            <div className="card-body">
              <p className="text-error">Failed to load problems from API.</p>
            </div>
          </div>
        )}

        <div className="mt-12 mb-2 bg-base-100 border border-base-300 rounded-2xl shadow-sm">
          <div className="px-6 py-8 md:px-8 md:py-10 text-center">
            <p className="text-lg font-semibold text-base-content">
              Keep practicing daily to level up your interview performance.
            </p>
            <p className="text-base-content/65 mt-2">
              Choose a track, solve consistently, and revisit Practice Freely
              for custom drills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;
