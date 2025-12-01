import React from 'react';
import { Briefcase, Search, Users } from 'lucide-react';

interface RoleCardProps {
  icon: React.ElementType;
  title: string;
  roleName: string; // Added to match "Role:" line in User Flow
  desc: string;
  onClick: () => void;
}

const RoleCard = ({ icon: Icon, title, roleName, desc, onClick }: RoleCardProps) => (
  <button 
    onClick={onClick}
    className="group relative flex flex-col items-start p-6 w-full text-left transition-all duration-200
      bg-white rounded-xl shadow-sm 
      border-t border-white/60 border-b border-slate-200/60 border-x border-slate-100
      hover:shadow-md hover:-translate-y-[1px] hover:border-blue-200"
  >
    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
      <Icon className="w-6 h-6 text-slate-900 group-hover:text-blue-600" />
    </div>
    
    <div className="mt-5">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">
          {roleName}
        </span>
      </div>
    </div>
    
    <p className="mt-3 text-sm text-slate-500 leading-relaxed font-medium">
      {desc}
    </p>
  </button>
);

export const RoleSelection = ({ onSelect }: { onSelect: (role: string) => void }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            How do you want to use Bridge?
          </h1>
          <p className="mt-3 text-slate-500 text-lg">
            Select your operating mode to configure your workspace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card A: Strict User Flow Copy */}
          <RoleCard 
            icon={Briefcase}
            title="I want to solve problems"
            roleName="Startup (Solver)"
            desc="Fast-track diligence, skip the forms, and win enterprise pilots."
            onClick={() => onSelect('solver')}
          />
          
          {/* Card B: Strict User Flow Copy */}
          <RoleCard 
            icon={Search}
            title="I want to find solutions"
            roleName="Enterprise (Seeker)"
            desc="Post challenges, benchmark against peers, and find verified vendors."
            onClick={() => onSelect('seeker')}
          />
          
          {/* Card C: Strict User Flow Copy */}
          <RoleCard 
            icon={Users}
            title="I want to refer startups"
            roleName="Scout (Connector)"
            desc="Monetize your network by referring high-quality founders to pilots."
            onClick={() => onSelect('connector')}
          />
        </div>
      </div>
    </div>
  );
};
