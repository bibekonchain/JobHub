import express from "express"; // Import express framework
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Import authentication middleware
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js"; // Import company-related controllers
import { singleUpload } from "../middlewares/mutler.js"; // Import multer middleware for file uploads

// Create a new router instance
const router = express.Router();

// Route for registering a company
// Method: POST
// URL: /register
router.route("/register").post(isAuthenticated, registerCompany); // Register a new company after authentication

// Route for getting all companies associated with the authenticated user
// Method: GET
// URL: /get
router.route("/get").get(isAuthenticated, getCompany); // Retrieve companies for the authenticated user

// Route for getting a specific company by ID
// Method: GET
// URL: /get/:id (where :id is the company ID)
router.route("/get/:id").get(isAuthenticated, getCompanyById); // Retrieve company details by ID after authentication

// Route for updating a company
// Method: PUT
// URL: /update/:id (where :id is the company ID)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany); // Update company information after authentication and file upload

// Export the router to be used in other parts of the application
export default router;
