import type { User } from 'firebase/auth';
import { createContext } from 'react';
import type { UserProfile } from '../lib/schemas';

export type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  assignRole: (role: 'solver' | 'seeker') => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
