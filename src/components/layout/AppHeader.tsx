
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, MessageCircle, User, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import UILanguageSelector from "@/components/language/UILanguageSelector";
import AppLogo from "./AppLogo";
import DesktopNav from "./DesktopNav";
import AuthButtons from "./AuthButtons";
import MobileNavMenu from "./MobileNavMenu";

interface AppHeaderProps {
  onLogin?: () => void;
  onLogout?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onLogin, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();
  const { translate } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items based on authentication status
  const getNavItems = () => {
    if (isAuthenticated) {
      return [
        { path: "/dashboard", label: translate("home"), icon: <Home className="h-5 w-5" /> },
        { path: "/practice", label: translate("practice"), icon: <MessageCircle className="h-5 w-5" /> },
        { path: "/vocabulary", label: translate("vocabulary"), icon: <BookOpen className="h-5 w-5" /> },
        { path: "/profile", label: translate("profile"), icon: <User className="h-5 w-5" /> },
      ];
    } else {
      return [
        { path: "/#features", label: translate("features"), icon: <MessageCircle className="h-5 w-5" /> },
        { path: "/#pricing", label: translate("pricingTitle"), icon: <BookOpen className="h-5 w-5" /> },
      ];
    }
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
    await signOut();
    navigate('/');
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  // Determine where the logo should navigate to
  const logoPath = isAuthenticated ? "/dashboard" : "/";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8", 
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AppLogo path={logoPath} />

          {/* Desktop Navigation */}
          <DesktopNav navItems={navItems} />

          {/* Language selector and Auth buttons */}
          <AuthButtons 
            isAuthenticated={isAuthenticated} 
            onLogin={handleLogin}
            onRegister={handleRegister}
            onLogout={handleLogout}
          />

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <UILanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavMenu 
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        handleLogout={handleLogout}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default AppHeader;
