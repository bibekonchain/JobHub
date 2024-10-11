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
import chartRoutes from "./routes/chartData.route.js"; //Data Pie and Bargraph
import events from "events";
import recommendation from "./routes/recommendation.route.js";

// Load environment variables from .env file
dotenv.config();

const app = express(); // Create an Express application

// Middleware configuration
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://jobhub-frontend-ten.vercel.app"
      : "http://localhost:5173", // Local development
  credentials: true,
};

app.use(cors(corsOptions)); // Use CORS middleware with specified options

// Add Content Security Policy (CSP) middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live;"
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

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server running at port ${PORT}`); // Log the running port
});
