import { useState } from 'react';
import { z } from 'zod';
import { RoleSelection } from './RoleSelection';

const emailSchema = z.string().email({ message: 'Invalid email address' });

type OnboardingState = 'roleSelection' | 'emailEntry';

export default function Onboarding() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>('roleSelection');

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setOnboardingState('emailEntry');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      // Handle successful validation
      console.log('Valid email:', email, 'for role:', role);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (onboardingState === 'roleSelection') {
    return <RoleSelection onSelect={handleRoleSelect} />;
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-surface-raised border rounded-lg shadow-levitated">
          <h2 className="text-xl font-semibold text-center text-primary">Welcome to Marketplace</h2>
          <p className="text-center text-primary/70">
            Enter your email to get started as a {role}.
          </p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-medium text-primary">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-surface border rounded-md shadow-concave focus:outline-none focus:ring-2 focus:ring-action"
              placeholder="you@example.com"
            />
            {error && <p className="text-sm text-warning">{error}</p>}
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-action rounded-md shadow-mechanical hover:bg-action/90 focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
