
import React from 'react';
import { useLanguage, Language, GermanDialect } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import SwipeableContainer from '@/components/ui/SwipeableContainer';

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
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState('native-language');

  const handleLanguageChange = (value: string) => {
    setUserLanguage(value);
  };

  const handleDialectChange = (value: string) => {
    setGermanDialect(value);
  };

  const handleSwipe = (index: number) => {
    setActiveTab(index === 0 ? 'native-language' : 'german-dialect');
  };

  // Simplified view for mobile with swipe
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center mb-2">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger 
              value="native-language" 
              onClick={() => setActiveTab('native-language')}
              data-state={activeTab === 'native-language' ? 'active' : ''}
            >
              Native Language
            </TabsTrigger>
            <TabsTrigger 
              value="german-dialect" 
              onClick={() => setActiveTab('german-dialect')}
              data-state={activeTab === 'german-dialect' ? 'active' : ''}
            >
              German Dialect
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="h-[280px]">
          <SwipeableContainer
            onSwipe={handleSwipe}
            initialIndex={activeTab === 'native-language' ? 0 : 1}
            showIndicators={false}
            showArrows={false}
          >
            {/* Native Language Panel */}
            <div className="px-4 py-2 w-full">
              <div className="space-y-4">
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
            
            {/* German Dialect Panel */}
            <div className="px-4 py-2 w-full">
              <div className="space-y-4">
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
            </div>
          </SwipeableContainer>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          Swipe left or right to switch between tabs
        </div>
      </div>
    );
  }

  // Default desktop view with tabs
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
