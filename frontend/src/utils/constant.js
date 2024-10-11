// Constants for API endpoints

// Base URL for user-related API calls (Update this to use the deployed backend link)
export const USER_API_END_POINT =
  "https://jobhub-backend-three.vercel.app/api/v1/user";

// Base URL for job-related API calls (Update this to use the deployed backend link)
export const JOB_API_END_POINT =
  "https://jobhub-backend-three.vercel.app/api/v1/job";

// Base URL for application-related API calls (Update this to use the deployed backend link)
export const APPLICATION_API_END_POINT =
  "https://jobhub-backend-three.vercel.app/api/v1/application";

// Base URL for company-related API calls (Update this to use the deployed backend link)
export const COMPANY_API_END_POINT =
  "https://jobhub-backend-three.vercel.app/api/v1/company";

// General base API endpoint for other API calls
export const BASE_API_END_POINT =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"  // Local development URL
    : "https://jobhub-backend-three.vercel.app";  // Production URL