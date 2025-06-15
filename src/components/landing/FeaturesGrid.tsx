
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, MessageCircle, Globe, Users, Award, Rocket } from "lucide-react";

const FeaturesGrid = () => {
  const { translate } = useLanguage();
  
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-medical-600" />,
      title: translate("medicalVocabulary"),
      description: translate("learnTerms")
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-medical-600" />,
      title: translate("practicalDialogs"),
      description: translate("practiceConversations")
    },
    {
      icon: <Globe className="h-8 w-8 text-medical-600" />,
      title: translate("allLanguageLevels"),
      description: translate("customContent")
    },
    {
      icon: <Users className="h-8 w-8 text-medical-600" />,
      title: translate("expertDeveloped"),
      description: translate("contentDevelopment")
    },
    {
      icon: <Rocket className="h-8 w-8 text-medical-600" />,
      title: "Karriere-Beschleuniger", // "Career Accelerator"
      description: "Verschaffen Sie sich einen Wettbewerbsvorteil. Unser gezieltes Training ist darauf ausgelegt, Sie schneller zertifizieren zu lassen und in Deutschland arbeitsfähig zu machen."
    },
    {
      icon: <Award className="h-8 w-8 text-medical-600" />,
      title: "Exklusiver Gründerstatus", // "Exclusive Founder Status"
      description: "Die ersten 50 Mitglieder erhalten den Gründerstatus mit lebenslangen Vorteilen und dem Privileg, die Zukunft von DocTalk mitzugestalten."
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
