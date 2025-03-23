
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
  },
  es: {
    'blood-pressure': 'presión arterial',
    'pulse': 'pulso',
    'temperature': 'temperatura',
    'respiratory-rate': 'frecuencia respiratoria',
    'oxygen-saturation': 'saturación de oxígeno',
    'pain': 'dolor',
    'pain-scale': 'escala de dolor',
    'severe-pain': 'dolor severo',
    'dull-pain': 'dolor sordo',
    'sharp-pain': 'dolor agudo',
    // Examples
    'blood-pressure-example': 'La presión arterial del paciente está elevada hoy.',
    'pulse-example': 'Su pulso es regular y fuerte.'
  },
  en: {
    'blood-pressure': 'blood pressure',
    'pulse': 'pulse',
    'temperature': 'temperature',
    'respiratory-rate': 'respiratory rate',
    'oxygen-saturation': 'oxygen saturation',
    'pain': 'pain',
    'pain-scale': 'pain scale',
    'severe-pain': 'severe pain',
    'dull-pain': 'dull pain',
    'sharp-pain': 'sharp pain',
    // Examples
    'blood-pressure-example': 'The patient\'s blood pressure is elevated today.',
    'pulse-example': 'Your pulse is regular and strong.'
  }
};

// UI translations, merged with the existing ones in LanguageContext
const uiTranslations: Record<string, Record<string, string>> = {
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
    'practiceDescription': 'Practice medical German in realistic scenarios from your professional activities',
    // New translations for language selection
    'nativeLanguage': 'Native Language',
    'interfaceLanguage': 'Interface Language',
    'searchLanguage': 'Search language',
    'noLanguageFound': 'No language found',
    'continue': 'Continue',
    'swipeToSwitch': 'Swipe left or right to switch tabs',
    'selectLanguage': 'Select Language',
    'languageSelectionInfo': 'We adapt translations and learning aids to your native language to make it easier for you to learn medical terminology.',
    'selectInterfaceLanguageInfo': 'Choose the language for the application interface. This will not affect your learning language.',
    'signIn': 'Sign In',
    'registrationFailed': 'Registration failed. Please try again.',
    'registrationSuccessful': 'Registration successful. Welcome to MedLingua!',
    'unexpectedError': 'An unexpected error occurred. Please try again.',
    'name': 'Name'
  }
};

// Add translations for other languages
['pl', 'ro', 'hr', 'tr', 'sr', 'bs', 'tl', 'hi', 'ar', 'vi'].forEach(lang => {
  uiTranslations[lang] = {
    ...uiTranslations.en, // Fallback to English
    // Add specific overrides for each language as needed
  };
});

