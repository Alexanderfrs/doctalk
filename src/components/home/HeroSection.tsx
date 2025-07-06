import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewMode } from "@/contexts/ViewModeContext";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Shield, Building2, TrendingUp } from "lucide-react";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import ViewModeToggle from "@/components/landing/ViewModeToggle";
import waitlist from '@zootools/waitlist-js';

const HeroSection = () => {
  const { translate } = useLanguage();
  const { viewMode } = useViewMode();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const heroContents = [
    {
      image: "/lovable-uploads/2cee5e65-91a5-46de-8fc0-957b2d81ef0f.png",
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

  const handleSwipeChange = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, heroContents.length - 1));
  };

  // Dynamic content based on view mode
  const getHeroContent = () => {
    if (viewMode === 'enterprise') {
      return {
        title: translate("empowerYourInternationalTeam"),
        description: translate("reduceOnboardingCosts"),
        targetAudience: translate("forHealthcareOrganizationsDesc"),
        trustSignals: [
          {
            icon: <Shield className="h-4 w-4 mr-1" />,
            text: translate("expertDeveloped")
          },
          {
            icon: <TrendingUp className="h-4 w-4 mr-1" />,
            text: "Proven ROI"
          }
        ]
      };
    } else {
      return {
        title: translate("landYourDreamMedicalJob"),
        description: translate("skipExpensiveCoursesAndGetFluent"),
        targetAudience: translate("forInternationalHealthcareWorkers"),
        trustSignals: [
          {
            icon: <Shield className="h-4 w-4 mr-1" />,
            text: translate("expertDeveloped")
          },
          {
            icon: <Users className="h-4 w-4 mr-1" />,
            text: translate("joinPioneers")
          }
        ]
      };
    }
  };

  const heroContent = getHeroContent();

  if (isMobile) {
    return (
      <section className="container mx-auto mb-12 landing-mobile-section">
        {/* Free Trial CTA Banner */}
        <div className="mb-4 mx-auto max-w-sm bg-gradient-to-r from-medical-500 to-medical-600 text-white px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center justify-center gap-2 text-base font-medium">
            <span>🚀</span>
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20 h-auto py-2 px-3">
              <Link to="/trial">Start free trial exercise now</Link>
            </Button>
          </div>
        </div>
        <div className="glass-panel hero-mobile-fix flex flex-col items-center gap-6">
          <ViewModeToggle />
          
          <div className="w-full opacity-100 visible transition-all duration-500">
            <h1 className="text-3xl font-bold mb-4 text-neutral-800">
              {heroContent.title}
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              {heroContent.description}
            </p>
            
            {/* Target audience clarification */}
            <p className="text-sm text-neutral-500 mb-6 bg-medical-50 p-3 rounded-lg border border-medical-100">
              {heroContent.targetAudience}
            </p>

            {/* Trust Signals */}
            <div className="flex items-center justify-center gap-4 mb-6 text-sm text-neutral-500">
              {heroContent.trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center">
                  {signal.icon}
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button size="lg" className="btn-primary w-full" onClick={handleWaitlistClick}>
                {translate("getPriorityAccess")}
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/trial">{translate("exploreDemo")}</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full opacity-100 visible" ref={containerRef}>
            <div className="relative">
              <SwipeableContainer 
                showArrows={false} 
                showIndicators={true}
                onSwipe={handleSwipeChange}
                initialIndex={activeIndex}
                className="swipeable-mobile"
              >
                {heroContents.map((content, i) => (
                  <div key={i} className="relative border-4 border-white rounded-2xl shadow-xl overflow-hidden w-full">
                    <img 
                      src={content.image} 
                      alt={content.alt} 
                      className="hero-image-mobile opacity-100 visible"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
                  </div>
                ))}
              </SwipeableContainer>
              
              <Button 
                variant="ghost" 
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2"
                onClick={handlePrevious}
                disabled={activeIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2"
                onClick={handleNext}
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
      {/* Free Trial CTA Banner */}
      <div className="mb-6 mx-auto max-w-md bg-gradient-to-r from-medical-500 to-medical-600 text-white px-6 py-3 rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-3 text-base font-medium">
          <span>🚀</span>
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20 h-auto py-2 px-4">
            <Link to="/trial">Start free trial exercise now</Link>
          </Button>
        </div>
      </div>
      <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 opacity-100 visible">
          <ViewModeToggle />
          
          <div className="transition-all duration-500">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
              {heroContent.title}
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              {heroContent.description}
            </p>
            
            {/* Target audience clarification */}
            <p className="text-md text-neutral-500 mb-6 bg-medical-50 p-4 rounded-lg border border-medical-100">
              {heroContent.targetAudience}
            </p>

            {/* Trust Signals */}
            <div className="flex items-center gap-6 mb-6 text-sm text-neutral-500">
              {heroContent.trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center">
                  {signal.icon}
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-primary shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 active:scale-95" onClick={handleWaitlistClick}>
                  {translate("getPriorityAccess")}
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 active:scale-95">
                  <Link to="/trial">{translate("exploreDemo")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 opacity-100 visible">
          <div className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="/lovable-uploads/2cee5e65-91a5-46de-8fc0-957b2d81ef0f.png" 
              alt={translate("medicalTeamWorking")}
              className="w-full h-[300px] object-cover opacity-100 visible"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
