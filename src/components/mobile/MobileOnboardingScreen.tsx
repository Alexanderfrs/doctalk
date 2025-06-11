
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileOnboardingScreenProps {
  screenNumber: 1 | 2 | 3 | 4;
  onNext: () => void;
  onSkip: () => void;
  onStart: () => void;
  isLast?: boolean;
}

const MobileOnboardingScreen: React.FC<MobileOnboardingScreenProps> = ({
  screenNumber,
  onNext,
  onSkip,
  onStart,
  isLast = false
}) => {
  const { translate } = useLanguage();

  const getScreenContent = () => {
    switch (screenNumber) {
      case 1:
        return {
          icon: "🏥",
          title: "DocTalk",
          subtitle: translate("mobileOnboarding.screen1.subtitle") || "The App to Speak, Work, Belong in German.",
          description: translate("mobileOnboarding.screen1.description") || "Your gateway to confident communication in German healthcare."
        };
      case 2:
        return {
          icon: "🗣️",
          title: translate("mobileOnboarding.screen2.title") || "Voice & Role-playing",
          subtitle: translate("mobileOnboarding.screen2.subtitle") || "Practice Real-World Conversations",
          description: translate("mobileOnboarding.screen2.description") || "Understand the Recognition Process in Germany"
        };
      case 3:
        return {
          icon: "📚",
          title: translate("mobileOnboarding.screen3.title") || "Medical Learning",
          subtitle: translate("mobileOnboarding.screen3.subtitle") || "Master Medical Vocabulary & Terminology",
          description: translate("mobileOnboarding.screen3.description") || "• Real clinic vocabulary\n• Medical abbreviations\n• Medical documentation\n• Local Dialects\n\nLearn the language that one the wards."
        };
      case 4:
        return {
          icon: "💬",
          title: translate("mobileOnboarding.screen4.title") || "Practice Real-World Scenarios",
          subtitle: translate("mobileOnboarding.screen4.subtitle") || "Speak and Listen to Real Medical Dialogue",
          description: translate("mobileOnboarding.screen4.description") || "Practice Real-World Scenarios with AI"
        };
      default:
        return {
          icon: "🏥",
          title: "DocTalk",
          subtitle: "Welcome",
          description: "Let's get started"
        };
    }
  };

  const content = getScreenContent();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-medical-50 to-white safe-area-top safe-area-bottom">
      {/* Skip button */}
      {!isLast && (
        <div className="w-full flex justify-end">
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="text-medical-600 hover:text-medical-700"
          >
            {translate("skip") || "Skip"}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-sm">
        {/* Icon */}
        <div className="text-8xl mb-4">
          {content.icon}
        </div>

        {/* Logo for first screen */}
        {screenNumber === 1 && (
          <div className="bg-white rounded-xl p-3 shadow-lg mb-4">
            <img 
              src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
              alt="DocTalk Logo"
              className="h-16 w-auto"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-medical-800 leading-tight">
          {content.title}
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl font-medium text-medical-600 leading-relaxed">
          {content.subtitle}
        </h2>

        {/* Description */}
        <p className="text-base text-neutral-600 leading-relaxed whitespace-pre-line">
          {content.description}
        </p>
      </div>

      {/* Action button */}
      <div className="w-full">
        {isLast ? (
          <Button 
            onClick={onStart}
            className="w-full h-14 text-lg font-semibold bg-medical-500 hover:bg-medical-600 text-white rounded-xl"
          >
            {translate("start") || "Start"}
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            className="w-full h-14 text-lg font-semibold bg-medical-500 hover:bg-medical-600 text-white rounded-xl"
          >
            {translate("next") || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileOnboardingScreen;
