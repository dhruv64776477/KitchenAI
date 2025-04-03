import React, { useState } from "react";
import axios from "axios";

const ReceiptUploader = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setUploadStatus("Please select an image.");
      return;
    }
    
    const formData = new FormData();
    formData.append("receipt", image);

    try {
      setIsLoading(true);
      setUploadStatus("Uploading...");
      
      const response = await axios.post("/extract-text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setUploadStatus(`Upload successful: ${response.data.message}`);
      
      // Wait a moment to show success message before closing
      setTimeout(() => {
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      }, 1500);
      
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle close button click
  const handleClose = () => {
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Upload Receipt
        </h2>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
            disabled={isLoading}
          />
        </div>
        
        {preview && (
          <div className="w-full h-64 border rounded-md shadow-sm flex items-center justify-center overflow-hidden bg-gray-100 mb-4">
            <img
              src={preview}
              alt="Receipt Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        
        <button
          className={`w-full px-4 py-2 font-semibold rounded-md shadow-sm focus:outline-none ${
            isLoading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Upload"}
        </button>
      </form>
      
      {uploadStatus && (
        <p
          className={`mt-4 text-center text-sm ${
            uploadStatus.includes("failed")
              ? "text-red-500"
              : uploadStatus.includes("Uploading")
                ? "text-blue-500"
                : "text-green-500"
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default ReceiptUploader;