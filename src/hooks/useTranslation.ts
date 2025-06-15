import { useLanguage } from '@/contexts/LanguageContext';

// Create a vocabulary translation map for different languages
const vocabularyTranslations: Record<string, Record<string, string>> = {
  pl: {
    'blood-pressure': 'ciśnienie krwi',
    'pulse': 'puls',
    'temperature': 'temperatura',
    'respiratory-rate': 'częstość oddechów',
    'oxygen-saturation': 'saturacja tlenu',
    'pain': 'ból',
    'pain-scale': 'skala bólu',
    'severe-pain': 'silny ból',
    'dull-pain': 'tępy ból',
    'sharp-pain': 'ostry ból',
    // Examples
    'blood-pressure-example': 'Ciśnienie krwi pacjenta jest dziś podwyższone.',
    'pulse-example': 'Twój puls jest regularny i silny.'
  },
  ro: {
    'blood-pressure': 'tensiune arterială',
    'pulse': 'puls',
    'temperature': 'temperatură',
    'respiratory-rate': 'frecvență respiratorie',
    'oxygen-saturation': 'saturație de oxigen',
    'pain': 'durere',
    'pain-scale': 'scară de durere',
    'severe-pain': 'durere severă',
    'dull-pain': 'durere surdă',
    'sharp-pain': 'durere ascuțită',
    // Examples
    'blood-pressure-example': 'Tensiunea arterială a pacientului este ridicată astăzi.',
    'pulse-example': 'Pulsul dumneavoastră este regulat și puternic.'
  },
  hr: {
    'blood-pressure': 'krvni tlak',
    'pulse': 'puls',
    'temperature': 'temperatura',
    'respiratory-rate': 'učestalost disanja',
    'oxygen-saturation': 'zasićenost kisikom',
    'pain': 'bol',
    'pain-scale': 'ljestvica boli',
    'severe-pain': 'jaka bol',
    'dull-pain': 'tupa bol',
    'sharp-pain': 'oštra bol',
    // Examples
    'blood-pressure-example': 'Krvni tlak pacijenta je danas povišen.',
    'pulse-example': 'Vaš puls je pravilan i jak.'
  },
  tr: {
    'blood-pressure': 'tansiyon',
    'pulse': 'nabız',
    'temperature': 'sıcaklık',
    'respiratory-rate': 'solunum hızı',
    'oxygen-saturation': 'oksijen doygunluğu',
    'pain': 'ağrı',
    'pain-scale': 'ağrı ölçeği',
    'severe-pain': 'şiddetli ağrı',
    'dull-pain': 'künt ağrı',
    'sharp-pain': 'keskin ağrı'
  },
  vi: {
    'blood-pressure': 'huyết áp',
    'pulse': 'mạch',
    'temperature': 'nhiệt độ',
    'respiratory-rate': 'nhịp thở',
    'oxygen-saturation': 'độ bão hòa oxy',
    'pain': 'đau',
    'pain-scale': 'thang đo đau',
    'severe-pain': 'đau dữ dội',
    'dull-pain': 'đau âm ỉ',
    'sharp-pain': 'đau nhói'
  }
};

// UI translations, merged with the existing ones in LanguageContext
const uiTranslations: Record<string, Record<string, string>> = {
  de: {
    careerAccelerator: "Karriere-Beschleuniger",
    careerAcceleratorDesc: "Beschleunigen Sie Ihre berufliche Anerkennung. Unser gezieltes Training bereitet Sie effizient auf den Arbeitsalltag vor. Inklusive Vorbereitung auf FSP & Anerkennung (in Kürze).",
    safeTraining: "Flexibles & Sicheres Training",
    safeTrainingDesc: "Üben Sie in einer sicheren, urteilsfreien Umgebung. Unsere KI gibt Ihnen konstruktives Feedback, sodass Sie ohne Druck lernen und sich verbessern können.",
  },
  en: {
    'singleVocab': 'vocabulary',
    'multipleVocab': 'vocabularies',
    'found': 'found',
    'noVocabularyFound': 'No vocabulary found with the selected filters.',
    'resetFilters': 'Reset filters',
    'searchVocabulary': 'Search vocabulary...',
    'showTranslation': 'Show Translation',
    'hideTranslation': 'Hide Translation',
    'recording': 'Recording...',
    'repeatAfterMe': 'Repeat after me',
    'pronunciationFeedback': 'Pronunciation Feedback',
    'hint': 'Hint',
    'repeat': 'Repeat',
    'languageHint': 'Language Hint',
    'defaultLanguageHint': 'Pay attention to the correct use of the article and the pronunciation of medical terms.',
    'importantVocabularyInScenario': 'Important vocabulary in this scenario',
    'listenToPronunciation': 'Listen to pronunciation',
    'noVocabularyForScenario': 'No vocabulary available for this scenario.',
    'aboutThisScenario': 'About this scenario',
    'context': 'Context',
    'learningObjectives': 'Learning Objectives',
    'involvedPersons': 'Involved Persons',
    'similarScenarios': 'Similar Scenarios',
    'doctor': 'Doctor',
    'patient': 'Patient',
    'nurse': 'Nurse',
    'colleague': 'Colleague',
    'user': 'You',
    'scenarioNotFound': 'Scenario not found',
    'redirectingToPractice': 'Redirecting to Practice page...',
    'noSpeechDetected': 'No speech detected. Please try again.',
    'excellentPronunciation': 'Excellent pronunciation! Your intonation is very natural.',
    'goodPronunciation': 'Good pronunciation. Pay a little more attention to the umlaut pronunciation.',
    'understandablePronunciation': 'Understandable pronunciation. Continue practicing the \'ch\' and \'r\' sounds.',
    'practiceMorePronunciation': 'Keep practicing! Focus on the pronunciation of German specific sounds.',
    'backToExercises': 'Back to Exercises',
    'vocabulary': 'Vocabulary',
    'practicePronunciation': 'Practice Pronunciation',
    'dialog': 'Dialog',
    // Domain categories
    'patient-care': 'Patient Care',
    'emergency': 'Emergency',
    'documentation': 'Documentation',
    'teamwork': 'Teamwork',
    'elderly-care': 'Elderly Care',
    'disability-care': 'Disability Care',
    // Difficulty levels
    'beginner': 'Beginner (A1-A2)',
    'intermediate': 'Intermediate (B1-B2)',
    'advanced': 'Advanced (C1)',
    // Practice page
    'practice': 'Practice',
    'area': 'Area',
    'allAreas': 'All Areas',
    'patientCare': 'Patient Care',
    'elderlyCare': 'Elderly Care',
    'disabilityCare': 'Disability Care',
    'languageLevel': 'Language Level',
    'allLevels': 'All Levels',
    'exercises': 'Exercises',
    'exercise': 'exercise',
    'noExercisesFound': 'No exercises found with selected filters.',
    'searchExercises': 'Search exercises...',
    'showFilters': 'Show Filters',
    'hideFilters': 'Hide Filters',
    'viewVocabulary': 'View Vocabulary',
    'practiceDescription': 'Practice medical German in realistic scenarios from your professional activities'
  }
};

