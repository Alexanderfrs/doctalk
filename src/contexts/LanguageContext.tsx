import React, { createContext, useContext, useState, useEffect } from 'react';

// Define language types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string; // Unicode flag or image path
}

export interface GermanDialect {
  code: string;
  name: string;
  region: string;
}

// Define all supported languages
export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic (Tunisia)', nativeName: 'العربية التونسية', flag: '🇹🇳' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
];

// Define German dialects
export const germanDialects: GermanDialect[] = [
  { code: 'de-DE', name: 'Standard German', region: 'Germany' },
  { code: 'de-AT', name: 'Austrian German', region: 'Austria' },
  { code: 'de-CH', name: 'Swiss German', region: 'Switzerland' },
  { code: 'de-LU', name: 'Luxembourgish German', region: 'Luxembourg' },
  { code: 'de-LI', name: 'Liechtenstein German', region: 'Liechtenstein' },
  { code: 'de-BE', name: 'Belgian German', region: 'Belgium' },
];

interface LanguageContextType {
  userLanguage: string;
  setUserLanguage: (code: string) => void;
  germanDialect: string;
  setGermanDialect: (code: string) => void;
  translate: (key: string) => string;
  getLanguageName: (code: string) => string;
  getDialectName: (code: string) => string;
  supportedLanguages: Language[];
  germanDialects: GermanDialect[];
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  userLanguage: 'en',
  setUserLanguage: () => {},
  germanDialect: 'de-DE',
  setGermanDialect: () => {},
  translate: (key: string) => key,
  getLanguageName: () => '',
  getDialectName: () => '',
  supportedLanguages,
  germanDialects,
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Simple translations - in a real app, this would be more sophisticated with actual translations
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    language: 'Language',
    settings: 'Settings',
  },
  de: {
    welcome: 'Willkommen',
    language: 'Sprache',
    settings: 'Einstellungen',
  },
  // Other languages would be added here
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get initial language from localStorage, default to English
  const [userLanguage, setUserLanguageState] = useState<string>(
    localStorage.getItem('userLanguage') || 'en'
  );
  
  // Try to get initial German dialect from localStorage, default to Standard German
  const [germanDialect, setGermanDialectState] = useState<string>(
    localStorage.getItem('germanDialect') || 'de-DE'
  );

  // Save language selection to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userLanguage', userLanguage);
  }, [userLanguage]);

  // Save dialect selection to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('germanDialect', germanDialect);
  }, [germanDialect]);

  const setUserLanguage = (code: string) => {
    setUserLanguageState(code);
  };

  const setGermanDialect = (code: string) => {
    setGermanDialectState(code);
  };

  // Function to get a translation - falls back to key if translation not found
  const translate = (key: string): string => {
    if (!translations[userLanguage]) {
      return key; // Language not supported yet
    }
    return translations[userLanguage][key] || key;
  };

  // Get a language name by code
  const getLanguageName = (code: string): string => {
    const language = supportedLanguages.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  // Get a dialect name by code
  const getDialectName = (code: string): string => {
    const dialect = germanDialects.find(d => d.code === code);
    return dialect ? dialect.name : code;
  };

  const contextValue: LanguageContextType = {
    userLanguage,
    setUserLanguage,
    germanDialect,
    setGermanDialect,
    translate,
    getLanguageName,
    getDialectName,
    supportedLanguages,
    germanDialects,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
