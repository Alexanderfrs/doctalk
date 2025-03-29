
import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

interface AppLogoProps {
  path: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ path }) => {
  return (
    <Link 
      to={path}
      className="flex items-center space-x-2"
    >
      <div className="bg-medical-500 text-white p-1.5 rounded-lg">
        <Stethoscope className="h-5 w-5" />
      </div>
      <span className="text-xl font-semibold text-medical-800">DocTalk</span>
    </Link>
  );
};

export default AppLogo;
