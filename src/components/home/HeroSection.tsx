
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import SwipeableContainer from "@/components/ui/SwipeableContainer";

const HeroSection = () => {
  const { translate } = useLanguage();
  const isMobile = useIsMobile();

  // For mobile swipe functionality
  const heroContents = [
    {
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      alt: translate("medicalStaffWorking"),
    },
    {
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
      alt: translate("hospitalScene"),
    },
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
      alt: translate("medicalEducation"),
    },
  ];

  if (isMobile) {
    return (
      <section className="container mx-auto mb-12">
        <div className="glass-panel p-4 md:p-8 flex flex-col items-center gap-8">
          <div className="w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="inline-block px-3 py-1 bg-medical-100 text-medical-800 rounded-full text-sm font-medium mb-4">
              {translate("medicalGerman")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-800">
              {translate("improveYour")} <span className="text-gradient">{translate("medicalCommunication")}</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
              {translate("trainScenarios")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/practice">{translate("startExercise")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-secondary">
                <Link to="/vocabulary">{translate("learnVocabulary")}</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
            <SwipeableContainer showArrows={false} showIndicators={true}>
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
          <p className="text-lg text-neutral-600 mb-6">
            {translate("trainScenarios")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/practice">{translate("startExercise")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary">
              <Link to="/vocabulary">{translate("learnVocabulary")}</Link>
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
              alt={translate("medicalStaffWorking")}
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
