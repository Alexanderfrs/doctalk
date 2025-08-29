
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLogo from "./AppLogo";
import Navigation from "./Navigation";
import AuthButtons from "./AuthButtons";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const { translate } = useLanguage();
  const isMobile = useIsMobile();

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <AppLogo path={isAuthenticated ? "/dashboard" : "/"} />
        
        {!isMobile && <Navigation />}
        
        <div className="flex items-center space-x-3">
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin")}
              className="text-medical-600 hover:bg-medical-50"
            >
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </Button>
          )}
          
          <AuthButtons
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
