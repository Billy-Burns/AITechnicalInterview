import React, { useState } from "react";
import axios from "axios";
import "./QuestionsDisplay.css";

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
    <div className="questions-display">
      <h2>Mock Interview</h2>
      {!interviewComplete ? (
        currentQuestionIndex < questions.length ? (
          <div>
            <p><strong>Question {currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex]}</p>
            <form onSubmit={handleResponseSubmit}>
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Type your response here..."
                rows="4"
                required
                disabled={loading || showNextButton}
              />
              <button type="submit" disabled={loading || showNextButton}>
                {loading ? "Submitting..." : "Submit Response"}
              </button>
            </form>
            {evaluation && (
              <div className="evaluation">
                <h3>Evaluation</h3>
                <p>{evaluation}</p>
              </div>
            )}
            {showNextButton && (
              <button className="next-button" onClick={handleNextQuestion}>
                Next Question
              </button>
            )}
          </div>
        ) : null
      ) : (
        <div>
          <h3>Interview Complete!</h3>
          <p>Thank you for completing the mock interview. Here are your responses and evaluations:</p>
          <ul>
            {responses.map((item, index) => (
              <li key={index}>
                <strong>Q:</strong> {item.question}
                <br />
                <strong>A:</strong> {item.response}
                <br />
                <strong>Evaluation:</strong> {item.evaluation}
              </li>
            ))}
          </ul>
          <p><strong>The interview has concluded. Great job!</strong></p>
        </div>
      )}
    </div>
  );
}

export default QuestionsDisplay;