// Add translations for Spanish
uiTranslations.es = {
  ...uiTranslations.en,
  'singleVocab': 'vocabulario',
  'multipleVocab': 'vocabularios',
  'found': 'encontrado',
  'noVocabularyFound': 'No se encontró vocabulario con los filtros seleccionados.',
  'resetFilters': 'Restablecer filtros',
  'searchVocabulary': 'Buscar vocabulario...',
  'showTranslation': 'Mostrar traducción',
  'hideTranslation': 'Ocultar traducción',
  'recording': 'Grabando...',
  'repeatAfterMe': 'Repite después de mí',
  'pronunciationFeedback': 'Retroalimentación de pronunciación',
  'hint': 'Pista',
  'repeat': 'Repetir',
  'languageHint': 'Pista lingüística',
  'defaultLanguageHint': 'Presta atención al uso correcto del artículo y a la pronunciación de términos médicos.',
  'importantVocabularyInScenario': 'Vocabulario importante en este escenario',
  'listenToPronunciation': 'Escuchar pronunciación',
  'noVocabularyForScenario': 'No hay vocabulario disponible para este escenario.',
  'aboutThisScenario': 'Acerca de este escenario',
  'context': 'Contexto',
  'learningObjectives': 'Objetivos de aprendizaje',
  'involvedPersons': 'Personas involucradas',
  'similarScenarios': 'Escenarios similares',
  'doctor': 'Médico',
  'patient': 'Paciente',
  'nurse': 'Enfermero/a',
  'colleague': 'Colega',
  'user': 'Tú',
  'scenarioNotFound': 'Escenario no encontrado',
  'redirectingToPractice': 'Redirigiendo a la página de práctica...',
  'noSpeechDetected': 'No se detectó voz. Por favor, inténtalo de nuevo.',
  'excellentPronunciation': '¡Excelente pronunciación! Tu entonación es muy natural.',
  'goodPronunciation': 'Buena pronunciación. Presta un poco más de atención a la pronunciación de la diéresis.',
  'understandablePronunciation': 'Pronunciación comprensible. Continúa practicando los sonidos \'ch\' y \'r\'.',
  'practiceMorePronunciation': '¡Sigue practicando! Concéntrate en la pronunciación de los sonidos específicos del alemán.',
  'backToExercises': 'Volver a ejercicios',
  'vocabulary': 'Vocabulario',
  'practicePronunciation': 'Practicar pronunciación',
  'dialog': 'Diálogo',
  'patient-care': 'Atención al paciente',
  'emergency': 'Emergencia',
  'documentation': 'Documentación',
  'teamwork': 'Trabajo en equipo',
  'elderly-care': 'Cuidado de ancianos',
  'disability-care': 'Cuidado de discapacitados',
  'beginner': 'Principiante (A1-A2)',
  'intermediate': 'Intermedio (B1-B2)',
  'advanced': 'Avanzado (C1)',
  'practice': 'Práctica',
  'area': 'Área',
  'allAreas': 'Todas las áreas',
  'patientCare': 'Atención al paciente',
  'elderlyCare': 'Cuidado de ancianos',
  'disabilityCare': 'Cuidado de discapacitados',
  'languageLevel': 'Nivel de idioma',
  'allLevels': 'Todos los niveles',
  'exercises': 'Ejercicios',
  'exercise': 'ejercicio',
  'noExercisesFound': 'No se encontraron ejercicios con los filtros seleccionados.',
  'searchExercises': 'Buscar ejercicios...',
  'showFilters': 'Mostrar filtros',
  'hideFilters': 'Ocultar filtros',
  'viewVocabulary': 'Ver vocabulario',
  'practiceDescription': 'Practica alemán médico en escenarios realistas de tus actividades profesionales',
  'nativeLanguage': 'Idioma nativo',
  'interfaceLanguage': 'Idioma de la interfaz',
  'searchLanguage': 'Buscar idioma',
  'noLanguageFound': 'Idioma no encontrado',
  'continue': 'Continuar',
  'swipeToSwitch': 'Desliza a la izquierda o derecha para cambiar de pestaña',
  'selectLanguage': 'Seleccionar idioma',
  'languageSelectionInfo': 'Adaptamos traducciones y ayudas de aprendizaje a tu idioma nativo para facilitarte el aprendizaje de terminología médica.',
  'selectInterfaceLanguageInfo': 'Elige el idioma para la interfaz de la aplicación. Esto no afectará tu idioma de aprendizaje.',
  'signIn': 'Iniciar sesión',
  'registrationFailed': 'Registro fallido. Por favor, inténtalo de nuevo.',
  'registrationSuccessful': '¡Registro exitoso. ¡Bienvenido a MedLingua!',
  'unexpectedError': 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
  'name': 'Nombre'
};

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
  'practiceDescription': 'Exersează germana medicală în scenarii realiste din activitatea ta profesională',
  'nativeLanguage': 'Limbă maternă',
  'interfaceLanguage': 'Limba interfeței',
  'searchLanguage': 'Caută limbă',
  'noLanguageFound': 'Nicio limbă găsită',
  'continue': 'Continuă',
  'swipeToSwitch': 'Glisează la stânga sau la dreapta pentru a schimba filele',
  'selectLanguage': 'Selectează limba',
  'languageSelectionInfo': 'Adaptăm traducerile și ajutoarele de învățare la limba ta maternă pentru a-ți facilita învățarea terminologiei medicale.',
  'selectInterfaceLanguageInfo': 'Alege limba pentru interfața aplicației. Aceasta nu va afecta limba ta de învățare.',
  'signIn': 'Conectare',
  'registrationFailed': 'Înregistrare eșuată. Te rugăm să încerci din nou.',
  'registrationSuccessful': 'Înregistrare reușită. Bine ai venit la MedLingua!',
  'unexpectedError': 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.',
  'name': 'Nume'
};

export const useTranslation = () => {
  const { translate, getGermanContent, userLanguage, interfaceLanguage } = useLanguage();

  // Enhanced translate function that checks first in our local UI translations
  const t = (key: string): string => {
    if (!key) return '';
    
    // Check if we have this key in our local UI translations
    if (uiTranslations[interfaceLanguage]?.[key]) {
      return uiTranslations[interfaceLanguage][key];
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
