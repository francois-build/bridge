
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

const painPoints = [
  "Supply Chain Optimization",
  "Customer Churn Reduction",
  "Regulatory Compliance",
  "Asset Tracking & Logistics",
];

export default function SeekerOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const domain = user?.email?.split('@')[1] || 'your company';

  const generateDraft = async () => {
    if (!user || !selectedPainPoint) return;

    const challengeId = crypto.randomUUID();
    try {
      await setDoc(doc(db, 'challenges', challengeId), {
        title: `Solution for ${selectedPainPoint}`,
        description: "Draft generated from onboarding. Flesh out the details for your challenge.",
        isDraft: true,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });
      navigate(`/challenge/${challengeId}`);
    } catch (error) {
      console.error("Error creating challenge draft: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface p-4">
      {step === 1 && (
        <Card className="w-full max-w-md p-8 shadow-levitated">
          <h2 className="text-2xl font-bold text-center mb-4">Team Discovery</h2>
          <p className="text-center text-primary-muted mb-6">
            We found 3 colleagues at <span className="font-semibold">{domain}</span>. Would you like to join their team?
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => setStep(2)} className="w-full">Join Team</Button>
            <Button variant="outline" onClick={() => setStep(2)} className="w-full">Skip for now</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-8">What is your primary focus right now?</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {painPoints.map((point) => (
              <button
                key={point}
                onClick={() => setSelectedPainPoint(point)}
                className={`p-6 rounded-lg text-center font-semibold transition-all
                  ${selectedPainPoint === point
                    ? 'border-2 border-blue-600 bg-blue-50 text-blue-700'
                    : 'bg-surface-raised border border-slate-200'
                  }`}
              >
                {point}
              </button>
            ))}
          </div>
          <Button onClick={generateDraft} disabled={!selectedPainPoint} className="w-full">
            Generate Draft
          </Button>
        </div>
      )}
    </div>
  );
}
