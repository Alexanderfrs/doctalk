
import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const OnboardingLanguageSelector: React.FC = () => {
  const { interfaceLanguage, changeUILanguage, supportedLanguages } = useLanguage();

  const getCurrentLanguageFlag = () => {
    const currentLang = supportedLanguages.find(lang => lang.code === interfaceLanguage);
    return currentLang?.flag || '🌐';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <span className="text-base">{getCurrentLanguageFlag()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeUILanguage(language.code)}
            className={`flex items-center space-x-2 ${
              language.code === interfaceLanguage ? 'bg-accent' : ''
            }`}
          >
            <span className="text-base">{language.flag}</span>
            <span className="text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OnboardingLanguageSelector;
