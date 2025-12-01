import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleSelection } from '../features/onboarding/RoleSelection';
// Use Default Imports to match the lazy loading fixes we made
import ChallengeFeed from '../features/marketplace/ChallengeFeed';
import ChallengeDetail from '../features/marketplace/ChallengeDetail';

export default function App() {
  const [role, setRole] = useState<string | null>(null);

  // 1. The Gatekeeper: Force Role Selection first
  if (!role) {
    return <RoleSelection onSelect={setRole} />;
  }

  // 2. The Application Shell (Only renders after Role is selected)
  return (
    <div className="min-h-screen bg-slate-50">
      <BrowserRouter>
        <nav className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between sticky top-0 z-50">
          <span className="font-bold text-xl text-slate-900 tracking-tight">BRIDGE</span>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-slate-500 capitalize px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
              {role} Workspace
            </span>
            <button 
              onClick={() => setRole(null)} 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Switch Role
            </button>
          </div>
        </nav>
        
        <main className="animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<ChallengeFeed />} />
            <Route path="/challenge/:id" element={<ChallengeDetail />} />
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}