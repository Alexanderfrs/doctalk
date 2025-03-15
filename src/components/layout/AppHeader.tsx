
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, MessageCircle, User, Menu, X, Stethoscope, LogOut } from "lucide-react";

interface AppHeaderProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  isAuthenticated = false, 
  onLogin, 
  onLogout 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { path: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
        { path: "/practice", label: "Übungen", icon: <MessageCircle className="h-5 w-5" /> },
        { path: "/vocabulary", label: "Vokabeln", icon: <BookOpen className="h-5 w-5" /> },
        { path: "/profile", label: "Profil", icon: <User className="h-5 w-5" /> },
      ];
    } else {
      return [
        { path: "/#features", label: "Funktionen", icon: <MessageCircle className="h-5 w-5" /> },
        { path: "/#testimonials", label: "Erfolgsgeschichten", icon: <User className="h-5 w-5" /> },
        { path: "/#pricing", label: "Preise", icon: <BookOpen className="h-5 w-5" /> },
      ];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
      navigate('/dashboard');
    }
  };

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
          <Link 
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
          >
            <div className="bg-medical-500 text-white p-1.5 rounded-lg">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-medical-800">MedLingua</span>
          </Link>

          {/* Desktop Navigation */}
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

            {isAuthenticated && (
              <Button
                variant="ghost"
                className="text-neutral-600 hover:bg-neutral-100"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Abmelden</span>
              </Button>
            )}
          </nav>

          {/* Auth buttons for non-authenticated users */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline"
                onClick={handleLogin}
              >
                Anmelden
              </Button>
              <Button
                className="bg-medical-500 hover:bg-medical-600"
                onClick={handleLogin}
              >
                Registrieren
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 animate-fade-in md:hidden">
          <nav className="container flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-medical-50 text-medical-700 font-medium"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2 text-lg">{item.label}</span>
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  Anmelden
                </Button>
                <Button
                  className="bg-medical-500 hover:bg-medical-600 w-full justify-center"
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Registrieren
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center px-4 py-3 rounded-lg transition-colors text-neutral-600 hover:bg-neutral-100 justify-start"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span className="text-lg">Abmelden</span>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
