import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary library and use version 2
import dotenv from "dotenv"; // Import dotenv for environment variable management

// Load environment variables from the .env file
dotenv.config();

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Set the Cloudinary cloud name
  api_key: process.env.API_KEY, // Set the Cloudinary API key
  api_secret: process.env.API_SECRET, // Set the Cloudinary API secret
});

// Export the configured Cloudinary instance for use in other parts of the application
export default cloudinary;
