
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X, AlertCircle } from "lucide-react";

const ComparisonTable = () => {
  const { translate } = useLanguage();
  
  const benefits = [
    {
      icon: <Check className="h-6 w-6 text-green-500" />,
      title: translate("specializedMedicalContent"),
      description: translate("specializedMedicalContentDesc"),
      others: translate("limitedOrNone")
    },
    {
      icon: <Check className="h-6 w-6 text-green-500" />,
      title: translate("realisticHospitalScenarios"),
      description: translate("realisticHospitalScenariosDesc"),
      others: translate("genericConversations")
    },
    {
      icon: <Check className="h-6 w-6 text-green-500" />,
      title: translate("flexibleProfessionalFocus"),
      description: translate("flexibleProfessionalFocusDesc"),
      others: translate("rigidSchedules")
    },
    {
      icon: <Check className="h-6 w-6 text-green-500" />,
      title: translate("expertDevelopedContent"),
      description: translate("expertDevelopedContentDesc"),
      others: translate("generalContent")
    }
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800">
          {translate("whyChooseDocTalk")}
        </h3>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {translate("whyChooseDocTalkDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {benefit.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-800 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-neutral-600 text-sm mb-3">
                  {benefit.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <X className="h-4 w-4 text-red-400" />
                  <span>{translate("otherSolutions")}: {benefit.others}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-medical-50 p-6 rounded-xl border border-medical-100">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-6 w-6 text-medical-600" />
          <h4 className="font-semibold text-medical-800">
            {translate("bottomLine")}
          </h4>
        </div>
        <p className="text-medical-700">
          {translate("bottomLineDesc")}
        </p>
      </div>
    </div>
  );
};

export default ComparisonTable;
