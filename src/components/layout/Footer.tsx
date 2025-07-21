
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AppLogo from "./AppLogo";

const Footer: React.FC = () => {
  const { translate } = useLanguage();
  
  return (
    <footer className="pt-12 pb-8 px-4 md:px-0 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Link to="/" className="flex items-center justify-center">
              <div className="bg-white rounded-md p-2 shadow-md">
                <img 
                  src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
                  alt="DocTalk Logo"
                  className="h-20 w-auto"
                />
              </div>
            </Link>
          </div>
          <p className="text-neutral-600 text-sm max-w-md">
            Communicate. Connect. Care
          </p>
          <div className="flex items-center mt-4 text-sm text-neutral-500">
            <Heart className="h-4 w-4 text-medical-400 mr-1" />
            <span>Made with love by a nurse and a psychologist</span>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <a
              href="mailto:Doctalk.ai@gmail.com"
              className="text-neutral-600 hover:text-medical-600 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/DocTalk4877"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-medical-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/doctalk_ai?utm_source=ig_web_button_share_sheet&igsh=MTludG5iNXQ1dDFrcg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-medical-600 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/doctalk-ai/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-medical-600 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
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
