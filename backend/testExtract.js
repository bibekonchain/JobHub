import path from 'path';
import { extractDataFromCV } from './utils/extractData.js'; // Corrected import

// Define the correct path to the PDF you want to test
const filePath = path.join('F:', 'JobHub', 'jobhub', 'backend', 'test', 'data', '05-versions-space.pdf'); // Corrected file path

// Print the resolved file path to debug
console.log("Resolved File Path:", filePath);

// Call the function to extract data from the CV
extractDataFromCV(filePath)
  .then((data) => {
    console.log("Extracted Data:", data);
  })
  .catch((err) => {
    console.error("Error extracting data:", err);
  });
