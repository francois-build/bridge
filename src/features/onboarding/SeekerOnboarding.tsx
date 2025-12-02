import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Building, Users, Tag, ArrowRight } from 'lucide-react';

const painPoints = [
  "Supply Chain",
  "High Churn",
  "Compliance",
  "Asset Tracking",
  "Cybersecurity",
  "Data Analytics"
];

type FormValues = {
  painPoint: string;
};

export default function SeekerOnboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null);
  const { handleSubmit, setValue } = useForm<FormValues>();

  const userDomain = user?.email?.split('@')[1] || 'yourcompany.com';

  const onSubmit = async (data: FormValues) => {
    if (!user || !data.painPoint) return;

    await addDoc(collection(db, 'challenges'), {
      isDraft: true,
      title: `Solution for ${data.painPoint}`,
      ownerId: user.uid,
      createdAt: new Date(),
    });

    // Also update user profile to mark onboarding as complete
    // This is an assumed next step, but good practice.
    // const userRef = doc(db, 'users', user.uid);
    // await setDoc(userRef, { onboardingComplete: true }, { merge: true });

    navigate('/');
  };

  const handlePainPointSelect = (painPoint: string) => {
    setSelectedPainPoint(painPoint);
    setValue('painPoint', painPoint);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome, Seeker</h1>
        <p className="text-slate-500 mb-10">Let's create your first challenge draft.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Team Auto-Discovery */}
          <div className="bg-white p-6 rounded-xl shadow-levitated border border-slate-100 text-left animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">Join your team?</h2>
                <p className="text-slate-500">We found 3 colleagues at <span className="font-semibold text-slate-700">{userDomain}</span>. You can collaborate on challenges together.</p>
              </div>
            </div>
            <button type="button" className="mt-4 w-full bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
              Join Team Workspace
            </button>
          </div>

          {/* Pain Point Picker */}
          <div className="text-left animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <label className="font-semibold text-slate-700 flex items-center mb-4"><Tag className="w-4 h-4 mr-2"/>What's your primary business challenge?</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {painPoints.map(point => (
                <button
                  key={point}
                  type="button"
                  onClick={() => handlePainPointSelect(point)}
                  className={`p-4 rounded-lg font-semibold text-center transition-all duration-200 border-2
                    ${selectedPainPoint === point 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                >
                  {point}
                </button>
              ))}
            </div>
          </div>
          
          {/* Completion Button */}
          <div className="pt-4 animate-in fade-in duration-500 delay-300">
            <button 
              type="submit" 
              disabled={!selectedPainPoint}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-levitated hover:bg-blue-700 transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              Generate Draft & Continue <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
