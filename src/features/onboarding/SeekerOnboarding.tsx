
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '../../components/ui/button';
import { Loader2, Users, Check, ArrowRight } from 'lucide-react';

const painPoints = [
  { id: "supply-chain", title: "Supply Chain Optimization" },
  { id: "churn", title: "Customer Churn Reduction" },
  { id: "compliance", title: "Regulatory Compliance" },
  { id: "logistics", title: "Asset Tracking & Logistics" },
];

export default function SeekerOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const domain = user?.email?.split('@')[1] || 'yourcompany.com';

  const handleTeamChoice = () => {
    setStep(2);
  };

  const generateDraft = async () => {
    if (!user || !selectedPainPoint) return;
    setIsLoading(true);
    const challengeId = crypto.randomUUID();
    try {
      await setDoc(doc(db, 'challenges', challengeId), {
        title: `Solution for ${selectedPainPoint}`,
        description: "This is a draft challenge generated from the onboarding flow. Please edit this to provide more details about your specific needs, requirements, and success criteria.",
        isDraft: true,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        tags: [selectedPainPoint],
      });
      // Also update the user's profile to mark onboarding as complete
      await setDoc(doc(db, 'users', user.uid), { 
        probationaryStatus: false 
      }, { merge: true });

      navigate(`/challenge/${challengeId}?edit=true`);
    } catch (error) {
      console.error("Error creating challenge draft: ", error);
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="text-center">
            <Users className="w-16 h-16 text-slate-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-200 mb-2">Join Your Team</h2>
            <p className="text-slate-400 mb-8">
                We found 3 colleagues at <span className="font-semibold text-blue-400">{domain}</span> already on Bridge. Would you like to join their workspace?
            </p>
            <div className="flex flex-col gap-4">
                <Button onClick={handleTeamChoice} className="w-full h-12 text-lg font-bold text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500">
                    Join Team Workspace
                </Button>
                <Button variant="outline" onClick={handleTeamChoice} className="w-full h-12 font-semibold tracking-wide text-slate-300 transition duration-300 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500">
                    Skip for Now
                </Button>
            </div>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center text-slate-200 mb-8">What is your primary business focus right now?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {painPoints.map((point) => (
              <button
                key={point.id}
                onClick={() => setSelectedPainPoint(point.title)}
                className={`relative p-6 rounded-xl text-left font-semibold transition-all duration-300  h-32 flex items-end
                  ${selectedPainPoint === point.title
                    ? 'bg-blue-600/20 border-2 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600'
                  }`}
              >
                {point.title}
                {selectedPainPoint === point.title && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                )}
              </button>
            ))}
          </div>
          <Button onClick={generateDraft} disabled={!selectedPainPoint || isLoading} className="w-full h-14 text-lg font-bold text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed">
            {isLoading ? 
                <Loader2 className="h-6 w-6 animate-spin" /> : 
                <span className="flex items-center justify-center">Generate Challenge Draft <ArrowRight className="w-5 h-5 ml-2" /></span>
            }
          </Button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 text-slate-100">
      <div className="w-full max-w-2xl mx-auto p-8 bg-slate-800/50 rounded-3xl border border-slate-700 shadow-2xl shadow-black/20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-2">
            Seeker Onboarding
          </h1>
          <p className="text-slate-400">Let's create your first challenge draft to find a solver.</p>
        </div>
        
        <div className="flex items-center justify-center mb-10 mx-auto w-1/2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step === 1 ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-700 text-slate-400'}`}>1</div>
          <div className="flex-1 h-1 bg-slate-700 mx-4 rounded-full">
             <div className="h-1 bg-blue-600 rounded-full transition-all duration-500" style={{ width: step === 2 ? '100%' : '0%' }}></div>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step === 2 ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-700 text-slate-400'}`}>2</div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
}
