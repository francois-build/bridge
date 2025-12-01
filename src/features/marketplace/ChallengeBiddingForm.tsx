import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChallengeInputSchema, ChallengeInput } from '../../lib/schemas';
import { PlusCircle, Trash2, AlertTriangle } from 'lucide-react';

export default function ChallengeBiddingForm() {
  const {
    register,
    control, 
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChallengeInput>({
    resolver: zodResolver(ChallengeInputSchema),
    defaultValues: {
      title: '',
      description: '',
      industryTags: [],
      milestones: [{ title: 'Project Completion', payoutPercentage: 100, description: 'Final deliverable' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "milestones",
  });

  const onSubmit = (data: ChallengeInput) => {
    console.log('Form data submitted:', data);
    alert('Challenge submitted! Check the console for the data.');
  };
  
  const milestoneValues = watch("milestones");
  const totalPercentage = milestoneValues.reduce((acc, ms) => acc + (Number(ms.payoutPercentage) || 0), 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-levitated dark:bg-slate-800">
      <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">Post a New Challenge</h2>
      
      {/* --- Basic Info --- */}
      <div className="space-y-6 mb-10">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
          <input {...register('title')} id="title" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
          <textarea {...register('description')} id="description" rows={4} className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Budget Range</label>
            <select {...register('budgetRange')} id="budgetRange" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="<50k">&lt; $50k</option>
              <option value="50k-250k">$50k - $250k</option>
              <option value="250k+">$250k+</option>
            </select>
          </div>
          <div>
            <label htmlFor="industryTags" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Industry Tags (comma-separated)</label>
            <input {...register('industryTags')} id="industryTags" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            {errors.industryTags && <p className="mt-1 text-sm text-red-600">{errors.industryTags.message}</p>}
          </div>
        </div>
        
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input {...register('isStealth')} type="checkbox" id="isStealth" className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="isStealth" className="font-medium text-slate-700 dark:text-slate-300">Stealth Mode</label>
                <p className="text-slate-500">Your company identity will be masked.</p>
            </div>
        </div>

        <input {...register('publicAlias')} placeholder="Public Alias (e.g. 'Fortune 500 Retailer')" className="block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>

      {/* --- Milestone Builder --- */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Milestone Payouts</h3>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200">Milestone #{index + 1}</h4>
                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <label className="text-xs text-slate-600 dark:text-slate-400">Title</label>
                  <input
                    {...register(`milestones.${index}.title`)}
                    className="w-full text-sm px-2 py-1 bg-white dark:bg-slate-700 border rounded-md shadow-inner-xs dark:border-slate-600"
                  />
                  {errors.milestones?.[index]?.title && <p className="mt-1 text-xs text-red-500">{errors.milestones[index]?.title?.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-600 dark:text-slate-400">Payout %</label>
                   <input
                    {...register(`milestones.${index}.payoutPercentage`, { valueAsNumber: true })}
                    type="number"
                    className="w-full text-sm px-2 py-1 bg-white dark:bg-slate-700 border rounded-md shadow-inner-xs dark:border-slate-600"
                  />
                  {errors.milestones?.[index]?.payoutPercentage && <p className="mt-1 text-xs text-red-500">{errors.milestones[index]?.payoutPercentage?.message}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ title: '', payoutPercentage: 10, description: '' })}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <PlusCircle className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      {/* --- Validation & Submission --- */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className={`flex justify-between items-center p-3 mb-4 rounded-lg border ${totalPercentage === 100 ? 'border-green-300 bg-green-50 dark:bg-green-900/50 dark:border-green-700' : 'border-red-300 bg-red-50 dark:bg-red-900/50 dark:border-red-700'}`}>
            <div className="font-bold text-lg">Total: {totalPercentage}%</div>
            {errors.milestones?.root && 
              <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                <AlertTriangle className="w-4 h-4" />
                <span>{errors.milestones.root.message}</span>
              </div>
            }
        </div>

        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-200">
          Submit Challenge
        </button>
      </div>
    </form>
  );
}
