import mongoose from "mongoose";

// Define the schema for the Job model
const jobSchema = new mongoose.Schema(
  {
    // Title of the job (required)
    title: {
      type: String,
      required: true, // Job title is mandatory
    },
    // Detailed description of the job (required)
    description: {
      type: String,
      required: true, // Job description is mandatory
    },
    // List of requirements for the job
    requirements: [
      {
        type: String, // Each requirement is a string
      },
    ],
    // Salary offered for the job (required)
    salary: {
      type: Number,
      required: true, // Salary is mandatory
    },
    // Level of experience required (as a number, required)
    experienceLevel: {
      type: Number,
      required: true, // Experience level is mandatory
    },
    // Location where the job is based (required)
    location: {
      type: String,
      required: true, // Job location is mandatory
    },
    // Type of job (e.g., full-time, part-time, contract) (required)
    jobType: {
      type: String,
      required: true, // Job type is mandatory
    },
    // Position number (or level) for the job (required)
    position: {
      type: Number,
      required: true, // Position is mandatory
    },
    // Reference to the Company model, indicating which company posted the job (required)
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // References the Company collection
      required: true, // Company reference is mandatory
    },
    // Reference to the User model, indicating which user created the job (required)
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User collection
      required: true, // User reference is mandatory
    },
    // List of applications for this job
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application", // References the Application collection
      },
    ],
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps to each document

// Export the Job model based on the jobSchema
export const Job = mongoose.model("Job", jobSchema);
