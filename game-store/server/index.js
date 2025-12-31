import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import gamesRoutes from "./routes/games.routes.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);

app.get("/", (req, res) => {
  res.json({ status: "GameStore API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
