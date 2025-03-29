
import React from "react";
import { Link } from "react-router-dom";
import { MessageCircleHeart } from "lucide-react";

interface AppLogoProps {
  path: string;
  variant?: "default" | "minimal";
  size?: "small" | "medium" | "large";
}

const AppLogo: React.FC<AppLogoProps> = ({ path, variant = "default", size = "medium" }) => {
  // Determine icon size based on the size prop
  const getIconSize = () => {
    switch (size) {
      case "small": return "h-4 w-4";
      case "large": return "h-6 w-6";
      default: return "h-5 w-5";
    }
  };
  
  // Determine logo text size based on the size prop
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
      <div className="relative">
        <div className="bg-medical-500 text-white rounded-lg flex items-center justify-center p-1.5">
          <MessageCircleHeart className={getIconSize()} strokeWidth={2} />
        </div>
        <div className="absolute -right-1 -bottom-1 bg-white text-medical-600 p-0.5 rounded-full border border-medical-500 flex items-center justify-center">
          <span className="text-[8px] font-bold">+</span>
        </div>
      </div>
      
      {variant !== "minimal" && (
        <span className={`${getTextSize()} font-semibold`}>
          <span className="text-medical-700">Doc</span>
          <span className="text-medical-500">Talk</span>
        </span>
      )}
    </Link>
  );
};

export default AppLogo;
