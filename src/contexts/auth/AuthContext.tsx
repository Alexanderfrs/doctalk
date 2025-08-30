
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { AuthContextType } from './types';
import { useAuthentication } from './useAuthentication';
import { useProfileManagement } from './useProfileManagement';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    session,
    setSession,
    user,
    setUser,
    isLoading,
    setIsLoading,
    signIn,
    signUp,
    signOut
  } = useAuthentication();

  const {
    profile,
    setProfile,
    onboardingComplete,
    setOnboardingComplete,
    fetchProfile,
    completeOnboarding,
    skipOnboarding,
    updateProfile
  } = useProfileManagement();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setOnboardingComplete(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, setSession, setUser, setIsLoading, setProfile, setOnboardingComplete]);

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    onboardingComplete,
    completeOnboarding: (data) => completeOnboarding(user, data),
    skipOnboarding: () => skipOnboarding(user),
    updateProfile: (data) => updateProfile(user, data)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
