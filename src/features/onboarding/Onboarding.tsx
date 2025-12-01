import { useState } from 'react';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address' });

export default function Onboarding() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      // Handle successful validation
      console.log('Valid email:', email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow-levitated dark:bg-slate-800 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-center">Welcome to Marketplace</h2>
        <p className="text-center text-slate-500 dark:text-slate-400">
          Enter your email to get started.
        </p>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 border rounded-md shadow-concave dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="you@example.com"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
