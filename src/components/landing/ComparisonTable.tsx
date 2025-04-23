
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComparisonItem } from "@/types/landing";
import { Check, MinusCircle, X } from "lucide-react";

const ComparisonTable = () => {
  const { translate } = useLanguage();

  const comparisons: ComparisonItem[] = [
    {
      feature: "Specialized medical vocabulary and terminology tailored for healthcare professionals",
      languageSchool: "limited",
      genericApp: "none",
      medlingua: "full"
    },
    {
      feature: "Real medical scenarios and practice dialogues from actual hospital environments",
      languageSchool: "limited",
      genericApp: "none",
      medlingua: "full"
    },
    {
      feature: "Flexible learning schedule with immediate practical workplace application",
      languageSchool: "none",
      genericApp: "limited",
      medlingua: "full"
    },
    {
      feature: "Expert guidance from medical professionals and language specialists",
      languageSchool: "limited",
      genericApp: "none",
      medlingua: "full"
    },
    {
      feature: "Healthcare-specific certification recognized in the medical field",
      languageSchool: "none",
      genericApp: "none",
      medlingua: "full"
    }
  ];

  const getIcon = (level: "full" | "limited" | "none") => {
    switch (level) {
      case "full":
        return <Check className="mx-auto text-green-500" size={24} />;
      case "limited":
        return <MinusCircle className="mx-auto text-yellow-500" size={24} />;
      case "none":
        return <X className="mx-auto text-red-500" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-neutral-200">
      <h3 className="text-xl font-bold mb-4 text-center">Why choose DocTalk?</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-4 text-left w-1/2">Feature</th>
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
                <td className="py-3 px-4 text-center">{getIcon(item.languageSchool)}</td>
                <td className="py-3 px-4 text-center">{getIcon(item.genericApp)}</td>
                <td className="py-3 px-4 text-center bg-medical-50">
                  {getIcon(item.medlingua)}
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
