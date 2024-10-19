// backend/routes/chartData.js

import express from "express";
import { Job } from "../models/job.model.js"; // Use the existing Job model

const router = express.Router();

// Example: Fetch job count by category (jobType in your schema)
router.get("/jobs-by-type", async (req, res) => {
  try {
    const jobsByType = await Job.aggregate([
      { $group: { _id: "$jobType", count: { $sum: 1 } } },
    ]);
    res.json(jobsByType);
  } catch (err) {
    console.error("Error fetching jobs by type:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
