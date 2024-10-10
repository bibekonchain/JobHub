import React, { useEffect, useState } from "react"; // Import necessary hooks from React
import Navbar from "./shared/Navbar"; // Import Navbar component
import FilterCard from "./FilterCard"; // Import FilterCard component for filtering jobs
import Job from "./Job"; // Import Job component to display individual job details
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux store
import { motion } from "framer-motion"; // Import motion for animation effects
import RecommendationList from "./RecommendationList";

const Jobs = () => {
  // Select all jobs and the searched query from the Redux store
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // Select the user from the Redux store (or other auth-related slice)
  const { user } = useSelector((store) => store.auth);

  const [filterJobs, setFilterJobs] = useState(allJobs); // State to hold filtered jobs

  // Effect to filter jobs based on the searched query
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Check if job title, description, or location includes the searched query
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs); // Update state with filtered jobs
    } else {
      setFilterJobs(allJobs); // If no query, show all jobs
    }
  }, [allJobs, searchedQuery]); // Dependencies to trigger effect when jobs or query change

  return (
    <div>
      <Navbar /> {/* Render Navbar */}
      {/* Conditionally render the recommendation list if the user is logged in */}
      {user ? (
        <RecommendationList userId={user._id} /> // Pass userId to RecommendationList
      ) : (
        <h1></h1> // Show a message if user is not logged in
      )}
      <h1 className="text-4xl font-bold text-center mb-8">
        {" "}
        {/* Header for the section */}
        <span className="text-[#6A38C2]">Other </span> Jobs
      </h1>
      <div className="max-w-7xl mx-auto mt-5">
        {" "}
        {/* Main container for jobs */}
        <div className="flex gap-5">
          {" "}
          {/* Flex container for filtering and job listings */}
          <div className="w-20%">
            {" "}
            {/* Filter section */}
            <FilterCard /> {/* Render FilterCard for filtering options */}
          </div>
          {filterJobs.length <= 0 ? (
            <h2 className="text-center text-xl mb-4">
              Please log in to view all jobs.
            </h2> // Message if no jobs match the filter
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              {" "}
              {/* Container for job listings */}
              <div className="grid grid-cols-3 gap-4">
                {" "}
                {/* Grid layout for jobs */}
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animate to visible state
                    exit={{ opacity: 0, x: -100 }} // Animate out when removed
                    transition={{ duration: 0.3 }} // Duration of the animation
                    key={job?._id}
                  >
                    <Job job={job} /> {/* Render Job component for each job */}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs; // Export the Jobs component
