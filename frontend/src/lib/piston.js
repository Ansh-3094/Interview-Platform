import axiosInstance from "./axios";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "*" },
  python: { language: "python", version: "*" },
  java: { language: "java", version: "*" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await axiosInstance.post("/code/execute", {
      language: languageConfig.language,
      code,
    });

    const data = response.data;
    const run = data?.run || {};

    const stdout = run.stdout || "";
    const stderr = run.stderr || "";
    const output = run.output || `${stdout}${stderr}`;
    const exitCode = typeof run.code === "number" ? run.code : stderr ? 1 : 0;

    if (exitCode !== 0) {
      return {
        success: false,
        output: output || stdout,
        error: stderr || "Code execution failed",
      };
    }

    return {
      success: true,
      output: stdout || output || "No output",
    };
  } catch (error) {
    const apiMessage = error?.response?.data?.message;
    const apiDetails = error?.response?.data?.details;

    return {
      success: false,
      error:
        apiMessage || apiDetails
          ? `${apiMessage || "Failed to execute code"}${apiDetails ? `: ${apiDetails}` : ""}`
          : `Failed to execute code: ${error.message}`,
    };
  }
}
