
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import BetaSignupDialog from "@/components/beta/BetaSignupDialog";
import { useSwipeable } from "react-swipeable";

interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: Array<{
    path: string;
    label: string;
    icon: React.ReactNode;
  }>;
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleRegister: () => void;
  handleLogout: () => void;
  onClose: () => void;
  showAuthButtons?: boolean;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  navItems,
  isAuthenticated,
  handleLogin,
  handleRegister,
  handleLogout,
  onClose,
  showAuthButtons = true
}) => {
  const { translate } = useLanguage();
  const [animateOut, setAnimateOut] = useState(false);
  
  // Handle swipe down to close the menu
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => {
      handleCloseWithAnimation();
    },
    trackMouse: false,
    trackTouch: true,
    delta: 50,
  });
  
  // Handle closing with animation
  const handleCloseWithAnimation = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
      setAnimateOut(false);
    }, 300);
  };
  
  // Reset animation state when menu opens
  useEffect(() => {
    if (isOpen) {
      setAnimateOut(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40",
        "transition-all duration-300 ease-in-out",
        animateOut ? "animate-slide-out-up" : "animate-slide-in-down",
      )}
      {...swipeHandlers}
    >
      {/* Visual indicator for swipe down */}
      <div className="flex justify-center py-1">
        <div className="w-10 h-1 bg-neutral-300 rounded-full"></div>
      </div>
      
      <div className="flex flex-col p-4">
        <nav className="space-y-1 mb-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-base text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 rounded-md transition-colors duration-150"
              onClick={onClose}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col space-y-3 mt-4">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 flex justify-start transition-colors duration-150"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>{translate("logout")}</span>
            </Button>
          ) : (
            <>
              {showAuthButtons ? (
                <Button 
                  variant="outline"
                  className="flex justify-center active:scale-95 transition-transform duration-150"
                  onClick={() => {
                    handleLogin();
                    onClose();
                  }}
                >
                  {translate("login")}
                </Button>
              ) : (
                <BetaSignupDialog 
                  triggerElement={
                    <Button className="bg-medical-500 hover:bg-medical-600 active:bg-medical-700 w-full text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                      {translate("joinBeta")}
                    </Button>
                  }
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenu;
