
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import ProfileSettings from "@/components/profile/ProfileSettings";
import LanguageSelector from "@/components/language/LanguageSelector";

interface SettingsTabProps {
  notifications: boolean;
  soundEffects: boolean;
  onNotificationsChange: (value: boolean) => void;
  onSoundEffectsChange: (value: boolean) => void;
  onSaveSettings: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  notifications,
  soundEffects,
  onNotificationsChange,
  onSoundEffectsChange,
  onSaveSettings
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Verwalten Sie Ihre persönlichen Daten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileSettings />
        </CardContent>
      </Card>
      
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Sprache</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Spracheinstellungen und Übersetzungsvoreinstellungen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LanguageSelector />
        </CardContent>
      </Card>
      
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>App-Einstellungen</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Passen Sie die Anwendung an Ihre Bedürfnisse an
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Benachrichtigungen</span>
              <span className="font-normal text-sm text-muted-foreground dark:text-neutral-400">
                Erhalten Sie Erinnerungen für Ihre Lernziele
              </span>
            </Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={onNotificationsChange} />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="soundEffects" className="flex flex-col space-y-1">
              <span>Soundeffekte</span>
              <span className="font-normal text-sm text-muted-foreground dark:text-neutral-400">
                Aktivieren Sie Soundeffekte während der Übungen
              </span>
            </Label>
            <Switch id="soundEffects" checked={soundEffects} onCheckedChange={onSoundEffectsChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie ein Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Hell</SelectItem>
                <SelectItem value="dark">Dunkel</SelectItem>
                <SelectItem value="system">Systemstandard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSaveSettings}>Einstellungen speichern</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsTab;
