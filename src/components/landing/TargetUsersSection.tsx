
import React from "react";
import { Stethoscope, HeartHandshake, GraduationCap } from "lucide-react";

const TargetUsersSection = () => {
  // NOTE: The following text is hardcoded in English.
  // To support multiple languages, these strings should be moved to translation files.
  const users = [
    {
      title: "For Care Workers",
      description: "Master everyday communication with patients and colleagues, confidently handle documentation, and understand care instructions with ease.",
      image: "/lovable-uploads/cea1be79-a723-482d-81f1-17e0c03d04a4.png",
      icon: <HeartHandshake className="h-8 w-8" />
    },
    {
      title: "For Doctors",
      description: "Perfect your patient consultations, from taking histories to explaining complex diagnoses and treatment plans. Prepare for the FSP exam with realistic scenarios.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      icon: <Stethoscope className="h-8 w-8" />,
      isComingSoon: true
    },
    {
      title: "For Medical Students",
      description: "Build a strong foundation for your clinical rotations (Famulatur/PJ) and future career in Germany. Practice realistic scenarios and get ready for your exams.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      icon: <GraduationCap className="h-8 w-8" />,
      isComingSoon: true
    }
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
          Tailored for every step of your medical career
        </h3>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          DocTalk is designed to meet the specific language needs of different healthcare professionals, helping you communicate with confidence and precision.
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
                  Coming Soon
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
