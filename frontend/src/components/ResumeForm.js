import React, { useState } from "react";
import axios from "axios";
import "./ResumeForm.css";

function ResumeForm({ onQuestionsUpdate }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/interview", {
        resume_text: resumeText,
        job_description: jobDescription,
      });

      onQuestionsUpdate(response.data.questions || []);
    } catch (error) {
      console.error("Error generating questions:", error);
      onQuestionsUpdate([]);
    } finally {
      setLoading(false);
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