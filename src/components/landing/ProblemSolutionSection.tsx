
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquareWarning, DollarSign, Users } from "lucide-react";

const ProblemSolutionSection: React.FC = () => {
  const { translate } = useLanguage();

  const problems = [
    {
      icon: DollarSign,
      title: translate("problemHighCosts"),
      description: translate("problemHighCostsDesc"),
      stat: translate("problemHighCostsStat")
    },
    {
      icon: MessageSquareWarning,
      title: translate("problemTimeConstraints"),
      description: translate("problemTimeConstraintsDesc"),
      stat: translate("problemTimeConstraintsStat")
    },
    {
      icon: Users,
      title: translate("problemGenericSolutions"),
      description: translate("problemGenericSolutionsDesc"),
      stat: translate("problemGenericSolutionsStat")
    },
    {
      icon: CheckCircle,
      title: translate("problemIntegrationChallenges"),
      description: translate("problemIntegrationChallengesDesc"),
      stat: translate("problemIntegrationChallengesStat")
    }
  ];

  const solutions = [
    {
      icon: CheckCircle,
      title: translate("solutionAffordable"),
      description: translate("solutionAffordableDesc"),
      highlight: translate("solutionAffordableHighlight")
    },
    {
      icon: CheckCircle,
      title: translate("solutionFlexible"),
      description: translate("solutionFlexibleDesc"),
      highlight: translate("solutionFlexibleHighlight")
    },
    {
      icon: CheckCircle,
      title: translate("solutionSpecialized"),
      description: translate("solutionSpecializedDesc"),
      highlight: translate("solutionSpecializedHighlight")
    },
    {
      icon: CheckCircle,
      title: translate("solutionNetworked"),
      description: translate("solutionNetworkedDesc"),
      highlight: translate("solutionNetworkedHighlight"),
      isComingSoon: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
            {translate("realityForInternationalProfessionals")}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {translate("realityForInternationalProfessionalsDesc")}
          </p>
        </div>

        {/* Problems Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="destructive" className="mb-4 px-4 py-2">
              {translate("theProblem")}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              {translate("challengesFacingHealthcareProfessionals")}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="border-red-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <problem.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-neutral-800 mb-3">
                    {problem.title}
                  </h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    {problem.description}
                  </p>
                  <div className="text-red-600 font-bold text-lg">
                    {problem.stat}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4 px-4 py-2 bg-medical-500">
              {translate("theSolution")}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              {translate("revolutionaryApproachToMedicalGerman")}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-medical-200 bg-gradient-to-br from-medical-50 to-white relative">
                <CardContent className="p-6 text-center">
                  {solution.isComingSoon && (
                    <Badge variant="secondary" className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs">
                      Soon
                    </Badge>
                  )}
                  <solution.icon className="w-12 h-12 text-medical-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-neutral-800 mb-3">
                    {solution.title}
                  </h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    {solution.description}
                  </p>
                  <div className="text-medical-600 font-bold text-sm">
                    {solution.highlight}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
