
import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLogo from "./AppLogo";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const MobileHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isMobile) {
    return null;
  }

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="flex items-center justify-between px-4 py-2 min-h-[56px]">
        <AppLogo path="/dashboard" size="small" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-9 w-9 p-0" onClick={handleProfileClick}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-xs">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
