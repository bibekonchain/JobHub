import { setSingleCompany } from "@/redux/companySlice"; // Import action to set a single company in Redux
import { COMPANY_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import axios from "axios"; // Import Axios for HTTP requests
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { useDispatch } from "react-redux"; // Import useDispatch from Redux

// Custom hook to fetch a company by its ID
const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch(); // Initialize dispatch for updating Redux state
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors

  useEffect(() => {
    const fetchSingleCompany = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        // Make API call to fetch company details by ID
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );
        console.log(res.data.company); // Log response data for debugging
        if (res.data.success) {
          // Dispatch the fetched company details to the Redux store
          dispatch(setSingleCompany(res.data.company));
        } else {
          // Handle cases where the API response is successful but doesn't contain the expected data
          setError("Failed to fetch company details."); // Set error message
        }
      } catch (error) {
        console.log(error); // Log error for debugging
        setError(error); // Set error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    if (companyId) {
      // Ensure companyId is defined before making the request
      fetchSingleCompany(); // Call the fetch function
    }
  }, [companyId, dispatch]); // Add companyId and dispatch to the dependency array

  // Return loading, error states for use in components
  return { loading, error };
};

export default useGetCompanyById; // Export the custom hook
