import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustedPartnersSection: React.FC = () => {
  const { translate } = useLanguage();

  const partners = [
    {
      name: "TUM",
      logo: "/logos/tum.webp",
      alt: "Technical University of Munich"
    },
    {
      name: "Xplore",
      logo: "/logos/xplore.png", 
      alt: "Xplore"
    },
    {
      name: "Strascheg",
      logo: "/logos/strascheg.jpg",
      alt: "Strascheg Center for Entrepreneurship"
    },
    {
      name: "UTUM",
      logo: "/logos/utum.png",
      alt: "UnternehmerTUM"
    }
  ];

  // Duplicate logos for seamless loop
  const allLogos = [...partners, ...partners, ...partners];

  return (
    <section id="trusted-partners" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {translate("trustedPartnersTitle")}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {translate("trustedPartnersSubtitle")}
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          <div className="overflow-hidden">
            <div 
              className="flex items-center animate-scroll hover:pause-animation"
              style={{
                width: 'fit-content',
                animation: 'scroll 40s linear infinite'
              }}
            >
              {allLogos.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-8 md:mx-12"
                >
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartnersSection;