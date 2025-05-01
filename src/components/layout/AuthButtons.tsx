
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UILanguageSelector from "@/components/language/UILanguageSelector";
import BetaSignupDialog from "@/components/beta/BetaSignupDialog";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  showAuthButtons?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isAuthenticated,
  onLogin,
  onRegister,
  onLogout,
  showAuthButtons = true
}) => {
  const { translate } = useLanguage();

  return (
    <div className="hidden md:flex items-center space-x-3">
      <UILanguageSelector />
      
      {isAuthenticated ? (
        <Button
          variant="ghost"
          className="text-neutral-600 hover:bg-neutral-100"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>{translate("logout")}</span>
        </Button>
      ) : (
        <>
          {showAuthButtons ? (
            <>
              <Button 
                variant="outline"
                onClick={onLogin}
              >
                {translate("login")}
              </Button>
              <Button
                className="bg-medical-500 hover:bg-medical-600"
                onClick={onRegister}
              >
                {translate("register")}
              </Button>
            </>
          ) : (
            <BetaSignupDialog className="bg-medical-500 hover:bg-medical-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0" />
          )}
        </>
      )}
    </div>
  );
};

export default AuthButtons;
