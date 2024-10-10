import React from "react"; // Import React
import { Badge } from "./ui/badge"; // Import Badge component for displaying job details
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LatestJobCards = ({ job }) => {
  // Functional component accepting a job prop
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)} // Navigate to job description on click
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer" // Styling for the job card
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>{" "}
        {/* Display company name */}
        <p className="text-sm text-gray-500">Nepal</p>{" "}
        {/* Placeholder for job location */}
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>{" "}
        {/* Display job title */}
        <p className="text-sm text-gray-600">{job?.description}</p>{" "}
        {/* Display job description */}
      </div>
      <div className="flex items-center gap-2 mt-4">
        {" "}
        {/* Container for job badges */}
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>{" "}
        {/* Job position badge */}
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>{" "}
        {/* Job type badge */}
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>{" "}
        {/* Salary badge */}
      </div>
    </div>
  );
};

export default LatestJobCards; // Export the LatestJobCards component
