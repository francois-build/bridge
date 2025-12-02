
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserProfileSchema } from '../../lib/schemas';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { X } from 'lucide-react';

const SolverOnboardingSchema = UserProfileSchema.extend({
  pitchDeckUrl: z.string().optional(),
  similarTo: z.array(z.string()),
  cloakedDomains: z.array(z.string()).min(0),
});

type SolverOnboardingData = z.infer<typeof SolverOnboardingSchema>;

export default function SolverOnboarding() {
  const [step, setStep] = useState(1);
  const [isParsing, setIsParsing] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SolverOnboardingData>({
    resolver: zodResolver(SolverOnboardingSchema),
    defaultValues: {
      similarTo: [],
      cloakedDomains: [],
    },
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsParsing(true);
    setTimeout(() => {
      setValue('similarTo', ['Fintech', 'SaaS']);
      setIsParsing(false);
      setStep(2);
    }, 2000);
  };

  const handleCloakedDomainKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value.trim().replace(/^(https?:\/\/)/, '');
      if (value) {
        const currentCloakedDomains = getValues('cloakedDomains');
        if (!currentCloakedDomains.includes(value)) {
          setValue('cloakedDomains', [...currentCloakedDomains, value]);
        }
        input.value = '';
      }
    }
  };

  const removeCloakedDomain = (domain: string) => {
    const currentCloakedDomains = getValues('cloakedDomains');
    setValue(
      'cloakedDomains',
      currentCloakedDomains.filter((d) => d !== domain)
    );
  };

  const onSubmit = async (data: SolverOnboardingData) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          ...data,
          probationaryStatus: true,
        }, { merge: true });
        navigate('/');
      } catch (error) {
        console.error("Error updating user profile: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Tell us about your startup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div
              className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {isParsing ? (
                <div>
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Parsing...</p>
                </div>
              ) : (
                <p>Drop your Pitch Deck (PDF) to auto-fill.</p>
              )}
            </div>
          )}

          {step >= 2 && (
            <div>
              <label htmlFor="similarTo" className="block text-sm font-medium text-text-secondary mb-2">
                Which company are you most like?
              </label>
              <Controller
                name="similarTo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="similarTo"
                    placeholder="e.g., Plaid, Uber"
                    className="shadow-concave"
                  />
                )}
              />
              {errors.similarTo && <p className="text-red-500 text-sm mt-1">{errors.similarTo.message}</p>}
            </div>
          )}

          {step >= 2 && (
            <div>
              <label htmlFor="cloakedDomains" className="block text-sm font-medium text-text-secondary mb-2">
                Who should NOT see your sensitive data?
              </label>
              <Input
                id="cloakedDomains"
                placeholder="Press Enter to add a domain"
                onKeyDown={handleCloakedDomainKeyDown}
                className="shadow-concave"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {getValues('cloakedDomains').map((domain) => (
                  <Badge key={domain} variant="secondary" className="flex items-center gap-1">
                    {domain}
                    <button type="button" onClick={() => removeCloakedDomain(domain)}>
                      <X className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {step > 1 && <Button type="submit" className="w-full">Complete Profile</Button>}
        </form>
        {step === 1 && <Button onClick={()=>setStep(2)} className="w-full mt-4">Or, enter manually</Button>}
      </div>
    </div>
  );
}
