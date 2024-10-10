import React, { useEffect } from "react"; // Import React and necessary hooks
import Navbar from "../shared/Navbar"; // Import Navbar component
import ApplicantsTable from "./ApplicantsTable"; // Import ApplicantsTable component
import axios from "axios"; // Import axios for API requests
import { APPLICATION_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import { useParams } from "react-router-dom"; // Import useParams for route parameters
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux state management
import { setAllApplicants } from "@/redux/applicationSlice"; // Import action to set applicants in Redux store

const Applicants = () => {
  const params = useParams(); // Get route parameters (job ID)
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const { applicants } = useSelector((store) => store.application); // Access applicants from Redux store

  useEffect(() => {
    // Function to fetch all applicants for a specific job
    const fetchAllApplicants = async () => {
      try {
        // Make API request to fetch applicants based on job ID
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job)); // Dispatch action to set applicants in Redux store
      } catch (error) {
        console.log(error); // Log any errors encountered during the request
      }
    };
    fetchAllApplicants(); // Call the fetch function
  }, []); // Empty dependency array to run effect only on component mount

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Container for content */}
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>{" "}
        {/* Header displaying number of applicants */}
        <ApplicantsTable />{" "}
        {/* Render ApplicantsTable component to display applicants */}
      </div>
    </div>
  );
};

export default Applicants; // Export the Applicants component
