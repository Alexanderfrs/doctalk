
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LearningSession {
  id: string;
  user_id: string;
  session_date: string;
  minutes_studied: number;
  scenarios_completed: number;
  vocabulary_practiced: number;
  created_at: string;
  updated_at: string;
}

interface UserProgress {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  total_study_minutes: number;
  scenarios_completed: number;
  vocabulary_mastered: number;
  last_study_date: string | null;
  weekly_goal_minutes: number;
  daily_goal_minutes: number;
  created_at: string;
  updated_at: string;
}

interface ScenarioAttempt {
  id: string;
  user_id: string;
  scenario_id: string;
  scenario_type: string;
  completed_at: string;
  duration_minutes: number | null;
  accuracy_score: number | null;
  confidence_score: number | null;
  feedback_quality: string | null;
  notes: string | null;
  created_at: string;
}

export const useProgressTracking = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [recentSessions, setRecentSessions] = useState<LearningSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user progress:', error);
        return;
      }

      setUserProgress(data);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recent learning sessions
  const fetchRecentSessions = async (limit = 7) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('session_date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching recent sessions:', error);
        return;
      }

      setRecentSessions(data || []);
    } catch (error) {
      console.error('Error fetching recent sessions:', error);
    }
  };

  // Record a learning session
  const recordLearningSession = async (sessionData: {
    minutes_studied: number;
    scenarios_completed?: number;
    vocabulary_practiced?: number;
  }) => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('learning_sessions')
        .upsert({
          user_id: user.id,
          session_date: today,
          minutes_studied: sessionData.minutes_studied,
          scenarios_completed: sessionData.scenarios_completed || 0,
          vocabulary_practiced: sessionData.vocabulary_practiced || 0,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,session_date'
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording learning session:', error);
        return false;
      }

      // Update user progress
      await updateUserProgress();
      await fetchRecentSessions();

      return true;
    } catch (error) {
      console.error('Error recording learning session:', error);
      return false;
    }
  };

  // Record a scenario attempt with confidence score
  const recordScenarioAttempt = async (attemptData: {
    scenario_id: string;
    scenario_type: string;
    duration_minutes?: number;
    accuracy_score?: number;
    confidence_score?: number;
    feedback_quality?: 'excellent' | 'good' | 'needs_improvement';
    notes?: string;
  }) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('scenario_attempts')
        .insert({
          user_id: user.id,
          ...attemptData
        });

      if (error) {
        console.error('Error recording scenario attempt:', error);
        return false;
      }

      // Update session and progress
      await recordLearningSession({
        minutes_studied: attemptData.duration_minutes || 0,
        scenarios_completed: 1
      });

      return true;
    } catch (error) {
      console.error('Error recording scenario attempt:', error);
      return false;
    }
  };

  // Update user progress based on recent activity
  const updateUserProgress = async () => {
    if (!user) return;

    try {
      // Calculate current streak
      const { data: sessions } = await supabase
        .from('learning_sessions')
        .select('session_date')
        .eq('user_id', user.id)
        .order('session_date', { ascending: false });

      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      
      if (sessions && sessions.length > 0) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Check for current streak
        const sortedDates = sessions.map(s => new Date(s.session_date)).sort((a, b) => b.getTime() - a.getTime());
        
        // Calculate streaks
        for (let i = 0; i < sortedDates.length; i++) {
          const sessionDate = sortedDates[i];
          const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (i === 0 && (daysDiff === 0 || daysDiff === 1)) {
            currentStreak = 1;
            tempStreak = 1;
          } else if (i > 0) {
            const prevDate = sortedDates[i - 1];
            const daysBetween = Math.floor((prevDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (daysBetween === 1) {
              if (i === 1 && currentStreak > 0) currentStreak++;
              tempStreak++;
            } else {
              longestStreak = Math.max(longestStreak, tempStreak);
              tempStreak = 1;
            }
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak, currentStreak);
      }

      // Calculate total statistics
      const { data: totalStats } = await supabase
        .from('learning_sessions')
        .select('minutes_studied, scenarios_completed')
        .eq('user_id', user.id);

      const totalMinutes = totalStats?.reduce((sum, session) => sum + session.minutes_studied, 0) || 0;
      const totalScenarios = totalStats?.reduce((sum, session) => sum + session.scenarios_completed, 0) || 0;

      // Get vocabulary mastered count
      const { count: vocabularyMastered } = await supabase
        .from('vocabulary_mastery')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('mastery_level', 3); // Consider level 3+ as mastered

      // Update user progress
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          current_streak: currentStreak,
          longest_streak: longestStreak,
          total_study_minutes: totalMinutes,
          scenarios_completed: totalScenarios,
          vocabulary_mastered: vocabularyMastered || 0,
          last_study_date: sessions && sessions.length > 0 ? sessions[0].session_date : null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating user progress:', error);
      } else {
        await fetchUserProgress();
      }
    } catch (error) {
      console.error('Error calculating user progress:', error);
    }
  };

  // Initialize data when user changes
  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchRecentSessions();
    }
  }, [user]);

  return {
    userProgress,
    recentSessions,
    isLoading,
    recordLearningSession,
    recordScenarioAttempt,
    updateUserProgress,
    fetchUserProgress,
    fetchRecentSessions
  };
};
