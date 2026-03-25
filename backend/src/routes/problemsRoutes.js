import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getProblemById,
  getProblems,
} from "../controllers/problemsController.js";

const router = express.Router();

router.get("/", protectRoute, getProblems);
router.get("/:id", protectRoute, getProblemById);

export default router;
