
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Star, Crown } from "lucide-react";
import { PricingPlan } from "@/types/landing";
import waitlist from '@zootools/waitlist-js';

const PricingSection = () => {
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const plans: PricingPlan[] = [
    {
      title: translate("alphaTester"),
      description: translate("alphaTesterDesc"),
      price: translate("free"),
      features: [
        translate("alphaFeature1"),
        translate("alphaFeature2"),
        translate("alphaFeature3"),
        translate("exclusiveAlphaFeature1"),
        translate("exclusiveAlphaFeature2"),
      ],
      buttonText: translate("claimAlphaSpot"),
      buttonVariant: "outline",
      highlighted: true,
    },
    {
      title: translate("enterpriseSolutions"),
      description: translate("enterpriseSolutionsDesc"),
      features: [
        translate("teamFeature1"),
        translate("enterpriseFeature1"),
        translate("enterpriseFeature2"),
        translate("enterpriseFeature3"),
        translate("teamFeature5"),
      ],
      buttonText: translate("contactUs"),
      buttonVariant: "outline",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`${
            plan.highlighted
              ? "bg-medical-50 border-medical-200 relative"
              : "bg-white border-neutral-100"
          } p-6 rounded-xl shadow-sm border`}
        >
          {plan.highlighted && (
            <>
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-neutral-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                <Crown className="h-3 w-3 mr-1" />
                {translate("exclusiveAccess")}
              </div>
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                <Star className="h-3 w-3 mr-1" />
                {translate("limitedTime")}
              </div>
            </>
          )}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{plan.title}</h3>
            <p className="text-neutral-500 mt-1">{plan.description}</p>
          </div>
          {plan.price && (
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.highlighted && (
                <span className="text-sm text-green-600 ml-2 font-medium">
                  {translate("usuallyPaid")}
                </span>
              )}
            </div>
          )}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {plan.title === translate("enterpriseSolutions") ? (
            <Button asChild className="w-full" variant={plan.buttonVariant}>
              <a href="mailto:doctalk.ai@gmail.com">{plan.buttonText}</a>
            </Button>
          ) : (
            <Button
              onClick={handleWaitlistClick}
              className={`w-full ${
                plan.highlighted ? "bg-medical-500 hover:bg-medical-600" : ""
              }`}
              variant={plan.buttonVariant}
            >
              {plan.buttonText}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingSection;
