import { useState, useMemo } from 'react';
import { Shield, ArrowLeft, Building2, Lock, Circle, CheckCircle2, AlertCircle, BadgePercent } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ChallengeInput, EscrowStatus, Milestone } from '../../lib/schemas';

// Mock Data for the View
const MOCK_DETAIL: ChallengeInput = {
  title: "Warehouse Theft Prevention (Edge Compute)",
  description: "We are experiencing 4% shrinkage in our Midwest distribution centers. We need a CV solution that runs on-premise (Nvidia Jetson) to detect unauthorized item removal. Must integrate with existing Genetec VMS.",
  budgetRange: '50k-250k',
  isStealth: true,
  publicAlias: "Fortune 500 Retailer",
  industryTags: ['Logistics', 'Computer Vision', 'Edge AI'],
  milestones: [
    { title: "Project Kickoff", payoutPercentage: 10, description: "Initial requirements gathering", status: 'released', amount: 5000 },
    { title: "Proof of Concept", payoutPercentage: 20, description: "Demonstrate detection on 1h of sample footage.", status: 'pending_funding', amount: 10000 },
    { title: "On-Site Pilot", payoutPercentage: 40, description: "Deploy to 1 warehouse for 30 days.", status: 'pending_funding', amount: 20000 },
    { title: "Final Rollout", payoutPercentage: 30, description: "System hardening and handoff.", status: 'pending_funding', amount: 15000 }
  ]
};

const getStatusAppearance = (status: EscrowStatus) => {
  switch (status) {
    case 'pending_funding':
      return { label: 'UNFUNDED', color: 'text-slate-400', bg: 'bg-slate-100', icon: <Circle className="w-5 h-5 text-slate-300" /> };
    case 'funded_in_escrow':
      return { label: 'SECURED', color: 'text-amber-700', bg: 'bg-amber-100', icon: <Lock className="w-5 h-5 text-amber-600" /> };
    case 'released':
      return { label: 'PAID', color: 'text-emerald-700', bg: 'bg-emerald-100', icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" /> };
    default:
      return { label: 'UNKNOWN', color: 'text-slate-400', bg: 'bg-slate-100', icon: <AlertCircle className="w-5 h-5 text-slate-300" /> };
  }
};

export default function ChallengeDetail() {
  const [milestones, setMilestones] = useState(MOCK_DETAIL.milestones);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Financial Logic
  const totalLocked = useMemo(() => 
    milestones
      .filter(m => m.status === 'funded_in_escrow')
      .reduce((acc, m) => acc + (m.amount || 0), 0),
    [milestones]
  );

  const handleFundEscrow = () => {
    setIsProcessing(true);
    
    // Simulate Network Delay (Stripe API)
    setTimeout(() => {
      setMilestones(current => {
        const firstPending = current.findIndex(m => m.status === 'pending_funding');
        if (firstPending === -1) return current;
        
        const newMs = [...current];
        newMs[firstPending] = { ...newMs[firstPending], status: 'funded_in_escrow' };
        return newMs;
      });
      setIsProcessing(false);
      setShowToast(true);
      
      // Hide toast after 3s
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const nextMilestone = milestones.find(m => m.status === 'pending_funding');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 relative">
      {/* Mock Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 md:right-8 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-4 fade-in duration-300 flex items-center gap-3">
          <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <p className="font-bold">Funds Secured</p>
            <p className="text-sm text-emerald-100">Escrow deposit confirmed via Stripe.</p>
          </div>
        </div>
      )}

      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Feed
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-2xl p-8 shadow-ceramic border border-slate-100 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            {MOCK_DETAIL.isStealth ? (
              <div className="flex items-center gap-2 mb-3 text-amber-700 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-100 ring-1 ring-amber-500/10">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">Stealth Mode</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-3 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit border border-emerald-100">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">Verified Client</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">{MOCK_DETAIL.title}</h1>
            <p className="text-lg text-slate-500 mt-2 font-medium">
              Posted by {MOCK_DETAIL.isStealth ? MOCK_DETAIL.publicAlias : "Corporate Client"}
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-3">
            <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Budget</p>
                <div className="font-mono text-xl font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                {MOCK_DETAIL.budgetRange}
                </div>
            </div>
            {totalLocked > 0 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                    <p className="text-xs text-amber-600 uppercase tracking-wider mb-1 font-bold flex items-center justify-end gap-1">
                        <Lock className="w-3 h-3" /> Locked Value
                    </p>
                    <div className="font-mono text-xl font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                    ${totalLocked.toLocaleString()}
                    </div>
                </div>
            )}
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 mb-8 leading-relaxed">
          <p>{MOCK_DETAIL.description}</p>
        </div>

        <div className="flex gap-2">
          {MOCK_DETAIL.industryTags.map(tag => (
            <span key={tag} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Milestones (The Deal Structure) */}
      <div className="flex items-center gap-3 mb-5 px-1">
        <BadgePercent className="text-slate-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-slate-900">Payout Schedule</h3>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        {milestones.map((ms: Milestone, idx: number) => {
          const { label, color, bg, icon } = getStatusAppearance(ms.status);
          return (
            <div key={idx} className="group flex items-center p-6 even:bg-slate-50/50 border-b border-slate-100 last:border-0 hover:bg-blue-50/30 transition-colors">
              <div className="flex-shrink-0 mr-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${bg === 'bg-slate-100' ? 'bg-white border-slate-200' : 'bg-white border-transparent shadow-sm'}`}>
                    {icon}
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-900 text-lg truncate">{ms.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border ${bg} ${color} border-black/5`}>
                        {label}
                    </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-1">{ms.description}</p>
              </div>
              <div className="flex-shrink-0 ml-6 text-right min-w-[80px]">
                <span className="block text-2xl font-mono font-bold text-slate-900 tracking-tight">{ms.payoutPercentage}%</span>
                <span className="text-xs font-medium text-slate-400">of total</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action Bar - The "Money Moment" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sticky bottom-6">
        <button 
          onClick={handleFundEscrow}
          disabled={!nextMilestone || isProcessing}
          className="md:col-span-2 w-full bg-slate-900 text-white text-lg font-semibold py-4 rounded-xl 
            shadow-mechanical 
            border-t border-white/20
            transition-all duration-200 
            hover:scale-[1.01] hover:shadow-xl hover:bg-slate-800 
            active:scale-[0.98] active:shadow-inner 
            disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:border-transparent
            flex items-center justify-center gap-3"
        >
          {isProcessing ? (
             <>
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               <span>Processing Deposit...</span>
             </>
          ) : !nextMilestone ? (
             "All Milestones Funded"
          ) : (
             <>
               <Lock className="w-5 h-5 text-blue-200" />
               <span>Fund Next: {nextMilestone.title}</span>
             </>
          )}
        </button>
        
        <button className="w-full bg-white text-slate-700 font-bold py-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm active:scale-[0.98]">
          Message Lead
        </button>
      </div>
    </div>
  );
}