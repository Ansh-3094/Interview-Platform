export const TRACKS = [
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

export const ORDERED_TRACKS = [
  ...TRACKS.filter((track) => track.id !== "random"),
  TRACKS.find((track) => track.id === "random"),
].filter(Boolean);

const DIFFICULTY_ORDER = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

export const sortProblemsByDifficulty = (problems) =>
  [...problems].sort((a, b) => {
    const aOrder = DIFFICULTY_ORDER[a.difficulty] ?? 99;
    const bOrder = DIFFICULTY_ORDER[b.difficulty] ?? 99;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.title.localeCompare(b.title);
  });

export const getAllProblems = (problemsMap = {}) => Object.values(problemsMap);

export const getPracticeFreelyProblem = (problemsMap = {}) =>
  problemsMap["practice-freely"];

export const getTrackProblems = (track, allProblems) => {
  if (!track) return [];

  const nonFreestyleProblems = allProblems.filter(
    (problem) => problem.id !== "practice-freely",
  );

  if (track.id === "random") {
    return sortProblemsByDifficulty(nonFreestyleProblems);
  }

  return sortProblemsByDifficulty(
    nonFreestyleProblems.filter((problem) => track.matcher(problem)),
  );
};

export const getProblemsForTrack = (track, problemsMap = {}) => {
  const allProblems = getAllProblems(problemsMap);
  const practiceFreely = getPracticeFreelyProblem(problemsMap);
  const trackProblems = getTrackProblems(track, allProblems);

  return [
    practiceFreely,
    ...trackProblems.filter((problem) => problem.id !== "practice-freely"),
  ].filter(Boolean);
};
