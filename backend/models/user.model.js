import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Full name of the user (required)
    fullname: {
        type: String,
        required: true  // Full name is mandatory
    },
    // Email address of the user (required and must be unique)
    email: {
        type: String,
        required: true,  // Email is mandatory
        unique: true,   // Email must be unique across users
        lowercase: true    
    },
    // Phone number of the user (required)
    phoneNumber: {
        type: Number,
        required: true  // Phone number is mandatory
    },
    // Password for user authentication (required)
    password: {
        type: String,
        required: true,  // Password is mandatory
    },
    // Role of the user, can be either 'student' or 'recruiter' (required)
    role: {
        type: String,
        enum: ['student', 'recruiter'],  // Only allow specific roles
        required: true  // Role is mandatory
    },
    // Profile information for the user
    profile: {
        // User biography (optional)
        bio: { type: String },
        // List of skills possessed by the user
        skills: [{ type: String }],
        // URL to the user's resume file (optional)
        resume: { type: String }, 
        // Original name of the uploaded resume file (optional)
        resumeOriginalName: { type: String },
        // Reference to the Company model (optional), linking to the user's company if applicable
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        // URL to the user's profile photo (optional)
        profilePhoto: {
            type: String,
            default: ""  // Default to an empty string if not provided
        }
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt timestamps to each document

// Export the User model based on the userSchema
export const User = mongoose.model('User', userSchema);
