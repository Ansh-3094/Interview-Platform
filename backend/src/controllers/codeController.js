const PISTON_API_BASE =
  process.env.PISTON_API_URL || "https://emkc.org/api/v2/piston";
const EXECUTION_TIMEOUT_MS = 5000;
const JUDGE0_API_BASE = process.env.JUDGE0_API_URL || "https://ce.judge0.com";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "*" },
  python: { language: "python", version: "*" },
  java: { language: "java", version: "*" },
};

const JUDGE0_LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
};

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}

async function executeJavaScriptLocally(code) {
  const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const { spawn } = await import("node:child_process");

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "interview-platform-"));
  const filePath = path.join(tempDir, "main.js");

  try {
    await writeFile(filePath, code, "utf8");

    const result = await new Promise((resolve) => {
      const child = spawn(process.execPath, [filePath], {
        stdio: ["ignore", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";
      let timedOut = false;

      const timer = setTimeout(() => {
        timedOut = true;
        child.kill("SIGKILL");
      }, EXECUTION_TIMEOUT_MS);

      child.stdout.on("data", (chunk) => {
        stdout += String(chunk);
      });

      child.stderr.on("data", (chunk) => {
        stderr += String(chunk);
      });

      child.on("close", (code) => {
        clearTimeout(timer);
        resolve({
          stdout,
          stderr: timedOut
            ? `Execution timed out after ${EXECUTION_TIMEOUT_MS}ms`
            : stderr,
          exitCode: code,
          timedOut,
        });
      });

      child.on("error", (error) => {
        clearTimeout(timer);
        resolve({
          stdout,
          stderr: `Failed to start execution: ${error.message}`,
          exitCode: 1,
          timedOut: false,
        });
      });
    });

    return {
      language: "javascript",
      version: process.version,
      run: {
        stdout: result.stdout,
        stderr: result.stderr,
        code: result.exitCode ?? 0,
        output: `${result.stdout}${result.stderr}`,
      },
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function executeLocally(language, code) {
  if (language === "javascript") {
    return executeJavaScriptLocally(code);
  }

  return null;
}

function normalizeJavaSource(code) {
  // Judge0 Java runner expects entry class to be Main.
  if (/public\s+class\s+Main\b/.test(code) || /class\s+Main\b/.test(code)) {
    return code;
  }

  if (/public\s+class\s+[A-Za-z_$][\w$]*\b/.test(code)) {
    return code.replace(
      /public\s+class\s+[A-Za-z_$][\w$]*\b/,
      "public class Main",
    );
  }

  if (/class\s+[A-Za-z_$][\w$]*\b/.test(code)) {
    return code.replace(/class\s+[A-Za-z_$][\w$]*\b/, "class Main");
  }

  return code;
}

async function executeWithJudge0(language, code) {
  const languageId = JUDGE0_LANGUAGE_IDS[language];

  if (!languageId) {
    return null;
  }

  const response = await fetch(
    `${JUDGE0_API_BASE}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: language === "java" ? normalizeJavaSource(code) : code,
        language_id: languageId,
      }),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Judge0 request failed (${response.status}): ${details}`);
  }

  const data = await response.json();
  const stdout = data.stdout || "";
  const stderr = data.stderr || "";
  const compileOutput = data.compile_output || "";
  const message = data.message || "";
  const combinedError = compileOutput || stderr || message;
  const isAccepted = data?.status?.id === 3;

  return {
    language,
    version: "judge0",
    run: {
      stdout,
      stderr: combinedError,
      code: isAccepted ? 0 : 1,
      output: `${stdout}${combinedError}`,
    },
  };
}

export async function executeCode(req, res) {
  try {
    const { language, code } = req.body || {};

    if (!language || typeof code !== "string") {
      return res.status(400).json({
        message: "language and code are required",
      });
    }

    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return res.status(400).json({
        message: `Unsupported language: ${language}`,
      });
    }

    const pistonResponse = await fetch(`${PISTON_API_BASE}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    if (!pistonResponse.ok) {
      const errorText = await pistonResponse.text();
      const isWhitelistBlock =
        pistonResponse.status === 401 &&
        /whitelist only/i.test(errorText || "");

      if (isWhitelistBlock) {
        const localResult = await executeLocally(languageConfig.language, code);

        if (localResult) {
          return res.status(200).json(localResult);
        }

        const judge0Result = await executeWithJudge0(
          languageConfig.language,
          code,
        );

        if (judge0Result) {
          return res.status(200).json(judge0Result);
        }

        return res.status(503).json({
          message:
            "Public Piston API is whitelist-only and no execution fallback is available for this language",
          details:
            "Configure PISTON_API_URL to your own Piston instance or configure JUDGE0_API_URL for a Judge0 instance.",
        });
      }

      return res.status(502).json({
        message: "Code execution provider rejected request",
        details: errorText || "No details provided",
      });
    }

    const data = await pistonResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in executeCode controller", error);
    return res.status(500).json({
      message: "Failed to execute code",
    });
  }
}
