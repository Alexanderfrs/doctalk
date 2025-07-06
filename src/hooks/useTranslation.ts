
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
    'practicePronunciation': 'Practice Pronunciation',
    'practiceDescription': 'Practice medical German in realistic scenarios from your professional activities',
    'safeFlexibleTraining': 'Safe & Flexible Training',
    'safeFlexibleTrainingDesc': 'Practice in a safe environment, get instant feedback - including pronunciation - and track the progress on your tailored learning path.',
    
    // Scenario briefing translations
    'scenarioBriefing': 'Scenario Briefing',
    'patientProfile': 'Patient Profile',
    'name': 'Name',
    'age': 'Age',
    'years': 'years',
    'condition': 'Condition',
    'mood': 'Mood',
    'culturalNotes': 'Cultural Notes',
    'environment': 'Environment',
    'yourGoal': 'Your Goal',
    'learnMore': 'Learn More',
    'bestPracticesForScenario': 'Best Practices for this Scenario',
    'beginInteraction': 'Begin Interaction',
    'toExercise': 'To Exercise',
    
    // Scenario contexts
    'scenario.admission.setting': 'Hospital Ward - Patient Admission',
    'scenario.admission.environment': 'Quiet afternoon on the ward',
    'scenario.admission.objective': 'Perform complete patient admission',
    'scenario.admission.culturalNotes': 'Patient is polite but nervous about hospitalization',

    'scenario.medication.setting': 'Patient Room - Medication Administration',
    'scenario.medication.environment': 'Morning shift, patient is awake',
    'scenario.medication.objective': 'Safe medication administration and patient education',
    'scenario.medication.culturalNotes': 'Patient is curious and asks many questions',

    'scenario.emergency.setting': 'Emergency Situation - Acute Chest Pain',
    'scenario.emergency.environment': 'High-stress situation, time is critical',
    'scenario.emergency.objective': 'Rapid primary care and stabilization',
    'scenario.emergency.culturalNotes': 'Patient is panicking and needs reassurance',

    'scenario.handover.setting': 'Shift Handover - Patient Handover',
    'scenario.handover.environment': 'End of shift, colleague waiting',
    'scenario.handover.objective': 'Complete and safe patient handover',
    'scenario.handover.culturalNotes': 'Professional colleague, structured communication expected',

    'scenario.dementia-care.setting': 'Nursing Home - Dementia Care',
    'scenario.dementia-care.environment': 'Quiet morning in the living area',
    'scenario.dementia-care.objective': 'Empathetic care and orientation assistance',
    'scenario.dementia-care.culturalNotes': 'Resident is confused but basically friendly',

    'scenario.mobility-assistance.setting': 'Patient Room - Mobility Assistance',
    'scenario.mobility-assistance.environment': 'Afternoon, patient wants to move',
    'scenario.mobility-assistance.objective': 'Safe mobilization and fall prevention',
    'scenario.mobility-assistance.culturalNotes': 'Elderly patient, proud but needs help',

    'scenario.communication-disability.setting': 'Residential Group - Disability Care',
    'scenario.communication-disability.environment': 'Relaxed atmosphere in the residential group',
    'scenario.communication-disability.objective': 'Promote communication and self-determination',
    'scenario.communication-disability.culturalNotes': 'Resident needs time and patience for communication',

    'scenario.default.setting': 'Medical Facility',
    'scenario.default.environment': 'Daily work environment',
    'scenario.default.objective': 'Professional medical communication',
    'scenario.default.culturalNotes': 'Standard professional interaction',

    // Best practices translations
    'bestPractices.handover.title': 'Best Practices for Shift Handovers',
    'bestPractices.handover.description': 'Important principles for safe and effective patient handover',
    'bestPractices.handover.practice1': 'Use SBAR method (Situation, Background, Assessment, Recommendation)',
    'bestPractices.handover.practice2': 'Transmit all critical information in a structured manner',
    'bestPractices.handover.practice3': 'Ask questions and ensure understanding',
    'bestPractices.handover.practice4': 'Highlight medication changes and special features',
    'bestPractices.handover.practice5': 'Complete documentation promptly',

    'bestPractices.admission.title': 'Best Practices for Patient Admission',
    'bestPractices.admission.description': 'Fundamentals for professional patient admission',
    'bestPractices.admission.practice1': 'Warm and professional greeting',
    'bestPractices.admission.practice2': 'Obtain complete medical history',
    'bestPractices.admission.practice3': 'Observe privacy and consent forms',
    'bestPractices.admission.practice4': 'Provide orientation about procedures and contacts',
    'bestPractices.admission.practice5': 'Ask about individual needs and anxieties',

    'bestPractices.medication.title': 'Best Practices for Medication Administration',
    'bestPractices.medication.description': 'Safety standards in medication administration',
    'bestPractices.medication.practice1': 'Observe 5-R rule (Right Patient, Right Medication, etc.)',
    'bestPractices.medication.practice2': 'Verify patient identification twice',
    'bestPractices.medication.practice3': 'Educate about effects and side effects',
    'bestPractices.medication.practice4': 'Monitor intake and document',
    'bestPractices.medication.practice5': 'Ask about allergies and intolerances',

    'bestPractices.default.title': 'General Best Practices',
    'bestPractices.default.description': 'Basic principles of professional patient communication',
    'bestPractices.default.practice1': 'Respectful and empathetic communication',
    'bestPractices.default.practice2': 'Practice active listening',
    'bestPractices.default.practice3': 'Use understandable language',
    'bestPractices.default.practice4': 'Show cultural sensitivity',
    'bestPractices.default.practice5': 'Respect patient autonomy',
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
  'practiceDescription': 'Exersează germana medicală în scenarii realiste din activitatea ta profesională',
  'safeFlexibleTraining': 'Antrenament Sigur și Flexibil',
  'safeFlexibleTrainingDesc': 'Exersați într-un mediu sigur, primiți feedback instantaneu - inclusiv pronunția - și urmăriți progresul pe calea dvs. de învățare personalizată.',
};

