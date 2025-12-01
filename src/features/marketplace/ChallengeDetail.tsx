import React from 'react';
import { Shield, ArrowLeft, Building2, Lock, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { ChallengeInput, EscrowStatus, Milestone } from '../../lib/schemas';

// Mock Data for the View - now with various statuses
const MOCK_DETAIL: ChallengeInput = {
  title: "Warehouse Theft Prevention (Edge Compute)",
  description: "We are experiencing 4% shrinkage in our Midwest distribution centers. We need a CV solution that runs on-premise (Nvidia Jetson) to detect unauthorized item removal. Must integrate with existing Genetec VMS.",
  budgetRange: '50k-250k',
  isStealth: true,
  publicAlias: "Fortune 500 Retailer",
  industryTags: ['Logistics', 'Computer Vision', 'Edge AI'],
  milestones: [
    { title: "Project Kickoff", payoutPercentage: 10, description: "Initial requirements gathering", status: 'released' },
    { title: "Proof of Concept", payoutPercentage: 20, description: "Demonstrate detection on 1h of sample footage.", status: 'funded_in_escrow' },
    { title: "On-Site Pilot", payoutPercentage: 40, description: "Deploy to 1 warehouse for 30 days.", status: 'pending_funding' },
    { title: "Final Rollout", payoutPercentage: 30, description: "System hardening and handoff.", status: 'pending_funding' }
  ]
};

const getStatusAppearance = (status: EscrowStatus) => {
  switch (status) {
    case 'pending_funding':
      return { label: 'UNFUNDED', color: 'text-slate-500', icon: <Circle className="w-5 h-5 text-slate-400" /> };
    case 'funded_in_escrow':
      return { label: 'IN ESCROW', color: 'text-amber-600', icon: <Lock className="w-5 h-5 text-amber-500" /> };
    case 'released':
      return { label: 'PAID', color: 'text-emerald-600', icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> };
    case 'disputed':
      return { label: 'DISPUTED', color: 'text-red-600', icon: <AlertCircle className="w-5 h-5 text-red-500" /> };
    default:
      return { label: 'UNKNOWN', color: 'text-slate-500', icon: <Circle className="w-5 h-5 text-slate-400" /> };
  }
};


export default function ChallengeDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Feed
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-xl p-8 shadow-levitated border border-slate-200 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            {MOCK_DETAIL.isStealth ? (
              <div className="flex items-center gap-2 mb-3 text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-100">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">Stealth Mode</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-3 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit border border-emerald-100">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">Verified Client</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">{MOCK_DETAIL.title}</h1>
            <p className="text-lg text-slate-500 mt-2 font-medium">
              Posted by {MOCK_DETAIL.isStealth ? MOCK_DETAIL.publicAlias : "Corporate Client"}
            </p>
          </div>
          <div className="text-right">
            <div className="font-mono text-xl font-bold text-slate-900 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
              {MOCK_DETAIL.budgetRange}
            </div>
            <p className="text-xs text-slate-400 mt-2">Est. Total Value</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 mb-8">
          <p>{MOCK_DETAIL.description}</p>
        </div>

        <div className="flex gap-2">
          {MOCK_DETAIL.industryTags.map(tag => (
            <span key={tag} className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Milestones (The Deal Structure) */}
      <h3 className="text-xl font-bold text-slate-900 mb-4 px-1">Payout Schedule</h3>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        {MOCK_DETAIL.milestones.map((ms: Milestone, idx: number) => {
          const { label, color, icon } = getStatusAppearance(ms.status);
          return (
            <div key={idx} className="flex items-center p-5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    {icon}
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-slate-900">{ms.title}</h4>
                <p className="text-sm text-slate-500">{ms.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4 text-right">
                <span className="block text-lg font-bold text-emerald-600">{ms.payoutPercentage}%</span>
                <span className={`text-xs font-mono font-bold tracking-wider ${color}`}>{label}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action Bar */}
      <div className="flex gap-4">
        <button className="flex-1 bg-slate-900 text-white text-lg font-semibold py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition-all">
          Apply to Challenge
        </button>
        <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
          Message Lead
        </button>
      </div>
    </div>
  );
}
