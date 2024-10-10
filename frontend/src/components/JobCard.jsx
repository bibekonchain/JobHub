import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import PropTypes from "prop-types";

const JobCard = ({ job, isApplied, applyJobHandler, showApplyButton }) => {
  return (
    <div className="max-w-7xl mx-auto my-10 job-card">
      {/* Job Title and Badges */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{job?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {job?.position || "N/A"} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {job?.jobType || "N/A"}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {job?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        {showApplyButton && (
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        )}
      </div>

      {/* Job Description Section */}
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">{job?.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.location || "N/A"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Required Skills:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.requirements?.join(", ") || "No skills specified"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.salary} LPA
          </span>
        </h1>

        {/* Relevance Score */}
        {job?.similarityScore !== undefined && (
          <h1 className="font-bold my-1">
            Relevance:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {(job.similarityScore * 100).toFixed(2)}%
            </span>
          </h1>
        )}

        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.createdAt?.split("T")[0] || "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  isApplied: PropTypes.bool,
  applyJobHandler: PropTypes.func,
  showApplyButton: PropTypes.bool,
};

export default JobCard;