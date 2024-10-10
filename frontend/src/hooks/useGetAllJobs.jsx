import { setAllJobs } from "@/redux/jobSlice"; // Import action to set all jobs in Redux
import { JOB_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import axios from "axios"; // Import Axios for HTTP requests
import { useEffect } from "react"; // Import useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Import hooks from Redux

// Custom hook to fetch all jobs based on a search query
const useGetAllJobs = () => {
  const dispatch = useDispatch(); // Initialize dispatch to update Redux store
  const { searchedQuery } = useSelector((store) => store.job); // Access the searched query from Redux state

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Fetch all jobs based on the searched query
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          // Dispatch the fetched jobs to the Redux store
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error); // Log error for debugging
      }
    };

    // Call the fetch function only if searchedQuery is not empty
    if (searchedQuery) {
      fetchAllJobs(); // Call the fetch function
    }
  }, [dispatch, searchedQuery]); // Add dispatch and searchedQuery to the dependency array
};

export default useGetAllJobs; // Export the custom hook
