
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Mic, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const AppNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { isAuthenticated, onboardingComplete, signOut } = useAuth();
  const { translate } = useLanguage();
  
  // Hide navigation on landing page and during onboarding
  const hiddenPaths = ["/", "/onboarding", "/login", "/register"];
  const shouldHideNavigation = hiddenPaths.includes(currentPath);
  
  // Only show navigation for authenticated users who have completed onboarding
  if (!isAuthenticated || !onboardingComplete || shouldHideNavigation) {
    return null;
  }
  
  const navItems = [
    { name: translate("home"), url: "/dashboard", icon: Home },
    { name: translate("practice"), url: "/practice", icon: BookOpen },
    { name: translate("vocabulary"), url: "/vocabulary", icon: Mic },
    { name: translate("dialog"), url: "/scenario", icon: MessageCircle },
    { name: translate("profile"), url: "/profile", icon: User }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(translate("logoutSuccess"));
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(translate("logoutError"));
    }
  };

  return null; // We've removed the navigation bar entirely as per user request
};

export default AppNavigation;
