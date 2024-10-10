import { useEffect } from "react"; // Import useEffect hook for side effects
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const ProtectedRoute = ({ children }) => {
  // Accept children as props
  const { user } = useSelector((store) => store.auth); // Get user from Redux store

  const navigate = useNavigate(); // Initialize navigate for routing

  useEffect(() => {
    // Check if user is not authenticated or not a recruiter
    if (user === null || user.role !== "recruiter") {
      navigate("/"); // Redirect to home page
    }
  }, [user, navigate]); // Dependency array includes user and navigate

  return (
    <>
      {children}{" "}
      {/* Render children if user is authenticated and has the correct role */}
    </>
  );
};

export default ProtectedRoute; // Export the ProtectedRoute component
