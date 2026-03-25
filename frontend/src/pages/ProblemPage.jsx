import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar.jsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import { executeCode } from "../lib/piston.js";
import { useProblems } from "../hooks/useProblems.js";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: problemsData, isLoading, isError } = useProblems();

  const problemsMap = problemsData?.problems || {};
  const hasProblems = Object.keys(problemsMap).length > 0;

  const [currentProblemId, setCurrentProblemId] = useState("practice-freely");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const orderedProblems = Object.values(problemsMap).sort((a, b) => {
    if (a.id === "practice-freely") return -1;
    if (b.id === "practice-freely") return 1;
    return a.title.localeCompare(b.title);
  });

  const currentProblem = problemsMap[currentProblemId];
  const isFreestyle = currentProblem?.mode === "freestyle";

  // Sync current problem id with route and loaded API data.
  useEffect(() => {
    if (!hasProblems) return;

    if (id && problemsMap[id]) {
      setCurrentProblemId(id);
      setOutput(null);
      return;
    }

    const fallbackId = orderedProblems[0]?.id;
    if (fallbackId) {
      setCurrentProblemId(fallbackId);
      if (id !== fallbackId) {
        navigate(`/problem/${fallbackId}`, { replace: true });
      }
    }
  }, [id, hasProblems, problemsMap, orderedProblems, navigate]);

  useEffect(() => {
    if (!currentProblem?.starterCode) return;

    setCode(currentProblem.starterCode[selectedLanguage] || "");
  }, [currentProblem, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  };

  const handleRunCode = async () => {
    if (!currentProblem) return;

    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      if (isFreestyle) {
        toast.success("Code executed successfully.");
        return;
      }

      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];

      if (!expectedOutput) {
        toast.success("Code executed successfully.");
        return;
      }

      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.success("Code ran, but output does not match expected result.");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-base-content/70">
          Loading problems...
        </div>
      </div>
    );
  }

  if (isError || !currentProblem) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-error">
          Failed to load problem details.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel- problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              isFreestyle={isFreestyle}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={orderedProblems}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right panel- code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* Bottom panel - Output Panel*/}

              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} isFreestyle={isFreestyle} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
