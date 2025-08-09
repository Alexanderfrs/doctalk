
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewMode } from "@/contexts/ViewModeContext";
import { Heart, Stethoscope, GraduationCap, Building2, Users2, School, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const TargetUsersSection = () => {
  const { translate } = useLanguage();
  const { viewMode } = useViewMode();

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  // B2C Target Users (Individual Professionals)
  const b2cTargetUsers = [
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

  // B2B Target Users (Organizations)
  const b2bTargetUsers = [
    {
      icon: <Building2 className="h-12 w-12 text-medical-600" />,
      title: translate("forHospitalsTitle"),
      description: translate("forHospitalsDescription"),
    },
    {
      icon: <School className="h-12 w-12 text-medical-600" />,
      title: translate("forNursingHomesTitle"),
      description: translate("forNursingHomesDescription"),
    },
    {
      icon: <Users2 className="h-12 w-12 text-medical-600" />,
      title: translate("forClinicsTitle"),
      description: translate("forClinicsDescription"),
    },
    // {
    //   icon: <School className="h-12 w-12 text-medical-600" />,
    //   title: translate("forMedicalSchoolsTitle"),
    //   description: translate("forMedicalSchoolsDescription"),
    // }
  ];

  const targetUsers = viewMode === 'enterprise' ? b2bTargetUsers : b2cTargetUsers;

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12 transition-all duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          {viewMode === 'enterprise' 
            ? translate("tailoredForHealthcareOrganizations")
            : translate("tailoredForMedicalCareer")
          }
        </h2>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          {viewMode === 'enterprise' 
            ? translate("doctalkDesignedForOrganizations")
            : translate("doctalkDesignedFor")
          }
        </p>
        
        {/* Language Support Badge */}
        {viewMode !== 'enterprise' && (
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-medical-50 rounded-full border border-medical-100">
              <span className="text-sm text-neutral-600 font-medium">{translate('languageSupport.availableIn')}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇺🇦</span>
                <span className="text-lg">🇷🇺</span>
                <span className="text-lg">🇹🇷</span>
                <span className="text-lg">🇪🇸</span>
                <span className="text-lg">🇷🇴</span>
                <span className="text-lg">🇵🇱</span>
              </div>
            </div>
          </div>
        )}
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

      {/* CTA Section */}
      <div className="text-center">
        <Button className="btn-primary px-8 py-3" onClick={handleWaitlistClick}>
          {translate("getPriorityAccess")}
        </Button>
      </div>
    </div>
  );
};

export default TargetUsersSection;
