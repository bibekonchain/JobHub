import axios from "axios";

import { BASE_API_END_POINT } from "./constant";
export const fetchRecommendations = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_API_END_POINT}/recommend/recommendations/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
