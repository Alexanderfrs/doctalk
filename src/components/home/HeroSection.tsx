
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import waitlist from '@zootools/waitlist-js';

const HeroSection = () => {
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          {/* Limited spots banner */}
          <div className="inline-flex items-center gap-2 bg-medical-100 text-medical-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-medical-500 rounded-full animate-pulse"></span>
            {translate("limitedFreeSpotsAvailable")}
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-800 mb-6 leading-tight">
            {translate("confidentCommunicationInGermanHealthcare")}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {translate("skipExpensiveLanguageCourses")}
          </p>

          {/* Target audience */}
          <p className="text-base md:text-lg text-neutral-500 mb-12 max-w-3xl mx-auto">
            {translate("perfectForInternationalWorkers")}
          </p>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-neutral-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {translate("developedWithExperts")}
            </div>
            <div className="flex items-center gap-2 text-neutral-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {translate("joinThePioneers")}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleWaitlistClick}
              size="lg" 
              className="bg-medical-500 hover:bg-medical-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {translate("getPriorityAccess")}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              {translate("comingSoonDemo")}
            </Button>
          </div>

          {/* Alpha access notice */}
          <p className="text-sm text-neutral-500 mt-6 max-w-2xl mx-auto">
            {translate("exclusiveAlphaAccessLimitedSpots")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
