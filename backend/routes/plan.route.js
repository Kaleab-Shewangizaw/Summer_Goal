import express from "express";
import {
  createPlan,
  getAllPlans,
  updatePlan,
  getPlanById,
  deletePlan,
  markPlanAsDone,
  markPlanUnDone,
  addComment,
  deleteComment,
} from "../controllers/plan.controller.js";

const router = express.Router();

router.post("/create/:id", createPlan);
router.get("/:id/get-plans", getAllPlans);
router.put("/:planId/update-plan", updatePlan);
router.get("/:planId/get-plan", getPlanById);
router.put("/:id/mark-done", markPlanAsDone);
router.put("/:id/revert-plan", markPlanUnDone);
router.delete("/:planId/delete-plan", deletePlan);
router.post("/:planId/add-comment", addComment);
router.put("/:planId/:commentId/delete-comment", deleteComment);

export default router;
