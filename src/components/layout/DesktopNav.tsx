
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  path: string;
  labelKey: string;
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
      {navItems.map((item) => {
        return (
          item.path.startsWith('/#') ? (
            <a
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg transition-colors",
                location.pathname === item.path || (location.pathname === '/' && item.path.startsWith('/#'))
                  ? "bg-medical-50 text-medical-700 font-medium"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
            >
              {item.icon}
              <span className="ml-2">{translate(item.labelKey)}</span>
            </a>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-medical-50 text-medical-700 font-medium"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
            >
              {item.icon}
              <span className="ml-2">{translate(item.labelKey)}</span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default DesktopNav;
