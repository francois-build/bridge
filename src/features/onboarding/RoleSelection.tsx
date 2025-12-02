import React from 'react';

interface RoleSelectionProps {
  onSelect: (role: 'solver' | 'seeker') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">What brings you to Bridge?</h2>
      <p className="mb-8">Select your role to get started.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onSelect('solver')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          I'm a Solver
        </button>
        <button
          onClick={() => onSelect('seeker')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          I'm a Seeker
        </button>
      </div>
    </div>
  );
};
