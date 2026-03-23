import { getDifficultyBadgeClass } from "../lib/utils";
function ProblemDescription({
  problem,
  isFreestyle,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      {/* HEADER SECTION */}
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">
            {problem.title}
          </h1>
          {isFreestyle ? (
            <span className="badge badge-primary">Freestyle</span>
          ) : (
            <span
              className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
            >
              {problem.difficulty}
            </span>
          )}
        </div>
        <p className="text-base-content/60">{problem.category}</p>

        {/* Problem selector */}
        <div className="mt-4">
          <select
            className="select select-sm w-full"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.mode === "freestyle"
                  ? `${p.title} - Open`
                  : `${p.title} - ${p.difficulty}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isFreestyle && (
          <div className="bg-primary/10 rounded-xl p-5 border border-primary/20">
            <h2 className="text-xl font-bold text-base-content mb-2">
              Open Practice Mode
            </h2>
            <p className="text-base-content/80">
              There are no fixed test cases in this mode. Write and run any code
              you want, then use the output panel to validate your logic.
            </p>
          </div>
        )}

        {/* PROBLEM DESC */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content">Description</h2>

          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-base-content/90">{problem.description.text}</p>
            {problem.description.notes?.map((note, idx) => (
              <p key={idx} className="text-base-content/90">
                {note}
              </p>
            ))}
          </div>
        </div>

        {isFreestyle && problem.practiceIdeas?.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">
              Suggested Practice Ideas
            </h2>
            <ul className="space-y-2 text-base-content/90">
              {problem.practiceIdeas.map((idea, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* EXAMPLES SECTION */}
        {problem.examples?.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">
              Examples
            </h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-sm">{idx + 1}</span>
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
                          <span className="font-semibold">Explanation:</span>{" "}
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

        {/* CONSTRAINTS */}
        {problem.constraints?.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">
              Constraints
            </h2>
            <ul className="space-y-2 text-base-content/90">
              {problem.constraints.map((constraint, idx) => (
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
  );
}

export default ProblemDescription;
