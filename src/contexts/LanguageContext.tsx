
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface GermanDialect {
  code: string;
  name: string;
  region: string;
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
  setUserLanguage: (languageCode: string) => void;
  germanDialect: string;
  setGermanDialect: (dialectCode: string) => void;
  germanDialects: GermanDialect[];
  getLanguageName: (code: string) => string;
  getDialectName: (code: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interfaceLanguage, setInterfaceLanguage] = useState<string>(
    localStorage.getItem('uiLanguage') || 'de'
  );
  
  const [userLanguage, setUserLanguage] = useState<string>(
    localStorage.getItem('userLanguage') || navigator.language.split('-')[0] || 'en'
  );
  
  const [germanDialect, setGermanDialect] = useState<string>(
    localStorage.getItem('germanDialect') || 'standard'
  );

  // Store language preferences in localStorage
  useEffect(() => {
    localStorage.setItem('uiLanguage', interfaceLanguage);
  }, [interfaceLanguage]);
  
  useEffect(() => {
    localStorage.setItem('userLanguage', userLanguage);
  }, [userLanguage]);
  
  useEffect(() => {
    localStorage.setItem('germanDialect', germanDialect);
  }, [germanDialect]);

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
  
  const germanDialects: GermanDialect[] = [
    { code: 'standard', name: 'Standarddeutsch', region: 'Standard' },
    { code: 'bavarian', name: 'Bairisch', region: 'Bavaria' },
    { code: 'swiss', name: 'Schweizerdeutsch', region: 'Switzerland' },
    { code: 'austrian', name: 'Österreichisches Deutsch', region: 'Austria' }
  ];

  const getLanguageName = useCallback((code: string): string => {
    const language = supportedLanguages.find(lang => lang.code === code);
    return language ? language.nativeName : code;
  }, [supportedLanguages]);
  
  const getDialectName = useCallback((code: string): string => {
    const dialect = germanDialects.find(d => d.code === code);
    return dialect ? dialect.name : code;
  }, [germanDialects]);

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
      "swipeLeft": "Swipe left",
      "swipeRight": "Swipe right",
      "swipeToSwitch": "Swipe to switch between content",
      "ctaHeading": "Ready to improve your medical German?",
      "ctaText": "Start practicing with real-life medical scenarios and improve your communication skills.",
      "startWithExercises": "Start with Exercises",
      "readyToImprove": "Want to track your progress?",
      "startTodayCta": "Create a free account to save your progress and access more features.",
      "registerFree": "Register for Free",
      "skipOnboardingFlow": "Skip personalization (go directly to dashboard)",
      "createAccount": "Create your account",
      "startJourney": "Start your journey to better medical German communication",
      "fullName": "Full Name",
      "email": "Email",
      "password": "Password",
      "minPasswordLength": "Password must be at least 6 characters long",
      "registerBenefits": "By registering you get:",
      "benefit1": "Personalized learning path based on your level",
      "benefit2": "Progress tracking and statistics",
      "benefit3": "Access to all basic medical scenarios",
      "registration": "Registering",
      "termsAndConditions": "By registering, you agree to our Terms of Service and Privacy Policy.",
      "alreadyRegistered": "Already registered?",
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
      "understandablePronunciation": "Understandable pronunciation. Continue practicing the 'ch' and 'r' sounds.",
      "practiceMorePronunciation": "Keep practicing! Focus on the pronunciation of German specific sounds.",
      "backToExercises": "Back to Exercises",
      "dialog": "Dialog",
      "practicePronunciation": "Practice Pronunciation"
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
      "swipeLeft": "Nach links wischen",
      "swipeRight": "Nach rechts wischen",
      "swipeToSwitch": "Wischen Sie, um zwischen Inhalten zu wechseln",
      "ctaHeading": "Bereit, Ihr medizinisches Deutsch zu verbessern?",
      "ctaText": "Beginnen Sie mit dem Üben realer medizinischer Szenarien und verbessern Sie Ihre Kommunikationsfähigkeiten.",
      "startWithExercises": "Mit Übungen beginnen",
      "readyToImprove": "Möchten Sie Ihren Fortschritt verfolgen?",
      "startTodayCta": "Erstellen Sie ein kostenloses Konto, um Ihren Fortschritt zu speichern und auf weitere Funktionen zuzugreifen.",
      "registerFree": "Kostenlos registrieren",
      "skipOnboardingFlow": "Personalisierung überspringen (direkt zum Dashboard)",
      "createAccount": "Konto erstellen",
      "startJourney": "Beginnen Sie Ihre Reise zu einer besseren medizinischen Kommunikation auf Deutsch",
      "fullName": "Vollständiger Name",
      "email": "E-Mail",
      "password": "Passwort",
      "minPasswordLength": "Das Passwort muss mindestens 6 Zeichen lang sein",
      "registerBenefits": "Mit der Registrierung erhalten Sie:",
      "benefit1": "Personalisierter Lernpfad basierend auf Ihrem Niveau",
      "benefit2": "Fortschrittsverfolgung und Statistiken",
      "benefit3": "Zugang zu allen grundlegenden medizinischen Szenarien",
      "registration": "Registrierung",
      "termsAndConditions": "Mit der Registrierung stimmen Sie unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.",
      "alreadyRegistered": "Bereits registriert?",
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
      "madeWithLove": "Zrobione z ❤️ w Berlinie",
      "footerTagline": "Wzmacnianie pozycji pracowników służby zdrowia dzięki skutecznym umiejętnościom językowym.",
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
      "pricingTitle": "Ceny",
      "swipeLeft": "Przesuń w lewo",
      "swipeRight": "Przesuń w prawo",
      "swipeToSwitch": "Przesuń, aby przełączać się między treściami",
      "ctaHeading": "Gotowy, aby poprawić swój niemiecki medyczny?",
      "ctaText": "Zacznij ćwiczyć z prawdziwymi scenariuszami medycznymi i popraw swoje umiejętności komunikacyjne.",
      "startWithExercises": "Zacznij od ćwiczeń",
      "readyToImprove": "Chcesz śledzić swoje postępy?",
      "startTodayCta": "Utwórz bezpłatne konto, aby zapisać swoje postępy i uzyskać dostęp do większej liczby funkcji.",
      "registerFree": "Zarejestruj się za darmo",
      "skipOnboardingFlow": "Pomiń personalizację (przejdź bezpośrednio do pulpitu nawigacyjnego)",
      "createAccount": "Utwórz swoje konto",
      "startJourney": "Rozpocznij swoją podróż do lepszej komunikacji medycznej w języku niemieckim",
      "fullName": "Imię i nazwisko",
      "email": "E-mail",
      "password": "Hasło",
      "minPasswordLength": "Hasło musi mieć co najmniej 6 znaków",
      "registerBenefits": "Rejestrując się, otrzymujesz:",
      "benefit1": "Spersonalizowana ścieżka uczenia się oparta na Twoim poziomie",
      "benefit2": "Śledzenie postępów i statystyki",
      "benefit3": "Dostęp do wszystkich podstawowych scenariuszy medycznych",
      "registration": "Rejestracja",
      "termsAndConditions": "Rejestrując się, zgadzasz się z naszymi Warunkami korzystania z usługi i Polityką prywatności.",
      "alreadyRegistered": "Masz już konto?",
      "demoTitle": "Zobacz MedLingua w akcji",
      "demoDescription": "Dowiedz się, jak MedLingua pomaga ćwiczyć prawdziwe scenariusze medyczne w języku niemieckim. Obejrzyj interaktywną demonstrację typowej interakcji z pacjentem.",
      "scenarioDemoTitle": "Scenariusz medyczny: Instrukcje dotyczące leków",
      "scenarioDemoSubtitle": "Ćwicz wyjaśnianie pacjentom w języku niemieckim, jak powinni przyjmować leki",
      "scenarioDemoContext": "Scenariusz: Pielęgniarka musi wyjaśnić pacjentowi, jak ma przyjmować nowy lek.",
      "scenarioDemoComplete": "Scenariusz zakończony! Pomyślnie wyjaśniłeś pacjentowi instrukcje dotyczące leków.",
      "scenarioDemoExplanation": "Z MedLingua możesz:",
      "scenarioDemoBenefit1": "Ćwicz realistyczne rozmowy medyczne z pacjentami",
      "scenarioDemoBenefit2": "Ucz się słownictwa medycznego w kontekście",
      "scenarioDemoBenefit3": "Uzyskaj natychmiastową informację zwrotną na temat swoich odpowiedzi",
      "play": "Odtwórz demo",
      "pause": "Pauza",
      "replay": "Odtwórz demo ponownie",
      "showTranslation": "Pokaż tłumaczenie",
      "hideTranslation": "Ukryj tłumaczenie",
      "scenarioCompleted": "Scenariusz zakończony",
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
      "involvedPersons": "Osoby zaangażowane",
      "similarScenarios": "Podobne scenariusze",
      "doctor": "Lekarz",
      "patient": "Pacjent",
      "nurse": "Pielęgniarka",
      "colleague": "Kolega",
      "user": "Ty",
      "scenarioNotFound": "Nie znaleziono scenariusza",
      "redirectingToPractice": "Przekierowywanie do strony ćwiczeń...",
      "noSpeechDetected": "Nie wykryto mowy. Spróbuj ponownie.",
      "excellentPronunciation": "Doskonała wymowa! Twoja intonacja jest bardzo naturalna.",
      "goodPronunciation": "Dobra wymowa. Zwróć trochę więcej uwagi na wymowę umlautów.",
      "understandablePronunciation": "Zrozumiała wymowa. Kontynuuj ćwiczenie dźwięków 'ch' i 'r'.",
      "practiceMorePronunciation": "Ćwicz dalej! Skoncentruj się na wymowie dźwięków specyficznych dla języka niemieckiego.",
      "backToExercises": "Powrót do ćwiczeń",
      "dialog": "Dialog",
      "practicePronunciation": "Ćwicz wymowę"
    },
    ro: {
      "home": "Acasă",
      "practice": "Exersează",
      "vocabulary": "Vocabular",
      "profile": "Profil",
      "logout": "Deconectare",
      "login": "Autentificare",
      "register": "Înregistrare",
      "allRightsReserved": "Toate drepturile rezervate.",
      "privacy": "Politica de confidențialitate",
      "terms": "Termeni și condiții",
      "contact": "Contact",
      "madeWithLove": "Făcut cu ❤️ în Berlin",
      "footerTagline": "Ajutăm profesioniștii din sănătate cu abilități lingvistice eficiente.",
      "navigation": "Navigare",
      "categories": "Categorii",
      "languageLevels": "Niveluri de limbă",
      "patientCare": "Îngrijirea pacientului",
      "emergency": "Urgență",
      "documentation": "Documentație",
      "teamwork": "Munca în echipă",
      "beginner": "Începător",
      "intermediate": "Intermediar",
      "advanced": "Avansat",
      "medicalGerman": "Germană medicală",
      "improveYour": "Îmbunătățește-ți",
      "medicalCommunication": "Comunicarea medicală",
      "trainScenarios": "Antrenează scenarii medicale realiste.",
      "startExercise": "Începe exercițiul",
      "learnVocabulary": "Învață vocabular",
      "medicalStaffWorking": "Personal medical la lucru",
      "hospitalScene": "Scenă de spital",
      "medicalEducation": "Educație medicală",
      "features": "Caracteristici",
      "pricingTitle": "Prețuri",
      "swipeLeft": "Glisează spre stânga",
      "swipeRight": "Glisează spre dreapta",
      "swipeToSwitch": "Glisează pentru a comuta între conținut",
      "ctaHeading": "Ești gata să-ți îmbunătățești germana medicală?",
      "ctaText": "Începe să exersezi cu scenarii medicale reale și îmbunătățește-ți abilitățile de comunicare.",
      "startWithExercises": "Începe cu exerciții",
      "readyToImprove": "Vrei să-ți urmărești progresul?",
      "startTodayCta": "Creează un cont gratuit pentru a-ți salva progresul și a accesa mai multe funcții.",
      "registerFree": "Înregistrează-te gratuit",
      "skipOnboardingFlow": "Ocolește personalizarea (mergi direct la tabloul de bord)",
      "createAccount": "Creează-ți contul",
      "startJourney": "Începe-ți călătoria către o comunicare medicală mai bună în germană",
      "fullName": "Numele complet",
      "email": "E-mail",
      "password": "Parola",
      "minPasswordLength": "Parola trebuie să aibă cel puțin 6 caractere",
      "registerBenefits": "Prin înregistrare obții:",
      "benefit1": "Cale de învățare personalizată în funcție de nivelul tău",
      "benefit2": "Urmărirea progresului și statistici",
      "benefit3": "Acces la toate scenariile medicale de bază",
      "registration": "Înregistrare",
      "termsAndConditions": "Prin înregistrare, ești de acord cu Termenii și condițiile noastre și cu Politica de confidențialitate.",
      "alreadyRegistered": "Ești deja înregistrat?",
      "demoTitle": "Vezi MedLingua în acțiune",
      "demoDescription": "Experimentează modul în care MedLingua te ajută să exersezi scenarii medicale reale în germană. Urmărește această demonstrație interactivă a unei interacțiuni tipice cu un pacient.",
      "scenarioDemoTitle": "Scenariu medical: Instrucțiuni de medicamente",
      "scenarioDemoSubtitle": "Exersează explicarea pacienților în germană cum ar trebui să-și ia medicamentele",
      "scenarioDemoContext": "Scenariu: O asistentă trebuie să explice unui pacient cum să-și ia noul medicament.",
      "scenarioDemoComplete": "Scenariul s-a încheiat! Ai explicat cu succes pacientului instrucțiunile de medicamente.",
      "scenarioDemoExplanation": "Cu MedLingua poți:",
      "scenarioDemoBenefit1": "Exersează conversații medicale realiste cu pacienții",
      "scenarioDemoBenefit2": "Învață vocabularul medical german în context",
      "scenarioDemoBenefit3": "Obține feedback imediat asupra răspunsurilor tale",
      "play": "Redă demo-ul",
      "pause": "Pauză",
      "replay": "Reia demo-ul",
      "showTranslation": "Arată traducerea",
      "hideTranslation": "Ascunde traducerea",
      "scenarioCompleted": "Scenariul s-a încheiat",
      "singleVocab": "vocabular",
      "multipleVocab": "vocabulare",
      "found": "găsite",
      "noVocabularyFound": "Nu s-a găsit niciun vocabular cu filtrele selectate.",
      "resetFilters": "Resetează filtrele",
      "searchVocabulary": "Caută vocabular...",
      "recording": "Înregistrare...",
      "repeatAfterMe": "Repetă după mine",
      "pronunciationFeedback": "Feedback pronunție",
      "hint": "Indiciu",
      "repeat": "Repetă",
      "languageHint": "Indiciu lingvistic",
      "defaultLanguageHint": "Acordă atenție folosirii corecte a articolului și pronunției termenilor medicali.",
      "importantVocabularyInScenario": "Vocabular important în acest scenariu",
      "listenToPronunciation": "Ascultă pronunția",
      "noVocabularyForScenario": "Niciun vocabular disponibil pentru acest scenariu.",
      "aboutThisScenario": "Despre acest scenariu",
      "context": "Context",
      "learningObjectives": "Obiective de învățare",
      "involvedPersons": "Persoane implicate",
      "similarScenarios": "Scenarii similare",
      "doctor": "Medic",
      "patient": "Pacient",
      "nurse": "Asistent medical",
      "colleague": "Coleg",
      "user": "Tu",
      "scenarioNotFound": "Scenariul nu a fost găsit",
      "redirectingToPractice": "Redirecționare către pagina de exerciții...",
      "noSpeechDetected": "Nu a fost detectat niciun sunet. Vă rugăm să încercați din nou.",
      "excellentPronunciation": "Pronunție excelentă! Intonația ta este foarte naturală.",
      "goodPronunciation": "Pronunție bună. Acordă puțin mai multă atenție pronunției umlautului.",
      "understandablePronunciation": "Pronunție inteligibilă. Continuă să exersezi sunetele 'ch' și 'r'.",
      "practiceMorePronunciation": "Continuă să exersezi! Concentrează-te pe pronunția sunetelor specifice germane.",
      "backToExercises": "Înapoi la exerciții",
      "dialog": "Dialog",
      "practicePronunciation": "Exersează pronunția"
    },
    hr: {
      "home": "Početna",
      "practice": "Vježba",
      "vocabulary": "Rječnik",
      "profile": "Profil",
      "logout": "Odjava",
      "login": "Prijava",
      "register": "Registracija",
      "allRightsReserved": "Sva prava pridržana.",
      "privacy": "Politika privatnosti",
      "terms": "Uvjeti korištenja",
      "contact": "Kontakt",
      "madeWithLove": "Napravljeno s ❤️ u Berlinu",
      "footerTagline": "Osnažujemo zdravstvene djelatnike učinkovitim jezičnim vještinama."
    }
  };

  const translate = useCallback(
    (key: string): string => {
      if (!translations[interfaceLanguage] || !translations[interfaceLanguage][key]) {
        // Fallback to English if the key doesn't exist in the current language
        return translations.en[key] || key;
      }
      return translations[interfaceLanguage][key];
    },
    [interfaceLanguage]
  );

  const getGermanContent = useCallback((key: string): string => {
    // Always return the German content regardless of interface language
    return translations.de[key] || key;
  }, []);

  const contextValue = {
    interfaceLanguage,
    supportedLanguages,
    translations,
    changeUILanguage,
    translate,
    getGermanContent,
    userLanguage,
    setUserLanguage,
    germanDialect,
    setGermanDialect,
    germanDialects,
    getLanguageName,
    getDialectName
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
