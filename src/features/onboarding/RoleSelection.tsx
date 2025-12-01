import React from 'react';
import { Briefcase, Code, Share2 } from 'lucide-react';

const roles = [
  { name: 'Seeker', description: 'Post challenges, find talent.', icon: <Briefcase className="w-8 h-8 mx-auto mb-4 text-blue-500" /> },
  { name: 'Solver', description: 'Solve challenges, earn bounties.', icon: <Code className="w-8 h-8 mx-auto mb-4 text-emerald-500" /> },
  { name: 'Connector', description: 'Broker deals, earn commissions.', icon: <Share2 className="w-8 h-8 mx-auto mb-4 text-amber-500" /> },
];

export const RoleSelection = ({ onSelect }: { onSelect: (role: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Welcome to BRIDGE</h1>
        <p className="text-lg text-slate-600 mt-2">The open marketplace for technical challenges.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700">
        {roles.map((role) => (
          <button
            key={role.name}
            onClick={() => onSelect(role.name.toLowerCase())}
            className="p-8 bg-white rounded-xl shadow-lg border border-slate-200 
                       hover:shadow-xl hover:-translate-y-1 transition-all
                       focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {role.icon}
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{role.name}</h3>
            <p className="text-slate-500">{role.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};