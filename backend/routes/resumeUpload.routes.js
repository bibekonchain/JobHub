import express from "express";
import { uploadResume } from "../controllers/resumeUpload.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directly specify the upload directory
    const uploadDir = 'F:/JobHub/jobhub/backend/uploads/resumes'; // Use forward slashes for Windows compatibility

    // Set the destination for the file upload
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Set the filename with current timestamp and original name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// Define the upload route
router.post("/upload/resume", upload.single("resume"), uploadResume);

export default router;
