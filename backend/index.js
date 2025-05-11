import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "We are live!", status: "success" });
});

const PORT = process.env.PORT || 3040;

app.listen(PORT);
