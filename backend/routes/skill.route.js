import express from "express";
import {
  addComment,
  createSkill,
  deleteComment,
  deleteSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/create/:id", createSkill);
router.get("/:id/skills", getAllSkills);
router.get("/:id", getSkillById);
router.put("/:id/updateSkill", updateSkill);
router.put("/:id/addComment", addComment);
router.put("/:id/:commentId/deleteComment", deleteComment);
router.delete("/:id/deleteSkill", deleteSkill);

export default router;
