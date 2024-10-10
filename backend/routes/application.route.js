import express from "express"; // Import express framework
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Import authentication middleware
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js"; // Import application-related controllers

// Create a new router instance
const router = express.Router();

// Route for applying to a job
// Method: GET
// URL: /apply/:id (where :id is the job ID)
router.route("/apply/:id").get(isAuthenticated, applyJob); // Apply for the job after authentication

// Route for getting all jobs that the user has applied for
// Method: GET
// URL: /get
router.route("/get").get(isAuthenticated, getAppliedJobs); // Get the list of applied jobs after authentication

// Route for getting applicants for a specific job
// Method: GET
// URL: /:id/applicants (where :id is the job ID)
router.route("/:id/applicants").get(isAuthenticated, getApplicants); // Get applicants for the specified job after authentication

// Route for updating the status of an application
// Method: POST
// URL: /status/:id/update (where :id is the application ID)
router.route("/status/:id/update").post(isAuthenticated, updateStatus); // Update application status after authentication

// Export the router to be used in other parts of the application
export default router;
