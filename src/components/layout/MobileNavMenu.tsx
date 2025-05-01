
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import BetaSignupDialog from "@/components/beta/BetaSignupDialog";

interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: Array<{
    path: string;
    label: string;
    icon: React.ReactNode;
  }>;
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleRegister: () => void;
  handleLogout: () => void;
  onClose: () => void;
  showAuthButtons?: boolean;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  navItems,
  isAuthenticated,
  handleLogin,
  handleRegister,
  handleLogout,
  onClose,
  showAuthButtons = true
}) => {
  const { translate } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40 transition-transform duration-300 ease-in-out">
      <div className="flex flex-col p-4">
        <nav className="space-y-1 mb-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-base text-neutral-700 hover:bg-neutral-100 rounded-md"
              onClick={onClose}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col space-y-3 mt-4">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="text-neutral-600 hover:bg-neutral-100 flex justify-start"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>{translate("logout")}</span>
            </Button>
          ) : (
            <>
              {showAuthButtons ? (
                <>
                  <Button 
                    variant="outline"
                    className="flex justify-center"
                    onClick={() => {
                      handleLogin();
                      onClose();
                    }}
                  >
                    {translate("login")}
                  </Button>
                  <Button
                    className="bg-medical-500 hover:bg-medical-600 flex justify-center"
                    onClick={() => {
                      handleRegister();
                      onClose();
                    }}
                  >
                    {translate("register")}
                  </Button>
                </>
              ) : (
                <BetaSignupDialog 
                  triggerElement={
                    <Button className="bg-medical-500 hover:bg-medical-600 w-full text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                      {translate("joinBeta")}
                    </Button>
                  }
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenu;
