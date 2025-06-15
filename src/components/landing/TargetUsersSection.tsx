
import React from "react";
import { Stethoscope, HeartHandshake, GraduationCap } from "lucide-react";

const TargetUsersSection = () => {
  // NOTE: The following text is hardcoded in English.
  // To support multiple languages, these strings should be moved to translation files.
  const users = [
    {
      title: "For Doctors",
      description: "Perfect your patient consultations, from taking histories to explaining complex diagnoses and treatment plans. Prepare for the FSP exam with realistic scenarios.",
      image: "https://images.unsplash.com/photo-1551198298-95851d2e2aCF?q=80&w=2070&auto=format&fit=crop",
      icon: <Stethoscope className="h-8 w-8" />
    },
    {
      title: "For Care Workers",
      description: "Master everyday communication with patients and colleagues, confidently handle documentation, and understand care instructions with ease.",
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=2070&auto=format&fit=crop",
      icon: <HeartHandshake className="h-8 w-8" />
    },
    {
      title: "For Medical Students",
      description: "Build a strong foundation for your clinical rotations (Famulatur/PJ) and future career in Germany. Practice realistic scenarios and get ready for your exams.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      icon: <GraduationCap className="h-8 w-8" />
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
            <img src={user.image} alt={user.title} className="w-full h-48 object-cover" />
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
