import React from 'react';
import { Briefcase, Code, Share2 } from 'lucide-react';

const roles = [
  { name: 'Seeker', description: 'Post challenges, find talent.', icon: <Briefcase className="w-8 h-8 mx-auto mb-4 text-slate-500 group-hover:text-blue-600 transition-colors" /> },
  { name: 'Solver', description: 'Solve challenges, earn bounties.', icon: <Code className="w-8 h-8 mx-auto mb-4 text-slate-500 group-hover:text-blue-600 transition-colors" /> },
  { name: 'Connector', description: 'Broker deals, earn commissions.', icon: <Share2 className="w-8 h-8 mx-auto mb-4 text-slate-500 group-hover:text-blue-600 transition-colors" /> },
];

export const RoleSelection = ({ onSelect }: { onSelect: (role: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Welcome to BRIDGE</h1>
        <p className="text-lg text-slate-500 mt-3">The open marketplace for technical challenges.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-700 w-full max-w-4xl">
        {roles.map((role) => (
          <button
            key={role.name}
            onClick={() => onSelect(role.name.toLowerCase())}
            className="group text-center p-8 bg-white rounded-2xl transition-all duration-300 
                       border-t border-white border-b-2 border-slate-100 
                       hover:-translate-y-2 hover:shadow-levitated hover:border-blue-100
                       focus:outline-none focus:ring-4 focus:ring-blue-600/20"
          >
            {role.icon}
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{role.name}</h3>
            <p className="text-slate-500 text-sm">{role.description}</p>
          </button>
        ))}
      </div>

      <footer className="absolute bottom-8 text-sm text-slate-400">
        Select a role to enter your workspace.
      </footer>
    </div>
  );
};