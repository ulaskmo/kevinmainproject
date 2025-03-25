import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./database";
import movieRoutes from "./routes/movieRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all origins (easier for development)
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to DB and start server
connectToDb(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
