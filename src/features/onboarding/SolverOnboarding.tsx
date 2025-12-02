import React, { useState } from 'react';

const SolverOnboarding = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-surface-raised rounded-lg shadow-levitated p-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Solver Profile Setup</h2>
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Step 1: Basic Information</h3>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action" />
                <input type="text" placeholder="Headline (e.g., Senior Software Engineer)" className="w-full px-4 py-3 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action" />
                <textarea placeholder="Short Bio" className="w-full px-4 py-3 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action"></textarea>
              </div>
              <button onClick={nextStep} className="w-full bg-action text-white mt-8 px-4 py-3 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Next</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Step 2: Skills & Experience</h3>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Skills (comma-separated)" className="w-full px-4 py-3 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action" />
                <input type="text" placeholder="Portfolio/GitHub URL" className="w-full px-4 py-3 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action" />
                <input type="text" placeholder="LinkedIn Profile URL" className="w-full px-4 py-3 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action" />
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="w-1/3 bg-surface-raised text-primary px-4 py-3 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Back</button>
                <button onClick={nextStep} className="w-1/3 bg-action text-white px-4 py-3 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Next</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Step 3: Confirmation</h3>
              <p className="text-primary-muted mb-8 text-center">You are all set! Review your information and start solving challenges.</p>
              <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="w-1/3 bg-surface-raised text-primary px-4 py-3 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Back</button>
                <button className="w-1/3 bg-action text-white px-4 py-3 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Complete Profile</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolverOnboarding;
