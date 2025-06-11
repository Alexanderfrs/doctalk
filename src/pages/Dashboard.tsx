
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { useLearningRoadmap } from "@/hooks/useLearningRoadmap";
import ProgressOverview from "@/components/home/ProgressOverview";
import RecentScenarios from "@/components/home/RecentScenarios";
import LearningRoadmap from "@/components/dashboard/LearningRoadmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, TrendingUp, Target } from "lucide-react";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
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

  const handleObjectiveClick = (objective: any) => {
    if (objective.scenarioIds?.length > 0) {
      // Navigate to scenarios page or specific scenario
      toast.info(`Navigiere zu ${objective.title} Szenarien`);
    } else if (objective.vocabularyTopics?.length > 0) {
      // Navigate to vocabulary page with specific topics
      toast.info(`Navigiere zu ${objective.title} Vokabeln`);
    } else {
      toast.info(`${objective.title} wird bald verfügbar sein`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Bitte melden Sie sich an, um das Dashboard zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto py-8 px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-800 mb-2">
            Willkommen zurück{profile?.name ? `, ${profile.name}` : ''}!
          </h1>
          <p className="text-gray-600">
            Hier ist Ihr Lernfortschritt und Ihre personalisierten Empfehlungen.
          </p>
        </div>

        {/* Progress Overview */}
        <ProgressOverview 
          userProgress={progressData} 
          userStats={statsData} 
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Lernpfad
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Szenarien
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Vokabeln
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-6">
            {roadmap ? (
              <LearningRoadmap 
                roadmap={roadmap} 
                onObjectiveClick={handleObjectiveClick}
              />
            ) : roadmapLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p>Generiere personalisierten Lernpfad...</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="mb-4">
                    Führen Sie zunächst das Sprach-Assessment durch, um einen personalisierten Lernpfad zu erhalten.
                  </p>
                  <Button onClick={() => window.location.href = '/profile'}>
                    Assessment starten
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="scenarios">
            <RecentScenarios />
          </TabsContent>

          <TabsContent value="vocabulary">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Vokabel-Fortschritt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{masteryStats.totalWords}</div>
                    <div className="text-sm text-gray-500">Gesamt</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{masteryStats.masteredWords}</div>
                    <div className="text-sm text-gray-500">Gemeistert</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{masteryStats.intermediateWords}</div>
                    <div className="text-sm text-gray-500">In Bearbeitung</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-medical-600">{masteryStats.masteryPercentage}%</div>
                    <div className="text-sm text-gray-500">Fortschritt</div>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/vocabulary'}
                >
                  Vokabeln üben
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
