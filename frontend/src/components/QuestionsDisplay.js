import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./QuestionsDisplay.css";

function QuestionsDisplay({ questions }) {
  return (
    <div className="questions-display">
      <h2>Generated Interview Questions</h2>
      {questions.length > 0 ? (
        <ReactMarkdown plugins={[remarkGfm]}>
          {questions.join("\n")}
        </ReactMarkdown>
      ) : (
        <p>No questions generated yet. Submit your resume and job description to get started.</p>
      )}
    </div>
  );
}

export default QuestionsDisplay;