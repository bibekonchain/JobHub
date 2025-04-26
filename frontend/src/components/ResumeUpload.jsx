import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";

// Import the demo CV image
import demoCv from "../assets/cv.png";

const ResumeUpload = () => {
  const [resume, setResume] = useState(null); // State for selected file
  const [uploadStatus, setUploadStatus] = useState(""); // State for upload status
  const [isUploading, setIsUploading] = useState(false); // State for loading indicator
  const [preview, setPreview] = useState(""); // State for resume preview

  // Handle resume selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setResume(selectedFile);
      setUploadStatus(""); // Clear any previous messages
      setPreview(URL.createObjectURL(selectedFile)); // Create a preview URL
    }
  };

  // Handle resume upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resume) {
      setUploadStatus("Please select a resume to upload.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("resume", resume); // Append file to form data

    try {
      setIsUploading(true); // Start loading indicator
      const response = await axios.post(
        "https://jobhub-backend-3t1f.onrender.com/api/upload/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsUploading(false); // Stop loading indicator
      setUploadStatus("Resume uploaded successfully!"); // Success message
      console.log("Upload Response:", response.data); // Log the response if needed
    } catch (error) {
      setIsUploading(false); // Stop loading indicator
      setUploadStatus("Failed to upload resume. Please try again."); // Error message
      console.error(
        "Upload Error:",
        error.response ? error.response.data : error.message
      ); // Log error details
    }
  };

  // Cleanup the object URL when the component unmounts or when a new file is selected
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview); // Release memory for the object URL
      }
    };
  }, [preview]);

  return (
    <div>
      <Navbar />
      {/* Flex container to display demo CV and upload form side by side */}
      <div className="flex flex-col md:flex-row justify-start items-start min-h-screen bg-gray-100 space-y-6 md:space-y-0 md:space-x-6 p-4">
        {/* Demo CV Section */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="text-[#6A38C2]">Demo CV </span> Format:
          </h1>

          <img
            src={demoCv}
            alt="Demo CV"
            className="w-full h-auto border border-gray-300"
          />
        </div>

        {/* Resume Upload Section */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="text-[#6A38C2]">Upload Your </span> Resume
          </h1>

          <form onSubmit={handleUpload} className="space-y-4 w-full">
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4 file:rounded-full 
                file:border-0 file:text-sm file:font-semibold 
                file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
              />
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-2 px-4 text-white bg-indigo-600 rounded-lg 
              hover:bg-indigo-500 focus:outline-none $ {
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
          {uploadStatus && (
            <p
              className={`mt-4 text-center $ {
                uploadStatus.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {uploadStatus}
            </p>
          )}
          {preview && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Resume Preview:</h3>
              <iframe
                src={preview}
                title="Resume Preview"
                className="w-full h-96 border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
