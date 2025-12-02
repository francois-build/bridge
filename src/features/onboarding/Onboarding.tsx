import React, { useState } from 'react';

const Onboarding = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { 
      name: 'Seeker', 
      description: 'Post challenges and find the best talent to solve them.', 
      icon: '' // Add icon later
    },
    { 
      name: 'Solver', 
      description: 'Solve challenges, showcase your skills, and earn rewards.', 
      icon: '' // Add icon later
    },
    { 
      name: 'Connector', 
      description: 'Connect seekers with solvers and earn a commission.', 
      icon: '' // Add icon later
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface text-primary p-4">
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Bounty Solutions</h1>
        <p className="text-lg md:text-xl mb-8 text-primary-muted">The platform where your skills can solve real-world problems and earn you rewards.</p>
        <button className="bg-action text-white px-8 py-3 rounded-full shadow-levitated hover:shadow-mechanical transition-shadow text-lg font-semibold">
          Sign in with Google
        </button>
      </div>
      
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Choose Your Role</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.name}
              className={`bg-surface-raised p-6 rounded-lg shadow-mechanical cursor-pointer transition-all ${selectedRole === role.name ? 'shadow-levitated border-2 border-action' : ''}`}
              onClick={() => setSelectedRole(role.name)}
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{role.name}</h3>
              <p className="text-primary-muted">{role.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button 
            className="mt-8 bg-action text-white px-8 py-3 rounded-full shadow-levitated hover:shadow-mechanical transition-shadow text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!selectedRole}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
