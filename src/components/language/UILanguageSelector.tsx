
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const UILanguageSelector: React.FC = () => {
  const { changeUILanguage, supportedLanguages, interfaceLanguage } = useLanguage();
  
  // Filter to only show the languages we want for the landing page
  const displayLanguages = supportedLanguages.filter(lang => 
    ['de', 'en', 'es', 'ro'].includes(lang.code)
  );
  
  // Get current language display
  const currentLanguage = supportedLanguages.find(lang => lang.code === interfaceLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-neutral-100 transition-colors">
        <Globe className="h-4 w-4" />
        <span>{currentLanguage?.flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {displayLanguages.map(language => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => changeUILanguage(language.code)}
          >
            <span className="text-lg mr-2">{language.flag}</span>
            <span>{language.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UILanguageSelector;
