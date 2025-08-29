
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, GraduationCap, Globe, Users } from "lucide-react";

const TargetUsersSection: React.FC = () => {
  const { translate } = useLanguage();

  const targetUsers = [
    {
      icon: <Stethoscope className="h-8 w-8 text-medical-600" />,
      title: translate('targetUsers.doctors.title'),
      description: translate('targetUsers.doctors.description'),
      comingSoon: false
    },
    {
      icon: <Users className="h-8 w-8 text-medical-600" />,
      title: translate('targetUsers.nurses.title'),
      description: translate('targetUsers.nurses.description'),
      comingSoon: false
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-medical-600" />,
      title: translate('targetUsers.students.title'),
      description: translate('targetUsers.students.description'),
      comingSoon: false
    },
    {
      icon: <Globe className="h-8 w-8 text-medical-600" />,
      title: translate('targetUsers.international.title'),
      description: translate('targetUsers.international.description'),
      comingSoon: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-900 mb-4">
            {translate('targetUsers.title')}
          </h2>
          <p className="text-xl text-medical-700 max-w-3xl mx-auto">
            {translate('targetUsers.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targetUsers.map((user, index) => (
            <Card key={index} className="border-medical-200 hover:border-medical-300 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-medical-50 rounded-full w-fit">
                  {user.icon}
                </div>
                <CardTitle className="text-xl text-medical-900 flex items-center justify-center gap-2">
                  {user.title}
                  {user.comingSoon && (
                    <Badge variant="secondary" className="text-xs">
                      {translate('common.comingSoon')}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-medical-700 text-center">{user.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsersSection;
