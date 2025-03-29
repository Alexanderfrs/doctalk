
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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

  return (
    <nav className="hidden md:flex space-x-1">
      {navItems.map((item) => (
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
            <span className="ml-2">{item.label}</span>
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
            <span className="ml-2">{item.label}</span>
          </Link>
        )
      ))}
    </nav>
  );
};

export default DesktopNav;
