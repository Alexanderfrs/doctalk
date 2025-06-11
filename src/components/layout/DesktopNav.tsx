
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const location = useLocation();
  const { translate } = useLanguage();

  return (
    <nav className="hidden md:flex space-x-1">
      {navItems.map((item, index) => {
        // Insert "Why DocTalk?" button after "Features" (index 0) and before "Pricing" (index 1)
        const showWhyDocTalk = index === 1 && item.path === "/#pricing";
        
        return (
          <React.Fragment key={item.path}>
            {showWhyDocTalk && (
              <a
                href="/#comparison"
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg transition-colors",
                  location.hash === "#comparison"
                    ? "bg-medical-50 text-medical-700 font-medium"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                <span className="ml-2">{translate("whyChooseDocTalk")}?</span>
              </a>
            )}
            
            {item.path.startsWith('/#') ? (
              <a
                href={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg transition-colors",
                  location.pathname === item.path || (location.pathname === '/' && item.path.startsWith('/#'))
                    ? "bg-medical-50 text-medical-700 font-medium"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </a>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-medical-50 text-medical-700 font-medium"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
