import React, { useState } from "react";
import axios from "axios";

function ResumeForm({ onQuestionsGenerated }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    
    setLoading(true);
    setError("");

    try {
      const payload = {
        resume_text: resumeText,
        job_description: jobDescription,
      };

      console.log("Sending request to backend with payload:", payload); // Debug log
      const response = await axios.post("http://127.0.0.1:5000/api/interview", payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000, // 30 second timeout
        withCredentials: false,
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Accept all status codes less than 500
        }
      });
      console.log("Received response:", response); // Debug log
      
      if (response.data && response.data.questions) {
        onQuestionsGenerated(response.data.questions);
      } else if (response.data && response.data.error) {
        setError(response.data.error);
      } else {
        setError("No questions were generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setError(error.response.data.error || "An error occurred while generating questions. Please try again later.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request details:", error.request);
        console.error("Request URL:", error.config?.url);
        console.error("Request method:", error.config?.method);
        console.error("Request headers:", error.config?.headers);
        setError("Could not connect to the server. Please make sure the backend server is running on http://127.0.0.1:5000 and try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-dark-surface to-dark-bg py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgxMjAwdjYwMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMTIwMHY2MDBIMHoiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQpIi8+PC9zdmc+')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="rainbow-text text-4xl sm:text-5xl font-bold mb-6">
            AI Interview Question Generator
          </h1>
          <p className="text-xl text-text-secondary">
            Paste your resume and job description below to generate tailored interview questions.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="card">
          <div className="border-b border-dark-border p-6">
            <h3 className="rainbow-text text-2xl font-semibold">Generate Your Questions</h3>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="resumeText" className="rainbow-text block text-sm font-medium mb-2">
                  Resume Text
                </label>
                <textarea
                  id="resumeText"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="input w-full"
                  placeholder="Paste your resume here"
                  rows="6"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="jobDescription" className="rainbow-text block text-sm font-medium mb-2">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="input w-full"
                  placeholder="Enter the job description"
                  rows="6"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`btn w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Questions...
                    </div>
                  ) : (
                    "Generate Questions"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;