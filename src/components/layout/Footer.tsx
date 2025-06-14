
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AppLogo from "./AppLogo";

const Footer: React.FC = () => {
  const { translate } = useLanguage();
  
  return (
    <footer className="bg-medical-50 pt-12 pb-8 px-4 md:px-0 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <AppLogo path="/" size="medium" />
          </div>
          <p className="text-neutral-600 text-sm max-w-md">
            Language training for healthcare professionals
          </p>
          <div className="flex items-center mt-4 text-sm text-neutral-500">
            <Heart className="h-4 w-4 text-medical-400 mr-1" />
            <span>{translate("madeWithLove")}</span>
          </div>
          <div className="flex items-center mt-4 text-sm text-neutral-600">
            <Mail className="h-4 w-4 mr-2" />
            <a
              href="mailto:Doctalk.ai@gmail.com"
              className="hover:text-medical-600 transition-colors"
            >
              Doctalk.ai@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} DocTalk. {translate("allRightsReserved")}
          </p>
          <div className="flex space-x-4 text-sm text-neutral-500">
            <Link to="/privacy" className="hover:text-medical-600 transition-colors">
              {translate("privacy")}
            </Link>
            <Link to="/terms" className="hover:text-medical-600 transition-colors">
              {translate("terms")}
            </Link>
            <Link to="/contact" className="hover:text-medical-600 transition-colors">
              {translate("contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

