import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import QuestionsDisplay from "./components/QuestionsDisplay";
import About from "./components/About";
import Features from "./components/Features";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionsGenerated = (generatedQuestions) => {
    console.log("Received questions:", generatedQuestions); // Debug log
    if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setEvaluations([]);
    } else {
      console.error("Invalid questions received:", generatedQuestions);
    }
  };

  const handleAnswerSubmit = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleEvaluationSubmit = (evaluation) => {
    setEvaluations([...evaluations, evaluation]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        {/* Navigation Bar */}
        <nav className="fixed w-full bg-dark-surface/80 backdrop-blur-sm border-b border-dark-border z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <i className="fas fa-robot text-primary text-xl"></i>
                  <span className="rainbow-text text-xl font-semibold">CogniPrep</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <Link
                    to="/"
                    className="rainbow-text hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/features"
                    className="rainbow-text hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    className="rainbow-text hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {questions.length === 0 ? (
                  <ResumeForm onQuestionsGenerated={handleQuestionsGenerated} />
                ) : (
                  <QuestionsDisplay
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    answers={answers}
                    evaluations={evaluations}
                    onAnswerSubmit={handleAnswerSubmit}
                    onEvaluationSubmit={handleEvaluationSubmit}
                    isLoading={isLoading}
                  />
                )}
              </div>
            }
          />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-text-secondary text-sm text-center">
            &copy; {new Date().getFullYear()} <span className="rainbow-text">CogniPrep</span>. All rights reserved. | 
            <a href="#privacy" className="rainbow-text hover:text-primary-dark ml-1">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
