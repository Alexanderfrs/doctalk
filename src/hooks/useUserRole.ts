
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'admin' | 'user' | null;

export const useUserRole = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setIsLoading(false);
        return;
      }

      try {
        // For now, default all users to 'user' role
        // TODO: Implement proper role system when user_roles table is available
        setRole('user');
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole('user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = role === 'admin';

  return { role, isAdmin, isLoading };
};
