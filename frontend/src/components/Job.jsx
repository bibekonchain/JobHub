import React from "react"; // Import React
import PropTypes from "prop-types"; // Import PropTypes for validation
import { Button } from "./ui/button"; // Import Button component
import { Bookmark } from "lucide-react"; // Import Bookmark icon
import { Avatar, AvatarImage } from "./ui/avatar"; // Import Avatar components
import { Badge } from "./ui/badge"; // Import Badge component
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Job = ({ job }) => {
  const navigate = useNavigate(); // Get the navigate function for routing

  // Function to calculate the number of days ago a job was created
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime); // Convert MongoDB time to Date
    const currentTime = new Date(); // Get the current date
    const timeDifference = currentTime - createdAt; // Calculate the time difference
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60)); // Convert time difference to days
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">Nepal</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

// Define prop types for validation
Job.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Job ID
    createdAt: PropTypes.string.isRequired, // Job creation date
    title: PropTypes.string.isRequired, // Job title
    description: PropTypes.string.isRequired, // Job description
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow both string and number
    jobType: PropTypes.string.isRequired, // Job type
    salary: PropTypes.number.isRequired, // Salary
    company: PropTypes.shape({
      name: PropTypes.string.isRequired, // Company name
      logo: PropTypes.string // Optional company logo URL
    }).isRequired
  }).isRequired
};

export default Job; // Export the Job component
