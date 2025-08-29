
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
        // For now, default to 'user' role since user_roles table types aren't available yet
        // This will be updated once the database types are regenerated
        console.log('User role system: defaulting to user role until types are updated');
        setRole('user');
        
        // TODO: Once user_roles table types are available, implement proper role checking:
        // const { data, error } = await supabase
        //   .from('user_roles')
        //   .select('role')
        //   .eq('user_id', user.id)
        //   .single();
        
        // if (error && error.code !== 'PGRST116') {
        //   console.error('Error fetching user role:', error);
        //   setRole('user');
        // } else {
        //   setRole(data?.role || 'user');
        // }
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
