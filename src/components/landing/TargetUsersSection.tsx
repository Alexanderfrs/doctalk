
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TargetUsersSection = () => {
  const { translate } = useLanguage();

  const targetUsers = [
    {
      title: translate("forCareWorkersTitle"),
      description: translate("forCareWorkersDescription"),
      image: "/lovable-uploads/6d61da35-5028-4a16-bf23-898ec0590ec5.png",
      available: true
    },
    {
      title: translate("forDoctorsTitle"),
      description: translate("forDoctorsDescription"),
      image: "/lovable-uploads/977f1f8d-2a52-4c9b-9dcf-fd7ac0fe6a54.png",
      available: true
    },
    {
      title: translate("forMedicalStudentsTitle"),
      description: translate("forMedicalStudentsDescription"),
      image: "/lovable-uploads/cea1be79-a723-482d-81f1-17e0c03d04a4.png",
      available: false
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          {translate("tailoredForMedicalCareer")}
        </h2>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          {translate("doctalkDesignedFor")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {targetUsers.map((user, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={user.image} 
                alt={user.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-neutral-800">
                  {user.title}
                </h3>
                {!user.available && (
                  <span className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm font-medium">
                    {translate("comingSoon")}
                  </span>
                )}
              </div>
              <p className="text-neutral-600 leading-relaxed">
                {user.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TargetUsersSection;
