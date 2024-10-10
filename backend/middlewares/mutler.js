import multer from "multer";

// Set storage configuration to store files in memory (not on disk)
const storage = multer.memoryStorage();

// Export a single file upload handler using the 'file' field name in the form data
export const singleUpload = multer({ storage }).single("file");
