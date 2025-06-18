
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Users, 
  BookOpen, 
  Calendar, 
  Network, 
  Award,
  Clock
} from "lucide-react";

const TargetUsersSection: React.FC = () => {
  const { translate } = useLanguage();

  const targetUsers = [
    {
      title: translate("forCareWorkersTitle"),
      description: translate("forCareWorkersDescription"),
      icon: Stethoscope,
      color: "text-blue-600"
    },
    {
      title: translate("forDoctorsTitle"), 
      description: translate("forDoctorsDescription"),
      icon: Users,
      color: "text-green-600"
    },
    {
      title: translate("forMedicalStudentsTitle"),
      description: translate("forMedicalStudentsDescription"),
      icon: BookOpen,
      color: "text-purple-600"
    }
  ];

  const features = [
    {
      icon: Stethoscope,
      title: translate("medicalScenarioSimulation"),
      description: translate("medicalScenarioSimulationDesc"),
      highlight: translate("realWorldPractice")
    },
    {
      icon: BookOpen,
      title: translate("smartVocabularyBuilder"),
      description: translate("smartVocabularyBuilderDesc"), 
      highlight: translate("personalizedLearning")
    },
    {
      icon: Calendar,
      title: translate("flexibleScheduling"),
      description: translate("flexibleSchedulingDesc"),
      highlight: translate("studyAnytime")
    },
    {
      icon: Award,
      title: translate("progressTracking"),
      description: translate("progressTrackingDesc"),
      highlight: translate("trackImprovement")
    },
    {
      icon: Users,
      title: translate("peerNetwork"),
      description: translate("peerNetworkDesc"),
      highlight: translate("communitySupport")
    },
    {
      icon: Network,
      title: translate("careerNetworkIntegration"),
      description: translate("careerNetworkIntegrationDesc"),
      highlight: translate("trustedPartnerNetwork"),
      soon: true
    }
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
        {translate("tailoredForMedicalCareer")}
      </h2>
      <p className="text-lg text-neutral-600 mb-12 max-w-3xl mx-auto">
        {translate("doctalkDesignedFor")}
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {targetUsers.map((user, index) => (
          <div key={index} className="text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 h-full">
              <user.icon className={`w-12 h-12 ${user.color} mx-auto mb-4`} />
              <h3 className="font-semibold text-neutral-800 mb-3">
                {user.title}
              </h3>
              <p className="text-neutral-600">
                {user.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800">
        {translate("comprehensiveMedicalGermanSolution")}
      </h3>
      <p className="text-lg text-neutral-600 mb-12 max-w-3xl mx-auto">
        {translate("everythingYouNeedToSucceed")}
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-medical-100 hover:border-medical-200 transition-colors relative">
            {feature.soon && (
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 bg-yellow-100 text-yellow-800 border-yellow-300 text-xs flex items-center"
              >
                <Clock className="h-3 w-3 mr-1" />
                Soon
              </Badge>
            )}
            <CardContent className="p-6 text-center">
              <feature.icon className="w-12 h-12 text-medical-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {feature.description}
              </p>
              <div className="text-medical-600 font-medium text-sm">
                {feature.highlight}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TargetUsersSection;
