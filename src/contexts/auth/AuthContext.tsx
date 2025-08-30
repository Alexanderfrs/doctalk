
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
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        setIsLoading(true);
        
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state changed:", event, session?.user?.id);
          
          // Only update synchronous state here to prevent deadlocks
          setSession(session);
          setUser(session?.user ?? null);
          
          // Use setTimeout to prevent potential deadlocks with Supabase client
          if (session?.user) {
            setTimeout(async () => {
              try {
                await fetchProfile(session.user.id);
              } catch (error) {
                console.error("Error fetching profile in auth state change:", error);
              }
            }, 0);
          }
        });

        // THEN check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
        } else {
          console.log("Initial session:", session?.user?.id);
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            try {
              await fetchProfile(session.user.id);
            } catch (error) {
              console.error("Error fetching profile during init:", error);
            }
          }
        }

        return () => {
          console.log("Cleaning up auth subscription");
          subscription?.unsubscribe();
        };
        
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const cleanup = initializeAuth();
    
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, []);

  const signOut = async () => {
    try {
      await authSignOut();
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  const completeOnboarding = async (data?: { name?: string }) => {
    try {
      await profileCompleteOnboarding(user, data);
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const skipOnboarding = async () => {
    try {
      await profileSkipOnboarding(user);
    } catch (error) {
      console.error("Error skipping onboarding:", error);
    }
  };

  const updateProfile = async (data: Partial<{name: string, email: string, profession: string}>) => {
    try {
      return await profileUpdateProfile(user, data);
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error, data: null };
    }
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
