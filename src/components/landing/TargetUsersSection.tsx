
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Stethoscope, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const TargetUsersSection = () => {
  const { translate } = useLanguage();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const targetUsers = [
    {
      icon: <Heart className="h-12 w-12 text-medical-600" />,
      title: translate("forCareWorkersTitle"),
      description: translate("forCareWorkersDescription"),
      comingSoon: false
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-medical-600" />,
      title: translate("forDoctorsTitle"),
      description: translate("forDoctorsDescription"),
      comingSoon: false
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-medical-600" />,
      title: translate("forMedicalStudentsTitle"),
      description: translate("forMedicalStudentsDescription"),
      comingSoon: false
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          {translate("tailoredForMedicalCareer")}
        </h2>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          {translate("doctalkDesignedFor")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {targetUsers.map((user, index) => (
          <div key={index} className="relative bg-white p-8 rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {user.comingSoon && (
              <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {translate("comingSoon")}
              </div>
            )}
            <div className="w-20 h-20 bg-medical-50 rounded-full flex items-center justify-center mb-6 mx-auto">
              {user.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-neutral-800 text-center">
              {user.title}
            </h3>
            <p className="text-neutral-600 text-center leading-relaxed">
              {user.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section - minimal spacing */}
      <div className="text-center mt-8">
        <Button className="btn-primary" onClick={handleWaitlistClick}>
          {translate("getPriorityAccess")}
        </Button>
      </div>
    </div>
  );
};

export default TargetUsersSection;
