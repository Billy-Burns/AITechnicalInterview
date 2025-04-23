import React from 'react';

function Features() {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="rainbow-text text-4xl sm:text-5xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Powered by advanced AI technology, CogniPrep transforms your interview preparation experience.
          </p>
        </div>

        <div className="card mb-16">
          <h2 className="rainbow-text text-2xl font-semibold mb-6">Our Technology</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="rainbow-text text-xl font-semibold">AI-Powered Question Generation</h3>
              <p className="text-text-secondary">
                Our system uses state-of-the-art language models to analyze your resume and the job description, generating relevant and challenging interview questions.
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start">
                  <span className="rainbow-text mr-2">•</span>
                  <span>Contextual understanding of your experience</span>
                </li>
                <li className="flex items-start">
                  <span className="rainbow-text mr-2">•</span>
                  <span>Industry-specific question patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="rainbow-text mr-2">•</span>
                  <span>Progressive difficulty scaling</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="rainbow-text text-xl font-semibold">Smart Response Evaluation</h3>
              <p className="text-text-secondary">
                Advanced AI algorithms provide detailed feedback on your responses, helping you improve your interview skills.
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start">
                  <span className="rainbow-text mr-2">•</span>
                  <span>Comprehensive response analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="rainbow-text mr-2">•</span>
                  <span>Constructive feedback and suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="rainbow-text mr-2">•</span>
                  <span>Performance tracking and improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card">
            <h3 className="rainbow-text text-xl font-semibold mb-4">Personalized Experience</h3>
            <p className="text-text-secondary">
              Questions and feedback tailored to your specific background and the job you're applying for.
            </p>
          </div>
          <div className="card">
            <h3 className="rainbow-text text-xl font-semibold mb-4">Real-Time Feedback</h3>
            <p className="text-text-secondary">
              Immediate evaluation of your responses with actionable insights for improvement.
            </p>
          </div>
          <div className="card">
            <h3 className="rainbow-text text-xl font-semibold mb-4">Progress Tracking</h3>
            <p className="text-text-secondary">
              Monitor your improvement over time with detailed performance metrics.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="rainbow-text text-2xl font-semibold mb-6">Technical Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="rainbow-text text-xl font-semibold mb-4">Frontend</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>React.js for the user interface</li>
                <li>Tailwind CSS for styling</li>
                <li>Modern web APIs for real-time interactions</li>
              </ul>
            </div>
            <div>
              <h3 className="rainbow-text text-xl font-semibold mb-4">Backend</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>Python Flask server</li>
                <li>Advanced language models for AI processing</li>
                <li>Secure API endpoints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features; 