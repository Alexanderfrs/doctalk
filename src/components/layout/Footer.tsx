
import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const { translate } = useLanguage();
  
  return (
    <footer className="bg-medical-50 pt-12 pb-8 px-4 md:px-0 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-medical-500 text-white p-1.5 rounded-lg">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-medical-800">DocTalk</span>
            </div>
            <p className="text-neutral-600 text-sm">
              {translate("footerTagline")}
            </p>
            <div className="flex items-center mt-4 text-sm text-neutral-500">
              <Heart className="h-4 w-4 text-medical-400 mr-1" />
              <span>{translate("madeWithLove")}</span>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-neutral-800 mb-4">{translate("navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("home")}
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("practice")}
                </Link>
              </li>
              <li>
                <Link to="/vocabulary" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("vocabulary")}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("profile")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-neutral-800 mb-4">{translate("categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice?category=patient-care" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("patientCare")}
                </Link>
              </li>
              <li>
                <Link to="/practice?category=emergency" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("emergency")}
                </Link>
              </li>
              <li>
                <Link to="/practice?category=documentation" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("documentation")}
                </Link>
              </li>
              <li>
                <Link to="/practice?category=teamwork" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("teamwork")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-neutral-800 mb-4">{translate("languageLevels")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice?difficulty=beginner" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("beginner")}
                </Link>
              </li>
              <li>
                <Link to="/practice?difficulty=intermediate" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("intermediate")}
                </Link>
              </li>
              <li>
                <Link to="/practice?difficulty=advanced" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  {translate("advanced")}
                </Link>
              </li>
            </ul>
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
