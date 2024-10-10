import mongoose from "mongoose"; // Import mongoose to interact with MongoDB

/**
 * Connects to the MongoDB database using the URI stored in environment variables.
 * @returns {Promise<void>} - A promise that resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully"); // Log a success message upon successful connection
  } catch (error) {
    console.log(error); // Log any error that occurs during the connection attempt
  }
};

// Export the connectDB function for use in other modules
export default connectDB;
