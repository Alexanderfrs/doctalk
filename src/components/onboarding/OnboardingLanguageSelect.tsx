import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Globe, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";

interface OnboardingLanguageSelectProps {
  onComplete: (data: any) => void;
}

const OnboardingLanguageSelect: React.FC<OnboardingLanguageSelectProps> = ({ onComplete }) => {
  const { supportedLanguages, userLanguage, setUserLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLanguages = supportedLanguages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectLanguage = (code: string) => {
    setUserLanguage(code);
  };
  
  const handleContinue = () => {
    onComplete({ language: userLanguage });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-5 bg-green-50 border border-green-100 rounded-lg flex items-start space-x-4">
        <Globe className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-green-900 mb-1">Wählen Sie Ihre Muttersprache</h4>
          <p className="text-green-700 text-sm">
            Wir passen Übersetzungen und Lernhilfen an Ihre Muttersprache an, 
            um Ihnen das Lernen der medizinischen Fachsprache zu erleichtern.
          </p>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Sprache suchen..."
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
            Keine Sprache gefunden
          </div>
        )}
      </div>
      
      <Button
        onClick={handleContinue}
        className="w-full bg-medical-500 hover:bg-medical-600"
      >
        Weiter
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default OnboardingLanguageSelect;
