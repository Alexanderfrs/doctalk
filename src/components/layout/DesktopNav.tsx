
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DesktopNavProps {
  onNavigate?: (section: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ onNavigate }) => {
  const { translate } = useLanguage();

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Default behavior for anchor navigation
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${section}`);
      }
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <button 
        onClick={() => handleNavClick('target-users')}
        className="text-neutral-600 hover:text-medical-600 font-medium transition-colors"
      >
        {translate("whoItsFor")}
      </button>
      <button 
        onClick={() => handleNavClick('problem-solution')}
        className="text-neutral-600 hover:text-medical-600 font-medium transition-colors"
      >
        {translate("whyDocTalk")}
      </button>
      <button 
        onClick={() => handleNavClick('pricing')}
        className="text-neutral-600 hover:text-medical-600 font-medium transition-colors"
      >
        {translate("pricing")}
      </button>
    </nav>
  );
};

export default DesktopNav;
