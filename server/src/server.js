import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "32kb" }));

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to SkillGraph API" });
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "SkillGraph API",
    message: "Backend is working.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from server/.env");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`SkillGraph API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();