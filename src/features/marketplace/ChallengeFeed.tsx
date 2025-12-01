import React from 'react';
import { Shield, Clock, Zap, Building2 } from 'lucide-react';
import type { ChallengeInput } from '../../lib/schemas';

// Robust Mock Data covering Edge Cases
const MOCK_CHALLENGES: ChallengeInput[] = [
  {
    title: "Warehouse Theft Prevention (Edge Compute)",
    description: "Looking for on-premise CV solutions to detect shrinkage in real-time. Must work offline.",
    budgetRange: '50k-250k',
    isStealth: true,
    industryTags: ['Logistics', 'Computer Vision', 'IoT'],
    publicAlias: "Fortune 500 Retailer"
  },
  {
    title: "Generative Customer Support Agent",
    description: "Need to reduce T1 support tickets by 40% using LLM orchestration. High volume required.",
    budgetRange: '250k+',
    isStealth: false, // Public
    industryTags: ['Fintech', 'GenAI', 'Automation'],
    publicAlias: "NeoBank Corp" 
  },
  {
    title: "AgTech Soil Sensor Network",
    description: "Low-power wide-area network (LoRaWAN) pilot for 5000 acre corn maize.",
    budgetRange: '<50k',
    isStealth: true,
    industryTags: ['AgTech', 'Hardware', 'Sustainability'],
    publicAlias: "Midwest Coop"
  }
];

const ChallengeCard = ({ data }: { data: ChallengeInput }) => (
  <div className="group relative flex flex-col p-6 transition-all duration-200
    bg-white rounded-xl shadow-sm 
    border-t border-white/60 border-b border-slate-200/60 border-x border-slate-100
    hover:shadow-md hover:border-slate-200">
    {/* Header: Identity & Budget */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col">
        {data.isStealth ? (
          <div className="flex items-center gap-2 mb-2 text-amber-600 bg-amber-50 px-2 py-1 rounded-md w-fit border border-amber-100">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">Stealth Mode</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit border border-emerald-100">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">Public RFP</span>
          </div>
        )}
        
        <span className="text-sm font-medium text-slate-500">
          {data.isStealth ? data.publicAlias : "Verified Enterprise"}
        </span>
      </div>
      
      <span className="font-mono text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
        {data.budgetRange}
      </span>
    </div>

    {/* Content */}
    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3">
      {data.title}
    </h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
      {data.description}
    </p>

    {/* Footer: Tags & Action */}
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
      <div className="flex gap-2">
        {data.industryTags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
            {tag}
          </span>
        ))}
        {data.industryTags.length > 2 && (
          <span className="text-xs font-medium text-slate-400 px-1 py-1">
            +{data.industryTags.length - 2}
          </span>
        )}
      </div>

      <button className="flex items-center gap-2 text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg 
        shadow-lg shadow-slate-900/20 
        transition-all duration-200
        hover:-translate-y-[1px] hover:shadow-xl hover:bg-slate-800
        active:translate-y-[1px] active:shadow-inner">
        <span>View Details</span>
        <Zap className="w-4 h-4 text-blue-400" />
      </button>
    </div>
  </div>
);

export const ChallengeFeed = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Active Challenges</h2>
          <div className="flex items-center gap-2 mt-2 text-slate-500">
            <Clock className="w-4 h-4" />
            <p className="text-sm">Real-time opportunities matching your stack.</p>
          </div>
        </div>
        
        <button className="hidden md:flex text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm">
          Filter View
        </button>
      </div>
      
      <div className="grid gap-6">
        {MOCK_CHALLENGES.map((challenge, idx) => (
          <ChallengeCard key={idx} data={challenge} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400 mb-4">Viewing 3 of 124 matches</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          Load More Challenges
        </button>
      </div>
    </div>
  );
};
