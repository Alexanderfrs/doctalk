import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, BookOpen, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import UILanguageSelector from "@/components/language/UILanguageSelector";
import AppLogo from "./AppLogo";
import AuthButtons from "./AuthButtons";
import MobileNavMenu from "./MobileNavMenu";

interface AppHeaderProps {
  onLogin?: () => void;
  onLogout?: () => void;
  showSlogan?: boolean;
  showAuthButtons?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  onLogin, 
  onLogout, 
  showSlogan = false,
  showAuthButtons = true
}) => {
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

  // For authenticated users, show full navigation with desktop nav
  if (isAuthenticated) {
    const navItems = [
      { path: "/dashboard", label: translate("home"), icon: <Home className="h-5 w-5" /> },
      { path: "/practice", label: translate("practice"), icon: <MessageCircle className="h-5 w-5" /> },
      { path: "/vocabulary", label: translate("vocabulary"), icon: <BookOpen className="h-5 w-5" /> },
      { path: "/profile", label: translate("profile"), icon: <User className="h-5 w-5" /> }
    ];

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
            <AppLogo path={logoPath} showSlogan={showSlogan} size="large" />

            {/* Desktop Navigation for authenticated users */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
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
              ))}
            </nav>

            {/* Language selector and Auth buttons */}
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              onLogin={handleLogin}
              onRegister={handleRegister}
              onLogout={handleLogout}
              showAuthButtons={showAuthButtons}
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
          showAuthButtons={showAuthButtons}
        />
      </header>
    );
  }

  // For non-authenticated users, show basic navigation
  const navItems = [
    { path: "/#target-users", label: "Who it's for", icon: null },
    { path: "/#problem-solution", label: "Why DocTalk", icon: null },
    { path: "/#pricing", label: translate("pricing"), icon: null },
  ];

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
          <AppLogo path={logoPath} showSlogan={showSlogan} size="large" />

          {/* Desktop Navigation for non-authenticated users */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center px-4 py-2 rounded-lg transition-colors text-neutral-600 hover:bg-neutral-100"
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Language selector and Auth buttons */}
          <AuthButtons 
            isAuthenticated={isAuthenticated} 
            onLogin={handleLogin}
            onRegister={handleRegister}
            onLogout={handleLogout}
            showAuthButtons={showAuthButtons}
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
        showAuthButtons={showAuthButtons}
      />
    </header>
  );
};

export default AppHeader;
