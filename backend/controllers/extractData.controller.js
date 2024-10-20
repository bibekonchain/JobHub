// controllers/extractData.controller.js
import { extractDataFromCV } from "../utils/extractData.js";

export const handleExtractData = async (req, res) => {
  try {
    const filePath = req.body.filePath; // Assume you send the file path in the request body
    const extractedData = await extractDataFromCV(filePath);

    res.json({
      success: true,
      data: extractedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error extracting data", error });
  }
};
