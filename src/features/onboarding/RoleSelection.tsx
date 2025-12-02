import { Briefcase, Code, Share2 } from 'lucide-react';

// Define the roles with their specific attributes
const roles = [
  { 
    name: 'Seeker', 
    description: 'Post challenges, find talent.', 
    icon: <Briefcase className="w-8 h-8 mx-auto mb-5 text-ink/50 group-hover:text-electric-blue transition-colors duration-300" /> 
  },
  { 
    name: 'Solver', 
    description: 'Solve challenges, earn bounties.', 
    icon: <Code className="w-8 h-8 mx-auto mb-5 text-ink/50 group-hover:text-electric-blue transition-colors duration-300" /> 
  },
  { 
    name: 'Connector', 
    description: 'Broker deals, earn commissions.', 
    icon: <Share2 className="w-8 h-8 mx-auto mb-5 text-ink/50 group-hover:text-electric-blue transition-colors duration-300" /> 
  },
];

export const RoleSelection = ({ onSelect }: { onSelect: (role: string) => void }) => {
  return (
    // Main container with the base surface and noise texture
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface bg-noise p-4">
      
      {/* Header section with updated typography */}
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-5xl font-bold text-ink tracking-tight">Welcome to BRIDGE</h1>
        <p className="text-lg text-ink/70 mt-3">The open marketplace for technical challenges.</p>
      </div>
      
      {/* Grid for the role selection cards */}
      <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-700 w-full max-w-4xl">
        {roles.map((role) => (
          <button
            key={role.name}
            onClick={() => onSelect(role.name.toLowerCase())}
            className="
              group text-center p-8 bg-ceramic rounded-2xl 
              shadow-concave 
              transition-all duration-300 
              border border-transparent
              hover:-translate-y-2 hover:shadow-levitated hover:border-electric-blue/30
              focus:outline-none focus:ring-4 focus:ring-glow
            "
          >
            {role.icon}
            <h3 className="text-xl font-semibold text-ink mb-1">{role.name}</h3>
            <p className="text-ink/60 text-sm">{role.description}</p>
          </button>
        ))}
      </div>

      {/* Footer with muted text color */}
      <footer className="absolute bottom-8 text-sm text-ink/40">
        Select a role to enter your workspace.
      </footer>
    </div>
  );
};