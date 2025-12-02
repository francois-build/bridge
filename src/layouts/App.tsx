import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleSelection } from '../features/onboarding/RoleSelection';
import ChallengeFeed from '../features/marketplace/ChallengeFeed';
import ChallengeDetail from '../features/marketplace/ChallengeDetail';
import ChallengeBiddingForm from '../features/marketplace/ChallengeBiddingForm';

export default function App() {
  const [role, setRole] = useState<string | null>(null);

  // 1. Gatekeeper: Force role selection first
  if (!role) {
    return <RoleSelection onSelect={setRole} />;
  }

  // 2. Main Application Shell (post-role-selection)
  return (
    // Base layout with our core background styles
    <div className="min-h-screen bg-surface bg-noise">
      <BrowserRouter>
        {/* 
          A modern, semi-transparent sticky navigation bar.
          - backdrop-blur-lg: Creates the frosted glass effect.
          - bg-surface/80: A mostly opaque background that hints at content scrolling underneath.
          - shadow-levitated: A soft, subtle shadow to lift it off the page.
        */}
        <nav className="h-16 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-lg bg-surface/80 shadow-levitated">
          <span className="font-bold text-xl text-ink tracking-tight">BRIDGE</span>
          <div className="flex gap-4 items-center">
            {/* Role indicator with a "concave" inset look */}
            <span className="text-sm text-ink/70 capitalize px-3 py-1 bg-ceramic rounded-full shadow-concave border border-white/50">
              {role} Workspace
            </span>
            {/* A clean, interactive button for switching roles */}
            <button 
              onClick={() => setRole(null)} 
              className="text-sm font-medium text-ink/60 hover:text-electric-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-glow"
            >
              Switch Role
            </button>
          </div>
        </nav>
        
        <main className="animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<ChallengeFeed />} />
            <Route path="/challenge/new" element={<ChallengeBiddingForm />} />
            <Route path="/challenge/:id" element={<ChallengeDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}