
import React, { useEffect, useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import ProgressOverview from "@/components/home/ProgressOverview";
import RecentScenarios from "@/components/home/RecentScenarios";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLearningRoadmap } from "@/hooks/useLearningRoadmap";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import scenarios from "@/data/scenarios";
import { Calendar, BookOpen, Trophy, Target, Clock, CheckCircle, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { translate } = useLanguage();
  const { profile } = useAuth();
  const { roadmap, generateRoadmap, updateObjectiveProgress } = useLearningRoadmap();
  const { userProgress, recentSessions, isLoading: progressLoading } = useProgressTracking();

  useEffect(() => {
    if (profile?.german_level && !roadmap) {
      generateRoadmap(profile.german_level, []);
    }
  }, [profile, roadmap, generateRoadmap]);

  // Use real progress data from the database
  const userStats = {
    lastActivity: userProgress?.last_study_date || "2024-01-15",
    weeklyGoal: userProgress?.weekly_goal_minutes ? Math.ceil(userProgress.weekly_goal_minutes / userProgress.daily_goal_minutes) : 5,
    weeklyProgress: recentSessions.length
  };

  // Calculate real user progress from database
  const realUserProgress = {
    completedScenarios: userProgress?.scenarios_completed || 0,
    totalScenarios: scenarios.length,
    masteredVocabulary: userProgress?.vocabulary_mastered || 0,
    totalVocabulary: 400, // This could be dynamic based on available vocabulary
    streak: userProgress?.current_streak || 0
  };

  // Get recent/recommended scenarios
  const activeScenarios = scenarios.slice(0, 6).map(scenario => ({
    ...scenario,
    completed: Math.random() > 0.7, // Random completion status for demo
    progress: Math.floor(Math.random() * 100)
  }));

  const isLowLevel = profile?.german_level && ['A1', 'A2'].includes(profile.german_level);

  // Calculate today's progress towards daily goal
  const todaySession = recentSessions.find(session => {
    const today = new Date().toISOString().split('T')[0];
    return session.session_date === today;
  });
  const todayMinutes = todaySession?.minutes_studied || 0;
  const dailyGoal = userProgress?.daily_goal_minutes || 20;
  const dailyProgress = Math.min(Math.round((todayMinutes / dailyGoal) * 100), 100);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-800 mb-2">
            Willkommen zurück{profile?.name ? `, ${profile.name}` : ''}!
          </h1>
          <p className="text-neutral-600">
            {profile?.german_level 
              ? `Ihr aktuelles Niveau: ${profile.german_level} • Setzen Sie Ihr medizinisches Deutsch-Training fort`
              : "Setzen Sie Ihr medizinisches Deutsch-Training fort"
            }
          </p>
        </div>

        {/* Low Level Warning */}
        {isLowLevel && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <Target className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 mr-3" />
              <div className="text-sm">
                <p className="text-amber-800 mb-1 font-medium">Empfehlung für Ihr Niveau ({profile?.german_level}):</p>
                <p className="text-amber-700">
                  Wir empfehlen, zunächst Ihre allgemeinen Deutschkenntnisse auf B1-Niveau zu verbessern. 
                  Die verfügbaren medizinischen Inhalte sind angepasst, aber werden herausfordernd sein.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-medical-50 to-blue-50 rounded-xl p-6 border border-medical-100">
            <div className="flex items-center mb-3">
              <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
              <h3 className="text-lg font-medium text-medical-800">Tagesziel</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-medical-700">{todayMinutes}min</span>
                <span className="text-sm text-medical-600">von {dailyGoal}min</span>
              </div>
              <Progress value={dailyProgress} className="h-2" />
              <p className="text-xs text-medical-600">{dailyProgress}% des Tagesziels erreicht</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center mb-3">
              <Calendar className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-medium text-green-800">Streak</h3>
            </div>
            <div className="text-2xl font-bold text-green-700">{realUserProgress.streak}</div>
            <p className="text-sm text-green-600">Tage in Folge</p>
            {userProgress?.longest_streak && userProgress.longest_streak > realUserProgress.streak && (
              <p className="text-xs text-green-500 mt-1">Rekord: {userProgress.longest_streak} Tage</p>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center mb-3">
              <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium text-blue-800">Fortschritt</h3>
            </div>
            <div className="text-2xl font-bold text-blue-700">{roadmap?.progressPercentage || 0}%</div>
            <p className="text-sm text-blue-600">Lernziele erreicht</p>
            <p className="text-xs text-blue-500 mt-1">
              {userProgress?.total_study_minutes || 0} Minuten insgesamt
            </p>
          </div>
        </div>

        {/* Learning Roadmap Section */}
        {roadmap && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-medical-600" />
                Ihr Lernpfad
              </h2>
              <div className="text-sm text-gray-500">
                {roadmap.currentPhase} • Niveau {roadmap.userLevel}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Current Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Target className="mr-2 h-5 w-5" />
                    Aktuelle Lernziele
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {roadmap.weeklyGoals.length > 0 ? (
                    <div className="space-y-4">
                      {roadmap.weeklyGoals.map((objective) => (
                        <div key={objective.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{objective.title}</h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 h-3 w-3" />
                              {objective.estimatedTime}min
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{objective.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              objective.category === 'vocabulary' 
                                ? 'bg-blue-100 text-blue-700'
                                : objective.category === 'communication'
                                ? 'bg-green-100 text-green-700'
                                : objective.category === 'scenarios'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {objective.category === 'vocabulary' && 'Vokabeln'}
                              {objective.category === 'communication' && 'Kommunikation'}
                              {objective.category === 'scenarios' && 'Szenarien'}
                              {objective.category === 'grammar' && 'Grammatik'}
                            </span>
                            <Button
                              size="sm"
                              variant={objective.completed ? "outline" : "default"}
                              onClick={() => updateObjectiveProgress(objective.id, !objective.completed)}
                              className="text-xs"
                            >
                              {objective.completed ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <ArrowRight className="mr-1 h-3 w-3" />
                              )}
                              {objective.completed ? 'Erledigt' : 'Starten'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Keine aktuellen Lernziele verfügbar.</p>
                  )}
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Lernfortschritt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Gesamtfortschritt</span>
                        <span className="text-sm text-gray-600">{roadmap.progressPercentage}%</span>
                      </div>
                      <Progress value={roadmap.progressPercentage} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 bg-medical-50 rounded-lg">
                        <div className="text-lg font-bold text-medical-700">
                          {realUserProgress.completedScenarios}
                        </div>
                        <div className="text-xs text-medical-600">Szenarien</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700">
                          {realUserProgress.masteredVocabulary}
                        </div>
                        <div className="text-xs text-blue-600">Vokabeln</div>
                      </div>
                    </div>

                    {roadmap.nextRecommendations.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h5 className="text-sm font-medium mb-2">Nächste Schritte:</h5>
                        <ul className="space-y-1">
                          {roadmap.nextRecommendations.slice(0, 3).map((rec) => (
                            <li key={rec.id} className="text-xs text-gray-600 flex items-center">
                              <ArrowRight className="mr-1 h-3 w-3" />
                              {rec.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Progress Overview */}
        <ProgressOverview 
          userProgress={realUserProgress}
          userStats={userStats}
        />

        {/* Recent Scenarios */}
        <RecentScenarios activeScenarios={activeScenarios} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
