import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import type { ChallengeInput } from '../../lib/schemas';

// Mock Data: Updated to show a funded status for one challenge
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
    // Check if any milestone is funded or has been paid out
    const isFunded = data.milestones.some(m => m.status === 'funded_in_escrow' || m.status === 'released');

    return (
        <div className="group relative bg-white rounded-xl p-6 transition-all duration-300 border-t border-white border-b-2 border-slate-100 hover:-translate-y-1 hover:shadow-levitated hover:border-blue-100">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        {data.isStealth && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 ring-1 ring-amber-500/10">
                                <Shield className="w-3 h-3 mr-1" />
                                Stealth Mode
                            </span>
                        )}
                        {isFunded && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 ring-1 ring-emerald-500/10">
                                💸 Funded
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{data.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 font-medium">
                    {data.isStealth ? data.publicAlias : "Public Client"}
                    </p>
                </div>
                <div className="text-right">
                    <span className="block font-mono text-sm text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                    {data.budgetRange}
                    </span>
                </div>
            </div>
            
            <p className="mt-4 text-slate-600 text-sm leading-relaxed line-clamp-2">
            {data.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex gap-2">
                    {data.industryTags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {tag}
                    </span>
                    ))} 
                </div>
                <button onClick={() => navigate('/challenge/123')} className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                    View Details →
                </button>
            </div>
        </div>
    )
};

const StatsDeck = () => (
    <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 shadow-inner flex justify-between text-center mb-8">
        <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Liquidity</p>
            <p className="font-mono font-bold text-slate-700 text-xl">$4.2M</p>
        </div>
        <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Active Bounties</p>
            <p className="font-mono font-bold text-slate-700 text-xl">12</p>
        </div>
        <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Avg. TTM</p>
            <p className="font-mono font-bold text-slate-700 text-xl">14 Days</p>
        </div>
    </div>
);

export default function ChallengeFeed() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <StatsDeck />

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Active Challenges</h2>
          <p className="text-slate-500 mt-1">Real-time opportunities matching your stack.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-slate-900/20 hover:translate-y-[-1px] transition-all">
          + Post Challenge
        </button>
      </div>
      
      <div className="space-y-4">
        {MOCK_CHALLENGES.map((challenge, idx) => (
          <ChallengeCard key={idx} data={challenge} />
        ))}
      </div>
    </div>
  );
};