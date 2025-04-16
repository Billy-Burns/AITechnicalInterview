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
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fas fa-robot me-2"></i>CogniPrep
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
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

      {/* Footer */}
      <footer>
        <p>
          &copy; {new Date().getFullYear()} CogniPrep. All rights reserved. | 
          <a href="#privacy"> Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
