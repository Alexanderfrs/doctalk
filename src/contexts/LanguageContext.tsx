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
  getCurrentLanguageTranslations: () => Record<string, string>;
  getGermanContent: (standardGerman: string) => string;
  interfaceLanguage: string;
}

// More extensive translations for interface elements
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    language: 'Language',
    settings: 'Settings',
    home: 'Home',
    practice: 'Exercises',
    vocabulary: 'Vocabulary',
    dialog: 'Dialog',
    profile: 'Profile',
    startExercise: 'Start Exercise',
    learnVocabulary: 'Learn Vocabulary',
    progress: 'Your Progress',
    weeklyGoal: 'Weekly Goal',
    streak: 'Day Streak',
    completedScenarios: 'Completed Scenarios',
    masteredVocabulary: 'Mastered Vocabulary',
    exercises: 'exercises',
    of: 'of',
    days: 'days',
    recommendedExercises: 'Recommended Exercises',
    showAll: 'Show All',
    medicalGerman: 'Medical German for all language levels',
    improveYour: 'Improve your',
    medicalCommunication: 'medical communication',
    trainScenarios: 'Practice dialogue scenarios and terminology for your professional everyday life in healthcare, regardless of your language level.',
  },
  pl: {
    welcome: 'Witaj',
    language: 'Język',
    settings: 'Ustawienia',
    home: 'Strona główna',
    practice: 'Ćwiczenia',
    vocabulary: 'Słownictwo',
    dialog: 'Dialog',
    profile: 'Profil',
    startExercise: 'Rozpocznij ćwiczenie',
    learnVocabulary: 'Ucz się słownictwa',
    progress: 'Twój postęp',
    weeklyGoal: 'Cel tygodniowy',
    streak: 'Dni pod rząd',
    completedScenarios: 'Ukończone scenariusze',
    masteredVocabulary: 'Opanowane słownictwo',
    exercises: 'ćwiczenia',
    of: 'z',
    days: 'dni',
    recommendedExercises: 'Polecane ćwiczenia',
    showAll: 'Pokaż wszystkie',
    medicalGerman: 'Niemiecki medyczny dla wszystkich poziomów językowych',
    improveYour: 'Popraw swoją',
    medicalCommunication: 'komunikację medyczną',
    trainScenarios: 'Ćwicz scenariusze dialogowe i terminologię dla codziennej pracy zawodowej w służbie zdrowia, niezależnie od poziomu znajomości języka.',
  },
  ro: {
    welcome: 'Bun venit',
    language: 'Limbă',
    settings: 'Setări',
    home: 'Acasă',
    practice: 'Exerciții',
    vocabulary: 'Vocabular',
    dialog: 'Dialog',
    profile: 'Profil',
    startExercise: 'Începe exercițiul',
    learnVocabulary: 'Învață vocabular',
    progress: 'Progresul tău',
    weeklyGoal: 'Obiectiv săptămânal',
    area: 'Domeniu',
    allAreas: 'Toate domeniile',
    patientCare: 'Îngrijirea pacienților',
    emergency: 'Urgențe',
    documentation: 'Documentație',
    teamwork: 'Lucru în echipă',
    elderlyCare: 'Îngrijirea vârstnicilor',
    disabilityCare: 'Îngrijirea persoanelor cu dizabilități',
    languageLevel: 'Nivel de limbă',
    allLevels: 'Toate nivelurile',
    beginner: 'Începător (A1-A2)',
    intermediate: 'Intermediar (B1-B2)',
    advanced: 'Avansat (C1)',
    exercises: 'exerciții',
    exercise: 'exercițiu',
    found: 'găsite',
    noExercisesFound: 'Nu s-au găsit exerciții cu filtrele selectate.',
    resetFilters: 'Resetează filtrele',
    searchExercises: 'Caută exerciții...',
    showFilters: 'Arată filtrele',
    practicePronunciation: 'Exersează pronunția',
    practiceDescription: 'Exersează germana medicală în scenarii realiste din activitatea ta profesională',
  },
  hr: {
    welcome: 'Dobrodošli',
    language: 'Jezik',
    settings: 'Postavke',
    home: 'Početna',
    practice: 'Vježbe',
    vocabulary: 'Vokabular',
    dialog: 'Dijalog',
    profile: 'Profil',
    startExercise: 'Započni vježbu',
    learnVocabulary: 'Uči vokabular',
    progress: 'Tvoj napredak',
    weeklyGoal: 'Tjedni cilj',
    area: 'Područje',
    allAreas: 'Sva područja',
    patientCare: 'Njega pacijenata',
    emergency: 'Hitni slučajevi',
    documentation: 'Dokumentacija',
    teamwork: 'Timski rad',
    elderlyCare: 'Njega starijih osoba',
    disabilityCare: 'Njega osoba s invaliditetom',
  },
};

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
  getCurrentLanguageTranslations: () => ({}),
  getGermanContent: (standardGerman: string) => standardGerman,
  interfaceLanguage: 'en',
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get initial language from localStorage, default to English
  const [userLanguage, setUserLanguageState] = useState<string>(
    localStorage.getItem('userLanguage') || 'en'
  );
  
  // The interface language is based on the user's native language
  const [interfaceLanguage, setInterfaceLanguage] = useState<string>(
    userLanguage in translations ? userLanguage : 'en'
  );
  
  // Try to get initial German dialect from localStorage, default to Standard German
  const [germanDialect, setGermanDialectState] = useState<string>(
    localStorage.getItem('germanDialect') || 'de-DE'
  );

  // Update interface language when user language changes
  useEffect(() => {
    const newInterfaceLanguage = userLanguage in translations ? userLanguage : 'en';
    setInterfaceLanguage(newInterfaceLanguage);
  }, [userLanguage]);

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
    if (!key) return '';
    
    const interfaceLang = interfaceLanguage in translations ? interfaceLanguage : 'en';
    const translation = translations[interfaceLang]?.[key];
    
    if (!translation) {
      console.warn(`Missing translation for key "${key}" in language "${interfaceLang}"`);
      return translations.en?.[key] || key;
    }
    
    return translation;
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

  // Get all translations for the current language
  const getCurrentLanguageTranslations = (): Record<string, string> => {
    return translations[interfaceLanguage] || translations.en;
  };

  // Add function to get content in the selected German dialect
  const getGermanContent = (standardGerman: string): string => {
    // Implement dialect-specific variations
    switch (germanDialect) {
      case 'de-AT':
        // Austrian German variations
        return standardGerman.replace('ich', 'i')
                           .replace('nicht', 'ned')
                           .replace('ist', 'is');
      case 'de-CH':
        // Swiss German variations
        return standardGerman.replace('ich', 'ig')
                           .replace('nicht', 'nöd')
                           .replace('ist', 'isch');
      default:
        return standardGerman;
    }
  };

  useEffect(() => {
    // Update interface language when user language changes
    const newInterfaceLanguage = userLanguage in translations ? userLanguage : 'en';
    setInterfaceLanguage(newInterfaceLanguage);
    
    // Update document language for accessibility
    document.documentElement.lang = userLanguage;
    
    // Force a re-render of translated content
    const event = new Event('languagechange');
    window.dispatchEvent(event);
  }, [userLanguage]);

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
    getCurrentLanguageTranslations,
    getGermanContent,
    interfaceLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
