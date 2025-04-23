import os
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# Configure CORS to allow requests from the frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False,
        "max_age": 3600
    }
})

# Load the API key from an environment variable
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
if not DEEPSEEK_API_KEY:
    logger.error("DEEPSEEK_API_KEY not found in environment variables")
    raise ValueError("DEEPSEEK_API_KEY environment variable is required")

logger.info("Initializing OpenAI client with DeepSeek configuration")
# Initialize the OpenAI client with DeepSeek's base URL
client = OpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com/v1"
)

# Function to generate questions
def generate_questions(prompt_text):
    try:
        logger.info("Starting question generation")
        logger.debug("Generating questions with prompt: %s", prompt_text[:100] + "...")
        
        refined_prompt = (
            f"You are an AI that conducts mock interviews. Based on the following resume and job description, "
            f"generate exactly 5 interview questions, one at a time, with a mix of technical and behavioral questions. "
            f"Each question should be concise and focused. Do not include introductory text or summaries.\n\n"
            f"Resume and Job Description:\n{prompt_text}\n"
        )

        logger.debug("Making API request to DeepSeek")
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are an AI that generates mock interview questions."},
                {"role": "user", "content": refined_prompt}
            ],
            stream=False
        )
        logger.debug("Received response from DeepSeek: %s", response)

        # Split questions into a list and clean up formatting
        raw_questions = response.choices[0].message.content.split("\n")
        cleaned_questions = [
            line.strip("- ").strip("**").strip("#").strip()
            for line in raw_questions if line.strip()
        ]

        # Limit to exactly 5 questions
        questions = cleaned_questions[:5]
        logger.info("Successfully generated %d questions", len(questions))
        logger.debug("Generated questions: %s", questions)
        return questions
    except Exception as e:
        logger.error("Error calling DeepSeek API: %s", str(e))
        logger.error("Traceback: %s", traceback.format_exc())
        return None

# Endpoint to generate interview questions
@app.route('/api/interview', methods=['POST', 'OPTIONS'])
def interview():
    try:
        logger.info("Received request at /api/interview")
        logger.info("Request method: %s", request.method)
        logger.info("Request headers: %s", dict(request.headers))
        
        if request.method == 'OPTIONS':
            logger.info("Handling OPTIONS request")
            return '', 200
            
        data = request.json
        logger.info("Request data received: %s", data)
        
        resume_text = data.get("resume_text", "")
        job_description = data.get("job_description", "")

        if not resume_text or not job_description:
            logger.error("Missing required fields: resume_text or job_description")
            return jsonify({"error": "Both resume_text and job_description are required"}), 400

        # Generate questions using DeepSeek API
        prompt_text = f"Resume:\n{resume_text}\n\nJob Description:\n{job_description}"
        questions = generate_questions(prompt_text)
        
        if questions is None:
            logger.error("Failed to generate questions")
            return jsonify({"error": "Failed to generate questions"}), 500
            
        logger.info("Successfully processed interview request")
        return jsonify({"questions": questions})
    except Exception as e:
        logger.error("Error in /api/interview: %s", str(e))
        logger.error("Traceback: %s", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# Function to evaluate user responses
@app.route('/api/evaluate_response', methods=['POST'])
def evaluate_response():
    try:
        logger.info("Received evaluation request")
        data = request.json
        logger.debug("Request data: %s", data)
        
        question = data.get("question", "")
        user_response = data.get("response", "")

        if not question or not user_response:
            logger.error("Missing required fields: question or response")
            return jsonify({"error": "Both question and response are required"}), 400

        # Prompt the AI to evaluate the user's response
        evaluation_prompt = (
            f"You are an AI that evaluates responses to interview questions. "
            f"Here is the interview question:\n\n"
            f"Question: {question}\n\n"
            f"Here is the user's response:\n\n"
            f"Response: {user_response}\n\n"
            f"Please provide the following:\n"
            f"1. A grade for the response (on a scale of 1 to 10).\n"
            f"2. A brief explanation of why this grade was given.\n"
            f"3. Suggestions for improvement.\n"
        )

        logger.debug("Making API request to DeepSeek for evaluation")
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are an AI that evaluates interview responses."},
                {"role": "user", "content": evaluation_prompt}
            ],
            stream=False
        )

        # Parse the AI's response
        evaluation = response.choices[0].message.content.strip()
        logger.info("Successfully generated evaluation")
        logger.debug("Generated evaluation: %s", evaluation)
        return jsonify({"evaluation": evaluation})
    except Exception as e:
        logger.error("Error evaluating response: %s", str(e))
        logger.error("Traceback: %s", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    logger.info("Starting Flask application")
    app.run(debug=True)