
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, Zap, Users } from "lucide-react";
import BetaSignupDialog from "@/components/beta/BetaSignupDialog";

const CtaSection = () => {
  const isMobile = useIsMobile();
  const { translate } = useLanguage();

  if (isMobile) {
    return (
      <section className="container mx-auto mb-16 animate-fade-in landing-mobile-section" style={{ animationDelay: '1300ms' }}>
        <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl cta-mobile-fix text-white text-center relative overflow-hidden w-full">
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            {translate("limitedSpots")}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{translate("joinExclusiveAlpha")}</h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            {translate("beAmongFirstProfessionals")}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6 text-sm text-white/80">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{translate("exclusiveCommunity")}</span>
            </div>
          </div>

          <BetaSignupDialog
            triggerElement={
              <Button size="lg" className="bg-white text-medical-600 hover:bg-white/90 w-full">
                {translate("secureAlphaSpot")}
              </Button>
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto mb-16 animate-fade-in" style={{ animationDelay: '1300ms' }}>
      <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
        <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold flex items-center">
          <Zap className="h-4 w-4 mr-2" />
          {translate("limitedSpots")}
        </div>
        
        <h2 className="text-3xl font-bold mb-4">{translate("joinExclusiveAlpha")}</h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          {translate("beAmongFirstProfessionals")}
        </p>
        
        <div className="flex items-center justify-center gap-6 mb-8 text-sm text-white/80">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>{translate("exclusiveCommunity")}</span>
          </div>
        </div>

        <BetaSignupDialog
          triggerElement={
            <Button size="lg" className="bg-white text-medical-600 hover:bg-white/90">
              {translate("secureAlphaSpot")}
            </Button>
          }
        />
      </div>
    </section>
  );
};

export default CtaSection;
