import React, { useState } from "react";
import axios from "axios";

function QuestionsDisplay({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [userResponse, setUserResponse] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentQuestion = questions[currentQuestionIndex];

    try {
      // Send the user's response to the backend for evaluation
      const response = await axios.post("http://127.0.0.1:5000/api/evaluate_response", {
        question: currentQuestion,
        response: userResponse,
      });

      // Save the user's response and evaluation
      const evaluationData = response.data.evaluation;
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          question: currentQuestion,
          response: userResponse,
          evaluation: evaluationData,
        },
      ]);

      // Clear the input box and set the evaluation
      setUserResponse("");
      setEvaluation(evaluationData);
      setShowNextButton(true); // Show the "Next" button
    } catch (error) {
      console.error("Error evaluating response:", error);
      alert("An error occurred while evaluating your response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setEvaluation(null); // Clear the evaluation
    setShowNextButton(false); // Hide the "Next" button
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      setInterviewComplete(true); // Mark the interview as complete
    }
  };

  return (
    <div className="card">
      <div className="border-b border-dark-border p-6">
        <h2 className="rainbow-text text-2xl font-semibold">Mock Interview</h2>
      </div>
      <div className="p-6">
        {!interviewComplete ? (
          currentQuestionIndex < questions.length ? (
            <div className="space-y-6">
              <div className="bg-dark-surface/50 p-4 rounded-lg border border-dark-border">
                <p className="text-text-primary">
                  <span className="rainbow-text font-medium">Question {currentQuestionIndex + 1}:</span>{" "}
                  {questions[currentQuestionIndex]}
                </p>
              </div>
              <form onSubmit={handleResponseSubmit} className="space-y-4">
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your response here..."
                  rows="4"
                  required
                  disabled={loading || showNextButton}
                  className="input w-full"
                />
                <button
                  type="submit"
                  disabled={loading || showNextButton}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Response"
                  )}
                </button>
              </form>
              {evaluation && (
                <div className="bg-dark-surface/50 p-4 rounded-lg border border-dark-border">
                  <h3 className="rainbow-text text-lg font-medium mb-2">Evaluation</h3>
                  <p className="text-text-secondary">{evaluation}</p>
                </div>
              )}
              {showNextButton && (
                <button
                  onClick={handleNextQuestion}
                  className="btn btn-primary w-full"
                >
                  Next Question
                </button>
              )}
            </div>
          ) : null
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="rainbow-text text-2xl font-semibold mb-4">Interview Complete!</h3>
              <p className="text-text-secondary">
                Thank you for completing the mock interview. Here are your responses and evaluations:
              </p>
            </div>
            <div className="space-y-6">
              {responses.map((item, index) => (
                <div key={index} className="bg-dark-surface/50 p-4 rounded-lg border border-dark-border">
                  <p className="text-text-primary mb-2">
                    <span className="rainbow-text font-medium">Q:</span> {item.question}
                  </p>
                  <p className="text-text-secondary mb-2">
                    <span className="rainbow-text font-medium">A:</span> {item.response}
                  </p>
                  <div className="mt-2">
                    <p className="rainbow-text font-medium mb-1">Evaluation:</p>
                    <p className="text-text-secondary">{item.evaluation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionsDisplay;