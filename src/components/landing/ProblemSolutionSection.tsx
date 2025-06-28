
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Euro, MessageCircle, GraduationCap, Clock, BookOpen, Users, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const ProblemSolutionSection = () => {
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const problems = [
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

  const solutions = [
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

  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Reality Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {translate("realityForInternationalProfessionals")}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {translate("realityForInternationalProfessionalsDesc")}
          </p>
        </div>

        {/* Problem Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              {translate("theProblem")}
            </h3>
            <p className="text-lg text-neutral-600">
              {translate("challengesFacingHealthcareProfessionals")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  {problem.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3 text-neutral-800">
                  {problem.title}
                </h4>
                <p className="text-neutral-600 mb-4">
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

          {/* CTA Button after problems */}
          <div className="text-center">
            <Button size="lg" className="btn-primary" onClick={handleWaitlistClick}>
              {translate("getPriorityAccess")}
            </Button>
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
              {translate("theSolution")}
            </h3>
            <p className="text-lg text-neutral-600">
              {translate("revolutionaryApproachToMedicalGerman")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  {solution.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3 text-neutral-800">
                  {solution.title}
                </h4>
                <p className="text-neutral-600 mb-4">
                  {solution.description}
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-green-700 font-semibold text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {solution.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button after solutions */}
          <div className="text-center">
            <Button size="lg" className="btn-primary" onClick={handleWaitlistClick}>
              {translate("getPriorityAccess")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
