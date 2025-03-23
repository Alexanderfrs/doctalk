
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface UILanguageSelectorProps {
  variant?: 'default' | 'minimal';
}

const UILanguageSelector: React.FC<UILanguageSelectorProps> = ({ variant = 'default' }) => {
  const { translate, interfaceLanguage, changeUILanguage } = useLanguage();
  
  // Only include main UI languages for the interface selection
  const uiLanguages = [
    { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', nativeName: 'English', flag: '🇬🇧' },
    { code: 'es', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'ro', nativeName: 'Română', flag: '🇷🇴' }
  ];
  
  const currentLanguage = uiLanguages.find(lang => lang.code === interfaceLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2">
          <Globe className="h-4 w-4" />
          {variant === 'default' ? (
            <>
              <span className="hidden md:inline">{translate('languageSelection')}</span>
              <span className="flex items-center gap-1">
                {currentLanguage?.flag && <span>{currentLanguage.flag}</span>}
                <span className="text-sm">{currentLanguage?.nativeName}</span>
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1">
              {currentLanguage?.flag && <span>{currentLanguage.flag}</span>}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {uiLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeUILanguage(language.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UILanguageSelector;
