
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Heart, MessageCircle, Globe, Users, Rocket, ShieldCheck } from "lucide-react";

const FeaturesGrid = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-medical-600" />,
      title: t("medicalVocabulary"),
      description: t("learnTerms")
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-medical-600" />,
      title: t("practicalDialogs"),
      description: t("practiceConversations")
    },
    {
      icon: <Globe className="h-8 w-8 text-medical-600" />,
      title: t("allLanguageLevels"),
      description: t("customContent")
    },
    {
      icon: <Users className="h-8 w-8 text-medical-600" />,
      title: t("expertDeveloped"),
      description: t("contentDevelopment")
    },
    {
      icon: <Rocket className="h-8 w-8 text-medical-600" />,
      title: t('anerkennungFspSupport'),
      description: t('anerkennungExamPreparation')
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-medical-600" />,
      title: t("safeFlexibleTraining"),
      description: t("safeFlexibleTrainingDesc")
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-medical-50 rounded-full flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold mb-3 text-neutral-800">
            {feature.title}
          </h3>
          <p className="text-neutral-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;
