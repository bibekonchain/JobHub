import express from "express"; // Import the express framework
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js"; // Import user-related controllers
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Import authentication middleware
import { singleUpload } from "../middlewares/mutler.js"; // Import multer middleware for handling file uploads

// Create a new router instance
const router = express.Router();

// Route for user registration
// Method: POST
// URL: /register
router.route("/register").post(singleUpload, register); // Handle user registration with file upload

// Route for user login
// Method: POST
// URL: /login
router.route("/login").post(login); // Handle user login

// Route for user logout
// Method: GET
// URL: /logout
router.route("/logout").get(logout); // Handle user logout

// Route for updating user profile
// Method: POST
// URL: /profile/update
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile); // Update user profile after authentication and file upload

// Export the router to be used in other parts of the application
export default router;
