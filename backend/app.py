import os
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the API key from an environment variable
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

# Initialize the OpenAI client with DeepSeek's base URL
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

# Function to generate questions
def generate_questions(prompt_text):
    try:
        refined_prompt = (
            f"You are an AI that conducts mock interviews. Based on the following resume and job description, "
            f"generate exactly 5 interview questions, one at a time, with a mix of technical and behavioral questions. "
            f"Each question should be concise and focused. Do not include introductory text or summaries.\n\n"
            f"Resume and Job Description:\n{prompt_text}\n"
        )

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are an AI that generates mock interview questions."},
                {"role": "user", "content": refined_prompt}
            ],
            stream=False
        )

        # Split questions into a list and clean up formatting
        raw_questions = response.choices[0].message.content.split("\n")
        cleaned_questions = [
            line.strip("- ").strip("**").strip("#").strip()
            for line in raw_questions if line.strip()
        ]

        # Limit to exactly 5 questions
        return cleaned_questions[:5]
    except Exception as e:
        print(f"Error calling DeepSeek API: {e}")  # Log the error
        return None

# Function to evaluate user responses
@app.route('/api/evaluate_response', methods=['POST'])
def evaluate_response():
    data = request.json
    question = data.get("question", "")
    user_response = data.get("response", "")

    if not question or not user_response:
        return jsonify({"error": "Both question and response are required"}), 400

    try:
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
        return jsonify({"evaluation": evaluation})
    except Exception as e:
        print(f"Error evaluating response: {e}")
        return jsonify({"error": "Failed to evaluate response"}), 500

# Endpoint to generate interview questions
@app.route('/api/interview', methods=['POST'])
def interview():
    data = request.json
    resume_text = data.get("resume_text", "")
    job_description = data.get("job_description", "")

    print(f"Received resume_text: {resume_text}")  # Debug log
    print(f"Received job_description: {job_description}")  # Debug log

    if not resume_text or not job_description:
        return jsonify({"error": "Both resume_text and job_description are required"}), 400

    try:
        # Generate questions using DeepSeek API
        prompt_text = f"Resume:\n{resume_text}\n\nJob Description:\n{job_description}"
        questions = generate_questions(prompt_text)
        if questions is None:
            raise Exception("Failed to generate questions")
        return jsonify({"questions": questions})
    except Exception as e:
        print(f"Error in /api/interview: {e}")  # Log the error
        return jsonify({"error": "Failed to generate questions"}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)