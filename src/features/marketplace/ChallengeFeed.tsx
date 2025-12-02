import { useNavigate } from 'react-router-dom';
import type { ChallengeInput } from '../../lib/schemas';

// MOCK DATA
const MOCK_CHALLENGES: ChallengeInput[] = [
  {
    title: "Warehouse Theft Prevention (Edge Compute)",
    description: "Looking for on-premise CV solutions to detect shrinkage in real-time.",
    budgetRange: '50k-250k',
    isStealth: true,
    industryTags: ['Logistics', 'Computer Vision'],
    publicAlias: "Fortune 500 Retailer",
    milestones: [
        { title: "Proof of Concept", payoutPercentage: 20, status: 'funded_in_escrow' },
        { title: "On-Site Pilot", payoutPercentage: 80, status: 'pending_funding' }
    ]
  },
  {
    title: "Generative Customer Support Agent",
    description: "Need to reduce T1 support tickets by 40% using LLM orchestration.",
    budgetRange: '<50k',
    isStealth: false,
    industryTags: ['Fintech', 'GenAI'],
    milestones: [
        { title: "MVP Delivery", payoutPercentage: 100, status: 'pending_funding' }
    ]
  }
];

const ChallengeCard = ({ data }: { data: ChallengeInput }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-raised rounded-lg shadow-mechanical p-6 transition-shadow hover:shadow-levitated">
      <h3 className="text-2xl font-bold text-primary mb-2">{data.title}</h3>
      <p className="text-primary-muted mb-4">{data.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-action">{data.budgetRange}</span>
        <button 
            onClick={() => navigate('/challenge/123')} 
            className="bg-action text-white px-4 py-2 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow"
        >
            View Challenge
        </button>
      </div>
    </div>
  )
}

export default function ChallengeFeed() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Marketplace</h2>
        <button 
            onClick={() => navigate('/challenge/new')} 
            className="bg-action text-white px-4 py-2 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow"
        >
          + Post Challenge
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CHALLENGES.map((challenge, idx) => (
          <ChallengeCard key={idx} data={challenge} />
        ))}
      </div>
    </div>
  );
};
