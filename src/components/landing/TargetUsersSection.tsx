
import React from "react";
import { Stethoscope, HeartHandshake, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TargetUsersSection = () => {
  const { translate } = useLanguage();

  const users = [
    {
      title: translate("forCareWorkersTitle"),
      description: translate("forCareWorkersDescription"),
      image: "/lovable-uploads/cea1be79-a723-482d-81f1-17e0c03d04a4.png",
      icon: <HeartHandshake className="h-8 w-8" />,
    },
    {
      title: translate("forDoctorsTitle"),
      description: translate("forDoctorsDescription"),
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      icon: <Stethoscope className="h-8 w-8" />,
      isComingSoon: true,
    },
    {
      title: translate("forMedicalStudentsTitle"),
      description: translate("forMedicalStudentsDescription"),
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      icon: <GraduationCap className="h-8 w-8" />,
      isComingSoon: true,
    },
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
          {translate("tailoredForMedicalCareer")}
        </h3>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          {translate("doctalkDesignedFor")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="relative">
              <img 
                src={user.image} 
                alt={user.title} 
                className={`w-full h-48 object-cover ${user.isComingSoon ? 'filter grayscale' : ''}`}
              />
              {user.isComingSoon && (
                <div className="absolute top-3 right-3 bg-medical-500 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-md">
                  {translate("comingSoon")}
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex-shrink-0 bg-medical-50 text-medical-600 rounded-full p-3">
                    {user.icon}
                  </div>
                <h4 className="font-semibold text-neutral-800 text-xl">
                  {user.title}
                </h4>
              </div>
              <p className="text-neutral-600 text-base">
                {user.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetUsersSection;
