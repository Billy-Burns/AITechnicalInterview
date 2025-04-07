import os
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the API key from an environment variable
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

# Initialize the OpenAI client with DeepSeek's base URL
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

def generate_questions(prompt_text):
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are an AI that generates interview questions based on resumes and job descriptions."},
                {"role": "user", "content": prompt_text}
            ],
            stream=False
        )
        # Split questions into a list and clean up formatting
        raw_questions = response.choices[0].message.content.split("\n")
        cleaned_questions = [line.strip("- ").strip("**").strip("#").strip() for line in raw_questions if line.strip()]
        return cleaned_questions
    except Exception as e:
        print(f"Error calling DeepSeek API: {e}")  # Log the error
        return None

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
        questions = generate_questions(f"{resume_text}\n\nJob Description: {job_description}")
        if isinstance(questions, dict) and "error" in questions:
            print(f"Error from DeepSeek API: {questions['error']}")  # Debug log
            return jsonify(questions), 402  # Return the specific error
        if questions is None:
            raise Exception("DeepSeek API returned no questions")
        print(f"Generated questions: {questions}")  # Debug log
        return jsonify({"questions": questions})
    except Exception as e:
        print(f"Error in /api/interview: {e}")  # Log the error
        return jsonify({"error": "Failed to generate questions"}), 500

if __name__ == '__main__':
    app.run(debug=True)