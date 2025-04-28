
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supportedLanguages, germanDialects } from '@/types/language';
import translations from '@/translations';
import { LanguageContextType } from './LanguageContextTypes';

// Create language context
const LanguageContext = createContext<LanguageContextType>({
  userLanguage: 'de', // Default learning language (the language user wants to learn)
  setUserLanguage: () => {},
  germanDialect: 'de-DE', // Default German dialect
  setGermanDialect: () => {},
  translate: () => '',
  getLanguageName: () => '',
  getDialectName: () => '',
  supportedLanguages,
  germanDialects,
  getCurrentLanguageTranslations: () => ({}),
  getGermanContent: () => '',
  interfaceLanguage: 'de', // Default interface language
  changeUILanguage: () => {},
});

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userLanguage, setUserLanguageState] = useState<string>(() => {
    // Get from local storage if available or use default
    const saved = localStorage.getItem('userLanguage');
    return saved || 'de';
  });
  
  const [germanDialect, setGermanDialectState] = useState<string>(() => {
    const saved = localStorage.getItem('germanDialect');
    return saved || 'de-DE';
  });
  
  const [interfaceLanguage, setInterfaceLanguage] = useState<string>(() => {
    // First try to get the interface language from local storage
    const savedInterface = localStorage.getItem('interfaceLanguage');
    if (savedInterface) return savedInterface;
    
    // If not in storage, try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    
    // Check if the browser language is supported
    const isSupportedLanguage = supportedLanguages.some(lang => lang.code === browserLang);
    
    // Return browser language if supported, otherwise default to German
    return isSupportedLanguage ? browserLang : 'de';
  });

  useEffect(() => {
    // Save language preferences to local storage whenever they change
    localStorage.setItem('userLanguage', userLanguage);
    localStorage.setItem('germanDialect', germanDialect);
    localStorage.setItem('interfaceLanguage', interfaceLanguage);
  }, [userLanguage, germanDialect, interfaceLanguage]);

  const setUserLanguage = (code: string) => {
    setUserLanguageState(code);
  };

  const setGermanDialect = (code: string) => {
    setGermanDialectState(code);
  };
  
  const changeUILanguage = (code: string) => {
    setInterfaceLanguage(code);
  };

  const translate = (key: string): string => {
    // If the key exists in the interface language, return that translation
    if (translations[interfaceLanguage]?.[key]) {
      return translations[interfaceLanguage][key];
    }
    
    // Fallback to English if available
    if (translations['en']?.[key]) {
      return translations['en'][key];
    }
    
    // Final fallback - return the key itself
    return key;
  };

  const getLanguageName = (code: string): string => {
    const language = supportedLanguages.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  const getDialectName = (code: string): string => {
    const dialect = germanDialects.find(d => d.code === code);
    return dialect ? dialect.name : code;
  };
  
  const getCurrentLanguageTranslations = (): Record<string, string> => {
    return translations[interfaceLanguage] || translations['en'] || {};
  };
  
  // Function to get German content based on dialect (for future use)
  const getGermanContent = (standardGerman: string): string => {
    // In the future, implement dialect-specific variations here
    return standardGerman;
  };

  const value = {
    userLanguage,
    setUserLanguage,
    germanDialect,
    setGermanDialect,
    translate,
    getLanguageName,
    getDialectName,
    supportedLanguages,
    germanDialects,
    getCurrentLanguageTranslations,
    getGermanContent,
    interfaceLanguage,
    changeUILanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
export { supportedLanguages, germanDialects };
