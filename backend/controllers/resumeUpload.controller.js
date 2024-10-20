import { extractDataFromCV } from '../utils/extractData.js'; // Import the extractData function

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Get the path of the uploaded CV
    const filePath = req.file.path;

    // Extract data from the CV
    const extractedData = await extractDataFromCV(filePath);

    // Return a response with the extracted data
    return res.status(200).json({
      message: "File uploaded and data extracted successfully",
      file: req.file,
      extractedData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading file", error });
  }
};
