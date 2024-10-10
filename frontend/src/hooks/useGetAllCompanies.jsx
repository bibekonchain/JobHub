import { setCompanies } from "@/redux/companySlice"; // Import action to set companies in Redux
import { COMPANY_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import axios from "axios"; // Import Axios for HTTP requests
import { useEffect } from "react"; // Import useEffect hook
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux

// Custom hook to fetch all companies
const useGetAllCompanies = () => {
  const dispatch = useDispatch(); // Initialize dispatch to update Redux store

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetch companies from the API
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("called"); // Log to indicate the function has been called
        if (res.data.success) {
          // Dispatch the fetched companies to the Redux store
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error); // Log error for debugging
      }
    };

    fetchCompanies(); // Call the fetch function
  }, [dispatch]); // Add dispatch to the dependency array
};

export default useGetAllCompanies; // Export the custom hook
