import express from "express";
import { getRecommendations } from "../controllers/recommendation.controller.js";

const router = express.Router();

// Route to get job recommendations based on user's skills
router.get("/recommendations/:userId", getRecommendations);

export default router; // Export as default
