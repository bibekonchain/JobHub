// Constants for API endpoints

// Base URL for user-related API calls
export const USER_API_END_POINT =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/user" // Local development URL
    : "https://jobhub-backend-3t1f.onrender.com/api/v1/user"; // Production URL (Render)

// Base URL for job-related API calls
export const JOB_API_END_POINT =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/job" // Local development URL
    : "https://jobhub-backend-3t1f.onrender.com/api/v1/job"; // Production URL (Render)

// Base URL for application-related API calls
export const APPLICATION_API_END_POINT =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/application" // Local development URL
    : "https://jobhub-backend-3t1f.onrender.com/api/v1/application"; // Production URL (Render)

// Base URL for company-related API calls
export const COMPANY_API_END_POINT =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/company" // Local development URL
    : "https://jobhub-backend-3t1f.onrender.com/api/v1/company"; // Production URL (Render)

// General base API endpoint for other API calls
export const BASE_API_END_POINT =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1" // Local development URL
    : "https://jobhub-backend-3t1f.onrender.com/api/v1"; // Production URL (Render)
