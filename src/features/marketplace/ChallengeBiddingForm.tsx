import { useForm, useFieldArray, type UseFormRegister, type FieldErrors } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChallengeInputSchema } from '../../lib/schemas';
import { PlusCircle, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the schema's input and output types
type ChallengeFormInput = z.input<typeof ChallengeInputSchema>;
type ChallengeOutputValues = z.output<typeof ChallengeInputSchema>;

interface FormInputProps {
    id: keyof ChallengeFormInput;
    register: UseFormRegister<ChallengeFormInput>;
    errors: FieldErrors<ChallengeFormInput>;
    label: string;
    type?: string;
    [key: string]: any;
  }
  
  const FormInput = ({ id, register, errors, label, type = 'text', ...props }: FormInputProps) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink/80 mb-1">{label}</label>
      <input 
        {...register(id)} 
        id={id} 
        type={type}
        className="mt-1 block w-full px-3 py-2 bg-surface border border-white/50 rounded-md shadow-concave text-ink focus:outline-none focus:ring-2 focus:ring-glow"
        {...props}
      />
      {errors[id] && <p className="mt-1 text-sm text-error-red">{(errors as any)[id].message}</p>}
    </div>
  );

export default function ChallengeBiddingForm() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChallengeFormInput>({
    resolver: zodResolver(ChallengeInputSchema),
    defaultValues: {
      title: '',
      description: '',
      budgetRange: '<50k',
      isStealth: false,
      publicAlias: '',
      industryTags: [], 
      milestones: [{ title: 'Project Completion', payoutPercentage: 100, description: '', status: 'pending_funding' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "milestones",
  });

  const onSubmit: SubmitHandler<ChallengeFormInput> = (data) => {
    const processedData: ChallengeOutputValues = {
        ...data,
        isStealth: !!data.isStealth,
        industryTags: Array.isArray(data.industryTags) ? data.industryTags : (data.industryTags as string).split(',').map((tag: string) => tag.trim()),
        milestones: data.milestones.map(ms => ({
          ...ms,
          status: ms.status || 'pending_funding'
        }))
      };
    console.log('Form data submitted:', processedData);
    alert('Challenge submitted! Check the console for the data.');
    navigate('/');
  };
  
  const milestoneValues = watch("milestones");
  const totalPercentage = milestoneValues.reduce((acc, ms) => acc + (Number(ms.payoutPercentage) || 0), 0);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-ceramic rounded-lg shadow-levitated border border-white/50">
        <h2 className="text-3xl font-bold mb-8 text-ink">Post a New Challenge</h2>
        
        {/* --- Basic Info --- */}
        <div className="space-y-6 mb-10">
          <FormInput id="title" register={register} errors={errors} label="Title" placeholder="e.g., Real-time Shrinkage Detection" />

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-ink/80 mb-1">Description</label>
            <textarea {...register('description')} id="description" rows={4} className="mt-1 block w-full px-3 py-2 bg-surface border border-white/50 rounded-md shadow-concave text-ink focus:outline-none focus:ring-2 focus:ring-glow" placeholder="Describe the problem you're trying to solve..."></textarea>
            {errors.description && <p className="mt-1 text-sm text-error-red">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-ink/80 mb-1">Budget Range</label>
              <select {...register('budgetRange')} id="budgetRange" className="mt-1 block w-full px-3 py-2 bg-surface border border-white/50 rounded-md shadow-concave text-ink focus:outline-none focus:ring-2 focus:ring-glow">
                <option value="<50k">&lt; $50k</option>
                <option value="50k-250k">$50k - $250k</option>
                <option value="250k+">$250k+</option>
              </select>
            </div>
            <FormInput id="industryTags" register={register} errors={errors} label="Industry Tags" placeholder="e.g., Logistics, AI, Security" />
          </div>
          
          <div className="flex items-start bg-surface p-4 rounded-md shadow-concave border border-white/50">
              <div className="flex items-center h-5">
                  <input {...register('isStealth')} type="checkbox" id="isStealth" className="h-4 w-4 rounded border-slate-300 accent-electric-blue focus:ring-glow" />
              </div>
              <div className="ml-3 text-sm">
                  <label htmlFor="isStealth" className="font-medium text-ink">Stealth Mode</label>
                  <p className="text-ink/60">Your company identity will be masked on the public marketplace.</p>
              </div>
          </div>

          <FormInput id="publicAlias" register={register} errors={errors} label="Public Alias (if in Stealth Mode)" placeholder="e.g., 'Fortune 500 Retailer'" />
        </div>

        {/* --- Milestone Builder --- */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-ink mb-4">Milestone Payouts</h3>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-lg bg-surface shadow-concave border border-white/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-ink">Milestone #{index + 1}</h4>
                  <button type="button" onClick={() => remove(index)} className="text-error-red/70 hover:text-error-red">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-3">
                    <label className="text-xs text-ink/70">Title</label>
                    <input {...register(`milestones.${index}.title`)} className="w-full text-sm px-2 py-1 bg-white rounded-md shadow-inner-xs border-slate-300" />
                    {errors.milestones?.[index]?.title && <p className="mt-1 text-xs text-error-red">{errors.milestones[index]?.title?.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-ink/70">Payout %</label>
                     <input {...register(`milestones.${index}.payoutPercentage`, { valueAsNumber: true })} type="number" className="w-full text-sm px-2 py-1 bg-white rounded-md shadow-inner-xs border-slate-300" />
                    {errors.milestones?.[index]?.payoutPercentage && <p className="mt-1 text-xs text-error-red">{errors.milestones[index]?.payoutPercentage?.message}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ title: '', payoutPercentage: 10, description: '', status: 'pending_funding' })}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-electric-blue hover:text-electric-blue/80 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Milestone
          </button>
        </div>

        {/* --- Validation & Submission --- */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
            <div className={`flex justify-between items-center p-3 mb-4 rounded-lg border ${totalPercentage === 100 ? 'border-signal-green/50 bg-signal-green/10' : 'border-error-red/50 bg-error-red/10'}`}>
              <div className={`font-bold text-lg ${totalPercentage === 100 ? 'text-signal-green' : 'text-error-red'}`}>Total: {totalPercentage}%</div>
              {errors.milestones?.root && 
                <div className="flex items-center gap-2 text-sm text-error-red">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{errors.milestones.root.message}</span>
                </div>
              }
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-electric-blue text-white font-semibold rounded-md shadow-levitated hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-glow focus:ring-offset-2 focus:ring-offset-ceramic transition-all duration-200">
            Submit Challenge
          </button>
        </div>
      </form>
    </div>
  );
}