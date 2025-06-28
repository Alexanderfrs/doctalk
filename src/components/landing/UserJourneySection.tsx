
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MapPin, FileText, MessageSquare, Briefcase, Trophy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const UserJourneySection = () => {
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const journeySteps = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-500" />,
      title: translate("journeyStep1Title"),
      description: translate("journeyStep1Desc"),
      isDocTalkStep: false,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-500" />,
      title: translate("journeyStep2Title"),
      description: translate("journeyStep2Desc"),
      isDocTalkStep: false,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-medical-500" />,
      title: translate("journeyStep3Title"),
      description: translate("journeyStep3Desc"),
      highlight: translate("journeyStep3Highlight"),
      isDocTalkStep: true,
      bgColor: "bg-medical-50",
      borderColor: "border-medical-300"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-green-500" />,
      title: translate("journeyStep4Title"),
      description: translate("journeyStep4Desc"),
      isDocTalkStep: false,
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <Trophy className="h-8 w-8 text-purple-500" />,
      title: translate("journeyStep5Title"),
      description: translate("journeyStep5Desc"),
      isDocTalkStep: false,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {translate("yourJourneyToGermanHealthcare")}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {translate("typicalPathForHealthcareProfessionals")}
          </p>
        </div>

        {/* Journey Steps */}
        <div className="max-w-4xl mx-auto">
          {journeySteps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-6 mb-8 ${step.isDocTalkStep ? 'ring-2 ring-medical-200 shadow-lg' : 'shadow-md'} hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center flex-shrink-0 border-2 ${step.borderColor}`}>
                    {step.icon}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-neutral-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-neutral-800">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 mb-3">
                      {step.description}
                    </p>
                    
                    {step.isDocTalkStep && (
                      <div className="bg-medical-100 p-3 rounded-lg border border-medical-200 mb-4">
                        <div className="flex items-center text-medical-700 font-semibold text-sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {step.highlight}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {step.isDocTalkStep && (
                  <div className="mt-4 pt-4 border-t border-medical-200">
                    <Button className="btn-primary" onClick={handleWaitlistClick}>
                      {translate("secureYourSpot")}
                    </Button>
                  </div>
                )}
              </div>

              {/* Arrow connector */}
              {index < journeySteps.length - 1 && (
                <div className="flex justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-neutral-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-medical-50 to-cyan-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-neutral-800 mb-4">
              Ready to accelerate your journey?
            </h3>
            <Button size="lg" className="btn-primary" onClick={handleWaitlistClick}>
              {translate("getPriorityAccess")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourneySection;
