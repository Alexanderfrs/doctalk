import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComparisonItem } from "@/types/landing";
const ComparisonTable = () => {
  const {
    translate
  } = useLanguage();
  const comparisons: ComparisonItem[] = [{
    feature: "Learning Focus",
    general: "Generic language learning, basic vocabulary",
    medlingua: "Specialized medical terminology and professional communication"
  }, {
    feature: "Practical Application",
    general: "Limited real-world scenarios",
    medlingua: "Real medical workplace situations and dialogues"
  }, {
    feature: "Time Efficiency",
    general: "Long learning path with irrelevant content",
    medlingua: "Focused learning for immediate workplace use"
  }, {
    feature: "Professional Support",
    general: "Standard language tutors",
    medlingua: "Medical field experts and specialized guidance"
  }, {
    feature: "Industry Recognition",
    general: "General language certificates",
    medlingua: "Healthcare-specific certifications and credentials"
  }];
  return <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-neutral-200">
      <h3 className="text-xl font-bold mb-4 text-center">Why Choose MedLingua?</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-4 text-left">Feature</th>
              <th className="py-3 px-4 text-center">German language schools</th>
              <th className="py-3 px-4 text-center bg-medical-50 font-medium">DocTalk</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, index) => <tr key={index} className={index < comparisons.length - 1 ? "border-b border-neutral-100" : ""}>
                <td className="py-3 px-4">{item.feature}</td>
                <td className="py-3 px-4 text-center">{item.general}</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">{item.medlingua}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default ComparisonTable;