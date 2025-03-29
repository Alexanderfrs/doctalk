
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  
  // Hide this navigation bar on dashboard for authenticated users
  const shouldHide = isAuthenticated && location.pathname === "/dashboard";
  
  if (shouldHide) {
    return null;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Find the current active route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = items.find(item => 
      currentPath === item.url || currentPath.startsWith(item.url + '/')
    );
    
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [items, location.pathname]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 dark:bg-neutral-800/50 border border-medical-100 dark:border-neutral-700 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-neutral-700 dark:text-neutral-300 hover:text-medical-600 dark:hover:text-medical-400",
                isActive && "bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-medical-50 dark:bg-medical-900/30 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-medical-500 dark:bg-medical-400 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-medical-200/50 dark:bg-medical-700/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-medical-200/50 dark:bg-medical-700/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-medical-200/50 dark:bg-medical-700/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;
