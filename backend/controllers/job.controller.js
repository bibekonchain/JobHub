import { Job } from "../models/job.model.js";

// Admin can post a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body; // Extract job details from request body
    const userId = req.id; // Get the logged-in user's ID (admin)

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Some fields are missing.",
        success: false,
      });
    }

    // Create a new job with the provided data
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // Convert requirements string into an array
      salary: Number(salary), // Convert salary to a number
      location,
      jobType,
      experienceLevel: experience, // Store experience level
      position,
      company: companyId, // Associate job with the company
      created_by: userId, // Save the ID of the admin who created the job
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// Get all jobs (for students)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // Get search keyword from query parameters (if any)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // Search in job title
        { description: { $regex: keyword, $options: "i" } }, // Search in job description
      ],
    };

    // Fetch jobs based on the search query, populate company details, and sort by creation date
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// Get job details by job ID (for students)
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Extract job ID from request parameters

    // Find the job by its ID and populate the applications
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// Get all jobs created by the admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // Get the logged-in admin's ID

    // Find all jobs created by the admin, and populate company details
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};
