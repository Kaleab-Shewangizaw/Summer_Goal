import express from "express";
import {
  deleteAccount,
  getProfile,
  getProfileWithId,
  login,
  logout,
  updateAccount,
} from "../controllers/auth..controller.js";
import { signup } from "../controllers/auth..controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/profile/:id", getProfileWithId);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteAccount);
router.get("/profile", getProfile);
router.put("/edit/:id", updateAccount);
export default router;
