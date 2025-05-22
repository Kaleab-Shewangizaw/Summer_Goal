import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.route.js";
import connectDB from "./utils/connectDB.js";
import PlanRoute from "./routes/plan.route.js";
import SkillRoute from "./routes/skill.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({ credentials: true, origin: "https://summer-planner-nine.vercel.app" })
);

app.use("/api/auth", AuthRoute);
app.use("/api/plan", PlanRoute);
app.use("/api/skill", SkillRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, connectDB);
