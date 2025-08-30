
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { user, isLoading } = useAuth();
  
  // Simple role check - in production this would be more sophisticated
  const isAdmin = false; // Temporarily disabled to prevent issues
  
  return {
    isAdmin,
    role: 'user' as const,
    isLoading
  };
};
