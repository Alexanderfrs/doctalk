
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, MessageCircle, Target, TrendingUp, Calendar, Clock } from "lucide-react";

interface PracticeStatsProps {
  userProgress: {
    scenarios_completed?: number;
    current_streak?: number;
    total_study_minutes?: number;
    vocabulary_mastered?: number;
    last_study_date?: string;
  };
  userLevel: string;
}

const PracticeStats: React.FC<PracticeStatsProps> = ({ userProgress, userLevel }) => {
  const progressPercentage = Math.round(((userProgress.scenarios_completed || 0) / 50) * 100);
  const weeklyGoal = 120; // minutes
  const weeklyProgress = Math.min((userProgress.total_study_minutes || 0) % (7 * weeklyGoal), weeklyGoal);

  return (
    <div className="space-y-4">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-600 truncate">Szenarien</p>
                <p className="text-lg md:text-xl font-bold">{userProgress.scenarios_completed || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-600 truncate">Streak</p>
                <p className="text-lg md:text-xl font-bold">{userProgress.current_streak || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-600 truncate">Fortschritt</p>
                <p className="text-lg md:text-xl font-bold">{progressPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-600 truncate">Level</p>
                <p className="text-lg md:text-xl font-bold">{userLevel}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Gesamtfortschritt
                </h4>
                <span className="text-sm text-gray-600">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-500">
                {userProgress.scenarios_completed || 0} von 50 Szenarien abgeschlossen
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Wochenziel
                </h4>
                <span className="text-sm text-gray-600">{Math.round((weeklyProgress / weeklyGoal) * 100)}%</span>
              </div>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-2" />
              <p className="text-xs text-gray-500">
                {weeklyProgress} von {weeklyGoal} Minuten diese Woche
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-medical-600" />
              <span className="font-medium">Letzte Aktivität</span>
            </div>
            <span className="text-sm text-gray-600">
              {userProgress.last_study_date 
                ? new Date(userProgress.last_study_date).toLocaleDateString('de-DE')
                : 'Noch keine Aktivität'
              }
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeStats;
