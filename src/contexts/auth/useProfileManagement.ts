
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { ProfilePreferences } from './types';

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
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
      
      // Set onboarding status based on profile data
      const preferences = data?.preferences || {};
      // Type check before accessing property
      const isOnboardingComplete = 
        typeof preferences === 'object' && 
        preferences !== null && 
        'onboardingComplete' in preferences && 
        Boolean(preferences.onboardingComplete);
      
      setOnboardingComplete(isOnboardingComplete);
      console.log("Profile loaded:", data, "Onboarding status:", isOnboardingComplete);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const completeOnboarding = async (user: User | null, data?: { name?: string }) => {
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

  const skipOnboarding = async (user: User | null) => {
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

  const updateProfile = async (user: User | null, data: Partial<{name: string, email: string, profession: string}>) => {
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

  return {
    profile,
    setProfile,
    onboardingComplete,
    setOnboardingComplete,
    fetchProfile,
    completeOnboarding,
    skipOnboarding,
    updateProfile
  };
};
