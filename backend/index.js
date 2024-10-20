import express from "express"; // Importing express framework for creating server
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from "cors"; // Middleware to enable CORS
import dotenv from "dotenv"; // Module to load environment variables
import connectDB from "./utils/db.js"; // Function to connect to the database
import userRoute from "./routes/user.route.js"; // User-related routes
import companyRoute from "./routes/company.route.js"; // Company-related routes
import jobRoute from "./routes/job.route.js"; // Job-related routes
import applicationRoute from "./routes/application.route.js"; // Application-related routes
import chartRoutes from "./routes/chartData.route.js"; // Data Pie and Bargraph
import events from "events";
import recommendation from "./routes/recommendation.route.js";
import resumeRoutes from "./routes/resumeUpload.routes.js"; // Correctly named resume routes import
import path from "path";
import { fileURLToPath } from 'url'; // Helper to define __dirname
import fs from "fs"; // Importing the fs module
import resumeUploadRoutes from './routes/resumeUpload.routes.js';
import extractDataRoutes from './routes/extractData.routes.js';

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Ensure the uploads/resumes directory exists
const uploadDir = path.join(__dirname, "uploads", "resumes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

const app = express(); // Create an Express application

// Middleware configuration
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use("/uploads/resumes", express.static(uploadDir)); // Serve static files for uploaded resumes
app.use('/api', resumeUploadRoutes);
app.use('/api', extractDataRoutes);

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://jobhub-frontend-ten.vercel.app" // Production front-end
      : "http://localhost:5173", // Local development
  credentials: true, // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions)); // Use CORS middleware with specified options

// Add Content Security Policy (CSP) middleware for backend (server)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; connect-src 'self';"
  );
  next();
});

const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

// API route definitions
app.use("/api/v1/user", userRoute); // User-related API routes
app.use("/api/v1/company", companyRoute); // Company-related API routes
app.use("/api/v1/job", jobRoute); // Job-related API routes
app.use("/api/v1/application", applicationRoute); // Application-related API routes
app.use("/api/chart", chartRoutes); // Register the chart routes
app.use("/api/v1/recommend", recommendation);
app.use("/api", resumeRoutes); // Correctly use resume routes

// Health check endpoint
app.get("/", async (req, res) => res.json({ msg: "Server Working Properly" }));

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server running at port ${PORT}`); // Log the running port
});
