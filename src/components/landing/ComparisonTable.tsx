
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComparisonItem } from "@/types/landing";

const ComparisonTable = () => {
  const { translate } = useLanguage();

  const comparisons: ComparisonItem[] = [
    {
      feature: translate("medicalVocabulary"),
      general: translate("medicalVocabularyComparison"),
      medlingua: translate("comprehensiveSpecialized")
    },
    {
      feature: translate("dialogScenarios"),
      general: translate("everydayConversations"),
      medlingua: translate("realisticMedical")
    },
    {
      feature: translate("learningGoal"),
      general: translate("generalLanguageSkills"),
      medlingua: translate("professionalCommunication")
    },
    {
      feature: translate("professionalSupport"),
      general: translate("minimal"),
      medlingua: translate("specificPreparation")
    }
  ];

  return (
    <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-neutral-200">
      <h3 className="text-xl font-bold mb-4 text-center">{translate("comparisonTitle")}</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-4 text-left">{translate("feature")}</th>
              <th className="py-3 px-4 text-center">{translate("generalApps")}</th>
              <th className="py-3 px-4 text-center bg-medical-50 font-medium">MedLingua</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, index) => (
              <tr key={index} className={index < comparisons.length - 1 ? "border-b border-neutral-100" : ""}>
                <td className="py-3 px-4">{item.feature}</td>
                <td className="py-3 px-4 text-center">{item.general}</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">{item.medlingua}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
