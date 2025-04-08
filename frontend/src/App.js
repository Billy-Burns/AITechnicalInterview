import React, { useState } from "react";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import QuestionsDisplay from "./components/QuestionsDisplay";

function App() {
  const [questions, setQuestions] = useState([]);

  const handleQuestionsUpdate = (newQuestions) => {
    setQuestions(newQuestions);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fas fa-robot me-2"></i>AI Hiring Manager
          </a>
        </div>
      </nav>

      <main>
        {/* Resume Form */}
        <ResumeForm onQuestionsUpdate={handleQuestionsUpdate} />

        {/* Questions Display */}
        {questions.length > 0 && (
          <div className="container mt-5">
            <QuestionsDisplay questions={questions} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
