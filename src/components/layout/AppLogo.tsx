
import React from "react";
import { Link } from "react-router-dom";

interface AppLogoProps {
  path: string;
  variant?: "default" | "minimal";
  size?: "small" | "medium" | "large";
  showSlogan?: boolean;
}

const AppLogo: React.FC<AppLogoProps> = ({ 
  path, 
  variant = "default", 
  size = "medium",
  showSlogan = false 
}) => {
  // Determine logo size based on the size prop
  const getLogoSize = () => {
    switch (size) {
      case "small": return "h-10";
      case "large": return "h-16";
      default: return "h-12";
    }
  };
  
  // Determine text size based on the size prop
  const getTextSize = () => {
    switch (size) {
      case "small": return "text-xl";
      case "large": return "text-3xl";
      default: return "text-2xl";
    }
  };

  return (
    <Link 
      to={path}
      className="flex items-center space-x-3"
    >
      <div className="bg-white rounded-md p-1.5 shadow-md">
        <img 
          src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
          alt="DocTalk Logo"
          className={`${getLogoSize()} w-auto`}
        />
      </div>
      
      <div className="flex flex-col">
        {variant !== "minimal" && (
          <span className={`${getTextSize()} font-semibold text-medical-500 leading-tight`}>
            DocTalk
          </span>
        )}
        
        {showSlogan && variant !== "minimal" && (
          <span className="text-xs md:text-sm text-neutral-600 mt-0.5">
            Communicate, Connect, Care
          </span>
        )}
      </div>
    </Link>
  );
};

export default AppLogo;
