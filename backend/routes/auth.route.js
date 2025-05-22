import express from "express";
import {
  deleteAccount,
  deleteFeedBack,
  getProfile,
  getProfileWithId,
  login,
  logout,
  sendFeedBack,
  updateAccount,
} from "../controllers/auth..controller.js";
import { signup } from "../controllers/auth..controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/profile/:id", getProfileWithId);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/:id/deleteAccount", deleteAccount);
router.get("/profile", getProfile);
router.put("/edit/:id", updateAccount);
router.put("/:id/sendFeedback", sendFeedBack);
router.put("/:id/:commentId/deleteFeedback", deleteFeedBack);

export default router;
