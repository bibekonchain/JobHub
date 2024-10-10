import React, { useEffect } from "react"; // Import React and useEffect hook
import Navbar from "./shared/Navbar"; // Import Navbar component
import Job from "./Job"; // Import Job component for rendering individual job details
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { setSearchedQuery } from "@/redux/jobSlice"; // Import action for setting the searched query
import useGetAllJobs from "@/hooks/useGetAllJobs"; // Custom hook to fetch all jobs
import RecommendationList from "./RecommendationList"; // Import RecommendationList component

const Browse = () => {
  useGetAllJobs(); // Fetch all jobs using the custom hook
  const { allJobs } = useSelector((store) => store.job); // Get all jobs from Redux store
  const { user } = useSelector((store) => store.auth); // Get user from auth slice
  const dispatch = useDispatch(); // Get the dispatch function for Redux

  useEffect(() => {
    // Cleanup function to reset searched query when the component unmounts
    return () => {
      dispatch(setSearchedQuery("")); // Reset the searched query to an empty string
    };
  }, [dispatch]); // Add dispatch as a dependency

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      {/* Conditionally render the recommendation list if the user is logged in */}
      {user ? (
        <RecommendationList userId={user._id} /> // Pass userId to RecommendationList
      ) : (
        <h1 className="text-center text-xl text-red-500 mb-4"></h1> // Show a message if user is not logged in
      )}
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-[#6A38C2]">Search </span> Results
      </h1>
      {/* Conditionally render job results based on user authentication */}
      {user ? (
        <div className="max-w-7xl mx-auto my-10">
          <div className="grid grid-cols-3 gap-4">
            {allJobs.length > 0 ? (
              allJobs.map((job) => (
                <Job key={job._id} job={job} /> // Render each job using the Job component
              ))
            ) : (
              <h2 className="text-center text-xl mb-4">No jobs available.</h2> // Message if no jobs are found
            )}
          </div>
        </div>
      ) : (
        <h2 className="text-center text-xl mb-4">
          Please log in to view search results.
        </h2> // Message for logged-out users
      )}
    </div>
  );
};

export default Browse; // Export the Browse component
