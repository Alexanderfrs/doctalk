
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

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
  const [showCheckmarks, setShowCheckmarks] = useState(false);

  // Trigger checkmark animation for slide 3
  useEffect(() => {
    if (screenNumber === 3) {
      const timer = setTimeout(() => {
        setShowCheckmarks(true);
      }, 800); // Show checkmarks after 800ms
      return () => clearTimeout(timer);
    }
  }, [screenNumber]);

  const getScreenContent = () => {
    switch (screenNumber) {
      case 1:
        return {
          icon: "🏥",
          title: "DocTalk",
          subtitle: translate("mobileOnboarding.screen1.subtitle") || "The App to Speak, Work, Belong in German.",
          description: translate("mobileOnboarding.screen1.description") || "Your gateway to confident communication in German healthcare.",
          showLogo: true
        };
      case 2:
        return {
          icon: "🗣️",
          title: translate("mobileOnboarding.screen2.title") || "Voice & Role-playing",
          subtitle: translate("mobileOnboarding.screen2.subtitle") || "Practice Real-World Conversations",
          description: translate("mobileOnboarding.screen2.description") || "Understand the Recognition Process in Germany",
          showLogo: false
        };
      case 3:
        return {
          icon: "📚",
          title: translate("mobileOnboarding.screen3.title") || "Medical Learning",
          subtitle: translate("mobileOnboarding.screen3.subtitle") || "Master Medical Vocabulary & Terminology",
          description: translate("mobileOnboarding.screen3.description") || "Real clinic vocabulary\nMedical abbreviations\nMedical documentation\nLocal Dialects\n\nLearn the language that one the wards.",
          showLogo: false,
          showBulletPoints: true
        };
      case 4:
        return {
          icon: "💬",
          title: translate("mobileOnboarding.screen4.title") || "Practice Real-World Scenarios",
          subtitle: translate("mobileOnboarding.screen4.subtitle") || "Speak and Listen to Real Medical Dialogue",
          description: translate("mobileOnboarding.screen4.description") || "Practice Real-World Scenarios with AI",
          showLogo: false
        };
      default:
        return {
          icon: "🏥",
          title: "DocTalk",
          subtitle: "Welcome",
          description: "Let's get started",
          showLogo: false
        };
    }
  };

  const content = getScreenContent();
  const bulletPoints = [
    "Real clinic vocabulary",
    "Medical abbreviations", 
    "Medical documentation",
    "Local Dialects"
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-medical-50 to-white safe-area-top safe-area-bottom">
      {/* Skip button */}
      {!isLast && (
        <div className="w-full flex justify-end px-6 pt-4 pb-2">
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="text-medical-600 hover:text-medical-700 touch-target"
          >
            {translate("skip") || "Skip"}
          </Button>
        </div>
      )}

      {/* Content container - flexible height */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        <div className="w-full max-w-sm mx-auto text-center space-y-6">
          {/* Icon */}
          <div className="text-6xl sm:text-7xl mb-4">
            {content.icon}
          </div>

          {/* Logo for first screen */}
          {content.showLogo && (
            <div className="bg-white rounded-xl p-3 shadow-lg mb-4 mx-auto w-fit">
              <img 
                src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
                alt="DocTalk Logo"
                className="h-12 w-auto"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-medical-800 leading-tight">
            {content.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl font-medium text-medical-600 leading-relaxed">
            {content.subtitle}
          </h2>

          {/* Description with special handling for bullet points on screen 3 */}
          {content.showBulletPoints ? (
            <div className="space-y-4">
              <div className="space-y-3">
                {bulletPoints.map((point, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-start space-x-3 text-left animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`w-5 h-5 rounded-full border-2 border-medical-500 flex items-center justify-center transition-all duration-500 ${
                          showCheckmarks ? 'bg-medical-500' : 'bg-transparent'
                        }`}
                        style={{ animationDelay: `${800 + index * 200}ms` }}
                      >
                        {showCheckmarks && (
                          <Check 
                            className="w-3 h-3 text-white animate-scale-in" 
                            style={{ animationDelay: `${800 + index * 200}ms` }}
                          />
                        )}
                      </div>
                      <span className="text-sm text-neutral-700">{point}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mt-4">
                Learn the language that one the wards.
              </p>
            </div>
          ) : (
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed whitespace-pre-line">
              {content.description}
            </p>
          )}
        </div>
      </div>

      {/* Action button - fixed at bottom */}
      <div className="w-full px-6 pb-6">
        {isLast ? (
          <Button 
            onClick={onStart}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-medical-500 hover:bg-medical-600 text-white rounded-xl touch-target"
          >
            {translate("start") || "Start"}
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-medical-500 hover:bg-medical-600 text-white rounded-xl touch-target"
          >
            {translate("next") || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileOnboardingScreen;
