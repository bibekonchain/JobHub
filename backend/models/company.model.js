import mongoose from "mongoose";

// Define the schema for the Company model
const companySchema = new mongoose.Schema(
  {
    // Name of the company (required and must be unique)
    name: {
      type: String,
      required: true, // Company name is mandatory
      unique: true, // No two companies can have the same name
    },
    // Description of the company (optional)
    description: {
      type: String,
    },
    // Company's official website (optional)
    website: {
      type: String,
    },
    // Location of the company (optional)
    location: {
      type: String,
    },
    // URL to the company's logo stored in a cloud service (optional)
    logo: {
      type: String, // Stores the URL of the company logo
    },
    // Reference to the User model, indicating which user registered the company
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User collection (the one who registered the company)
      required: true, // The user ID is required
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps to each document

// Export the Company model based on the companySchema
export const Company = mongoose.model("Company", companySchema);
