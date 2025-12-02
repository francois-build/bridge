import { createContext } from 'react';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../lib/schemas';

export type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  assignRole: (role: 'solver' | 'seeker' | 'connector') => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
