import { PROBLEMS } from "../data/problems.js";

export async function getProblems(_, res) {
  try {
    return res.status(200).json({ problems: PROBLEMS });
  } catch (error) {
    console.log("Error in getProblems controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProblemById(req, res) {
  try {
    const { id } = req.params;
    const problem = PROBLEMS[id];

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json({ problem });
  } catch (error) {
    console.log("Error in getProblemById controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
