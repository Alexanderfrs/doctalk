
import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from './types';
import { useAuthentication } from './useAuthentication';
import { useProfileManagement } from './useProfileManagement';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    signOut: authSignOut
  } = useAuthentication();

  const {
    profile,
    onboardingComplete,
    fetchProfile,
    completeOnboarding: profileCompleteOnboarding,
    skipOnboarding: profileSkipOnboarding,
    updateProfile: profileUpdateProfile
  } = useProfileManagement();
  
  useEffect(() => {
    const fetchInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      // Only update synchronous state here
      setSession(session);
      setUser(session?.user ?? null);
      
      // Use setTimeout to prevent potential deadlocks with Supabase client
      if (session?.user) {
        setTimeout(async () => {
          await fetchProfile(session.user.id);
        }, 0);
      }
    });

    // THEN check for existing session
    fetchInitialSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await authSignOut();
  };

  const completeOnboarding = async (data?: { name?: string }) => {
    await profileCompleteOnboarding(user, data);
  };

  const skipOnboarding = async () => {
    await profileSkipOnboarding(user);
  };

  const updateProfile = async (data: Partial<{name: string, email: string, profession: string}>) => {
    return await profileUpdateProfile(user, data);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
        onboardingComplete,
        completeOnboarding,
        skipOnboarding,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
