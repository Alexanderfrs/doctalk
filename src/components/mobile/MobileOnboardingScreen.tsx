
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

interface MobileOnboardingScreenProps {
  screenNumber: 1 | 2 | 3 | 4;
  onNext: () => void;
  onSkip: () => void;
  onStart: () => void;
  currentIndex: number;
  isLast?: boolean;
}

const MobileOnboardingScreen: React.FC<MobileOnboardingScreenProps> = ({
  screenNumber,
  onNext,
  onSkip,
  onStart,
  currentIndex,
  isLast = false
}) => {
  const { translate } = useLanguage();
  const [showAnimations, setShowAnimations] = useState(false);

  // Trigger animations for slides with animated content
  useEffect(() => {
    if (screenNumber === 2 || screenNumber === 3) {
      const timer = setTimeout(() => {
        setShowAnimations(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [screenNumber]);

  const getScreenContent = () => {
    switch (screenNumber) {
      case 1:
        return {
          icon: "🏥",
          title: "DocTalk",
          subtitle: translate(`mobileOnboarding.screen1.subtitle`) || "Master Medical German for Your Healthcare Career in Germany",
          description: "Swipe to discover more",
          showLogo: true
        };
      case 2:
        return {
          icon: "📋",
          title: translate(`mobileOnboarding.screen2.title`) || "Understanding the Recognition Process",
          subtitle: translate(`mobileOnboarding.screen2.subtitle`) || "Complete Your Journey to Practice Medicine",
          description: translate(`mobileOnboarding.screen2.description`) || "Navigate the complex recognition process with confidence",
          showLogo: false,
          showRecognitionProcess: true
        };
      case 3:
        return {
          icon: "📚",
          title: translate(`mobileOnboarding.screen3.title`) || "Medical Learning Made Simple",
          subtitle: translate(`mobileOnboarding.screen3.subtitle`) || "Master Medical Vocabulary & Terminology",
          description: translate(`mobileOnboarding.screen3.description`) || "Learn the language used on the ward",
          showLogo: false,
          showBulletPoints: true
        };
      case 4:
        return {
          icon: "💬",
          title: translate(`mobileOnboarding.screen4.title`) || "Voice & Role-playing",
          subtitle: translate(`mobileOnboarding.screen4.subtitle`) || "Speak and Listen to Real Medical Dialogue with AI",
          description: translate(`mobileOnboarding.screen4.description`) || "Practice Real-World Conversations",
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

  const recognitionSteps = [
    { text: "Document Verification", description: "Gather required credentials" },
    { text: "Language Certification", description: "Achieve B2/C1 level German" },
    { text: "Medical Knowledge Test", description: "Pass the Kenntnisprüfung" },
    { text: "Professional Integration", description: "Start your medical career" }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-medical-50 to-white relative overflow-hidden">
      {/* Skip button - positioned absolutely */}
      {!isLast && (
        <div className="absolute top-4 right-4 z-10 safe-area-top">
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="text-medical-600 hover:text-medical-700 touch-target px-4 py-2"
          >
            {translate("skip") || "Skip"}
          </Button>
        </div>
      )}

      {/* Main content - centered with proper spacing */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32 pt-20">
        <div className="w-full max-w-xs mx-auto text-center space-y-6">
          {/* Icon or Image - only show for non-logo screens */}
          {!content.showLogo && !content.showRecognitionProcess && (
            <div className="text-5xl mb-4">
              {content.icon}
            </div>
          )}

          {/* Logo for first screen - bigger and centered */}
          {content.showLogo && (
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <img 
                  src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
                  alt="DocTalk Logo"
                  className="h-20 w-auto"
                />
              </div>
            </div>
          )}

          {/* Recognition Process content for second screen */}
          {content.showRecognitionProcess && (
            <div className="flex flex-col items-center space-y-6">
              <div className="space-y-4 w-full">
                {recognitionSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-500 animate-complete ${
                      showAnimations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ 
                      animationDelay: `${index * 200}ms`,
                      opacity: showAnimations ? 1 : 0,
                      transform: showAnimations ? 'translateY(0)' : 'translateY(16px)'
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-5 h-5 rounded-full border-2 border-medical-500 flex items-center justify-center transition-all duration-500 ${
                        showAnimations ? 'bg-medical-500' : 'bg-transparent'
                      }`}>
                        {showAnimations && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-medical-800">{step.text}</div>
                        <div className="text-xs text-medical-600">{step.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold text-medical-800 leading-tight">
            {content.title}
          </h1>

          {/* Subtitle */}
          {content.subtitle && (
            <h2 className="text-lg font-medium text-medical-600 leading-relaxed">
              {content.subtitle}
            </h2>
          )}

          {/* For screen 4, show description before bullet points */}
          {screenNumber === 4 && content.description && (
            <p className="text-sm text-neutral-600 leading-relaxed">
              {content.description}
            </p>
          )}

          {/* Description with special handling for bullet points on screen 3 */}
          {!content.showRecognitionProcess && screenNumber !== 4 && (
            <div className="space-y-4">
              {content.showBulletPoints ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {bulletPoints.map((point, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-start space-x-3 text-left transition-all duration-500 animate-complete ${
                          showAnimations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                          opacity: showAnimations ? 1 : 0,
                          transform: showAnimations ? 'translateY(0)' : 'translateY(16px)'
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <div 
                            className={`w-5 h-5 rounded-full border-2 border-medical-500 flex items-center justify-center transition-all duration-500 ${
                              showAnimations ? 'bg-medical-500' : 'bg-transparent'
                            }`}
                          >
                            {showAnimations && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm text-neutral-700">{point}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mt-4">
                    {content.description}
                  </p>
                </div>
              ) : content.description ? (
                <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                  {content.description}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Action button - fixed at bottom with consistent positioning */}
      <div className="absolute bottom-8 left-0 right-0 w-full px-6 safe-area-bottom">
        {isLast ? (
          <Button 
            onClick={onStart}
            className="w-full h-12 text-base font-semibold bg-medical-500 hover:bg-medical-600 text-white rounded-xl touch-target"
          >
            {translate("start") || "Start"}
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            className="w-full h-12 text-base font-semibold bg-medical-500 hover:bg-medical-600 text-white rounded-xl touch-target"
          >
            {translate("next") || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileOnboardingScreen;
