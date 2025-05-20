import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/create/:id", createSkill);
router.get("/:id/skills", getAllSkills);
router.get("/:id", getSkillById);
router.put("/:id/updateSkill", updateSkill);

export default router;
