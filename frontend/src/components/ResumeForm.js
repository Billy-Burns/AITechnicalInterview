import React, { useState } from "react";
import axios from "axios";
import "./ResumeForm.css";

function ResumeForm({ onQuestionsUpdate }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const payload = {
        resume_text: resumeText,
        job_description: jobDescription,
      };

      // Send data to the backend
      const response = await axios.post("http://127.0.0.1:5000/api/interview", payload);

      // Update the questions in the parent component
      onQuestionsUpdate(response.data.questions || []);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("An error occurred while generating questions. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="resumeText">Resume Text:</label>
        <textarea
          id="resumeText"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here"
          rows="6"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter the job description"
          rows="6"
          required
        />
      </div>
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Generating Questions..." : "Generate Questions"}
      </button>
      {loading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Generating interview questions. This may take a minute...</p>
        </div>
      )}
    </form>
  );
}

export default ResumeForm;