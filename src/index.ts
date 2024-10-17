import express from 'express'; // Import express to create the server
import dotenv from 'dotenv'; // For loading environment variables

dotenv.config(); // Load environment variables
const app = express(); // Initialize express app
const PORT = process.env.PORT || 3000; // Get the port from environment variables or default to 3000

app.use(express.json()); // Middleware to parse JSON
