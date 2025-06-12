
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/practice", label: "Üben", icon: MessageCircle },
    { path: "/vocabulary", label: "Vokabeln", icon: BookOpen },
    { path: "/profile", label: "Profil", icon: User },
  ];

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom bg-white border-t border-neutral-200">
      <div className="px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                  isActive 
                    ? "text-medical-600 bg-medical-50" 
                    : "text-neutral-600 hover:text-medical-600"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
