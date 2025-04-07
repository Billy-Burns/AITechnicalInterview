import React from "react";
import "./QuestionsDisplay.css";

function QuestionsDisplay({ questions }) {
  return (
    <div className="questions-display">
      <h2>Generated Interview Questions</h2>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      ) : (
        <p>No questions generated yet. Submit your resume and job description to get started.</p>
      )}
    </div>
  );
}

export default QuestionsDisplay;