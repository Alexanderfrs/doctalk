
import React, { useState, useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileOnboarding } from "@/hooks/useMobileOnboarding";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Profile = () => {
  const { profile } = useAuth();
  const isMobile = useIsMobile();
  const { shouldShowOnboarding } = useMobileOnboarding();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Maria");
  
  const { userLanguage } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  // Mobile onboarding check happens in useMobileOnboarding hook

  const handleSaveSettings = () => {
    localStorage.setItem('userAvatar', avatar);
    toast.success("Einstellungen gespeichert");
  };

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
  };

  const handleSaveGoals = () => {
    toast.success("Ziele gespeichert");
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-neutral-900">
      {isMobile ? <MobileHeader /> : <AppHeader />}
      
      <main className={`flex-grow ${isMobile ? 'pt-16 pb-20' : 'pt-24'} px-4 md:px-8`}>
        <div className="container mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 dark:border-neutral-700 mb-8">
            <div data-tutorial-target="profile-header">
              <ProfileHeader 
                avatar={avatar}
                subscription="basic"
                onAvatarChange={handleAvatarChange}
              />
            </div>
            
            <div data-tutorial-target="profile-tabs">
              <ProfileTabs 
                notifications={notifications}
                soundEffects={soundEffects}
                onNotificationsChange={setNotifications}
                onSoundEffectsChange={setSoundEffects}
                onSaveSettings={handleSaveSettings}
                onSaveGoals={handleSaveGoals}
              />
            </div>
          </div>
        </div>
      </main>
      
      {!isMobile && <Footer />}
      <HelpButton />
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Profile;
