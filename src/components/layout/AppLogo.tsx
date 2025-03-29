
import React from "react";
import { Link } from "react-router-dom";
import { MessageCircleHeart } from "lucide-react";

interface AppLogoProps {
  path: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ path }) => {
  return (
    <Link 
      to={path}
      className="flex items-center space-x-2"
    >
      <div className="relative">
        <div className="bg-medical-500 text-white p-1.5 rounded-lg">
          <MessageCircleHeart className="h-5 w-5" />
        </div>
        <div className="absolute -right-1 -bottom-1 bg-white text-medical-600 p-0.5 rounded-full border border-medical-500">
          <span className="text-[8px] font-bold">+</span>
        </div>
      </div>
      <span className="text-xl font-semibold">
        <span className="text-medical-700">Doc</span>
        <span className="text-medical-500">Talk</span>
      </span>
    </Link>
  );
};

export default AppLogo;
