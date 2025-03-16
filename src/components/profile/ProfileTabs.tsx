
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, BarChart3, Star, Crown } from "lucide-react";
import SettingsTab from "./tabs/SettingsTab";
import AssessmentTab from "./tabs/AssessmentTab";
import GoalsTab from "./tabs/GoalsTab";
import SubscriptionTab from "./tabs/SubscriptionTab";

interface ProfileTabsProps {
  avatar: string;
  dailyGoal: number;
  notifications: boolean;
  soundEffects: boolean;
  subscription: string;
  onAvatarChange: (newAvatar: string) => void;
  onNotificationsChange: (value: boolean) => void;
  onSoundEffectsChange: (value: boolean) => void;
  onSaveSettings: () => void;
  onSaveGoals: () => void;
  onUpgradeSubscription: () => void;
  onTakeCertificateTest: (certId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  avatar,
  dailyGoal,
  notifications,
  soundEffects,
  subscription,
  onAvatarChange,
  onNotificationsChange,
  onSoundEffectsChange,
  onSaveSettings,
  onSaveGoals,
  onUpgradeSubscription,
  onTakeCertificateTest
}) => {
  return (
    <Tabs defaultValue="settings">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
        <TabsTrigger value="settings" className="flex items-center gap-1">
          <Settings className="h-4 w-4" />
          <span>Einstellungen</span>
        </TabsTrigger>
        <TabsTrigger value="assessment" className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          <span>Sprachtest</span>
        </TabsTrigger>
        <TabsTrigger value="goals" className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          <span>Ziele</span>
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex items-center gap-1">
          <Crown className="h-4 w-4" />
          <span>Abonnement</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="settings">
        <SettingsTab 
          notifications={notifications}
          soundEffects={soundEffects}
          onNotificationsChange={onNotificationsChange}
          onSoundEffectsChange={onSoundEffectsChange}
          onSaveSettings={onSaveSettings}
        />
      </TabsContent>
      
      <TabsContent value="assessment">
        <AssessmentTab />
      </TabsContent>
      
      <TabsContent value="goals">
        <GoalsTab 
          dailyGoal={dailyGoal}
          onSaveGoals={onSaveGoals}
          onTakeCertificateTest={onTakeCertificateTest}
        />
      </TabsContent>
      
      <TabsContent value="subscription">
        <SubscriptionTab 
          subscription={subscription}
          onUpgradeSubscription={onUpgradeSubscription}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
