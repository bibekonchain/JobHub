import React, { useEffect, useState } from "react"; // Import necessary hooks from React
import { Badge } from "./ui/badge"; // Import Badge component
import { Button } from "./ui/button"; // Import Button component
import { useParams } from "react-router-dom"; // Import useParams for route parameters
import axios from "axios"; // Import axios for HTTP requests
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant"; // Import API endpoints
import { setSingleJob } from "@/redux/jobSlice"; // Import Redux action to set a single job
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux
import { toast } from "sonner"; // Import toast for notifications
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  // Select necessary state from the Redux store
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Determine if the user has already applied for the job
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied); // Local state to track application status

  const params = useParams(); // Get parameters from the route
  const jobId = params.id; // Extract job ID from parameters
  const dispatch = useDispatch(); // Get dispatch function from Redux

  // Handler for applying to the job
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true); // Update the local state to indicate the user has applied
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Update the Redux store for real-time UI update
        toast.success(res.data.message); // Show success notification
      }
    } catch (error) {
      console.log(error); // Log any errors
      toast.error(error.response.data.message); // Show error notification
    }
  };

  // Fetch job details when the component mounts or jobId/user changes
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job)); // Update Redux store with job data
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Sync local state with fetched data
        }
      } catch (error) {
        console.log(error); // Log any errors
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]); // Dependencies to trigger the effect

  return (
    <div>
      {" "}
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        {" "}
        {/* Main container */}
        <div className="flex items-center justify-between">
          {" "}
          {/* Header with job title and application button */}
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>{" "}
            {/* Job title */}
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position} Positions
              </Badge>{" "}
              {/* Positions badge */}
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>{" "}
              {/* Job type badge */}
              <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                {singleJob?.salary}LPA
              </Badge>{" "}
              {/* Salary badge */}
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler} // Disable button if already applied
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}{" "}
            {/* Button text changes based on application status */}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>{" "}
        {/* Job description section */}
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>{" "}
          {/* Role title */}
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>{" "}
          {/* Job description */}
          <h1 className="font-bold my-1">
            Required Skills:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.requirements?.join(", ") || "No skills specified"}
            </span>
          </h1>{" "}
          {/* Job skillsRequired */}
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>{" "}
          {/* Required experience */}
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>{" "}
          {/* Job location */}
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>{" "}
          {/* Salary offered */}
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>{" "}
          {/* Total number of applicants */}
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>{" "}
          {/* Posting date */}
        </div>
      </div>
    </div>
  );
};

export default JobDescription; // Export the JobDescription component
