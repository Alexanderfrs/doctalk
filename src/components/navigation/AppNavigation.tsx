
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
  
  // Hide navigation on landing page, during onboarding, and on dashboard
  const hiddenPaths = ["/", "/onboarding", "/login", "/register", "/dashboard"];
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

  return (
    <div className="fixed bottom-8 sm:bottom-auto sm:top-24 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 bg-white/90 dark:bg-neutral-800/90 border border-medical-100 dark:border-neutral-700 backdrop-blur-lg py-1 px-2 rounded-full shadow-lg">
        {navItems.map((item) => {
          const isActive = 
            currentPath === item.url || 
            (item.url !== "/" && currentPath.startsWith(item.url));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.url}
              className={cn(
                "relative flex items-center justify-center px-4 py-2 rounded-full transition-colors",
                "text-neutral-700 dark:text-neutral-300 hover:text-medical-600 dark:hover:text-medical-400",
                isActive && "bg-medical-50 dark:bg-medical-900/50 text-medical-600 dark:text-medical-400"
              )}
            >
              <span className="hidden md:inline font-medium">{item.name}</span>
              <Icon className="md:hidden h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AppNavigation;
