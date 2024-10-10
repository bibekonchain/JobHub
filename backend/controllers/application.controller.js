import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // Extract the user ID from the request (likely from a logged-in session or token)
    const jobId = req.params.id; // Extract the job ID from the request parameters

    // Check if job ID is provided in the request
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    // Check if the user has already applied for the same job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    // Check if the job exists in the database
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Create a new application if the job exists and the user hasn't applied yet
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add the new application to the job's applications list and save the job document
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error); // Log any errors for debugging
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id; // Extract the user ID from the request

    // Find all jobs the user has applied for, sorted by the creation date
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } }, // Sort the jobs by creation date
        populate: {
          path: "company", // Populate the company information for each job
          options: { sort: { createdAt: -1 } },
        },
      });

    // If no applications are found, return a 404 error
    if (!application) {
      return res.status(404).json({
        message: "No Applications found.",
        success: false,
      });
    }

    // Return the applications with success message
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log any errors for debugging
  }
};

// Admin functionality: Retrieve all applicants for a particular job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id; // Extract the job ID from the request parameters

    // Find the job and populate its applications with the applicant details
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } }, // Sort applications by the date they were created
      populate: {
        path: "applicant", // Populate each applicant's details
      },
    });

    // If the job is not found, return a 404 error
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Return the job with the list of applicants
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log any errors for debugging
  }
};

// Update the application status for a job application
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // Extract the status from the request body
    const applicationId = req.params.id; // Extract the application ID from the request parameters

    // Check if the status is provided in the request
    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    // Find the application by its ID
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // Update the application status and save the changes
    application.status = status.toLowerCase(); // Convert the status to lowercase before saving
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error); // Log any errors for debugging
  }
};
