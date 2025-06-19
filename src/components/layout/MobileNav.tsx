
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  path: string;
  labelKey: string;
  icon: React.ReactNode;
}

interface MobileNavProps {
  navItems: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { translate } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-medical-500 rounded-md"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white border-t shadow-lg">
          <nav className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={toggleMenu}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-colors",
                    location.pathname === item.path || (location.pathname === '/' && item.path.startsWith('/#'))
                      ? "bg-medical-50 text-medical-700 font-medium"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{translate(item.labelKey)}</span>
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMenu}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-colors",
                    location.pathname === item.path
                      ? "bg-medical-50 text-medical-700 font-medium"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{translate(item.labelKey)}</span>
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
