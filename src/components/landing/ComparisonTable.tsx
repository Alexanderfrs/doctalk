
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComparisonItem } from "@/types/landing";

const ComparisonTable = () => {
  const { translate } = useLanguage();

  const comparisons: ComparisonItem[] = [
    {
      feature: "Learning Focus",
      languageSchool: "General German with basic professional terms",
      genericApp: "Basic vocabulary, general conversation",
      medlingua: "Specialized medical terminology and professional communication"
    },
    {
      feature: "Practical Application",
      languageSchool: "Limited healthcare scenarios if any",
      genericApp: "Generic daily life situations",
      medlingua: "Real medical workplace situations and dialogues"
    },
    {
      feature: "Time Efficiency",
      languageSchool: "Fixed schedules, travel time required",
      genericApp: "Flexible but unfocused content",
      medlingua: "Focused learning for immediate workplace use"
    },
    {
      feature: "Professional Support",
      languageSchool: "General language teachers",
      genericApp: "Automated feedback only",
      medlingua: "Medical field experts and specialized guidance"
    },
    {
      feature: "Industry Recognition",
      languageSchool: "General language certificates",
      genericApp: "App-specific achievements",
      medlingua: "Healthcare-specific certifications and credentials"
    }
  ];

  return (
    <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-neutral-200">
      <h3 className="text-xl font-bold mb-4 text-center">Why Choose MedLingua?</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-4 text-left">Feature</th>
              <th className="py-3 px-4 text-center">German language schools</th>
              <th className="py-3 px-4 text-center">Language learning apps</th>
              <th className="py-3 px-4 text-center bg-medical-50 font-medium">DocTalk</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, index) => (
              <tr
                key={index}
                className={index < comparisons.length - 1 ? "border-b border-neutral-100" : ""}
              >
                <td className="py-3 px-4">{item.feature}</td>
                <td className="py-3 px-4 text-center">{item.languageSchool}</td>
                <td className="py-3 px-4 text-center">{item.genericApp}</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">
                  {item.medlingua}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
