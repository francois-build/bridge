import { useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserProfile } from '../lib/schemas';
import { AuthContext, type AuthContextType } from './authContextDefinition';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Poll for the user's profile to prevent race conditions
        const interval = setInterval(async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
            clearInterval(interval);
          }
        }, 1000);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const assignRole = async (role: 'solver' | 'seeker' | 'connector') => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { role, probationaryStatus: true }, { merge: true });
        setUserProfile({ ...userProfile, role, probationaryStatus: true } as UserProfile);
      } catch (error) {
        console.error("Error assigning role: ", error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOut,
    assignRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
