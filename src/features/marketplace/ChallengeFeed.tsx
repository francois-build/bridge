import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import type { ChallengeInput } from '../../lib/schemas';

// MOCK DATA: Remains the same, but the UI will bring it to life.
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

// A single Challenge Card, refactored for "Machined Neumorphism"
const ChallengeCard = ({ data }: { data: ChallengeInput }) => {
    const navigate = useNavigate();
    const isFunded = data.milestones.some(m => m.status === 'funded_in_escrow' || m.status === 'released');

    return (
        <div className="group relative bg-ceramic rounded-xl p-6 transition-all duration-300 shadow-concave hover:shadow-levitated hover:-translate-y-1 border border-transparent hover:border-electric-blue/20">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        {data.isStealth && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-amber/10 text-warning-amber border border-warning-amber/20 ring-1 ring-warning-amber/30">
                                <Shield className="w-3 h-3 mr-1" />
                                Stealth Mode
                            </span>
                        )}
                        {isFunded && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-signal-green/10 text-signal-green border border-signal-green/20 ring-1 ring-signal-green/30">
                                💸 Funded
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold text-ink">{data.title}</h3>
                    <p className="text-sm text-ink/60 mt-1 font-medium">
                    {data.isStealth ? data.publicAlias : "Public Client"}
                    </p>
                </div>
                <div className="text-right">
                    <span className="block font-mono text-sm text-ink bg-surface px-3 py-1 rounded-lg shadow-concave border border-white/50">
                    {data.budgetRange}
                    </span>
                </div>
            </div>
            
            <p className="mt-4 text-ink/80 text-sm leading-relaxed line-clamp-2">
            {data.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4">
                <div className="flex gap-2">
                    {data.industryTags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-electric-blue bg-electric-blue/10 px-2 py-1 rounded-md">
                        {tag}
                    </span>
                    ))} 
                </div>
                <button onClick={() => navigate('/challenge/123')} className="text-sm font-medium text-ink/70 hover:text-electric-blue transition-colors flex items-center gap-1">
                    View Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    )
};

// The Stats Deck, refactored for a "concave" inset appearance
const StatsDeck = () => (
    <div className="bg-ceramic rounded-xl p-4 shadow-concave flex justify-between text-center mb-8 border border-white/50">
        <div>
            <p className="text-xs text-ink/60 uppercase tracking-wider">Total Liquidity</p>
            <p className="font-mono font-bold text-ink text-xl">$4.2M</p>
        </div>
        <div>
            <p className="text-xs text-ink/60 uppercase tracking-wider">Active Bounties</p>
            <p className="font-mono font-bold text-ink text-xl">12</p>
        </div>
        <div>
            <p className="text-xs text-ink/60 uppercase tracking-wider">Avg. TTM</p>
            <p className="font-mono font-bold text-ink text-xl">14 Days</p>
        </div>
    </div>
);

// The main feed component, now with our design system applied
export default function ChallengeFeed() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <StatsDeck />

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Active Challenges</h2>
          <p className="text-ink/70 mt-1">Real-time opportunities matching your stack.</p>
        </div>
        <button 
            onClick={() => navigate('/challenge/new')} 
            className="bg-electric-blue text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-levitated hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-glow transition-all duration-200"
        >
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