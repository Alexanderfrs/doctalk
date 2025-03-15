
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

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset to trigger slightly earlier

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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className={cn(
      "fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block",
      className
    )}>
      <div className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-sm border border-neutral-100 py-2 px-1 rounded-full shadow-md">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center p-2"
              aria-label={`Navigate to ${section.label} section`}
            >
              <span className="absolute right-full mr-2 px-2 py-1 rounded-md bg-neutral-800 text-white text-xs whitespace-nowrap opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                {section.label}
              </span>
              
              <div className={cn(
                "w-2 h-2 rounded-full transition-all",
                isActive ? "bg-medical-500" : "bg-neutral-300 group-hover:bg-neutral-400"
              )}>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 w-full h-full bg-medical-500 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
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
