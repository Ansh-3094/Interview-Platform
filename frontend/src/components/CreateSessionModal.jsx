import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  Code2Icon,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils.js";
import { useProblems } from "../hooks/useProblems.js";
import {
  ORDERED_TRACKS,
  getAllProblems,
  getProblemsForTrack,
  getTrackProblems,
} from "../lib/problemTracks.js";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const { data: problemsData, isLoading, isError } = useProblems();
  const problemsMap = useMemo(
    () => problemsData?.problems || {},
    [problemsData],
  );
  const allProblems = getAllProblems(problemsMap);
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  useEffect(() => {
    if (!isOpen) {
      setSelectedTrackId("");
      setSearchTerm("");
      setDifficultyFilter("all");
    }
  }, [isOpen]);

  const selectedTrack = useMemo(
    () => ORDERED_TRACKS.find((track) => track.id === selectedTrackId),
    [selectedTrackId],
  );

  const problemsInTrack = useMemo(
    () =>
      selectedTrack ? getProblemsForTrack(selectedTrack, problemsMap) : [],
    [selectedTrack, problemsMap],
  );

  const filteredProblems = useMemo(
    () =>
      problemsInTrack.filter((problem) => {
        const matchesSearch = problem.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
        const normalizedDifficulty =
          problem.mode === "freestyle"
            ? "open"
            : problem.difficulty.toLowerCase();
        const matchesDifficulty =
          difficultyFilter === "all" ||
          normalizedDifficulty === difficultyFilter;

        return matchesSearch && matchesDifficulty;
      }),
    [difficultyFilter, problemsInTrack, searchTerm],
  );

  const selectedProblem = roomConfig.problemId
    ? problemsMap[roomConfig.problemId]
    : null;

  const displayedProblems = useMemo(() => {
    if (!selectedTrack || !selectedProblem) {
      return filteredProblems;
    }

    return problemsInTrack.filter(
      (problem) => problem.id === selectedProblem.id,
    );
  }, [filteredProblems, problemsInTrack, selectedProblem, selectedTrack]);

  const clearSelectedProblem = () => {
    setRoomConfig({
      problemId: "",
      problem: "",
      difficulty: "",
    });
  };

  const handleSelectTrack = (trackId) => {
    clearSelectedProblem();
    setSelectedTrackId(trackId);
    setSearchTerm("");
    setDifficultyFilter("all");
  };

  const handleSelectProblem = (problem) => {
    if (roomConfig.problemId === problem.id) {
      clearSelectedProblem();
      return;
    }

    setRoomConfig({
      problemId: problem.id,
      problem: problem.title,
      difficulty:
        problem.mode === "freestyle"
          ? "open"
          : problem.difficulty.toLowerCase(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {!selectedTrack && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-base-content/75">
                  Select a category card to choose a problem for this session.
                </p>
                <span className="badge badge-ghost">
                  {ORDERED_TRACKS.length} tracks
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                {ORDERED_TRACKS.map((track) => {
                  const trackCount =
                    getTrackProblems(track, allProblems).length +
                    (problemsMap["practice-freely"] ? 1 : 0);

                  return (
                    <button
                      key={track.id}
                      type="button"
                      className="card bg-base-100 border border-base-300 hover:border-primary/40 hover:shadow-md transition-all text-left cursor-pointer"
                      onClick={() => handleSelectTrack(track.id)}
                    >
                      <div className="card-body p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-lg font-semibold">
                            {track.title}
                          </h4>
                          <Code2Icon className="size-5 text-primary" />
                        </div>
                        <p className="text-base-content/65 text-sm">
                          {trackCount} problem{trackCount === 1 ? "" : "s"}
                        </p>
                        <div className="text-primary font-medium text-sm flex items-center gap-1 mt-1">
                          <span>Select Track</span>
                          <ChevronRightIcon className="size-4" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedTrack && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm gap-2"
                  onClick={() => {
                    clearSelectedProblem();
                    setSelectedTrackId("");
                  }}
                >
                  <ArrowLeftIcon className="size-4" />
                  Back to Cards
                </button>
                <span className="badge badge-primary">
                  {selectedTrack.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="input input-bordered flex items-center gap-2 md:col-span-2 transition-all focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-sm">
                  <SearchIcon className="size-4 text-base-content/60" />
                  <input
                    type="text"
                    className="grow focus:outline-none focus:ring-0"
                    placeholder="Search problems"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>

                <select
                  className="select select-bordered w-full cursor-pointer transition-all border-base-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-sm"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="all">All Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="open">Freestyle</option>
                </select>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {displayedProblems.map((problem) => {
                  const isSelected = roomConfig.problemId === problem.id;

                  return (
                    <button
                      key={problem.id}
                      type="button"
                      className={`w-full card bg-base-100 border transition-all text-left cursor-pointer ${
                        isSelected
                          ? "border-primary shadow-md"
                          : "border-base-300 hover:border-primary/40"
                      }`}
                      onClick={() => handleSelectProblem(problem)}
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h4 className="font-semibold text-base">
                                {problem.title}
                              </h4>
                              <span
                                className={`badge ${getDifficultyBadgeClass(
                                  problem.mode === "freestyle"
                                    ? "open"
                                    : problem.difficulty,
                                )}`}
                              >
                                {problem.mode === "freestyle"
                                  ? "Freestyle"
                                  : problem.difficulty}
                              </span>
                            </div>
                            <p className="text-xs text-base-content/60 mb-2">
                              {problem.category}
                            </p>
                            <p className="text-sm text-base-content/80 line-clamp-2">
                              {problem.description.text}
                            </p>
                          </div>

                          {isSelected && (
                            <CheckCircle2Icon className="size-5 text-primary shrink-0" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {displayedProblems.length === 0 && (
                  <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                      <p className="text-sm text-base-content/70">
                        No problems match your search/filter in this track.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body p-4">
                <p className="text-sm text-base-content/70">
                  Loading problems...
                </p>
              </div>
            </div>
          )}

          {isError && (
            <div className="card bg-base-100 border border-error/40">
              <div className="card-body p-4">
                <p className="text-sm text-error">Failed to load problems.</p>
              </div>
            </div>
          )}

          {/* ROOM SUMMARY */}
          {selectedProblem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">{selectedProblem.title}</span>
                </p>
                <p>
                  Difficulty:{" "}
                  <span className="font-medium">
                    {selectedProblem.mode === "freestyle"
                      ? "Freestyle"
                      : selectedProblem.difficulty}
                  </span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problemId}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create Session Now"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </div>
  );
}
export default CreateSessionModal;
