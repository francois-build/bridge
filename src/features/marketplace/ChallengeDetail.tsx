import React from 'react';
import { DollarSign, ChevronRight, MessageSquare, Tag } from 'lucide-react';
import type { ChallengeInput } from '../../lib/schemas';

const MOCK_CHALLENGE_DETAIL: ChallengeInput = {
  title: "Next-Gen Supply Chain Digital Twin",
  description: "We are seeking a partner to develop a real-time digital twin of our global supply chain. The solution must integrate with our existing ERP and provide predictive analytics for demand forecasting, logistics optimization, and disruption simulation. Key outcomes include a 15% reduction in carrying costs and a 20% improvement in on-time delivery.",
  budgetRange: '250k+',
  isStealth: true,
  publicAlias: "Global Logistics Leader",
  industryTags: ['Digital Twin', 'Logistics', 'AI', 'Predictive Analytics'],
  milestones: [
    {
      title: "Phase 1: Data Ingestion & Core Model",
      payoutPercentage: 30,
      description: "Connect to all relevant data sources (ERP, IoT sensors, traffic APIs) and build the foundational graph model."
    },
    {
      title: "Phase 2: Simulation Environment & UI",
      payoutPercentage: 50,
      description: "Develop the interactive simulation engine and a user-friendly dashboard for scenario planning."
    },
    {
      title: "Phase 3: Live Pilot & Hand-off",
      payoutPercentage: 20,
      description: "Deploy the model against live data for a single product line and provide full documentation and training."
    }
  ]
};

export const ChallengeDetail = () => {
  const data = MOCK_CHALLENGE_DETAIL;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* -- Main Content Card -- */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-levitated overflow-hidden">
          <div className="p-8">
            {/* -- Header -- */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                  {data.title}
                </h1>
                <span className="font-mono text-lg font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                  {data.budgetRange}
                </span>
              </div>
              <p className="text-md text-slate-500 dark:text-slate-400">
                Posted by <span className="font-semibold text-slate-600 dark:text-slate-300">{data.isStealth ? data.publicAlias : "Confidential Client"}</span>
              </p>
            </div>

            {/* -- Description -- */}
            <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
              <p>{data.description}</p>
            </div>
            
            {/* -- Tags -- */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-3 tracking-wider">Required Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {data.industryTags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
                        <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500"/>
                        {tag}
                    </span>
                ))}
              </div>
            </div>

            {/* -- Milestone Table -- */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Milestone Breakdown</h2>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                  {data.milestones.map((milestone, index) => (
                    <li key={index} className="p-4 sm:p-6 bg-white dark:bg-slate-800">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                           <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Milestone {index + 1}</p>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1 mb-2">{milestone.title}</h4>
                          {milestone.description && <p className="text-sm text-slate-600 dark:text-slate-300 max-w-prose">{milestone.description}</p>}
                        </div>
                        <div className="flex-shrink-0 ml-4 text-right">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{milestone.payoutPercentage}%</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Payout</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* -- Action Area -- */}
          <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200">
                Apply to Challenge
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors">
                 <MessageSquare className="w-4 h-4 mr-2"/>
                Message Lead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
