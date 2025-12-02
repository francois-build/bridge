import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UploadCloud, FileText, X, Tag, ShieldOff, ArrowRight } from 'lucide-react';

type FormValues = {
  pitchDeck?: FileList;
  similarTo: string;
  competitors: { domain: string }[];
};

const staticTags = ['Fintech', 'API', 'Infrastructure', 'B2B', 'SaaS'];

export default function SolverOnboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTags, setShowTags] = useState(false);

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      similarTo: '',
      competitors: [{ domain: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'competitors',
  });

  const similarToValue = watch('similarTo');

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    // In a real app, you would process the PDF and use the extracted data.
    // For now, we'll just save the other fields.
    const profileData = {
      similarTo: data.similarTo,
      blockedCompetitors: data.competitors.map(c => c.domain).filter(Boolean),
      onboardingComplete: true,
      probationaryStatus: false, // Graduated from probationary status
    };

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, profileData, { merge: true });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">Welcome, Solver</h1>
        <p className="text-slate-500 text-center mb-10">Let's build your profile so you can start solving.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Deck-to-Data Drop Zone */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-700">Profile Quick-Start</label>
            <div className="relative border-dashed border-2 border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors duration-300">
              <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-slate-600 font-semibold">Don't like forms? Drop your Pitch Deck here.</p>
              <p className="text-sm text-slate-500">We'll use it to auto-fill your profile. PDF only.</p>
              <input 
                type="file"
                {...register('pitchDeck')}
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* "Similar-To" Tagging */}
          <div className="space-y-2">
            <label htmlFor="similarTo" className="font-semibold text-slate-700 flex items-center"><Tag className="w-4 h-4 mr-2"/>Which company are you most like?</label>
            <input
              id="similarTo"
              type="text"
              {...register('similarTo')}
              onFocus={() => setShowTags(true)}
              placeholder="e.g. 'Plaid for Logistics'"
              className="w-full p-3 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {showTags && similarToValue && (
              <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in duration-300">
                {staticTags.map(tag => (
                  <span key={tag} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {tag}
                    <button type="button" className="ml-2 text-blue-500 hover:text-blue-700">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Competitor Cloaking */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-700 flex items-center"><ShieldOff className="w-4 h-4 mr-2"/>Who should NOT see your sensitive data?</label>
            <p className="text-sm text-slate-500">Add domains of companies to cloak your profile from.</p>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    {...register(`competitors.${index}.domain`)}
                    placeholder="e.g., competitor.com"
                    className="flex-grow p-3 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button type="button" onClick={() => remove(index)} className="p-2 text-slate-500 hover:text-red-600">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ domain: '' })}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 mt-2"
            >
              + Add another domain
            </button>
          </div>

          {/* Completion Button */}
          <div className="pt-4">
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-levitated hover:bg-blue-700 transition-all transform hover:scale-105">
              Complete Profile <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
