
import React from "react";
import { BookOpen, Calendar, CheckCircle, MessageCircle } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

interface ProgressOverviewProps {
  userProgress: {
    completedScenarios: number;
    totalScenarios: number;
    masteredVocabulary: number;
    totalVocabulary: number;
    streak: number;
  };
  userStats: {
    lastActivity: string;
    weeklyGoal: number;
    weeklyProgress: number;
  };
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ userProgress, userStats }) => {
  const { t } = useTranslation();

  const progressItems = [
    {
      icon: <MessageCircle className="h-6 w-6 text-yellow-500 mr-2" />,
      title: t('scenarios'),
      value: userProgress.completedScenarios,
      max: userProgress.totalScenarios,
      label: t('completedScenarios'),
      description: `${userProgress.completedScenarios} ${t('of')} ${userProgress.totalScenarios} ${t('completed')}`,
      color: "default" as const
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500 mr-2" />,
      title: t('vocabulary'),
      value: userProgress.masteredVocabulary,
      max: userProgress.totalVocabulary,
      label: t('masteredVocabulary'),
      description: `${userProgress.masteredVocabulary} ${t('of')} ${userProgress.totalVocabulary} ${t('mastered')}`,
      color: "success" as const
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500 mr-2" />,
      title: t('weeklyGoal'),
      value: userStats.weeklyProgress,
      max: userStats.weeklyGoal,
      label: t('weeklyExercises'),
      description: `${userStats.weeklyProgress} ${t('of')} ${userStats.weeklyGoal} ${t('exercises')}`,
      secondaryInfo: 
        <div className="flex items-center">
          <span className="text-sm font-medium text-medical-600 mr-1">{userProgress.streak}</span>
          <span className="text-sm text-neutral-500">{t('days')} {t('streak')}</span>
        </div>,
      color: "warning" as const  // Changed from "default" to "warning" to make it more distinct
    }
  ];

  return (
    <section className="container mx-auto mb-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-medical-600" />
        {t('progress')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {progressItems.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center mb-3">
              {item.icon}
              <h3 className="text-lg font-medium">{item.title}</h3>
            </div>
            <ProgressBar 
              value={item.value} 
              max={item.max} 
              showValue={true}
              color={item.color}
              label={item.label}
              className="mb-2"
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {item.description}
              </div>
              {item.secondaryInfo && (
                <div className="ml-auto">
                  {item.secondaryInfo}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProgressOverview;
