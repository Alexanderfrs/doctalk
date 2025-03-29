
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, MessageCircle, User, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AppLogo from "./AppLogo";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();

  // Define navigation items with translations
  const navItems: NavItem[] = [
    { path: "/", label: translate("home"), icon: <Home className="h-5 w-5" /> },
    { path: "/practice", label: translate("practice"), icon: <MessageCircle className="h-5 w-5" /> },
    { path: "/vocabulary", label: translate("vocabulary"), icon: <BookOpen className="h-5 w-5" /> },
    { path: "/profile", label: translate("profile"), icon: <User className="h-5 w-5" /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <AppLogo path="/" />

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
          </nav>

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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
