import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChallengeInputSchema, ChallengeInput } from '../../lib/schemas';

export default function ChallengeBiddingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ChallengeInput>({
    resolver: zodResolver(ChallengeInputSchema),
  });

  const onSubmit = (data: ChallengeInput) => {
    console.log('Form data:', data);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-levitated dark:bg-slate-800">
      <h2 className="text-2xl font-bold mb-6">Post a New Challenge</h2>
      
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
        <input {...register('title')} id="title" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
        <textarea {...register('description')} id="description" rows={4} className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {/* Budget Range */}
      <div className="mb-4">
        <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Budget Range</label>
        <select {...register('budgetRange')} id="budgetRange" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="<50k">&lt; $50k</option>
          <option value="50k-250k">$50k - $250k</option>
          <option value="250k+">$250k+</option>
        </select>
      </div>

      {/* Industry Tags */}
      <div className="mb-4">
        <label htmlFor="industryTags" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Industry Tags (comma-separated)</label>
        <input {...register('industryTags')} id="industryTags" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
        {errors.industryTags && <p className="mt-1 text-sm text-red-600">{errors.industryTags.message}</p>}
      </div>

      {/* Stealth Mode */}
      <div className="mb-6 flex items-center">
        <input {...register('isStealth')} type="checkbox" id="isStealth" className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" />
        <label htmlFor="isStealth" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">Stealth Mode</label>
      </div>

      {/* Public Alias */}
      <div className="mb-4">
        <label htmlFor="publicAlias" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Public Alias (Optional)</label>
        <input {...register('publicAlias')} id="publicAlias" className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>

      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900">Submit Challenge</button>
    </form>
  );
}
