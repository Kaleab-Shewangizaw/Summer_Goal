import express from "express";
import {
  deleteAccount,
  getProfile,
  login,
  logout,
  updateAccount,
} from "../controllers/auth..controller.js";
import { signup } from "../controllers/auth..controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteAccount);
router.get("/profile", getProfile);
router.put("/edit/:id", updateAccount);
export default router;
