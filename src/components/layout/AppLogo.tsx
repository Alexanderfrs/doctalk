
import React from "react";
import { Link } from "react-router-dom";

interface AppLogoProps {
  path: string;
  variant?: "default" | "minimal";
  size?: "small" | "medium" | "large";
}

const AppLogo: React.FC<AppLogoProps> = ({ path, variant = "default", size = "medium" }) => {
  // Determine logo size based on the size prop
  const getLogoSize = () => {
    switch (size) {
      case "small": return "h-6";
      case "large": return "h-10";
      default: return "h-8";
    }
  };
  
  // Determine text size based on the size prop
  const getTextSize = () => {
    switch (size) {
      case "small": return "text-lg";
      case "large": return "text-2xl";
      default: return "text-xl";
    }
  };

  return (
    <Link 
      to={path}
      className="flex items-center space-x-2"
    >
      <img 
        src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
        alt="DocTalk Logo"
        className={`${getLogoSize()} w-auto`}
      />
      
      {variant !== "minimal" && (
        <span className={`${getTextSize()} font-semibold text-medical-500`}>
          DocTalk
        </span>
      )}
    </Link>
  );
};

export default AppLogo;
