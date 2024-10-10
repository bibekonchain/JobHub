import { setAllAdminJobs } from '@/redux/jobSlice'; // Import action to set jobs in Redux
import { JOB_API_END_POINT } from '@/utils/constant'; // Import API endpoint constant
import axios from 'axios'; // Import Axios for HTTP requests
import { useEffect } from 'react'; // Import useEffect hook
import { useDispatch } from 'react-redux'; // Import useDispatch hook from Redux

// Custom hook to fetch all admin jobs
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch(); // Initialize dispatch to update Redux store

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                // Fetch all admin jobs from the API
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    // Dispatch the fetched jobs to the Redux store
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error); // Log error for debugging
            }
        };

        fetchAllAdminJobs(); // Call the fetch function
    }, [dispatch]); // Add dispatch to the dependency array

};

export default useGetAllAdminJobs; // Export the custom hook
