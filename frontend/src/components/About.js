import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="rainbow-text text-4xl sm:text-5xl font-bold mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Empowering tech job seekers with AI-powered interview preparation while maintaining the highest ethical standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h2 className="rainbow-text text-2xl font-semibold mb-4">Ethical AI</h2>
            <p className="text-text-secondary mb-4">
              We believe in responsible AI development and usage. Our platform is built on three core ethical principles:
            </p>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="rainbow-text mr-2">✓</span>
                <span>Transparency in how our AI generates and evaluates responses</span>
              </li>
              <li className="flex items-start">
                <span className="rainbow-text mr-2">✓</span>
                <span>Fairness in question generation and evaluation</span>
              </li>
              <li className="flex items-start">
                <span className="rainbow-text mr-2">✓</span>
                <span>Privacy-first approach to user data</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="rainbow-text text-2xl font-semibold mb-4">Helping Job Seekers</h2>
            <p className="text-text-secondary mb-4">
              We're committed to making tech interviews more accessible and less stressful:
            </p>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="rainbow-text mr-2">✓</span>
                <span>Personalized interview preparation based on your experience</span>
              </li>
              <li className="flex items-start">
                <span className="rainbow-text mr-2">✓</span>
                <span>Real-time feedback to improve your responses</span>
              </li>
              <li className="flex items-start">
                <span className="rainbow-text mr-2">✓</span>
                <span>Practice at your own pace, anytime, anywhere</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h2 className="rainbow-text text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-text-secondary mb-6">
            At CogniPrep, we're not just building a tool - we're creating a platform that helps bridge the gap between talented individuals and their dream tech careers. We understand the challenges of tech interviews and are dedicated to making the process more transparent and accessible.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-dark-surface/50 p-6 rounded-lg border border-dark-border">
              <h3 className="rainbow-text text-xl font-semibold mb-3">Inclusive</h3>
              <p className="text-text-secondary">Designed for all experience levels and backgrounds</p>
            </div>
            <div className="bg-dark-surface/50 p-6 rounded-lg border border-dark-border">
              <h3 className="rainbow-text text-xl font-semibold mb-3">Empowering</h3>
              <p className="text-text-secondary">Giving you the tools to succeed in your interviews</p>
            </div>
            <div className="bg-dark-surface/50 p-6 rounded-lg border border-dark-border">
              <h3 className="rainbow-text text-xl font-semibold mb-3">Innovative</h3>
              <p className="text-text-secondary">Using cutting-edge AI to enhance your preparation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 