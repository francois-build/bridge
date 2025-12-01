import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import type { ChallengeInput } from '../../lib/schemas';

// Mock Data: Compliant with Schema (min 1 milestone)
const MOCK_CHALLENGES: ChallengeInput[] = [
  {
    title: "Warehouse Theft Prevention (Edge Compute)",
    description: "Looking for on-premise CV solutions to detect shrinkage in real-time.",
    budgetRange: '50k-250k',
    isStealth: true,
    industryTags: ['Logistics', 'Computer Vision'],
    publicAlias: "Fortune 500 Retailer",
    milestones: [
        { title: "Scoping", payoutPercentage: 100, status: 'pending_funding' }
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
        <div className="bg-white rounded-xl p-6 shadow-levitated border-t border-white/60 border-b border-slate-200/60 hover:-translate-y-[1px] transition-all duration-200">
            <div className="flex justify-between items-start">
            <div>
                {data.isStealth && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 mb-3">
                    <Shield className="w-3 h-3 mr-1" />
                    Stealth Mode
                </span>
                )}
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

const StatCard = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-slate-100/50 shadow-inner border border-slate-200 rounded-lg p-3">
        <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="font-mono font-bold text-slate-900 text-xl">{value}</p>
    </div>
);

export default function ChallengeFeed() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard label="Total Liquidity" value="$4.2M" />
            <StatCard label="Open Bounties" value="12" />
            <StatCard label="Avg. TTM" value="14 Days" />
        </div>

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