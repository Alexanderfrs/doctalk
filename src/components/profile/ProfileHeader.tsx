
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Flag, Book, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AvatarSelector from "@/components/profile/AvatarSelector";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileHeaderProps {
  avatar: string;
  subscription: string;
  onAvatarChange: (newAvatar: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  subscription,
  onAvatarChange
}) => {
  const { profile } = useAuth();
  const { userLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
      <AvatarSelector currentAvatar={avatar} onChange={onAvatarChange} />
      
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-1">{profile?.name || "Gast"}</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-2">{profile?.profession || "Beruf nicht angegeben"}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-medical-50 dark:bg-medical-900/50 text-medical-700 dark:text-medical-300 hover:bg-medical-100 dark:hover:bg-medical-800/70">
            <Flag className="h-3.5 w-3.5 mr-1" />
            {userLanguage && (
              <span>
                {supportedLanguages.find(lang => lang.code === userLanguage)?.nativeName || userLanguage}
              </span>
            )}
          </Badge>
          <Badge variant="outline" className="bg-medical-50 dark:bg-medical-900/50 text-medical-700 dark:text-medical-300 hover:bg-medical-100 dark:hover:bg-medical-800/70">
            <Book className="h-3.5 w-3.5 mr-1" />
            Niveau {profile?.german_level || "A2-B1"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
