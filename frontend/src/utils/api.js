// Importing axios for making HTTP requests
import axios from "axios";

// Importing the base API endpoint constant from the constants file
import { BASE_API_END_POINT } from "./constant";

// Function to fetch job recommendations based on the userId
export const fetchRecommendations = async (userId) => {
  try {
    // Making a GET request to the backend using the provided userId
    const response = await axios.get(
      `${BASE_API_END_POINT}/recommend/recommendations/${userId}`
    );

    // Returning the data received from the backend
    return response.data;
  } catch (error) {
    // Logging any errors that occur during the request
    console.error("Error fetching recommendations:", error);

    // Re-throwing the error to handle it outside of this function if needed
    throw error;
  }
};
