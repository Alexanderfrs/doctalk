import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signUp: (email: string, password: string, name: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  completeOnboarding: (data?: { name?: string }) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  updateProfile: (data: Partial<{name: string, email: string, profession: string}>) => Promise<{
    error: any | null;
    data: any | null;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (profile) {
      const preferences = profile.preferences || {};
      setOnboardingComplete(preferences.onboardingComplete === true);
    }
  }, [profile]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return { data, error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            name: name,
            preferences: {
              onboardingComplete: false
            }
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      return { data, error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (data?: { name?: string }) => {
    if (!user) return;
    
    try {
      const updateData: any = {
        preferences: {
          ...profile?.preferences,
          onboardingComplete: true
        }
      };
      
      if (data?.name) {
        updateData.name = data.name;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating profile:', error);
        return;
      }
      
      setOnboardingComplete(true);
      setProfile({
        ...profile,
        ...data,
        preferences: {
          ...profile?.preferences,
          onboardingComplete: true
        }
      });
      
      toast.success("Onboarding abgeschlossen!");
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const skipOnboarding = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: {
            ...profile?.preferences,
            onboardingComplete: true
          }
        })
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating profile:', error);
        return;
      }
      
      setOnboardingComplete(true);
      setProfile({
        ...profile,
        preferences: {
          ...profile?.preferences,
          onboardingComplete: true
        }
      });

      toast.success("Onboarding übersprungen. Sie können es später in den Einstellungen durchführen.");
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  const updateProfile = async (data: Partial<{name: string, email: string, profession: string}>) => {
    if (!user) return { data: null, error: 'Not authenticated' };
    
    try {
      const profileUpdates: any = {};
      let hasProfileUpdates = false;
      
      if (data.name !== undefined && data.name !== profile?.name) {
        profileUpdates.name = data.name;
        hasProfileUpdates = true;
      }
      
      if (data.profession !== undefined && data.profession !== profile?.profession) {
        profileUpdates.profession = data.profession;
        hasProfileUpdates = true;
      }
      
      if (hasProfileUpdates) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileUpdates)
          .eq('id', user.id);
          
        if (profileError) {
          console.error('Error updating profile:', profileError);
          return { data: null, error: profileError };
        }
        
        setProfile({
          ...profile,
          ...profileUpdates
        });
        
        console.log('Profile updated successfully:', profileUpdates);
      }
      
      if (data.email && data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });
        
        if (emailError) {
          console.error('Error updating email:', emailError);
          return { data: null, error: emailError };
        }
        
        toast.success("E-Mail-Adresse wurde aktualisiert. Bitte prüfen Sie Ihre E-Mails für einen Bestätigungslink.");
      }
      
      return { data: true, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
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
