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
      <header className="App-header">
        <h1>AI Interview Question Generator</h1>
        <p>Paste your resume and job description below to generate interview questions.</p>
      </header>
      <main>
        <ResumeForm onQuestionsUpdate={handleQuestionsUpdate} />
        <QuestionsDisplay questions={questions} />
      </main>
      <footer>
        <p>Powered by AI | © 2023</p>
      </footer>
    </div>
  );
}

export default App;
