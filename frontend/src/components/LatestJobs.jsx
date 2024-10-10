import React from "react"; // Import React
import LatestJobCards from "./LatestJobCards"; // Import the LatestJobCards component
import { useSelector } from "react-redux"; // Import useSelector from Redux

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]; // Example array, currently not in use

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job); // Extract allJobs from the Redux store

  return (
    <div className="max-w-7xl mx-auto my-20">
      {" "}
      {/* Container for latest jobs */}
      <h1 className="text-4xl font-bold text-center mb-8">
        {" "}
        {/* Header for the section */}
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {" "}
        {/* Grid layout for job cards */}
        {allJobs.length <= 0 ? ( // Check if there are no jobs available
          <h2 className="text-center text-xl mb-4">
            Please log in to view latest jobs.
          </h2> // Display message if no jobs are found
        ) : (
          allJobs?.slice(0, 6).map(
            (
              job // Map over the first six jobs
            ) => (
              <LatestJobCards key={job._id} job={job} /> // Render LatestJobCards for each job
            )
          )
        )}
      </div>
    </div>
  );
};

export default LatestJobs; // Export the LatestJobs component
