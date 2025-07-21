import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewMode } from "@/contexts/ViewModeContext";
import { Users, Shield, CheckCircle, GraduationCap, BarChart3, Euro, MessageCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const SolutionSection = () => {
  const { translate } = useLanguage();
  const { viewMode } = useViewMode();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  // B2C Solutions (Individual Healthcare Workers)
  const b2cSolutions = [
    {
      icon: <Euro className="h-8 w-8 text-green-600" />,
      title: translate("solutionAffordable"),
      description: translate("solutionAffordableDesc"),
      highlight: translate("solutionAffordableHighlight")
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: translate("solutionFlexible"),
      description: translate("solutionFlexibleDesc"),
      highlight: translate("solutionFlexibleHighlight")
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: translate("solutionSpecialized"),
      description: translate("solutionSpecializedDesc"),
      highlight: translate("solutionSpecializedHighlight")
    }
  ];

  // B2B Solutions (Healthcare Organizations)
  const b2bSolutions = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: translate("solutionScalable"),
      description: translate("solutionScalableDesc"),
      highlight: translate("solutionScalableHighlight")
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: translate("solutionReducedTurnover"),
      description: translate("solutionReducedTurnoverDesc"),
      highlight: translate("solutionReducedTurnoverHighlight")
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: translate("solutionComplianceReporting"),
      description: translate("solutionComplianceReportingDesc"),
      highlight: translate("solutionComplianceReportingHighlight")
    }
  ];

  const solutions = viewMode === 'enterprise' ? b2bSolutions : b2cSolutions;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Solution Header */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
            {translate("whyChooseDocTalk")}
          </h3>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            {viewMode === 'enterprise' 
              ? translate("revolutionaryApproachForOrganizations")
              : translate("revolutionaryApproachToMedicalGerman")
            }
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {solution.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3 text-neutral-800">
                  {solution.title}
                </h4>
                <p className="text-neutral-600 mb-4 text-sm">
                  {solution.description}
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-green-700 font-semibold text-sm flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {solution.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button className="btn-primary px-8 py-3" onClick={handleWaitlistClick}>
              {translate("getPriorityAccess")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;
