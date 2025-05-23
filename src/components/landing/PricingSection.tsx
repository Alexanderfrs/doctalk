
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";
import { PricingPlan } from "@/types/landing";

const PricingSection = () => {
  const { translate } = useLanguage();

  const plans: PricingPlan[] = [
    {
      title: translate("basic"),
      description: translate("forBeginners"),
      price: translate("free"),
      features: [
        translate("basicFeature1"),
        translate("basicFeature2"),
        translate("basicFeature3"),
        "Earn free Pro trial by maintaining learning streaks"
      ],
      buttonText: translate("startFree"),
      buttonVariant: "outline"
    },
    {
      title: translate("professional"),
      description: translate("forActiveLearners"),
      price: "€9,99",
      features: [
        translate("proFeature1"),
        translate("proFeature2"),
        translate("proFeature3"),
        translate("proFeature4"),
        translate("proFeature5")
      ],
      buttonText: translate("startFree"),
      highlighted: true
    },
    {
      title: translate("team"),
      description: translate("forInstitutions"),
      features: [
        translate("teamFeature1"),
        translate("teamFeature2"),
        translate("teamFeature3"),
        translate("teamFeature4"),
        translate("teamFeature5")
      ],
      buttonText: translate("contactUs"),
      buttonVariant: "outline"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`${
            plan.highlighted
              ? "bg-medical-50 border-medical-200"
              : "bg-white border-neutral-100"
          } p-6 rounded-xl shadow-sm border relative`}
        >
          {plan.highlighted && (
            <div className="absolute -top-3 right-4 bg-medical-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {translate("recommended")}
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{plan.title}</h3>
            <p className="text-neutral-500 mt-1">{plan.description}</p>
          </div>
          {plan.price && (
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.price !== translate("free") && (
                <span className="text-neutral-500"> / {translate("month")}</span>
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
          {plan.title === translate("team") ? (
            <Link to="/contact">
              <Button className="w-full" variant={plan.buttonVariant}>
                {plan.buttonText}
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button
                className={`w-full ${
                  plan.highlighted ? "bg-medical-500 hover:bg-medical-600" : ""
                }`}
                variant={plan.buttonVariant}
              >
                {plan.buttonText}
              </Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingSection;
