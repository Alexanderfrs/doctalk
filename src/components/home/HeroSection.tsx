
import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, Play, Globe, Users, Clock } from "lucide-react";
import waitlist from '@zootools/waitlist-js';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const stats = [
    { icon: Users, label: translate("internationalProfessionals"), value: "500+" },
    { icon: Clock, label: translate("hoursOfContent"), value: "50+" },
    { icon: Globe, label: translate("countriesServed"), value: "15+" },
  ];

  if (isMobile) {
    return (
      <section className="bg-gradient-to-br from-medical-50 to-white pt-8 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
              {translate("heroTitle")}
            </h1>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              {translate("heroSubtitle")}
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-medical-500 hover:bg-medical-600 text-white w-full"
                onClick={handleWaitlistClick}
              >
                {translate("getPriorityAccess")}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-medical-200 text-medical-700 hover:bg-medical-50 w-full"
              >
                <Play className="mr-2 h-5 w-5" />
                {translate("exploreDemo")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 text-medical-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-neutral-900">{stat.value}</div>
                <div className="text-xs text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-neutral-500 text-center">
            {translate("heroDescription")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-medical-50 to-white pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              {translate("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              {translate("heroSubtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="bg-medical-500 hover:bg-medical-600 text-white"
                onClick={handleWaitlistClick}
              >
                {translate("getPriorityAccess")}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-medical-200 text-medical-700 hover:bg-medical-50"
              >
                <Play className="mr-2 h-5 w-5" />
                {translate("exploreDemo")}
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-medical-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="text-neutral-500 text-center lg:text-left">
              {translate("heroDescription")}
            </p>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="aspect-square bg-gradient-to-br from-medical-100 to-medical-200 rounded-2xl flex items-center justify-center">
              <div className="text-medical-600 text-6xl font-bold">DocTalk</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
