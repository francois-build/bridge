import { useState } from 'react';
import { RoleSelection } from '../features/onboarding/RoleSelection';
import ChallengeFeed from '../features/marketplace/ChallengeFeed';

export default function App() {
  const [role, setRole] = useState<string | null>(null);

  if (!role) {
    return <RoleSelection onSelect={setRole} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Basic Nav Shell */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
        <span className="font-bold text-xl text-slate-900 tracking-tight">BRIDGE</span>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-slate-500 capitalize">Role: {role}</span>
          <button onClick={() => setRole(null)} className="text-sm text-blue-600">Switch</button>
        </div>
      </nav>
      
      <main>
        {role === 'seeker' || role === 'solver' ? (
          <ChallengeFeed />
        ) : (
          <div className="p-12 text-center text-slate-500">Scout Dashboard Coming Soon</div>
        )}
      </main>
    </div>
  );
}