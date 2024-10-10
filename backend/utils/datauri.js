import DataUriParser from "datauri/parser.js"; // Import DataUriParser to handle data URI formatting
import path from "path"; // Import path to work with file and directory paths

/**
 * Converts a file buffer into a Data URI format.
 * @param {Object} file - The file object containing original name and buffer.
 * @returns {Object} - An object containing the Data URI and MIME type.
 */
const getDataUri = (file) => {
  const parser = new DataUriParser(); // Create a new instance of DataUriParser
  const extName = path.extname(file.originalname).toString(); // Get the file extension from the original file name
  return parser.format(extName, file.buffer); // Format the file buffer into a Data URI
};

// Export the getDataUri function for use in other modules
export default getDataUri;
