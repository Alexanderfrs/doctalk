
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Star } from "lucide-react";
import SettingsTab from "./tabs/SettingsTab";
import GoalsTab from "./tabs/GoalsTab";

interface ProfileTabsProps {
  notifications: boolean;
  soundEffects: boolean;
  onNotificationsChange: (value: boolean) => void;
  onSoundEffectsChange: (value: boolean) => void;
  onSaveSettings: () => void;
  onSaveGoals: () => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  notifications,
  soundEffects,
  onNotificationsChange,
  onSoundEffectsChange,
  onSaveSettings,
  onSaveGoals
}) => {
  return (
    <Tabs defaultValue="settings">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="settings" className="flex items-center gap-1">
          <Settings className="h-4 w-4" />
          <span>Einstellungen</span>
        </TabsTrigger>
        <TabsTrigger value="goals" className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          <span>Ziele</span>
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
      
      <TabsContent value="goals">
        <GoalsTab 
          onSaveGoals={onSaveGoals}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
