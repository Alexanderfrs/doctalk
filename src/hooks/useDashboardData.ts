
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { useLearningRoadmap } from "@/hooks/useLearningRoadmap";

export const useDashboardData = () => {
  const { profile } = useAuth();
  const { userProgress, recentSessions } = useProgressTracking();
  const { getMasteryStats } = useVocabularyProgress();
  const { roadmap, generateRoadmap, isLoading: roadmapLoading } = useLearningRoadmap();

  // Generate roadmap based on user's German level
  useEffect(() => {
    if (profile?.german_level && !roadmap) {
      const assessmentResults = profile.preferences?.assessment_results;
      const strengths = assessmentResults?.strengths || [];
      generateRoadmap(profile.german_level, strengths);
    }
  }, [profile, roadmap, generateRoadmap]);

  const masteryStats = getMasteryStats();

  // Calculate progress data for ProgressOverview component
  const progressData = {
    completedScenarios: userProgress?.scenarios_completed || 0,
    totalScenarios: 50, // This could be dynamic based on available scenarios
    masteredVocabulary: masteryStats.masteredWords,
    totalVocabulary: masteryStats.totalWords || 500, // Default fallback
    streak: userProgress?.current_streak || 0
  };

  const statsData = {
    lastActivity: userProgress?.last_study_date || new Date().toISOString().split('T')[0],
    weeklyGoal: userProgress?.weekly_goal_minutes || 120,
    weeklyProgress: recentSessions.slice(0, 7).reduce((sum, session) => sum + session.minutes_studied, 0)
  };

  return {
    roadmap,
    roadmapLoading,
    progressData,
    statsData,
    profile
  };
};
