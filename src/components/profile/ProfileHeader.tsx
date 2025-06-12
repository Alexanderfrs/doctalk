import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Flag, Book, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AvatarSelector from "@/components/profile/AvatarSelector";
import { useAuth } from "@/contexts/AuthContext";
interface ProfileHeaderProps {
  avatar: string;
  dailyGoal: number;
  subscription: string;
  onAvatarChange: (newAvatar: string) => void;
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  dailyGoal,
  subscription,
  onAvatarChange
}) => {
  const {
    profile
  } = useAuth();
  const {
    userLanguage,
    supportedLanguages
  } = useLanguage();
  return <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
      <AvatarSelector currentAvatar={avatar} onChange={onAvatarChange} />
      
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-1">{profile?.name || "Gast"}</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-2">{profile?.profession || "Beruf nicht angegeben"}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-medical-50 dark:bg-medical-900/50 text-medical-700 dark:text-medical-300 hover:bg-medical-100 dark:hover:bg-medical-800/70">
            <Flag className="h-3.5 w-3.5 mr-1" />
            {userLanguage && <span>
                {supportedLanguages.find(lang => lang.code === userLanguage)?.nativeName || userLanguage}
              </span>}
          </Badge>
          <Badge variant="outline" className="bg-medical-50 dark:bg-medical-900/50 text-medical-700 dark:text-medical-300 hover:bg-medical-100 dark:hover:bg-medical-800/70">
            <Book className="h-3.5 w-3.5 mr-1" />
            Niveau {profile?.german_level || "A2-B1"}
          </Badge>
          <Badge variant="outline" className="bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700">
            {subscription === "premium" ? <>
                <Crown className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                <span>Premium</span>
              </> : <span>Premium Plan</span>}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-sm">Tagesziel: {dailyGoal} Minuten</Label>
            <span className="text-xs text-medical-600 dark:text-medical-400 font-medium">75% erreicht</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-sm">Vokabeln: 120/500</Label>
            <span className="text-xs text-medical-600 dark:text-medical-400 font-medium">24%</span>
          </div>
          <Progress value={24} className="h-2" />
        </div>
      </div>
    </div>;
};
export default ProfileHeader;