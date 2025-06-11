
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  const { profile } = useAuth();
  const [dailyGoal, setDailyGoal] = useState(20);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [subscription, setSubscription] = useState("basic");
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Maria");
  
  const { userLanguage } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

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

  const handleUpgradeSubscription = () => {
    setSubscription("premium");
    toast.success("Upgrade auf Premium erfolgreich!");
  };

  const handleTakeCertificateTest = (certId: string) => {
    toast.info(`Test für ${certId} wird vorbereitet...`);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-neutral-900">
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-12">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 dark:border-neutral-700 mb-8">
            <div data-tutorial-target="profile-header">
              <ProfileHeader 
                avatar={avatar}
                dailyGoal={dailyGoal}
                subscription={subscription}
                onAvatarChange={handleAvatarChange}
              />
            </div>
            
            <div data-tutorial-target="profile-tabs">
              <ProfileTabs 
                avatar={avatar}
                dailyGoal={dailyGoal}
                notifications={notifications}
                soundEffects={soundEffects}
                subscription={subscription}
                onAvatarChange={handleAvatarChange}
                onNotificationsChange={setNotifications}
                onSoundEffectsChange={setSoundEffects}
                onSaveSettings={handleSaveSettings}
                onSaveGoals={handleSaveGoals}
                onUpgradeSubscription={handleUpgradeSubscription}
                onTakeCertificateTest={handleTakeCertificateTest}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <HelpButton />
    </div>
  );
};

export default Profile;
