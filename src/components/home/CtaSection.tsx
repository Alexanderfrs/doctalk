
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";
import SwipeableContainer from "@/components/ui/SwipeableContainer";

const CtaSection = () => {
  const isMobile = useIsMobile();
  const { translate } = useLanguage();

  // For mobile we'll use a swipeable container with multiple cards
  const ctaContents = [
    {
      heading: translate("ctaHeading"),
      text: translate("ctaText"),
      buttonText: translate("startWithExercises"),
    },
    {
      heading: translate("readyToImprove"),
      text: translate("startTodayCta"),
      buttonText: translate("registerFree"),
    }
  ];

  if (isMobile) {
    return (
      <section className="container mx-auto mb-16 animate-fade-in" style={{ animationDelay: '1300ms' }}>
        <SwipeableContainer 
          showArrows={false} 
          showIndicators={true}
          className="mb-2"
        >
          {ctaContents.map((content, index) => (
            <div 
              key={index}
              className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 text-white text-center relative overflow-hidden w-full"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.heading}</h2>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                {content.text}
              </p>
              <Button asChild size="lg" className="bg-white text-medical-600 hover:bg-white/90">
                <Link to={index === 0 ? "/practice" : "/register"}>
                  {content.buttonText}
                </Link>
              </Button>
              
              {/* Swipe indicator */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white/80 text-xs">
                <span className="bg-white/20 rounded-full px-3 py-1 flex items-center">
                  <span className="mr-1">{index === 0 ? translate("swipeLeft") : translate("swipeRight")}</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </SwipeableContainer>
        <div className="text-center text-xs text-neutral-500">
          {translate("swipeToSwitch")}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto mb-16 animate-fade-in" style={{ animationDelay: '1300ms' }}>
      <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-4">{translate("ctaHeading")}</h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          {translate("ctaText")}
        </p>
        <Button asChild size="lg" className="bg-white text-medical-600 hover:bg-white/90">
          <Link to="/practice">{translate("startWithExercises")}</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
