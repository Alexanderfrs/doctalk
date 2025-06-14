
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { useLearningRoadmap } from "@/hooks/useLearningRoadmap";

export const useDashboardData = () => {
  const { profile } = useAuth();
  const { userProgress, recentSessions } = useProgressTracking();
  const { getMasteryStats } = useVocabularyProgress();
  const { roadmap: originalRoadmap, generateRoadmap, isLoading: roadmapLoading } = useLearningRoadmap();

  // Generate roadmap based on user's German level
  useEffect(() => {
    if (profile?.german_level && !originalRoadmap) {
      const assessmentResults = profile.preferences?.assessment_results;
      const strengths = assessmentResults?.strengths || [];
      generateRoadmap(profile.german_level, strengths);
    }
  }, [profile, originalRoadmap, generateRoadmap]);

  const roadmap = originalRoadmap ? {
    ...originalRoadmap,
    level: '',
    focus_area: '',
    objectives: originalRoadmap.objectives.map(obj => ({ ...obj, completed: false }))
  } : null;

  const masteryStats = getMasteryStats();

  // Ensure we always return stable default data to prevent component disappearing
  const progressData = {
    completedScenarios: userProgress?.scenarios_completed ?? 0,
    totalScenarios: 50, // This could be dynamic based on available scenarios
    masteredVocabulary: masteryStats.masteredWords ?? 0,
    totalVocabulary: masteryStats.totalWords ?? 500, // Default fallback
    streak: userProgress?.current_streak ?? 0
  };

  const statsData = {
    lastActivity: userProgress?.last_study_date ?? new Date().toISOString().split('T')[0],
    weeklyGoal: userProgress?.weekly_goal_minutes ?? 120,
    weeklyProgress: recentSessions?.slice(0, 7).reduce((sum, session) => sum + (session.minutes_studied ?? 0), 0) ?? 0
  };

  return {
    roadmap,
    roadmapLoading,
    progressData,
    statsData,
    profile
  };
};
