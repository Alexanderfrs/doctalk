
import React from 'react';
import { useLanguage, supportedLanguages } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const LanguageSelector: React.FC = () => {
  const { 
    userLanguage, 
    setUserLanguage, 
    getLanguageName
  } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setUserLanguage(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="user-language">Your Native Language</Label>
        <p className="text-sm text-muted-foreground mb-2">
          This will be used for translations and interface language
        </p>
        <Select value={userLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {userLanguage && (
                <span className="flex items-center gap-2">
                  {supportedLanguages.find(l => l.code === userLanguage)?.flag && 
                    <span>{supportedLanguages.find(l => l.code === userLanguage)?.flag}</span>}
                  <span>{getLanguageName(userLanguage)}</span>
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {supportedLanguages.map((language: Language) => (
              <SelectItem key={language.code} value={language.code}>
                <span className="flex items-center gap-2">
                  {language.flag && <span>{language.flag}</span>}
                  <span>{language.nativeName}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;
