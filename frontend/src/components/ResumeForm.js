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
      const payload = {
        resume_text: resumeText,
        job_description: jobDescription,
      };

      const response = await axios.post("http://127.0.0.1:5000/api/interview", payload);
      onQuestionsUpdate(response.data.questions || []);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("An error occurred while generating questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-center text-white py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">AI Interview Question Generator</h1>
          <p className="lead">
            Paste your resume and job description below to generate tailored interview questions.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Generate Your Questions</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="resumeText" className="form-label fw-bold">
                      Resume Text:
                    </label>
                    <textarea
                      id="resumeText"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="form-control"
                      placeholder="Paste your resume here"
                      rows="6"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="jobDescription" className="form-label fw-bold">
                      Job Description:
                    </label>
                    <textarea
                      id="jobDescription"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="form-control"
                      placeholder="Enter the job description"
                      rows="6"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Generating Questions...
                        </>
                      ) : (
                        "Generate Questions"
                      )}
                    </button>
                  </div>
                </form>
                {loading && (
                  <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">This may take a minute. Please wait...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;