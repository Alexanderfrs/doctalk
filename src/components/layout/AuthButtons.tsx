
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UILanguageSelector from "@/components/language/UILanguageSelector";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isAuthenticated,
  onLogin,
  onRegister,
  onLogout
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
      )}
    </div>
  );
};

export default AuthButtons;
