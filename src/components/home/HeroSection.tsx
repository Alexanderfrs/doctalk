
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import BetaSignupDialog from "@/components/beta/BetaSignupDialog";
import { useSwipeable } from "react-swipeable";

const HeroSection = () => {
  const { translate } = useLanguage();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  // For mobile swipe functionality
  const heroContents = [
    {
      image: "/lovable-uploads/43247cd2-5d31-42bf-966b-35cdfc412dfa.png",
      alt: translate("medicalTeamWorking"),
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
      alt: translate("hospitalScene"),
    },
    {
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
      alt: translate("medicalEducation"),
    },
  ];
  
  // Manual swipe handlers for text content
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => Math.min(prev + 1, 2)),
    onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: false,
    trackTouch: true,
    delta: 10
  });

  if (isMobile) {
    return (
      <section className="container mx-auto mb-12">
        <div className="glass-panel p-4 md:p-8 flex flex-col items-center gap-8">
          <div 
            className="w-full animate-fade-in touch-pan-y" 
            style={{ animationDelay: '100ms' }}
            {...swipeHandlers}
          >
            <span className="inline-block px-3 py-1 bg-medical-100 text-medical-800 rounded-full text-sm font-medium mb-4">
              {translate("medicalGerman")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-800">
              {translate("improveYour")} <span className="text-gradient">{translate("medicalCommunication")}</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              {translate("trainScenarios")}
            </p>
            <p className="text-md text-neutral-500 mb-6">
              {translate("targetAudience")}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="btn-primary active:scale-95 transition-transform duration-150">
                  <Link to="/practice">{translate("startExercise")}</Link>
                </Button>
                <BetaSignupDialog
                  triggerElement={
                    <Button variant="outline" size="lg" className="btn-secondary shadow-md hover:shadow-lg active:scale-95 transition-all duration-150">
                      {translate("joinBeta")}
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
          
          <div className="w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              <SwipeableContainer 
                showArrows={false} 
                showIndicators={true}
                onSwipe={setActiveIndex}
                initialIndex={activeIndex}
              >
                {heroContents.map((content, i) => (
                  <div key={i} className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden w-full">
                    <img 
                      src={content.image} 
                      alt={content.alt} 
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
                  </div>
                ))}
              </SwipeableContainer>
              
              {/* Custom arrow buttons outside of SwipeableContainer */}
              <Button 
                variant="ghost" 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2"
                onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                disabled={activeIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2"
                onClick={() => setActiveIndex((prev) => Math.min(prev + 1, heroContents.length - 1))}
                disabled={activeIndex === heroContents.length - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto mb-12">
      <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <span className="inline-block px-3 py-1 bg-medical-100 text-medical-800 rounded-full text-sm font-medium mb-4">
            {translate("medicalGerman")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
            {translate("improveYour")} <span className="text-gradient">{translate("medicalCommunication")}</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            {translate("trainScenarios")}
          </p>
          <p className="text-md text-neutral-500 mb-6">
            {translate("targetAudience")}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-primary active:scale-95 transition-transform duration-150">
                <Link to="/practice">{translate("startExercise")}</Link>
              </Button>
              <BetaSignupDialog
                triggerElement={
                  <Button variant="outline" size="lg" className="btn-secondary shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 active:scale-95">
                    {translate("joinBeta")}
                  </Button>
                }
              />
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="/lovable-uploads/43247cd2-5d31-42bf-966b-35cdfc412dfa.png" 
              alt={translate("medicalTeamWorking")}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
