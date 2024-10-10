import express from "express"; // Import the express framework
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Import authentication middleware
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js"; // Import job-related controllers

// Create a new router instance
const router = express.Router();

// Route for posting a new job
// Method: POST
// URL: /post
router.route("/post").post(isAuthenticated, postJob); // Post a new job after user authentication

// Route for getting all available jobs
// Method: GET
// URL: /get
router.route("/get").get(isAuthenticated, getAllJobs); // Retrieve all jobs for authenticated users

// Route for getting jobs created by the authenticated admin
// Method: GET
// URL: /getadminjobs
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); // Retrieve jobs created by the admin

// Route for getting a specific job by ID
// Method: GET
// URL: /get/:id (where :id is the job ID)
router.route("/get/:id").get(isAuthenticated, getJobById); // Retrieve job details by job ID after authentication

// Export the router to be used in other parts of the application
export default router;
