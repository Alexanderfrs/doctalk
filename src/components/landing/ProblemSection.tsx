import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewMode } from "@/contexts/ViewModeContext";
import { Euro, MessageCircle, BookOpen, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const ProblemSection = () => {
  const { translate } = useLanguage();
  const { viewMode } = useViewMode();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  // B2C Problems (Individual Healthcare Workers)
  const b2cProblems = [
    {
      icon: <Euro className="h-8 w-8 text-red-500" />,
      title: translate("problemHighCosts"),
      description: translate("problemHighCostsDesc"),
      stat: translate("problemHighCostsStat")
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-red-500" />,
      title: translate("problemTimeConstraints"),
      description: translate("problemTimeConstraintsDesc"),
      stat: translate("problemTimeConstraintsStat")
    },
    {
      icon: <BookOpen className="h-8 w-8 text-red-500" />,
      title: translate("problemGenericSolutions"),
      description: translate("problemGenericSolutionsDesc"),
      stat: translate("problemGenericSolutionsStat")
    }
  ];

  // B2B Problems (Healthcare Organizations)
  const b2bProblems = [
    {
      icon: <TrendingUp className="h-8 w-8 text-red-500" />,
      title: translate("problemStaffTurnover"),
      description: translate("problemStaffTurnoverDesc"),
      stat: translate("problemStaffTurnoverStat")
    },
    {
      icon: <Clock className="h-8 w-8 text-red-500" />,
      title: translate("problemExtendedOnboarding"),
      description: translate("problemExtendedOnboardingDesc"),
      stat: translate("problemExtendedOnboardingStat")
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: translate("problemComplianceRisks"),
      description: translate("problemComplianceRisksDesc"),
      stat: translate("problemComplianceRisksStat")
    }
  ];

  const problems = viewMode === 'enterprise' ? b2bProblems : b2cProblems;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Problem Section with new heading */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              {viewMode === 'enterprise' 
                ? translate("theProblem")
                : translate("realityForInternationalProfessionals")
              }
            </h3>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {viewMode === 'enterprise' 
                ? translate("challengesFacingHealthcareOrganizations")
                : translate("realityForInternationalProfessionalsDesc")
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {problem.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3 text-neutral-800">
                  {problem.title}
                </h4>
                <p className="text-neutral-600 mb-4 text-sm">
                  {problem.description}
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <span className="text-red-700 font-semibold text-sm">
                    {problem.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button className="btn-primary px-8 py-3" onClick={handleWaitlistClick}>
              {translate("secureYourSpot")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSection;
