
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout, PlusCircle } from 'lucide-react';

const Onboarding = lazy(() => import('../features/onboarding/Onboarding'));
const ChallengeBiddingForm = lazy(() => import('../features/marketplace/ChallengeBiddingForm'));
const ChallengeFeed = lazy(() => import('../features/marketplace/ChallengeFeed'));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <header className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-slate-900 dark:text-slate-50" />
            <h1 className="text-lg font-semibold">
              <Link to="/">Marketplace</Link>
            </h1>
          </div>
          <nav>
            <Link to="/challenge/new" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              <PlusCircle className="w-4 h-4" />
              <span>New Challenge</span>
            </Link>
          </nav>
        </header>
        <main className="p-4">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<ChallengeFeed />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/challenge/new" element={<ChallengeBiddingForm />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}
