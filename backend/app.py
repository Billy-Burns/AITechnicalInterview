import os
from openai import OpenAI
from flask import Flask, jsonify

app = Flask(__name__)

# Load the API key from an environment variable
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

# Initialize the OpenAI client with DeepSeek's base URL
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

def generate_questions(resume_text):
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are an AI that generates interview questions based on resumes."},
                {"role": "user", "content": f"Here is the resume: {resume_text}"}
            ],
            stream=False
        )
        # Extract the generated questions from the response
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling DeepSeek API: {e}")
        return None