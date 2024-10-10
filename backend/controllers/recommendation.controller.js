import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// Function to calculate content-based recommendation using cosine similarity
function cosineSimilarity(jobSkills, userSkills) {
  const matchCount = jobSkills.filter((skill) =>
    userSkills.includes(skill)
  ).length;
  const totalSkills = new Set([...jobSkills, ...userSkills]).size;

  return matchCount / totalSkills;
}

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const jobs = await Job.find();

    const recommendations = jobs.map((job) => {
      const similarityScore = cosineSimilarity(
        job.requirements,
        user.profile.skills
      );

      return { ...job.toObject(), similarityScore };
    });

    const sortedRecommendations = recommendations
      .filter((job) => job.similarityScore > 0) // Only show jobs with relevant skills
      .sort((a, b) => b.similarityScore - a.similarityScore); // Sort by relevance

    res.json(sortedRecommendations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};