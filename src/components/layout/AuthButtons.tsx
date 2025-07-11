
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
    <div className="flex items-center space-x-3">
      <UILanguageSelector />
      
      {isAuthenticated ? (
        <Button
          variant="ghost"
          className="text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 transition-all duration-150"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>{translate("logout")}</span>
        </Button>
      ) : (
        showAuthButtons && (
          <Button 
            variant="outline"
            size="sm"
            onClick={onLogin}
            className="active:scale-95 transition-transform duration-150"
          >
            {translate("login")}
          </Button>
        )
      )}
    </div>
  );
};

export default AuthButtons;
