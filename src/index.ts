// index.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./database";
import movieRoutes from "./routes/movieRoutes";
import customerRoutes from "./routes/customerRoutes"; // Future implementation

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for Angular (localhost:4200)
app.use(
  cors({
    origin: "http://localhost:4200", // Allow frontend to access API
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for JSON parsing
app.use(express.json());

// API Routes
app.use("/api/movies", movieRoutes);
app.use("/api/customers", customerRoutes); // Placeholder for future routes

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: " Route not found" });
});

// Connect to MongoDB and start server
connectToDb(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
