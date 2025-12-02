
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserProfileSchema } from '../../lib/schemas';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { X, UploadCloud, Loader2, Building, ShieldOff } from 'lucide-react';

const SolverOnboardingSchema = UserProfileSchema.extend({
  pitchDeckUrl: z.string().optional(),
  similarTo: z.array(z.string()).min(1, "Please enter at least one similar company."),
  cloakedDomains: z.array(z.string()).min(0),
});

type SolverOnboardingData = z.infer<typeof SolverOnboardingSchema>;

export default function SolverOnboarding() {
  const [step, setStep] = useState(1);
  const [isParsing, setIsParsing] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<SolverOnboardingData>({
    resolver: zodResolver(SolverOnboardingSchema),
    mode: 'onChange',
    defaultValues: {
      similarTo: [],
      cloakedDomains: [],
    },
  });

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileParse();
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
     if(e.target.files && e.target.files[0]) {
        handleFileParse();
     }
  };

  const handleFileParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      setValue('similarTo', ['Fintech', 'SaaS', 'Web3'], { shouldValidate: true });
      setIsParsing(false);
      setStep(2);
    }, 2000);
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>, 
    field: 'similarTo' | 'cloakedDomains'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value.trim();
      if (value) {
        const current = getValues(field);
        if (!current.includes(value)) {
          setValue(field, [...current, value], { shouldValidate: true });
        }
        input.value = '';
      }
    }
  };

  const removeTag = (field: 'similarTo' | 'cloakedDomains', value: string) => {
    const current = getValues(field);
    setValue(
      field,
      current.filter((i) => i !== value),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: SolverOnboardingData) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          ...data,
          probationaryStatus: false, // Onboarding complete
        }, { merge: true });
        navigate('/marketplace');
      } catch (error) {
        console.error("Error updating user profile: ", error);
      }
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="text-center">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} accept=".pdf" />
            <label 
                htmlFor="file-upload"
                className="relative block w-full rounded-2xl border-2 border-dashed border-slate-700 p-12 text-center hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
            >
                {isParsing ? (
                    <div className="flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 text-blue-400 animate-spin" />
                        <p className="mt-4 text-lg font-semibold text-slate-300">Parsing your deck...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <UploadCloud className="h-12 w-12 text-slate-500" />
                        <p className="mt-4 text-lg font-semibold text-slate-300">Drag & Drop Your Pitch Deck</p>
                        <p className="text-sm text-slate-500">or click to upload (PDF only)</p>
                    </div>
                )}
            </label>
            <div className="my-6 flex items-center justify-center">
                <span className="h-px flex-1 bg-slate-700"></span>
                <span className="px-4 text-sm font-medium text-slate-500">OR</span>
                <span className="h-px flex-1 bg-slate-700"></span>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full h-12 px-6 font-semibold tracking-wide text-slate-100 transition duration-300 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
            >
                Enter Manually
            </button>
        </div>
      );
    }
    if (step === 2) {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label htmlFor="similarTo" className="flex items-center text-lg font-medium text-slate-300 mb-3">
                <Building className="w-5 h-5 mr-3 text-slate-500" />
                Which companies are you similar to?
              </label>
              <Input
                id="similarTo"
                placeholder="e.g., Plaid, Uber (press Enter to add)"
                onKeyDown={(e) => handleTagKeyDown(e, 'similarTo')}
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 shadow-inner ring-offset-slate-900 focus:ring-blue-500"
              />
              {errors.similarTo && <p className="text-red-500 text-sm mt-2">{errors.similarTo.message}</p>}
              <div className="flex flex-wrap gap-2 mt-3">
                {getValues('similarTo').map((item) => (
                  <Badge key={item} variant="secondary" className="bg-blue-900/50 text-blue-300 border border-blue-800 flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => removeTag('similarTo', item)} className="rounded-full hover:bg-blue-800/50 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="cloakedDomains" className="flex items-center text-lg font-medium text-slate-300 mb-3">
                <ShieldOff className="w-5 h-5 mr-3 text-slate-500" />
                Who should NOT see your sensitive data?
              </label>
              <Input
                id="cloakedDomains"
                placeholder="e.g., my-current-employer.com"
                onKeyDown={(e) => handleTagKeyDown(e, 'cloakedDomains')}
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 shadow-inner ring-offset-slate-900 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-500 mt-2">Press Enter to add a domain. Prevents specified companies from viewing your profile.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {getValues('cloakedDomains').map((domain) => (
                  <Badge key={domain} variant="secondary" className="bg-slate-700 text-slate-300 border border-slate-600 flex items-center gap-2">
                    {domain}
                    <button type="button" onClick={() => removeTag('cloakedDomains', domain)} className="rounded-full hover:bg-slate-600 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

          <Button 
            type="submit" 
            disabled={!isValid}
            className="w-full h-12 text-lg font-bold text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
            style={{
              boxShadow: isValid ? '0 0 20px rgba(129, 140, 248, 0.4)' : 'none'
            }}
          >
            Complete Onboarding
          </Button>
        </form>
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 text-slate-100">
      <div className="w-full max-w-lg mx-auto p-8 bg-slate-800/50 rounded-3xl border border-slate-700 shadow-2xl shadow-black/20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-2">
            Solver Onboarding
          </h1>
          <p className="text-slate-400">Tell us about your venture so we can match you with the right challenges.</p>
        </div>
        
        <div className="flex items-center justify-center mb-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step === 1 ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-700 text-slate-400'}`}>1</div>
          <div className="flex-1 h-1 bg-slate-700 mx-4 rounded-full">
             <div className="h-1 bg-blue-600 rounded-full transition-all duration-500" style={{ width: step === 2 ? '100%' : '0%' }}></div>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step === 2 ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-700 text-slate-400'}`}>2</div>
        </div>

        {renderStepContent()}
      </div>
      <p className="text-center text-xs text-slate-600 mt-8">Your data is encrypted and secure.</p>
    </div>
  );
}
