import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/create/:id", createSkill);
router.get("/:id/skills", getAllSkills);
router.get("/:id", getSkillById);

export default router;
