import React from 'react';

const DesignSystemTest = () => {
  return (
    <div className="p-10 bg-surface min-h-screen flex items-center justify-center">
      <div className="bg-surface-raised shadow-levitated rounded-lg p-8 w-full max-w-md font-sans">
        <h1 className="text-2xl font-bold text-primary mb-6">Machined Neumorphism Style Guide</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary/80 mb-2">Data Readout (Mono)</h2>
            <p className="font-mono text-primary bg-surface p-3 rounded-md">BUDGET: $50,000</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary/80 mb-2">Primary Action Button</h2>
            <button className="bg-action text-white font-bold py-2 px-6 rounded-lg shadow-mechanical transform hover:-translate-y-0.5 transition-transform duration-150">
              Execute Task
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary/80 mb-2">Concave Input</h2>
            <input 
              type="text" 
              placeholder="Enter value..."
              className="w-full p-3 rounded-lg shadow-concave bg-surface border-transparent focus:ring-2 focus:ring-action focus:outline-none"
            />
          </div>
          
          <div className="flex space-x-4">
             <div className="flex-1">
                <h2 className="text-lg font-semibold text-primary/80 mb-2">Success</h2>
                 <div className="bg-success text-white text-sm font-bold px-3 py-1 rounded-full inline-block">Accepted</div>
            </div>
             <div className="flex-1">
                <h2 className="text-lg font-semibold text-primary/80 mb-2">Warning</h2>
                 <div className="bg-warning text-white text-sm font-bold px-3 py-1 rounded-full inline-block">Pending</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DesignSystemTest;
