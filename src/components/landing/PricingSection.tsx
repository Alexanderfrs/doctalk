
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewMode } from "@/contexts/ViewModeContext";
import { Check, Clock, Users, Trophy, Building, BarChart3, Shield } from "lucide-react";
import waitlist from '@zootools/waitlist-js';

const PricingSection = () => {
  const { translate } = useLanguage();
  const { viewMode } = useViewMode();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  if (viewMode === 'enterprise') {
    // B2B Pricing
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {translate("simpleAndTransparentPricing")}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Investment solutions that scale with your organization's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Team Training Plan */}
          <div className="relative bg-white rounded-2xl shadow-xl border-2 border-medical-200 overflow-hidden h-full">
            <div className="p-6 lg:p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-medical-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-neutral-800">
                      {translate("teamTraining")}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {translate("teamTrainingDesc")}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl lg:text-4xl font-bold text-medical-600">
                    {translate("contactForPricing")}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("teamFeature1")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("teamFeature2")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("teamFeature3")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("teamFeature4")}</span>
                </li>
              </ul>

              <Button 
                className="w-full btn-primary text-lg py-3 mt-auto"
                onClick={handleWaitlistClick}
              >
                {translate("getPriorityAccess")}
              </Button>
            </div>
          </div>

          {/* Enterprise Solutions Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden h-full">
            <div className="p-6 lg:p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <Building className="h-8 w-8 text-neutral-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-neutral-800">
                    {translate("enterprisePlan")}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {translate("forClinicsHospitalsEducational")}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl lg:text-4xl font-bold text-neutral-600">
                    {translate("contactUs")}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("everythingFromProfessional")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("customOnboardingSupport")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("teamProgressTrackingAnalytics")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("volumeLicensingFlexibleBilling")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{translate("oralExamSimulations")}</span>
                </li>
              </ul>

              <Button 
                variant="outline" 
                className="w-full text-lg py-3 mt-auto"
                onClick={handleWaitlistClick}
              >
                {translate("contactUs")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // B2C Pricing (Individual)
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          {translate("simpleAndTransparentPricing")}
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {translate("choosePlanBestSuits")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Alpha Tester Plan */}
        <div className="relative bg-white rounded-2xl shadow-xl border-2 border-medical-200 overflow-hidden h-full">
          <div className="p-6 lg:p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-medical-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-neutral-800">
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
                <span className="text-3xl lg:text-4xl font-bold text-medical-600">
                  {translate("free")}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("alphaFeature1")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("alphaFeature2")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("alphaFeature3")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("priorityAccessAllFutureFeatures")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("exclusiveAlphaTesterCommunity")}</span>
              </li>
            </ul>

            <Button 
              className="w-full btn-primary text-lg py-3 mt-auto"
              onClick={handleWaitlistClick}
            >
              {translate("secureYourSpot")}
            </Button>
          </div>
        </div>

        {/* Enterprise Solutions Plan */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden h-full">
          <div className="p-6 lg:p-8 h-full flex flex-col">
            <div className="flex items-center mb-6">
              <Building className="h-8 w-8 text-neutral-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-800">
                  {translate("enterprisePlan")}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {translate("forClinicsHospitalsEducational")}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl lg:text-4xl font-bold text-neutral-600">
                  {translate("contactUs")}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("everythingFromProfessional")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("customOnboardingSupport")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("teamProgressTrackingAnalytics")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("volumeLicensingFlexibleBilling")}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">{translate("oralExamSimulations")}</span>
              </li>
            </ul>

            <Button 
              variant="outline" 
              className="w-full text-lg py-3 mt-auto"
              onClick={handleWaitlistClick}
            >
              {translate("contactUs")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