// Add specific translations for German
uiTranslations.de = {
  ...uiTranslations.en,
  'safeFlexibleTraining': 'Sicheres & Flexibles Training',
  'safeFlexibleTrainingDesc': 'Üben Sie in einer sicheren Umgebung, erhalten Sie sofortiges Feedback - einschließlich Aussprache - und verfolgen Sie den Fortschritt auf Ihrem maßgeschneiderten Lernpfad.',
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
  'showTranslation': 'Pokaż tłumaczenie',
  'hideTranslation': 'Ukryj tłumaczenie',
  'recording': 'Nagrywanie...',
  'repeatAfterMe': 'Powtórz za mną',
  'pronunciationFeedback': 'Informacje zwrotne dotyczące wymowy',
  'hint': 'Wskazówka',
  'repeat': 'Powtórz',
  'languageHint': 'Wskazówka językowa',
  'defaultLanguageHint': 'Zwróć uwagę na poprawne użycie artykułu i wymowę terminów medycznych.',
  'importantVocabularyInScenario': 'Ważne słownictwo w tym scenariuszu',
  'listenToPronunciation': 'Posłuchaj wymowy',
  'noVocabularyForScenario': 'Brak słownictwa dla tego scenariusza.',
  'aboutThisScenario': 'O tym scenariuszu',
  'context': 'Kontekst',
  'learningObjectives': 'Cele uczenia się',
  'involvedPersons': 'Zaangażowane osoby',
  'similarScenarios': 'Podobne scenariusze',
  'doctor': 'Lekarz',
  'patient': 'Pacjent',
  'nurse': 'Pielęgniarka',
  'colleague': 'Kolega',
  'user': 'Ty',
  'practice': 'Ćwiczenia',
  'practiceDescription': 'Ćwicz niemiecki medyczny w realistycznych scenariuszach z twojej działalności zawodowej',
  'safeFlexibleTraining': 'Bezpieczny i Elastyczny Trening',
  'safeFlexibleTrainingDesc': 'Ćwicz w bezpiecznym środowisku, otrzymuj natychmiastowe informacje zwrotne - w tym wymowę - i śledź postępy na swojej dostosowanej ścieżce nauki.',
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
