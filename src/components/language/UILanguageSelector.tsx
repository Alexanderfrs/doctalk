
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
  
  // Get current language display
  const currentLanguage = supportedLanguages.find(lang => lang.code === interfaceLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors" aria-label="Select language">
        <Globe className="h-4 w-4 mr-1.5" />
        <span className="text-sm">{currentLanguage?.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLanguage?.nativeName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg border border-neutral-200 p-1 min-w-[180px] z-50">
        {supportedLanguages.map(language => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md ${
              language.code === interfaceLanguage ? 'bg-medical-50 text-medical-700' : 'hover:bg-neutral-100'
            }`}
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
