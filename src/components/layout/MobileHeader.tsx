
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLogo from "./AppLogo";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const MobileHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  if (!isMobile) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 safe-area-top">
      <div className="flex items-center justify-between px-4 py-3">
        <AppLogo path="/dashboard" size="small" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="text-xs">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
