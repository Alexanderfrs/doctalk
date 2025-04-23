
import React from "react";
import { GraduationCap, Users, Globe, Shield, Heart, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Feature } from "@/types/landing";

const FeaturesGrid = () => {
  const { translate } = useLanguage();

  const features: Feature[] = [
    {
      icon: <GraduationCap className="h-6 w-6 text-medical-600" />,
      title: translate("medicalVocabulary"),
      description: translate("learnTerms")
    },
    {
      icon: <Users className="h-6 w-6 text-medical-600" />,
      title: translate("practicalDialogs"),
      description: translate("practiceConversations")
    },
    {
      icon: <Globe className="h-6 w-6 text-medical-600" />,
      title: translate("allLanguageLevels"),
      description: translate("customContent")
    },
    {
      icon: <Shield className="h-6 w-6 text-medical-600" />,
      title: translate("expertDeveloped"),
      description: translate("contentDevelopment")
    },
    {
      icon: <Heart className="h-6 w-6 text-medical-600" />,
      title: translate("nurseOptimized"),
      description: translate("internationalNurses")
    },
    {
      icon: <Award className="h-6 w-6 text-medical-600" />,
      title: translate("certificationRecognition"),
      description: translate("examPreparation")
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
          <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-neutral-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;
