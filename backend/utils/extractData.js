import pdf from "pdf-parse"; // Import the pdf-parse library
import fs from "fs"; // Import the fs module to read files

// Function to extract data from the CV
export const extractDataFromCV = async (filePath) => {
  // Read the PDF file
  const dataBuffer = fs.readFileSync(filePath);

  // Use pdf-parse to extract text from the PDF
  const data = await pdf(dataBuffer);

  // The extracted text content
  const text = data.text;

  // Define regex patterns to extract phone number, skills, and bio
  const phonePattern = /(\+?\d{1,3}[-. ]?)?(\(?\d{2,3}\)?[-. ]?)?\d{7,10}/g; // Simple regex for phone numbers
  const skillsPattern = /(?:Skills?|Key Skills?):?\s*([\s\S]*?)(?=\n|$)/i; // Capture skills section
  const bioPattern = /(?:Bio|Profile|About Me):?\s*([\s\S]*?)(?=\n|$)/i; // Capture bio section

  // Extracting the phone number
  const phoneMatches = text.match(phonePattern);
  const phoneNumber = phoneMatches ? phoneMatches[0] : null;

  // Extracting skills
  const skillsMatches = text.match(skillsPattern);
  const skills = skillsMatches
    ? skillsMatches[1]
        .trim()
        .split(",")
        .map((skill) => skill.trim())
    : null;

  // Extracting bio
  const bioMatches = text.match(bioPattern);
  const bio = bioMatches ? bioMatches[1].trim() : null;

  // Return the extracted data
  return {
    phoneNumber,
    skills,
    bio,
  };
};
