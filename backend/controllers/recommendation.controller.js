import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// Function to calculate content-based recommendation using cosine similarity
// Function to clean and normalize skills
function cleanSkills(skills) {
  return skills.map(skill =>
    skill.toLowerCase().trim().replace(/['"]+/g, '') // Convert to lowercase, trim spaces, remove quotes
  );
}

// Function to calculate content-based recommendation using cosine similarity
function cosineSimilarity(jobSkills, userSkills) {
  const normalizedJobSkills = cleanSkills(jobSkills);
  const normalizedUserSkills = cleanSkills(userSkills);

  console.log("Job Skills:", normalizedJobSkills);
  console.log("User Skills:", normalizedUserSkills);

  const matchCount = normalizedJobSkills.filter((skill) =>
    normalizedUserSkills.includes(skill)
  ).length;

  const totalSkills = new Set([...normalizedJobSkills, ...normalizedUserSkills]).size;

  const similarityScore = (matchCount / totalSkills) * 100;

  console.log("Similarity Score:", similarityScore);
  
  return similarityScore;
}


export const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const jobs = await Job.find();

    if (!user.profile.skills || user.profile.skills.length === 0) {
      return res.status(400).json({ message: "User has no skills listed" });
    }

    const recommendations = jobs.map((job) => {
      // Ensure the job has requirements
      if (!job.requirements || job.requirements.length === 0) {
        return null; // Skip jobs with no requirements
      }

      // Calculate similarity score
      const similarityScore = cosineSimilarity(
        job.requirements,
        user.profile.skills
      );

      return { ...job.toObject(), similarityScore }; // Use 'similarityScore' for clarity
    }).filter(job => job !== null); // Remove null values

    const sortedRecommendations = recommendations
      .filter((job) => job.similarityScore > 0) // Only show relevant jobs
      .sort((a, b) => b.similarityScore - a.similarityScore); // Sort by similarityScore


    res.json(sortedRecommendations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
