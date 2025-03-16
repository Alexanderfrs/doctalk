
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
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

// Define a type for the preferences object
export interface ProfilePreferences {
  onboardingComplete?: boolean;
  [key: string]: any; // Allow other properties
}
