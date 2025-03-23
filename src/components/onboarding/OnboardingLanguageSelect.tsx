
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Globe, Search, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import SwipeableContainer from "@/components/ui/SwipeableContainer";

interface OnboardingLanguageSelectProps {
  onComplete: (data: any) => void;
}

const OnboardingLanguageSelect: React.FC<OnboardingLanguageSelectProps> = ({ onComplete }) => {
  const { 
    supportedLanguages, 
    userLanguage, 
    setUserLanguage,
    interfaceLanguage,
    changeUILanguage,
    translate 
  } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("native-language");
  const isMobile = useIsMobile();
  
  const filteredLanguages = supportedLanguages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter to only UI languages for the interface tab
  const uiLanguages = supportedLanguages.filter(lang => 
    ['de', 'en', 'es', 'ro'].includes(lang.code)
  );
  
  const handleSelectLanguage = (code: string) => {
    setUserLanguage(code);
  };
  
  const handleSelectUILanguage = (code: string) => {
    changeUILanguage(code);
  };
  
  const handleContinue = () => {
    onComplete({ language: userLanguage });
  };
  
  const handleSwipe = (index: number) => {
    setCurrentTab(index === 0 ? "native-language" : "interface-language");
  };
  
  if (isMobile) {
    return (
      <div className="space-y-6">
        <div className="p-5 bg-green-50 border border-green-100 rounded-lg flex items-start space-x-4">
          <Globe className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 mb-1">{translate('selectLanguage')}</h4>
            <p className="text-green-700 text-sm">
              {translate('languageSelectionInfo')}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger 
              value="native-language" 
              onClick={() => setCurrentTab("native-language")}
              data-state={currentTab === "native-language" ? "active" : ""}
            >
              {translate('nativeLanguage')}
            </TabsTrigger>
            <TabsTrigger 
              value="interface-language" 
              onClick={() => setCurrentTab("interface-language")}
              data-state={currentTab === "interface-language" ? "active" : ""}
            >
              {translate('interfaceLanguage')}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="h-[280px]">
          <SwipeableContainer
            onSwipe={handleSwipe}
            initialIndex={currentTab === "native-language" ? 0 : 1}
            showIndicators={false}
            showArrows={false}
          >
            {/* Native Language Panel */}
            <div className="px-4 py-2 w-full">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder={`${translate('searchLanguage')}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {filteredLanguages.map((language) => (
                    <div
                      key={language.code}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        userLanguage === language.code
                          ? "bg-medical-50 border border-medical-200"
                          : "border border-gray-200 hover:border-medical-100 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectLanguage(language.code)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-sm text-gray-500">{language.name}</div>
                        </div>
                      </div>
                      
                      {userLanguage === language.code && (
                        <CheckCircle className="h-5 w-5 text-medical-500" />
                      )}
                    </div>
                  ))}
                  
                  {filteredLanguages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      {translate('noLanguageFound')}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Interface Language Panel */}
            <div className="px-4 py-2 w-full">
              <div className="space-y-4">
                <p className="text-sm text-neutral-600">
                  {translate('selectInterfaceLanguageInfo')}
                </p>
                
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {uiLanguages.map((language) => (
                    <div
                      key={language.code}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        interfaceLanguage === language.code
                          ? "bg-medical-50 border border-medical-200"
                          : "border border-gray-200 hover:border-medical-100 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectUILanguage(language.code)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-sm text-gray-500">{language.name}</div>
                        </div>
                      </div>
                      
                      {interfaceLanguage === language.code && (
                        <CheckCircle className="h-5 w-5 text-medical-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwipeableContainer>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          {translate('swipeToSwitch')}
        </div>
        
        <Button
          onClick={handleContinue}
          className="w-full bg-medical-500 hover:bg-medical-600"
        >
          {translate('continue')}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="p-5 bg-green-50 border border-green-100 rounded-lg flex items-start space-x-4">
        <Globe className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-green-900 mb-1">{translate('selectLanguage')}</h4>
          <p className="text-green-700 text-sm">
            {translate('languageSelectionInfo')}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="native-language">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="native-language">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{translate('nativeLanguage')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="interface-language">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>{translate('interfaceLanguage')}</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="native-language" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10"
              placeholder={`${translate('searchLanguage')}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {filteredLanguages.map((language) => (
              <div
                key={language.code}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  userLanguage === language.code
                    ? "bg-medical-50 border border-medical-200"
                    : "border border-gray-200 hover:border-medical-100 hover:bg-gray-50"
                }`}
                onClick={() => handleSelectLanguage(language.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-sm text-gray-500">{language.name}</div>
                  </div>
                </div>
                
                {userLanguage === language.code && (
                  <CheckCircle className="h-5 w-5 text-medical-500" />
                )}
              </div>
            ))}
            
            {filteredLanguages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {translate('noLanguageFound')}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="interface-language" className="space-y-4">
          <p className="text-sm text-neutral-600">
            {translate('selectInterfaceLanguageInfo')}
          </p>
          
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {uiLanguages.map((language) => (
              <div
                key={language.code}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  interfaceLanguage === language.code
                    ? "bg-medical-50 border border-medical-200"
                    : "border border-gray-200 hover:border-medical-100 hover:bg-gray-50"
                }`}
                onClick={() => handleSelectUILanguage(language.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-sm text-gray-500">{language.name}</div>
                  </div>
                </div>
                
                {interfaceLanguage === language.code && (
                  <CheckCircle className="h-5 w-5 text-medical-500" />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Button
        onClick={handleContinue}
        className="w-full bg-medical-500 hover:bg-medical-600"
      >
        {translate('continue')}
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default OnboardingLanguageSelect;
