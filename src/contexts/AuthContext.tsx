import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import type { UserProfile } from '../lib/schemas';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        const profileRef = doc(db, 'users', firebaseUser.uid);

        const unsubProfile = onSnapshot(profileRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          }
          // Profile might not exist yet, backend function is creating it.
          // The app will show the RoleSelection screen until the profile
          // (with a role) is created.
          setLoading(false);
        });

        return () => unsubProfile();
      } else {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const assignRole = async (role: 'solver' | 'seeker') => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user signed in to assign a role.');

    const profileRef = doc(db, 'users', currentUser.uid);
    try {
      // Use setDoc with merge:true to create or update the user's profile document.
      await setDoc(
        profileRef,
        {
          role: role,
          probationaryStatus: true, // Set probationary status as per user_flow.md
        },
        { merge: true }
      );
      // The onSnapshot listener will automatically update the local userProfile state.
    } catch (error) {
      console.error('Error assigning role: ', error);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOut,
    assignRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
