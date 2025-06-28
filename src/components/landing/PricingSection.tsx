
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Clock, Users, Trophy, Building } from "lucide-react";
import waitlist from '@zootools/waitlist-js';

const PricingSection = () => {
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          {translate("simpleAndTransparentPricing")}
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {translate("choosePlanBestSuits")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Alpha Tester Plan */}
        <div className="relative bg-white rounded-2xl shadow-xl border-2 border-medical-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-medical-600 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800">
                    {translate("alphaTester")}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {translate("alphaTesterDesc")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-medical-600">
                  {translate("free")}
                </span>
                <span className="ml-2 text-neutral-500 line-through">
                  {translate("usuallyPaid")}
                </span>
              </div>
              <p className="text-neutral-500 text-sm mt-1">
                {translate("limitedTime")}
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("alphaFeature1")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("alphaFeature2")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("alphaFeature3")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("priorityAccessAllFutureFeatures")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("exclusiveAlphaTesterCommunity")}</span>
              </li>
            </ul>

            <Button 
              className="w-full btn-primary text-lg py-3"
              onClick={handleWaitlistClick}
            >
              {translate("claimAlphaSpot")}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm text-neutral-600">
                {translate("alphaAccessLimitedPre")}{' '}
                <span className="font-bold text-medical-600">
                  {translate("alphaAccessLimitedBold")}
                </span>
              </p>
              <p className="text-xs text-medical-600 font-medium mt-1">
                {translate("alphaAccessCta")}
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Solutions Plan */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <Building className="h-8 w-8 text-neutral-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-neutral-800">
                  {translate("enterpriseSolutions")}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {translate("forClinicsHospitalsEducational")}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-neutral-600">
                  {translate("contactUs")}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("everythingFromProfessional")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("customOnboardingSupport")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("teamProgressTrackingAnalytics")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("volumeLicensingFlexibleBilling")}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-700">{translate("oralExamSimulations")}</span>
              </li>
            </ul>

            <Button 
              variant="outline" 
              className="w-full text-lg py-3"
              onClick={handleWaitlistClick}
            >
              {translate("contactUs")}
            </Button>
          </div>
        </div>
      </div>

      {/* Additional CTA Section */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-medical-50 to-cyan-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-neutral-800 mb-4">
            {translate("readyToTransformYourCareer")}
          </h3>
          <Button size="lg" className="btn-primary" onClick={handleWaitlistClick}>
            {translate("getPriorityAccess")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
