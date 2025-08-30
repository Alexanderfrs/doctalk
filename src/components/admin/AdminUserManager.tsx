
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

const AdminUserManager: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const promoteToAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsLoading(true);

    try {
      // Admin role system has been temporarily disabled for stability
      toast.error('Admin role system is currently disabled. Please contact system administrator.');
      setEmail('');
    } catch (error) {
      console.error('Error promoting user:', error);
      toast.error('Failed to promote user to admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Admin User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={promoteToAdmin} className="space-y-4">
          <div>
            <Label htmlFor="email">User Email to Promote to Admin</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Promoting...' : 'Promote to Admin'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserManager;
