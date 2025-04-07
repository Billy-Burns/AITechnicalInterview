import React, { useState } from "react";
import axios from "axios";
import "./ResumeForm.css";

function ResumeForm({ onQuestionsUpdate }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Both fields are required!");
      return;
    }

    try {
      const payload = {
        resume_text: resumeText,
        job_description: jobDescription,
      };
      console.log("Payload being sent to backend:", payload);

      const response = await axios.post("http://127.0.0.1:5000/api/interview", payload);

      // Debug: Log the full response from the backend
      console.log("Full response from backend:", response);

      if (response.status === 402) {
        alert("Insufficient balance in the DeepSeek account. Please contact the administrator.");
        return;
      }

      if (response.data.questions) {
        onQuestionsUpdate(response.data.questions);
      } else {
        alert("No questions were generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("An error occurred while generating questions. Please try again later.");
      onQuestionsUpdate([]);
    } finally {
      setLoading(false); // Reset the loading state
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
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </form>
  );
}

export default ResumeForm;