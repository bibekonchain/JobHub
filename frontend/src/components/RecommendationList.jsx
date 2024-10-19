import { useState, useEffect } from "react";
import { fetchRecommendations } from "../utils/api";
import JobCard from "./JobCard"; // Import the JobCard component
import PropTypes from "prop-types";

const RecommendationList = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load applied jobs from localStorage when the component mounts
  useEffect(() => {
    const storedAppliedJobs =
      JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedAppliedJobs);
  }, []);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchRecommendations(userId);
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadRecommendations();
  }, [userId]);

  const handleApplyJob = (jobId) => {
    // Simulate applying for the job and updating the applied jobs state
    const updatedAppliedJobs = [...appliedJobs, jobId];
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs)); // Save applied jobs to localStorage
  };

  if (loading) return <p>Loading recommendations...</p>;

  return (
    <div className="recommendations-list max-w-7xl mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-[#6A38C2]">Recommended </span> Jobs
      </h1>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {recommendations.map((job) => (
            <div
              key={job._id}
              className="transform transition-transform hover:scale-105 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl"
            >
              <JobCard
                job={job}
                showApplyButton={true}
                isApplied={appliedJobs.includes(job._id)} // Check if the job is applied
                applyJobHandler={() => handleApplyJob(job._id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-4">
          No relevant jobs found based on your skills.
        </p>
      )}
    </div>
  );
};

RecommendationList.propTypes = {
  userId: PropTypes.string.isRequired, // Defining userId as a required string
};

export default RecommendationList;