// Add translations for other languages
['pl', 'ro', 'hr', 'tr', 'sr', 'bs', 'tl', 'hi', 'ar', 'vi'].forEach(lang => {
  uiTranslations[lang] = {
    ...uiTranslations.en, // Fallback to English
    // Add specific overrides for each language as needed
  };
});

// Add specific translations for Romanian
uiTranslations.ro = {
  ...uiTranslations.en,
  'singleVocab': 'vocabular',
  'multipleVocab': 'vocabulare',
  'found': 'găsite',
  'noVocabularyFound': 'Nu s-a găsit niciun vocabular cu filtrele selectate.',
  'resetFilters': 'Resetează filtrele',
  'searchVocabulary': 'Caută vocabular...',
  'showTranslation': 'Arată traducerea',
  'hideTranslation': 'Ascunde traducerea',
  'recording': 'Înregistrare...',
  'repeatAfterMe': 'Repetă după mine',
  'pronunciationFeedback': 'Feedback pronunție',
  'hint': 'Indiciu',
  'repeat': 'Repetă',
  'languageHint': 'Indiciu lingvistic',
  'defaultLanguageHint': 'Acordă atenție folosirii corecte a articolului și pronunției termenilor medicali.',
  'importantVocabularyInScenario': 'Vocabular important în acest scenariu',
  'listenToPronunciation': 'Ascultă pronunția',
  'noVocabularyForScenario': 'Niciun vocabular disponibil pentru acest scenariu.',
  'aboutThisScenario': 'Despre acest scenariu',
  'context': 'Context',
  'learningObjectives': 'Obiective de învățare',
  'involvedPersons': 'Persoane implicate',
  'similarScenarios': 'Scenarii similare',
  'doctor': 'Medic',
  'patient': 'Pacient',
  'nurse': 'Asistent medical',
  'colleague': 'Coleg',
  'user': 'Tu',
  'practice': 'Exerciții',
  'practiceDescription': 'Exersează germana medicală în scenarii realiste din activitatea ta profesională'
};

// Add specific translations for Polish
uiTranslations.pl = {
  ...uiTranslations.en,
  'singleVocab': 'słownictwo',
  'multipleVocab': 'słownictwa',
  'found': 'znalezione',
  'noVocabularyFound': 'Nie znaleziono słownictwa z wybranymi filtrami.',
  'resetFilters': 'Resetuj filtry',
  'searchVocabulary': 'Szukaj słownictwa...',
  'practice': 'Ćwiczenia',
  'practiceDescription': 'Ćwicz niemiecki medyczny w realistycznych scenariuszach z twojej działalności zawodowej'
};

export const useTranslation = () => {
  const { translate, getGermanContent, userLanguage } = useLanguage();

  // Enhanced translate function that checks first in our local UI translations
  const t = (key: string): string => {
    if (!key) return '';
    
    // Check if we have this key in our local UI translations
    if (uiTranslations[userLanguage]?.[key]) {
      return uiTranslations[userLanguage][key];
    }
    
    // If not, fall back to the context's translate function
    return translate(key);
  };

  const getLocalizedContent = (key: string, germanContent?: string) => {
    // For vocabulary translations
    if (vocabularyTranslations[userLanguage]?.[key]) {
      if (germanContent) {
        return {
          translation: vocabularyTranslations[userLanguage][key],
          germanVersion: getGermanContent(germanContent)
        };
      }
      return vocabularyTranslations[userLanguage][key];
    }
    
    // If no direct vocabulary translation exists
    const translatedText = translate(key);
    if (germanContent) {
      return {
        translation: translatedText,
        germanVersion: getGermanContent(germanContent)
      };
    }
    return translatedText;
  };

  return {
    t,
    getLocalizedContent
  };
};
