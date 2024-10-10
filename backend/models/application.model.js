import mongoose from "mongoose";

// Define the schema for job applications
const applicationSchema = new mongoose.Schema(
  {
    // Reference to the Job model (the job for which the application was made)
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // References the Job collection
      required: true, // This field is mandatory
    },
    // Reference to the User model (the applicant who applied for the job)
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User collection
      required: true, // This field is mandatory
    },
    // Status of the application: pending (default), accepted, or rejected
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"], // Application can only have these statuses
      default: "pending", // Default status is 'pending'
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps to each document

// Export the Application model based on the applicationSchema
export const Application = mongoose.model("Application", applicationSchema);
