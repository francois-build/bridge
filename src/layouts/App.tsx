import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import Onboarding from '../features/onboarding/Onboarding';
import { RoleSelection } from '../features/onboarding/RoleSelection';
import SeekerOnboarding from '../features/onboarding/SeekerOnboarding';
import ScoutOnboarding from '../features/onboarding/ScoutOnboarding';
import SolverOnboarding from '../features/onboarding/SolverOnboarding';
import ChallengeFeed from '../features/marketplace/ChallengeFeed';
import Header from '../components/Header';
import ChallengeDetail from '../features/challenges/ChallengeDetail';

const AppLayout = () => {
  const { user, userProfile, loading, assignRole } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-surface">Loading...</div>;
  }

  if (!user) {
    return <Onboarding />;
  }

  if (!userProfile?.role) {
    return <RoleSelection onSelect={assignRole} />;
  }

  // Defensive check for userProfile
  if (!userProfile) {
    // This case should ideally not be reached if role is set, but it's a good safeguard.
    return <Navigate to="/" replace />;
  }

  // Smart Redirect for users in probationary status
  if (userProfile.probationaryStatus) {
    const role = userProfile.role;
    if (role === 'solver') return <Navigate to="/onboarding/solver" replace />;
    if (role === 'seeker') return <Navigate to="/onboarding/seeker" replace />;
    if (role === 'connector') return <Navigate to="/onboarding/scout" replace />;
  }

  return (
    <div className="bg-surface min-h-screen">
      <Header />
      <Routes>
        {/* Onboarding Routes */}
        <Route path="/onboarding/seeker" element={<SeekerOnboarding />} />
        <Route path="/onboarding/scout" element={<ScoutOnboarding />} />
        <Route path="/onboarding/solver" element={<SolverOnboarding />} />

        {/* Main App Routes */}
        <Route path="/marketplace" element={<ChallengeFeed />} />
        <Route path="/challenge/:id" element={<ChallengeDetail />} />

        {/* Redirect base path to marketplace for logged-in users */}
        <Route path="*" element={<Navigate to="/marketplace" replace />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}
