
import React from 'react';
import { useLanguage, Language, GermanDialect } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LanguageSelector: React.FC = () => {
  const { 
    userLanguage, 
    setUserLanguage, 
    germanDialect, 
    setGermanDialect,
    supportedLanguages,
    germanDialects,
    getLanguageName,
    getDialectName
  } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setUserLanguage(value);
  };

  const handleDialectChange = (value: string) => {
    setGermanDialect(value);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="native-language">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="native-language">Native Language</TabsTrigger>
          <TabsTrigger value="german-dialect">German Dialect</TabsTrigger>
        </TabsList>
        
        <TabsContent value="native-language" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="german-dialect" className="space-y-4">
          <div>
            <Label htmlFor="german-dialect">German Dialect</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Choose which German dialect you want to learn
            </p>
            <Select value={germanDialect} onValueChange={handleDialectChange}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {germanDialect && <span>{getDialectName(germanDialect)}</span>}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {germanDialects.map((dialect: GermanDialect) => (
                  <SelectItem key={dialect.code} value={dialect.code}>
                    {dialect.name} ({dialect.region})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LanguageSelector;
