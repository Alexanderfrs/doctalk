
import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Stethoscope } from "lucide-react";

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
          <HeartPulse className="h-5 w-5" />
        </div>
        <div className="absolute -right-1 -bottom-1 bg-medical-600 text-white p-0.5 rounded-full border border-white">
          <Stethoscope className="h-3 w-3" />
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
