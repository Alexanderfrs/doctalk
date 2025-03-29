
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleRegister: () => void;
  handleLogout: () => void;
  onClose: () => void;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  navItems,
  isAuthenticated,
  handleLogin,
  handleRegister,
  handleLogout,
  onClose
}) => {
  const location = useLocation();
  const { translate } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[72px] bg-white z-40 animate-fade-in md:hidden">
      <nav className="container flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          item.path.startsWith('/#') ? (
            <a
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.path || (location.pathname === '/' && item.path.startsWith('/#'))
                  ? "bg-medical-50 text-medical-700 font-medium"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
              onClick={() => onClose()}
            >
              {item.icon}
              <span className="ml-2 text-lg">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-medical-50 text-medical-700 font-medium"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
              onClick={() => onClose()}
            >
              {item.icon}
              <span className="ml-2 text-lg">{item.label}</span>
            </Link>
          )
        ))}

        {isAuthenticated ? (
          <Button
            variant="ghost"
            className="flex items-center px-4 py-3 rounded-lg transition-colors text-neutral-600 hover:bg-neutral-100 justify-start"
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="text-lg">{translate("logout")}</span>
          </Button>
        ) : (
          <div className="flex flex-col space-y-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                handleLogin();
                onClose();
              }}
              className="w-full justify-center"
            >
              {translate("login")}
            </Button>
            <Button
              className="bg-medical-500 hover:bg-medical-600 w-full justify-center"
              onClick={() => {
                handleRegister();
                onClose();
              }}
            >
              {translate("register")}
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNavMenu;
