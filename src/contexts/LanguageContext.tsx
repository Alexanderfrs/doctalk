import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  interfaceLanguage: string;
  supportedLanguages: Language[];
  translations: Translations;
  changeUILanguage: (languageCode: string) => void;
  translate: (key: string) => string;
  getGermanContent: (key: string) => string;
  userLanguage: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interfaceLanguage, setInterfaceLanguage] = useState<string>(
    localStorage.getItem('uiLanguage') || 'de'
  );
  const userLanguage = navigator.language.split('-')[0] || 'en';

  useEffect(() => {
    localStorage.setItem('uiLanguage', interfaceLanguage);
  }, [interfaceLanguage]);

  const supportedLanguages: Language[] = [
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
    { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
    { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
    { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
    { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const changeUILanguage = useCallback((languageCode: string) => {
    setInterfaceLanguage(languageCode);
  }, []);

  const translations: Translations = {
    en: {
      "home": "Home",
      "practice": "Practice",
      "vocabulary": "Vocabulary",
      "profile": "Profile",
      "logout": "Log out",
      "login": "Log in",
      "register": "Register",
      "allRightsReserved": "All rights reserved.",
      "privacy": "Privacy Policy",
      "terms": "Terms of Service",
      "contact": "Contact Us",
      "madeWithLove": "Made with ❤️ in Berlin",
      "footerTagline": "Empowering healthcare professionals with effective language skills.",
      "navigation": "Navigation",
      "categories": "Categories",
      "languageLevels": "Language Levels",
      "patientCare": "Patient Care",
      "emergency": "Emergency",
      "documentation": "Documentation",
      "teamwork": "Teamwork",
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "advanced": "Advanced",
      "medicalGerman": "Medical German",
      "improveYour": "Improve Your",
      "medicalCommunication": "Medical Communication",
      "trainScenarios": "Train realistic medical scenarios.",
      "startExercise": "Start Exercise",
      "learnVocabulary": "Learn Vocabulary",
      "medicalStaffWorking": "Medical staff working",
      "hospitalScene": "Hospital scene",
      "medicalEducation": "Medical education",
      "features": "Features",
      "pricingTitle": "Pricing",
      "pricingDescription": "Choose the plan that fits your needs. Start with our free plan and upgrade as you grow.",
      "specializedForMedical": "Specialized for Medical Professionals",
      "medLinguaDifference": "MedLingua offers a unique approach to language learning, tailored specifically for the medical field. Our platform provides practical, real-world scenarios and vocabulary to help you communicate effectively in a medical environment.",
      "medicalVocabulary": "Extensive Medical Vocabulary",
      "learnTerms": "Learn essential medical terms and phrases.",
      "practicalDialogs": "Practical Dialog Scenarios",
      "practiceConversations": "Practice real-life conversations with patients and colleagues.",
      "allLanguageLevels": "All Language Levels",
      "customContent": "Custom content for beginner, intermediate, and advanced learners.",
      "expertDeveloped": "Expert-Developed Content",
      "contentDevelopment": "Content developed by medical and language experts.",
      "nurseOptimized": "Optimized for Nurses",
      "internationalNurses": "Specifically designed for international nurses.",
      "certificationRecognition": "Certification Recognition",
      "examPreparation": "Prepare for language certification exams.",
      "comparisonTitle": "MedLingua vs. General Language Apps",
      "feature": "Feature",
      "generalApps": "General Language Apps",
      "comprehensiveSpecialized": "Comprehensive and Specialized",
      "dialogScenarios": "Dialog Scenarios",
      "everydayConversations": "Everyday Conversations",
      "realisticMedical": "Realistic Medical Scenarios",
      "learningGoal": "Learning Goal",
      "generalLanguageSkills": "General Language Skills",
      "professionalCommunication": "Professional Medical Communication",
      "professionalSupport": "Professional Support",
      "minimal": "Minimal",
      "specificPreparation": "Specific Preparation for Medical Contexts",
      "basic": "Basic",
      "forBeginners": "For beginners",
      "free": "Free",
      "basicFeature1": "Access to basic vocabulary",
      "basicFeature2": "Limited practice scenarios",
      "basicFeature3": "Community support",
      "startFree": "Start for Free",
      "professional": "Professional",
      "forActiveLearners": "For active learners",
      "month": "month",
      "proFeature1": "Unlimited access to all vocabulary",
      "proFeature2": "Unlimited practice scenarios",
      "proFeature3": "Offline access",
      "proFeature4": "Personalized learning path",
      "proFeature5": "Progress tracking",
      "proFeature6": "Priority support",
      "team": "Team",
      "forInstitutions": "For institutions",
      "year": "year",
      "teamFeature1": "All professional features",
      "teamFeature2": "Team progress dashboard",
      "teamFeature3": "Customized content options",
      "teamFeature4": "Dedicated account manager",
      "teamFeature5": "Priority support for teams",
      "contactUs": "Contact us",
      "loyaltyProgram": "Loyalty Program",
      "loyaltyDescription": "Unlock exclusive benefits by consistently practicing with MedLingua.",
      "loyaltyBenefit": "Achieve learning milestones and get rewarded!",
      "streak90": "90-Day Streak: Unlock exclusive content",
      "oneFreeMonth": "Complete a course: Get one month free",
      "unlimitedRepeatable": "Repeatable",
      "recommended": "Recommended",
      "medicalVocabularyComparison": "Basic",

      // Demo scenario translations
      "demoTitle": "See MedLingua in Action",
      "demoDescription": "Experience how MedLingua helps you practice real medical scenarios in German. Watch this interactive demonstration of a typical patient interaction.",
      "scenarioDemoTitle": "Medical Scenario: Medication Instructions",
      "scenarioDemoSubtitle": "Practice explaining medication instructions to patients in German",
      "scenarioDemoContext": "Scenario: A nurse needs to explain to a patient how to take their new medication.",
      "scenarioDemoComplete": "Scenario completed! You've successfully explained medication instructions to the patient.",
      "scenarioDemoExplanation": "With MedLingua, you can:",
      "scenarioDemoBenefit1": "Practice realistic medical conversations with patients",
      "scenarioDemoBenefit2": "Learn medical German vocabulary in context",
      "scenarioDemoBenefit3": "Get immediate feedback on your responses",
      "play": "Play Demo",
      "pause": "Pause",
      "replay": "Replay Demo",
      "showTranslation": "Show Translation",
      "hideTranslation": "Hide Translation",
      "scenarioCompleted": "Scenario Completed",
      "singleVocab": "vocabulary",
      "multipleVocab": "vocabularies",
      "found": "found",
      "noVocabularyFound": "No vocabulary found with the selected filters.",
      "resetFilters": "Reset filters",
      "searchVocabulary": "Search vocabulary...",
      "recording": "Recording...",
      "repeatAfterMe": "Repeat after me",
      "pronunciationFeedback": "Pronunciation Feedback",
      "hint": "Hint",
      "repeat": "Repeat",
      "languageHint": "Language Hint",
      "defaultLanguageHint": "Pay attention to the correct use of the article and the pronunciation of medical terms.",
      "importantVocabularyInScenario": "Important vocabulary in this scenario",
      "listenToPronunciation": "Listen to pronunciation",
      "noVocabularyForScenario": "No vocabulary available for this scenario.",
      "aboutThisScenario": "About this scenario",
      "context": "Context",
      "learningObjectives": "Learning Objectives",
      "involvedPersons": "Involved Persons",
      "similarScenarios": "Similar Scenarios",
      "doctor": "Doctor",
      "patient": "Patient",
      "nurse": "Nurse",
      "colleague": "Colleague",
      "user": "You",
      "scenarioNotFound": "Scenario not found",
      "redirectingToPractice": "Redirecting to Practice page...",
      "noSpeechDetected": "No speech detected. Please try again.",
      "excellentPronunciation": "Excellent pronunciation! Your intonation is very natural.",
      "goodPronunciation": "Good pronunciation. Pay a little more attention to the umlaut pronunciation.",
      "understandablePronunciation": "Understandable pronunciation. Continue practicing the \'ch\' and \'r\' sounds.",
      "practiceMorePronunciation": "Keep practicing! Focus on the pronunciation of German specific sounds.",
      "backToExercises": "Back to Exercises",
      "dialog": "Dialog",
      "practicePronunciation": "Practice Pronunciation",
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
    },
    de: {
      "home": "Startseite",
      "practice": "Übungen",
      "vocabulary": "Vokabeln",
      "profile": "Profil",
      "logout": "Abmelden",
      "login": "Anmelden",
      "register": "Registrieren",
      "allRightsReserved": "Alle Rechte vorbehalten.",
      "privacy": "Datenschutzbestimmungen",
      "terms": "Nutzungsbedingungen",
      "contact": "Kontakt",
      "madeWithLove": "Mit ❤️ in Berlin gemacht",
      "footerTagline": "Wir unterstützen Fachkräfte im Gesundheitswesen mit effektiven Sprachkenntnissen.",
      "navigation": "Navigation",
      "categories": "Kategorien",
      "languageLevels": "Sprachniveau",
      "patientCare": "Patientenbetreuung",
      "emergency": "Notfall",
      "documentation": "Dokumentation",
      "teamwork": "Teamarbeit",
      "beginner": "Anfänger",
      "intermediate": "Mittelstufe",
      "advanced": "Fortgeschritten",
      "medicalGerman": "Medizinische Deutsch",
      "improveYour": "Verbessern Sie Ihre",
      "medicalCommunication": "Medizinische Kommunikation",
      "trainScenarios": "Trainieren Sie realistische medizinische Szenarien.",
      "startExercise": "Übung starten",
      "learnVocabulary": "Vokabeln lernen",
      "medicalStaffWorking": "Medizinisches Personal bei der Arbeit",
      "hospitalScene": "Szene im Krankenhaus",
      "medicalEducation": "Medizinische Ausbildung",
      "features": "Funktionen",
      "pricingTitle": "Preise",
      "pricingDescription": "Wählen Sie den Plan, der Ihren Bedürfnissen entspricht. Beginnen Sie mit unserem kostenlosen Plan und aktualisieren Sie ihn, wenn Sie wachsen.",
      "specializedForMedical": "Spezialisiert für medizinische Fachkräfte",
      "medLinguaDifference": "MedLingua bietet einen einzigartigen Ansatz zum Sprachenlernen, der speziell auf den medizinischen Bereich zugeschnitten ist. Unsere Plattform bietet praktische, reale Szenarien und Vokabeln, mit denen Sie effektiv in einem medizinischen Umfeld kommunizieren können.",
      "medicalVocabulary": "Umfangreicher medizinischer Wortschatz",
      "learnTerms": "Lernen Sie wichtige medizinische Begriffe und Redewendungen.",
      "practicalDialogs": "Praktische Dialogszenarien",
      "practiceConversations": "Üben Sie reale Gespräche mit Patienten und Kollegen.",
      "allLanguageLevels": "Alle Sprachniveaus",
      "customContent": "Benutzerdefinierte Inhalte für Anfänger, Mittelstufe und Fortgeschrittene.",
      "expertDeveloped": "Von Experten entwickelte Inhalte",
      "contentDevelopment": "Inhalte, die von Medizin- und Sprachexperten entwickelt wurden.",
      "nurseOptimized": "Optimiert für Pflegekräfte",
      "internationalNurses": "Speziell für internationale Pflegekräfte entwickelt.",
      "certificationRecognition": "Zertifizierungsanerkennung",
      "examPreparation": "Bereiten Sie sich auf Sprachzertifizierungsprüfungen vor.",
      "comparisonTitle": "MedLingua vs. Allgemeine Sprach-Apps",
      "feature": "Funktion",
      "generalApps": "Allgemeine Sprach-Apps",
      "comprehensiveSpecialized": "Umfassend und spezialisiert",
      "dialogScenarios": "Dialogszenarien",
      "everydayConversations": "Alltagsgespräche",
      "realisticMedical": "Realistische medizinische Szenarien",
      "learningGoal": "Lernziel",
      "generalLanguageSkills": "Allgemeine Sprachkenntnisse",
      "professionalCommunication": "Professionelle medizinische Kommunikation",
      "professionalSupport": "Professionelle Unterstützung",
      "minimal": "Minimal",
      "specificPreparation": "Spezifische Vorbereitung für medizinische Kontexte",
      "basic": "Basis",
      "forBeginners": "Für Anfänger",
      "free": "Kostenlos",
      "basicFeature1": "Zugriff auf grundlegende Vokabeln",
      "basicFeature2": "Begrenzte Übungsszenarien",
      "basicFeature3": "Community-Unterstützung",
      "startFree": "Kostenlos starten",
      "professional": "Professionell",
      "forActiveLearners": "Für aktive Lernende",
      "month": "Monat",
      "proFeature1": "Unbegrenzter Zugriff auf alle Vokabeln",
      "proFeature2": "Unbegrenzte Übungsszenarien",
      "proFeature3": "Offline-Zugriff",
      "proFeature4": "Personalisierter Lernpfad",
      "proFeature5": "Fortschrittsverfolgung",
      "proFeature6": "Vorrangiger Support",
      "team": "Team",
      "forInstitutions": "Für Institutionen",
      "year": "Jahr",
      "teamFeature1": "Alle professionellen Funktionen",
      "teamFeature2": "Dashboard für den Teamfortschritt",
      "teamFeature3": "Benutzerdefinierte Inhaltsoptionen",
      "teamFeature4": "Dedizierter Account Manager",
      "teamFeature5": "Vorrangiger Support für Teams",
      "contactUs": "Kontaktiere uns",
      "loyaltyProgram": "Treueprogramm",
      "loyaltyDescription": "Schalten Sie exklusive Vorteile frei, indem Sie konsequent mit MedLingua üben.",
      "loyaltyBenefit": "Erreichen Sie Lernmeilensteine und lassen Sie sich belohnen!",
      "streak90": "90-Tage-Serie: Schalten Sie exklusive Inhalte frei",
      "oneFreeMonth": "Schließe einen Kurs ab: Erhalte einen Monat kostenlos",
      "unlimitedRepeatable": "Wiederholbar",
      "recommended": "Empfohlen",
      "medicalVocabularyComparison": "Grundlegend",
      "singleVocab": "Vokabel",
      "multipleVocab": "Vokabeln",
      "found": "gefunden",
      "noVocabularyFound": "Keine Vokabeln mit den ausgewählten Filtern gefunden.",
      "resetFilters": "Filter zurücksetzen",
      "searchVocabulary": "Vokabeln suchen...",
      "recording": "Aufnahme...",
      "repeatAfterMe": "Sprich mir nach",
      "pronunciationFeedback": "Aussprache-Feedback",
      "hint": "Hinweis",
      "repeat": "Wiederholen",
      "languageHint": "Sprachhinweis",
      "defaultLanguageHint": "Achten Sie auf den korrekten Artikelgebrauch und die Aussprache medizinischer Begriffe.",
      "importantVocabularyInScenario": "Wichtiger Wortschatz in diesem Szenario",
      "listenToPronunciation": "Aussprache anhören",
      "noVocabularyForScenario": "Kein Wortschatz für dieses Szenario verfügbar.",
      "aboutThisScenario": "Über dieses Szenario",
      "context": "Kontext",
      "learningObjectives": "Lernziele",
      "involvedPersons": "Beteiligte Personen",
      "similarScenarios": "Ähnliche Szenarien",
      "doctor": "Arzt",
      "patient": "Patient",
      "nurse": "Krankenschwester",
      "colleague": "Kollege",
      "user": "Du",
      "scenarioNotFound": "Szenario nicht gefunden",
      "redirectingToPractice": "Weiterleitung zur Übungsseite...",
      "noSpeechDetected": "Keine Sprache erkannt. Bitte versuche es erneut.",
      "excellentPronunciation": "Ausgezeichnete Aussprache! Ihre Intonation ist sehr natürlich.",
      "goodPronunciation": "Gute Aussprache. Achten Sie etwas mehr auf die Umlautaussprache.",
      "understandablePronunciation": "Verständliche Aussprache. Üben Sie weiterhin die Laute 'ch' und 'r'.",
      "practiceMorePronunciation": "Üben Sie weiter! Konzentrieren Sie sich auf die Aussprache der deutschen spezifischen Laute.",
      "backToExercises": "Zurück zu den Übungen",
      "dialog": "Dialog",
      "practicePronunciation": "Aussprache üben",
      // Domain categories
      'patient-care': 'Patientenbetreuung',
      'emergency': 'Notfall',
      'documentation': 'Dokumentation',
      'teamwork': 'Teamarbeit',
      'elderly-care': 'Altenpflege',
      'disability-care': 'Behindertenbetreuung',
      // Difficulty levels
      'beginner': 'Anfänger (A1-A2)',
      'intermediate': 'Mittelstufe (B1-B2)',
      'advanced': 'Fortgeschritten (C1)',
      // Practice page
      'practice': 'Übungen',
      'area': 'Bereich',
      'allAreas': 'Alle Bereiche',
      'patientCare': 'Patientenbetreuung',
      'elderlyCare': 'Altenpflege',
      'disabilityCare': 'Behindertenbetreuung',
      'languageLevel': 'Sprachniveau',
      'allLevels': 'Alle Niveaus',
      'exercises': 'Übungen',
      'exercise': 'Übung',
      'noExercisesFound': 'Keine Übungen mit den ausgewählten Filtern gefunden.',
      'searchExercises': 'Übungen suchen...',
      'showFilters': 'Filter anzeigen',
      'hideFilters': 'Filter ausblenden',
      'viewVocabulary': 'Vokabeln anzeigen',
      'practiceDescription': 'Üben Sie medizinisches Deutsch in realistischen Szenarien aus Ihrer beruflichen Tätigkeit',

      // Demo scenario translations
      "demoTitle": "MedLingua in Aktion sehen",
      "demoDescription": "Erleben Sie, wie MedLingua Ihnen hilft, medizinische Szenarien auf Deutsch zu üben. Sehen Sie sich diese interaktive Demonstration einer typischen Patienteninteraktion an.",
      "scenarioDemoTitle": "Medizinisches Szenario: Medikamenten-Anweisungen",
      "scenarioDemoSubtitle": "Üben Sie, Patienten auf Deutsch zu erklären, wie sie ihre Medikamente einnehmen sollen",
      "scenarioDemoContext": "Szenario: Eine Pflegekraft muss einem Patienten erklären, wie er sein neues Medikament einnehmen soll.",
      "scenarioDemoComplete": "Szenario abgeschlossen! Sie haben dem Patienten erfolgreich die Medikamentenanweisungen erklärt.",
      "scenarioDemoExplanation": "Mit MedLingua können Sie:",
      "scenarioDemoBenefit1": "Realistische medizinische Gespräche mit Patienten üben",
      "scenarioDemoBenefit2": "Medizinisches Deutsch-Vokabular im Kontext lernen",
      "scenarioDemoBenefit3": "Sofortiges Feedback zu Ihren Antworten erhalten",
      "play": "Demo abspielen",
      "pause": "Pausieren",
      "replay": "Demo wiederholen",
      "showTranslation": "Übersetzung anzeigen",
      "hideTranslation": "Übersetzung ausblenden",
      "scenarioCompleted": "Szenario abgeschlossen"
    },
    pl: {
      "home": "Strona główna",
      "practice": "Ćwiczenia",
      "vocabulary": "Słownictwo",
      "profile": "Profil",
      "logout": "Wyloguj się",
      "login": "Zaloguj się",
      "register": "Zarejestruj się",
      "allRightsReserved": "Wszelkie prawa zastrzeżone.",
      "privacy": "Polityka prywatności",
      "terms": "Warunki korzystania z usługi",
      "contact": "Kontakt",
      "madeWithLove": "Wykonane z ❤️ w Berlinie",
      "footerTagline": "Wzmacnianie kompetencji językowych pracowników służby zdrowia.",
      "navigation": "Nawigacja",
      "categories": "Kategorie",
      "languageLevels": "Poziomy językowe",
      "patientCare": "Opieka nad pacjentem",
      "emergency": "Nagły wypadek",
      "documentation": "Dokumentacja",
      "teamwork": "Praca zespołowa",
      "beginner": "Początkujący",
      "intermediate": "Średnio zaawansowany",
      "advanced": "Zaawansowany",
      "medicalGerman": "Niemiecki medyczny",
      "improveYour": "Popraw swój",
      "medicalCommunication": "Komunikacja medyczna",
      "trainScenarios": "Trenuj realistyczne scenariusze medyczne.",
      "startExercise": "Rozpocznij ćwiczenie",
      "learnVocabulary": "Ucz się słownictwa",
      "medicalStaffWorking": "Personel medyczny w pracy",
      "hospitalScene": "Scena w szpitalu",
      "medicalEducation": "Edukacja medyczna",
      "features": "Funkcje",
      "pricingTitle": "Cennik",
      "pricingDescription": "Wybierz plan, który odpowiada Twoim potrzebom. Zacznij od naszego darmowego planu i ulepszaj go w miarę rozwoju.",
      "specializedForMedical": "Specjalizacja dla profesjonalistów medycznych",
      "medLinguaDifference": "MedLingua oferuje unikalne podejście do nauki języków, dostosowane specjalnie do branży medycznej. Nasza platforma zapewnia praktyczne, rzeczywiste scenariusze i słownictwo, które pomogą Ci skutecznie komunikować się w środowisku medycznym.",
      "medicalVocabulary": "Rozbudowane słownictwo medyczne",
      "learnTerms": "Ucz się podstawowych terminów i zwrotów medycznych.",
      "practicalDialogs": "Praktyczne scenariusze dialogowe",
      "practiceConversations": "Ćwicz rozmowy z pacjentami i kolegami w rzeczywistych sytuacjach.",
      "allLanguageLevels": "Wszystkie poziomy językowe",
      "customContent": "Niestandardowe treści dla początkujących, średnio zaawansowanych i zaawansowanych uczniów.",
      "expertDeveloped": "Treści opracowane przez ekspertów",
      "contentDevelopment": "Treści opracowane przez ekspertów medycznych i językowych.",
      "nurseOptimized": "Zoptymalizowany dla pielęgniarek",
      "internationalNurses": "Specjalnie zaprojektowany dla pielęgniarek z zagranicy.",
      "certificationRecognition": "Uznawanie certyfikatów",
      "examPreparation": "Przygotuj się do egzaminów certyfikujących znajomość języka.",
      "comparisonTitle": "MedLingua vs. Ogólne aplikacje językowe",
      "feature": "Funkcja",
      "generalApps": "Ogólne aplikacje językowe",
      "comprehensiveSpecialized": "Kompleksowe i specjalistyczne",
      "dialogScenarios": "Scenariusze dialogowe",
      "everydayConversations": "Codzienne rozmowy",
      "realisticMedical": "Realistyczne scenariusze medyczne",
      "learningGoal": "Cel nauki",
      "generalLanguageSkills": "Ogólne umiejętności językowe",
      "professionalCommunication": "Profesjonalna komunikacja medyczna",
      "professionalSupport": "Profesjonalne wsparcie",
      "minimal": "Minimalny",
      "specificPreparation": "Konkretne przygotowanie do kontekstów medycznych",
      "basic": "Podstawowy",
      "forBeginners": "Dla początkujących",
      "free": "Bezpłatny",
      "basicFeature1": "Dostęp do podstawowego słownictwa",
      "basicFeature2": "Ograniczone scenariusze ćwiczeń",
      "basicFeature3": "Wsparcie społeczności",
      "startFree": "Zacznij za darmo",
      "professional": "Profesjonalny",
      "forActiveLearners": "Dla aktywnych uczniów",
      "month": "miesiąc",
      "proFeature1": "Nieograniczony dostęp do całego słownictwa",
      "proFeature2": "Nieograniczone scenariusze ćwiczeń",
      "proFeature3": "Dostęp offline",
      "proFeature4": "Spersonalizowana ścieżka uczenia się",
      "proFeature5": "Śledzenie postępów",
      "proFeature6": "Priorytetowe wsparcie",
      "team": "Zespół",
      "forInstitutions": "Dla instytucji",
      "year": "rok",
      "teamFeature1": "Wszystkie profesjonalne funkcje",
      "teamFeature2": "Panel postępów zespołu",
      "teamFeature3": "Niestandardowe opcje treści",
      "teamFeature4": "Dedykowany menedżer konta",
      "teamFeature5": "Priorytetowe wsparcie dla zespołów",
      "contactUs": "Skontaktuj się z nami",
      "loyaltyProgram": "Program lojalnościowy",
      "loyaltyDescription": "Odblokuj ekskluzywne korzyści, konsekwentnie ćwicząc z MedLingua.",
      "loyaltyBenefit": "Osiągaj kamienie milowe w nauce i otrzymuj nagrody!",
      "streak90": "90-dniowa seria: Odblokuj ekskluzywne treści",
      "oneFreeMonth": "Ukończ kurs: Otrzymaj jeden miesiąc za darmo",
      "unlimitedRepeatable": "Powtarzalne",
      "recommended": "Zalecane",
      "medicalVocabularyComparison": "Podstawowe",
      "singleVocab": "słownictwo",
      "multipleVocab": "słownictwa",
      "found": "znalezione",
      "noVocabularyFound": "Nie znaleziono słownictwa z wybranymi filtrami.",
      "resetFilters": "Resetuj filtry",
      "searchVocabulary": "Szukaj słownictwa...",
      "recording": "Nagrywanie...",
      "repeatAfterMe": "Powtórz za mną",
      "pronunciationFeedback": "Informacje zwrotne dotyczące wymowy",
      "hint": "Wskazówka",
      "repeat": "Powtórz",
      "languageHint": "Wskazówka językowa",
      "defaultLanguageHint": "Zwróć uwagę na poprawne użycie artykułu i wymowę terminów medycznych.",
      "importantVocabularyInScenario": "Ważne słownictwo w tym scenariuszu",
      "listenToPronunciation": "Posłuchaj wymowy",
      "noVocabularyForScenario": "Brak słownictwa dla tego scenariusza.",
      "aboutThisScenario": "O tym scenariuszu",
      "context": "Kontekst",
      "learningObjectives": "Cele uczenia się",
      "involvedPersons": "Zaangażowane osoby",
      "similarScenarios": "Podobne scenariusze",
      "doctor": "Lekarz",
      "patient": "Pacjent",
      "nurse": "Pielęgniarka",
      "colleague": "Kolega",
      "user": "Ty",
      "scenarioNotFound": "Nie znaleziono scenariusza",
      "redirectingToPractice": "Przekierowywanie do strony ćwiczeń...",
      "noSpeechDetected": "Nie wykryto mowy. Proszę spróbuj ponownie.",
      "excellentPronunciation": "Doskonała wymowa! Twoja intonacja jest bardzo naturalna.",
      "goodPronunciation": "Dobra wymowa. Zwróć trochę większą uwagę na wymowę umlautów.",
      "understandablePronunciation": "Zrozumiała wymowa. Kontynuuj ćwiczenie dźwięków 'ch' i 'r'.",
      "practiceMorePronunciation": "Ćwicz dalej! Skoncentruj się na wymowie niemieckich dźwięków.",
      "backToExercises": "Powrót do ćwiczeń",
      "dialog": "Dialog",
      "practicePronunciation": "Ćwicz wymowę",
      // Domain categories
      'patient-care': 'Opieka nad pacjentem',
      'emergency': 'Nagły wypadek',
      'documentation': 'Dokumentacja',
      'teamwork': 'Praca zespołowa',
      'elderly-care': 'Opieka nad osobami starszymi',
      'disability-care': 'Opieka nad osobami niepełnosprawnymi',
      // Difficulty levels
      'beginner': 'Początkujący (A1-A2)',
      'intermediate': 'Średnio zaawansowany (B1-B2)',
      'advanced': 'Zaawansowany (C1)',
      // Practice page
      'practice': 'Ćwiczenia',
      'area': 'Obszar',
      'allAreas': 'Wszystkie obszary',
      'patientCare': 'Opieka nad pacjentem',
      'elderlyCare': 'Opieka nad osobami starszymi',
      'disabilityCare': 'Opieka nad osobami niepełnosprawnymi',
      'languageLevel': 'Poziom języka',
      'allLevels': 'Wszystkie poziomy',
      'exercises': 'Ćwiczenia',
      'exercise': 'Ćwiczenie',
      'noExercisesFound': 'Nie znaleziono ćwiczeń z wybranymi filtrami.',
      'searchExercises': 'Szukaj ćwiczeń...',
      'showFilters': 'Pokaż filtry',
      'hideFilters': 'Ukryj filtry',
      'viewVocabulary': 'Zobacz słownictwo',
      'practiceDescription': 'Ćwicz niemiecki medyczny w realistycznych scenariuszach z twojej działalności zawodowej',

      // Demo scenario translations
      "demoTitle": "Zobacz MedLingua w akcji",
      "demoDescription": "Przekonaj się, jak MedLingua pomaga ćwiczyć rzeczywiste scenariusze medyczne w języku niemieckim. Zobacz interaktywną demonstrację typowej interakcji z pacjentem.",
      "scenarioDemoTitle": "Scenariusz medyczny: Instrukcje dotyczące leków",
      "scenarioDemoSubtitle": "Ćwicz wyjaśnianie pacjentom instrukcji dotyczących leków w języku niemieckim",
      "scenarioDemoContext": "Scenariusz: Pielęgniarka musi wyjaśnić pacjentowi, jak przyjmować nowy lek.",
      "scenarioDemoComplete": "Scenariusz ukończony! Pomyślnie wyjaśniłeś pacjentowi instrukcje dotyczące leków.",
      "scenarioDemoExplanation": "Z MedLingua możesz:",
      "scenarioDemoBenefit1": "Ćwiczyć realistyczne rozmowy medyczne z pacjentami",
      "scenarioDemoBenefit2": "Uczyć się niemieckiego słownictwa medycznego w kontekście",
      "scenarioDemoBenefit3": "Otrzymywać natychmiastową informację zwrotną na temat swoich odpowiedzi",
      "play": "Odtwórz Demo",
      "pause": "Pauza",
      "replay": "Powtórz Demo",
      "showTranslation": "Pokaż tłumaczenie",
      "hideTranslation": "Ukryj tłumaczenie",
      "scenarioCompleted": "Scenariusz ukończony"
    },
    ro: {
      "home": "Acasă",
      "practice": "Exersează",
      "vocabulary": "
