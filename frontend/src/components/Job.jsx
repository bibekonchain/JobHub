import React from "react"; // Import React
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
          {/* Display how long ago the job was posted */}
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
            <AvatarImage src={job?.company?.logo} />{" "}
            {/* Display company logo */}
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>{" "}
          {/* Display company name */}
          <p className="text-sm text-gray-500">Nepal</p>{" "}
          {/* Display company location */}
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>{" "}
        {/* Display job title */}
        <p className="text-sm text-gray-600">{job?.description}</p>{" "}
        {/* Display job description */}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>{" "}
        {/* Display number of positions */}
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>{" "}
        {/* Display job type */}
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>{" "}
        {/* Display salary */}
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>{" "}
        {/* Navigate to job details */}
        <Button className="bg-[#7209b7]">Save For Later</Button>{" "}
        {/* Button to save job for later */}
      </div>
    </div>
  );
};

export default Job; // Export the Job component
