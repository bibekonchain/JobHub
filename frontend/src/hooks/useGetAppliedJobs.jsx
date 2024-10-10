import { setAllAppliedJobs } from "@/redux/jobSlice"; // Import action to set applied jobs in Redux
import { APPLICATION_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import axios from "axios"; // Import Axios for HTTP requests
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { useDispatch } from "react-redux"; // Import useDispatch from Redux

// Custom hook to fetch applied jobs
const useGetAppliedJobs = () => {
  const dispatch = useDispatch(); // Initialize dispatch for updating Redux state
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        // Make API call to fetch applied jobs
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data); // Log response data for debugging
        if (res.data.success) {
          // Dispatch the fetched applied jobs to the Redux store
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error); // Log error for debugging
        setError(error); // Set error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    fetchAppliedJobs(); // Call the fetch function
  }, [dispatch]); // Add dispatch to the dependency array to avoid stale closures

  // Return loading and error states for use in components
  return { loading, error };
};

export default useGetAppliedJobs; // Export the custom hook
