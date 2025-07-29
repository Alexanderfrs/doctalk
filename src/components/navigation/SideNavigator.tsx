
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionItem {
  id: string;
  label: string;
}

interface SideNavigatorProps {
  sections: SectionItem[];
  className?: string;
}

const SideNavigator: React.FC<SideNavigatorProps> = ({ sections, className }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  // Update active section based on scroll position with improved detection
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.3; // More responsive trigger

        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (!element) continue;

          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [sections]);

  return (
    <div className={cn(
      "fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block",
      className
    )}>
      <div className="flex flex-col items-center gap-3 bg-white/90 backdrop-blur-lg border border-neutral-200/50 py-3 px-2 rounded-full shadow-lg">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center p-3 rounded-full hover:bg-neutral-100/50 transition-all duration-200"
              aria-label={`Navigate to ${section.label} section`}
            >
              {/* Improved tooltip with better positioning and contrast */}
              <span className="absolute right-full mr-4 px-3 py-2 rounded-lg bg-neutral-900/90 text-white text-sm font-medium whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 backdrop-blur-sm border border-neutral-700/50 shadow-xl z-50">
                {section.label}
                {/* Arrow pointing to the dot */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-neutral-900/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </span>
              
              <div className={cn(
                "relative w-3 h-3 rounded-full transition-all duration-300 border-2",
                isActive 
                  ? "bg-medical-500 border-medical-500 shadow-lg shadow-medical-500/30" 
                  : "bg-transparent border-neutral-400 group-hover:border-medical-400 group-hover:bg-medical-100"
              )}>
                {isActive && (
                  <motion.div
                    layoutId="activeDotSide"
                    className="absolute inset-0 w-full h-full bg-medical-500 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                {/* Pulsing ring for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 w-full h-full border-2 border-medical-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigator;
