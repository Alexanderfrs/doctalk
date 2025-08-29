
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Shield, Users, MessageSquare, Download } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/layout/Footer';

interface AlphaSubscriber {
  id: string;
  email: string;
  created_at: string;
}

interface TrialFeedback {
  id: string;
  was_helpful: boolean;
  what_helped_most: string[];
  improvement_suggestion: string;
  created_at: string;
  user_agent: string;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const [subscribers, setSubscribers] = useState<AlphaSubscriber[]>([]);
  const [feedback, setFeedback] = useState<TrialFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!roleLoading && !isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/dashboard');
      return;
    }
  }, [user, isAdmin, roleLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch alpha subscribers
      const { data: subscribersData, error: subscribersError } = await supabase
        .from('alpha_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (subscribersError) {
        console.error('Error fetching subscribers:', subscribersError);
        toast.error('Failed to fetch subscriber data');
      } else {
        setSubscribers(subscribersData || []);
      }

      // Fetch trial feedback
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('trial_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (feedbackError) {
        console.error('Error fetching feedback:', feedbackError);
        toast.error('Failed to fetch feedback data');
      } else {
        setFeedback(feedbackData || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  const exportData = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      ).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (roleLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      <AppHeader />
      
      <main className="flex-grow pt-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-medical-600" />
            <h1 className="text-3xl font-bold text-medical-800">Admin Dashboard</h1>
            <Badge variant="secondary" className="bg-medical-100 text-medical-800">
              Secure Access
            </Badge>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Alpha Subscribers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-medical-600" />
                    <CardTitle>Alpha Subscribers</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData(subscribers, 'alpha-subscribers.csv')}
                    disabled={subscribers.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <p className="text-sm text-gray-600 mb-4">
                      Total: {subscribers.length} subscribers
                    </p>
                    {subscribers.map((subscriber) => (
                      <div key={subscriber.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{subscriber.email}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(subscriber.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {subscribers.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No subscribers yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Trial Feedback */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-medical-600" />
                    <CardTitle>Trial Feedback</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData(feedback, 'trial-feedback.csv')}
                    disabled={feedback.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <p className="text-sm text-gray-600 mb-4">
                      Total: {feedback.length} responses ({feedback.filter(f => f.was_helpful).length} positive)
                    </p>
                    {feedback.map((item) => (
                      <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={item.was_helpful ? "default" : "secondary"}>
                            {item.was_helpful ? "Helpful" : "Not Helpful"}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {item.what_helped_most.length > 0 && (
                          <p className="text-sm mb-2">
                            <strong>What helped:</strong> {item.what_helped_most.join(', ')}
                          </p>
                        )}
                        {item.improvement_suggestion && (
                          <p className="text-sm">
                            <strong>Suggestions:</strong> {item.improvement_suggestion}
                          </p>
                        )}
                      </div>
                    ))}
                    {feedback.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No feedback yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
