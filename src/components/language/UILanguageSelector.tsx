
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const UILanguageSelector: React.FC = () => {
  const { changeUILanguage, supportedLanguages, interfaceLanguage } = useLanguage();
  
  // Get current language display
  const currentLanguage = supportedLanguages.find(lang => lang.code === interfaceLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors" aria-label="Select language">
        <span className="text-lg">{currentLanguage?.flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg border border-neutral-200 p-1 min-w-[60px] z-50">
        {supportedLanguages.map(language => (
          <DropdownMenuItem
            key={language.code}
            className={`flex justify-center cursor-pointer px-2 py-2 rounded-md ${
              language.code === interfaceLanguage ? 'bg-medical-50 text-medical-700' : 'hover:bg-neutral-100'
            }`}
            onClick={() => changeUILanguage(language.code)}
          >
            <span className="text-lg">{language.flag}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UILanguageSelector;
