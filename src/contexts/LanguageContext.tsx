
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
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
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
  changeUILanguage: (code: string) => void;
}

// More extensive translations for interface elements
const translations: Record<string, Record<string, string>> = {
  de: {
    welcome: 'Willkommen',
    language: 'Sprache',
    settings: 'Einstellungen',
    home: 'Startseite',
    practice: 'Übungen',
    vocabulary: 'Vokabular',
    dialog: 'Dialog',
    profile: 'Profil',
    startExercise: 'Übung starten',
    learnVocabulary: 'Vokabeln lernen',
    progress: 'Dein Fortschritt',
    weeklyGoal: 'Wöchentliches Ziel',
    streak: 'Tagesstreak',
    completedScenarios: 'Abgeschlossene Szenarien',
    masteredVocabulary: 'Beherrschte Vokabeln',
    exercises: 'Übungen',
    of: 'von',
    days: 'Tage',
    recommendedExercises: 'Empfohlene Übungen',
    showAll: 'Alle anzeigen',
    medicalGerman: 'Medizinisches Deutsch für alle Sprachniveaus',
    improveYour: 'Verbessere deine',
    medicalCommunication: 'medizinische Kommunikation',
    trainScenarios: 'Übе Dialogszenarien und Fachvokabular für deinen beruflichen Alltag im Gesundheitswesen, unabhängig von deinem Sprachniveau.',
    // Registration page
    createAccount: 'Konto erstellen',
    startJourney: 'Starten Sie Ihre Reise zum medizinischen Sprachexperten',
    fullName: 'Ihr vollständiger Name',
    email: 'E-Mail',
    password: 'Passwort',
    minPasswordLength: 'Passwort muss mindestens 6 Zeichen lang sein',
    skipOnboardingFlow: 'Einrichtungsassistent überspringen (kann später in den Einstellungen durchgeführt werden)',
    registerBenefits: 'Mit der Registrierung erhalten Sie:',
    benefit1: 'Zugang zu medizinischen Dialogszenarien',
    benefit2: 'Fachspezifisches Vokabeltraining',
    benefit3: 'Persönlichen Fortschritt verfolgen',
    register: 'Registrieren',
    registration: 'Registrierung',
    termsAndConditions: 'Mit der Registrierung akzeptieren Sie unsere Nutzungsbedingungen und Datenschutzrichtlinien.',
    alreadyRegistered: 'Bereits registriert? Jetzt anmelden',
    // Landing page
    startFree: 'Kostenlos starten',
    learnMore: 'Mehr erfahren',
    specializedForMedical: 'Spezialisiert für den medizinischen Bereich',
    medLinguaDifference: 'MedLingua unterscheidet sich von allgemeinen Sprachlern-Apps durch den Fokus auf den medizinischen Kontext.',
    medicalVocabulary: 'Medizinisches Fachvokabular',
    learnTerms: 'Lerne über 2.000 medizinische Fachbegriffe, Diagnosen und Redewendungen, die im Klinikalltag wirklich relevant sind.',
    practicalDialogs: 'Praxisnahe Dialogszenarien',
    practiceConversations: 'Übe mit realistischen Gesprächssituationen aus dem Krankenhausalltag - von der Patientenaufnahme bis zur Visite.',
    allLanguageLevels: 'Für alle Sprachniveaus',
    customContent: 'Maßgeschneiderte Inhalte für jedes Sprachniveau von A1 bis C1 - du kannst sofort starten, egal wo du stehst.',
    expertDeveloped: 'Mit Experten entwickelt',
    contentDevelopment: 'Alle Inhalte wurden in Zusammenarbeit mit Ärzten, Pflegekräften und Sprachlehrern entwickelt und geprüft.',
    nurseOptimized: 'Für Pflegekräfte optimiert',
    internationalNurses: 'Besonderer Fokus auf die sprachlichen Bedürfnisse von internationalen Pflegekräften in Deutschland.',
    certificationRecognition: 'Zertifikatsanerkennung',
    examPreparation: 'Optimale Vorbereitung auf Sprachprüfungen für die berufliche Anerkennung im deutschen Gesundheitswesen.',
    comparisonTitle: 'Im Vergleich zu allgemeinen Sprachlern-Apps',
    feature: 'Feature',
    generalApps: 'Allgemeine Apps',
    medicalVocabularyComparison: 'Begrenzt oder nicht vorhanden',
    comprehensiveSpecialized: 'Umfassend & spezialisiert',
    dialogScenarios: 'Praxisnahe Dialogszenarien',
    everydayConversations: 'Allgemeine Alltagsgespräche',
    realisticMedical: 'Realistische medizinische Situationen',
    learningGoal: 'Lernziel',
    generalLanguageSkills: 'Allgemeine Sprachkenntnisse',
    professionalCommunication: 'Berufsbezogene Kommunikation',
    professionalSupport: 'Unterstützung von Fachkräften',
    minimal: 'Minimal',
    specificPreparation: 'Spezifische Vorbereitung auf den Berufsalltag',
    pricingTitle: 'Einfache und transparente Preise',
    pricingDescription: 'Wähle den Plan, der am besten zu deinen Lernzielen passt.',
    basic: 'Basis',
    forBeginners: 'Für Einsteiger',
    free: 'Kostenlos',
    professional: 'Professional',
    forActiveLearners: 'Für aktive Lerner',
    team: 'Team',
    forInstitutions: 'Für Institutionen',
    basicFeature1: 'Grundlegendes medizinisches Vokabular',
    basicFeature2: '5 Dialogszenarien pro Monat',
    basicFeature3: 'Fortschrittsübersicht',
    proFeature1: 'Vollständiger Zugriff auf das Fachvokabular',
    proFeature2: 'Unbegrenzte Dialogszenarien',
    proFeature3: 'Offline-Modus für unterwegs',
    proFeature4: 'FSP-Prüfungsvorbereitung mit Zeitoptionen',
    proFeature5: 'Detaillierte Ergebnisanalysen',
    proFeature6: '1 Monat gratis nach 3-Monats-Streak',
    teamFeature1: 'Alles aus Professional',
    teamFeature2: 'Bis zu 10 Benutzerkonten',
    teamFeature3: 'Administratorbereich',
    teamFeature4: 'Fortschrittsberichte für das Team',
    teamFeature5: 'Mündliche Prüfungssimulationen',
    contactUs: 'Kontakt aufnehmen',
    loyaltyProgram: 'Treue-Programm: 3+1',
    loyaltyDescription: 'Nutze MedLingua 3 Monate regelmäßig',
    loyaltyBenefit: 'Und erhalte den 4. Monat Premium kostenlos!',
    streak90: '90 Tage Streak',
    oneFreeMonth: '= 1 Monat Premium gratis',
    unlimitedRepeatable: 'Unbegrenzt wiederholbar',
    readyToImprove: 'Bereit, deine medizinischen Sprachkenntnisse zu verbessern?',
    startTodayCta: 'Starte noch heute und mache dich fit für deinen beruflichen Alltag im deutschen Gesundheitswesen.',
    registerFree: 'Kostenlos registrieren',
    languageSelection: 'Sprache wählen',
    month: 'Monat',
    year: 'Jahr',
    recommended: 'Empfohlen',
    selectLanguage: 'Sprache auswählen',
    ctaHeading: 'Bereit, deine Sprachfähigkeiten zu verbessern?',
    ctaText: 'Starte jetzt mit den Übungen und verbessere deine berufliche Kommunikation im medizinischen Bereich - für alle Sprachniveaus von A1 bis C1.',
    startWithExercises: 'Mit Übungen beginnen',
    swipeToSwitch: 'Wischen Sie nach links oder rechts, um zwischen den Registern zu wechseln',
  },
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
    // Registration page
    createAccount: 'Create Account',
    startJourney: 'Start your journey to becoming a medical language expert',
    fullName: 'Your full name',
    email: 'Email',
    password: 'Password',
    minPasswordLength: 'Password must be at least 6 characters long',
    skipOnboardingFlow: 'Skip onboarding flow (can be completed later in settings)',
    registerBenefits: 'With registration you will receive:',
    benefit1: 'Access to medical dialogue scenarios',
    benefit2: 'Specialized vocabulary training',
    benefit3: 'Personal progress tracking',
    register: 'Register',
    registration: 'Registration',
    termsAndConditions: 'By registering, you accept our Terms of Service and Privacy Policy.',
    alreadyRegistered: 'Already registered? Sign in now',
    // Landing page
    startFree: 'Start for free',
    learnMore: 'Learn more',
    specializedForMedical: 'Specialized for the medical field',
    medLinguaDifference: 'MedLingua differs from general language learning apps by focusing on the medical context.',
    medicalVocabulary: 'Medical Terminology',
    learnTerms: 'Learn over 2,000 medical terms, diagnoses, and phrases that are truly relevant in daily clinical practice.',
    practicalDialogs: 'Practical Dialogue Scenarios',
    practiceConversations: 'Practice with realistic conversations from hospital daily routines - from patient admission to ward rounds.',
    allLanguageLevels: 'For All Language Levels',
    customContent: 'Tailored content for every language level from A1 to C1 - you can start immediately, regardless of your current level.',
    expertDeveloped: 'Developed with Experts',
    contentDevelopment: 'All content was developed and reviewed in collaboration with doctors, nurses, and language teachers.',
    nurseOptimized: 'Optimized for Nursing Staff',
    internationalNurses: 'Special focus on the language needs of international nursing staff in Germany.',
    certificationRecognition: 'Certification Recognition',
    examPreparation: 'Optimal preparation for language exams for professional recognition in German healthcare.',
    comparisonTitle: 'Compared to general language learning apps',
    feature: 'Feature',
    generalApps: 'General Apps',
    medicalVocabularyComparison: 'Limited or non-existent',
    comprehensiveSpecialized: 'Comprehensive & specialized',
    dialogScenarios: 'Practical Dialogue Scenarios',
    everydayConversations: 'General everyday conversations',
    realisticMedical: 'Realistic medical situations',
    learningGoal: 'Learning Goal',
    generalLanguageSkills: 'General language skills',
    professionalCommunication: 'Professional communication',
    professionalSupport: 'Support for professionals',
    minimal: 'Minimal',
    specificPreparation: 'Specific preparation for professional daily life',
    pricingTitle: 'Simple and transparent pricing',
    pricingDescription: 'Choose the plan that best suits your learning goals.',
    basic: 'Basic',
    forBeginners: 'For beginners',
    free: 'Free',
    professional: 'Professional',
    forActiveLearners: 'For active learners',
    team: 'Team',
    forInstitutions: 'For institutions',
    basicFeature1: 'Basic medical vocabulary',
    basicFeature2: '5 dialogue scenarios per month',
    basicFeature3: 'Progress overview',
    proFeature1: 'Full access to specialized vocabulary',
    proFeature2: 'Unlimited dialogue scenarios',
    proFeature3: 'Offline mode for on-the-go',
    proFeature4: 'Medical language exam preparation with time options',
    proFeature5: 'Detailed result analyses',
    proFeature6: '1 month free after 3-month streak',
    teamFeature1: 'Everything from Professional',
    teamFeature2: 'Up to 10 user accounts',
    teamFeature3: 'Administrator area',
    teamFeature4: 'Progress reports for the team',
    teamFeature5: 'Oral exam simulations',
    contactUs: 'Contact us',
    loyaltyProgram: 'Loyalty Program: 3+1',
    loyaltyDescription: 'Use MedLingua regularly for 3 months',
    loyaltyBenefit: 'And get the 4th month of Premium for free!',
    streak90: '90 day streak',
    oneFreeMonth: '= 1 month Premium free',
    unlimitedRepeatable: 'Unlimitedly repeatable',
    readyToImprove: 'Ready to improve your medical language skills?',
    startTodayCta: 'Start today and prepare yourself for your professional everyday life in German healthcare.',
    registerFree: 'Register for free',
    languageSelection: 'Select language',
    month: 'month',
    year: 'year',
    recommended: 'Recommended',
    selectLanguage: 'Select language',
    ctaHeading: 'Ready to improve your language skills?',
    ctaText: 'Start now with the exercises and improve your professional communication in the medical field - for all language levels from A1 to C1.',
    startWithExercises: 'Start with exercises',
    swipeToSwitch: 'Swipe left or right to switch between tabs',
  },
  es: {
    welcome: 'Bienvenido',
    language: 'Idioma',
    settings: 'Configuración',
    home: 'Inicio',
    practice: 'Ejercicios',
    vocabulary: 'Vocabulario',
    dialog: 'Diálogo',
    profile: 'Perfil',
    startExercise: 'Comenzar ejercicio',
    learnVocabulary: 'Aprender vocabulario',
    progress: 'Tu progreso',
    weeklyGoal: 'Objetivo semanal',
    streak: 'Racha diaria',
    completedScenarios: 'Escenarios completados',
    masteredVocabulary: 'Vocabulario dominado',
    exercises: 'ejercicios',
    of: 'de',
    days: 'días',
    recommendedExercises: 'Ejercicios recomendados',
    showAll: 'Mostrar todo',
    medicalGerman: 'Alemán médico para todos los niveles de idioma',
    improveYour: 'Mejora tu',
    medicalCommunication: 'comunicación médica',
    trainScenarios: 'Practica escenarios de diálogo y terminología para tu vida profesional diaria en el ámbito sanitario, independientemente de tu nivel de idioma.',
    // Registration page
    createAccount: 'Crear cuenta',
    startJourney: 'Comienza tu viaje para convertirte en un experto en idioma médico',
    fullName: 'Tu nombre completo',
    email: 'Correo electrónico',
    password: 'Contraseña',
    minPasswordLength: 'La contraseña debe tener al menos 6 caracteres',
    skipOnboardingFlow: 'Omitir el proceso de incorporación (se puede completar más tarde en la configuración)',
    registerBenefits: 'Con el registro recibirás:',
    benefit1: 'Acceso a escenarios de diálogo médico',
    benefit2: 'Entrenamiento de vocabulario especializado',
    benefit3: 'Seguimiento de progreso personal',
    register: 'Registrarse',
    registration: 'Registro',
    termsAndConditions: 'Al registrarte, aceptas nuestros Términos de servicio y Política de privacidad.',
    alreadyRegistered: '¿Ya estás registrado? Inicia sesión ahora',
    // Landing page
    startFree: 'Comienza gratis',
    learnMore: 'Saber más',
    specializedForMedical: 'Especializado para el campo médico',
    medLinguaDifference: 'MedLingua se diferencia de las aplicaciones generales de aprendizaje de idiomas al centrarse en el contexto médico.',
    medicalVocabulary: 'Terminología médica',
    learnTerms: 'Aprende más de 2.000 términos médicos, diagnósticos y frases que son realmente relevantes en la práctica clínica diaria.',
    practicalDialogs: 'Escenarios de diálogo prácticos',
    practiceConversations: 'Practica con conversaciones realistas de la rutina hospitalaria diaria, desde la admisión de pacientes hasta las rondas médicas.',
    allLanguageLevels: 'Para todos los niveles de idioma',
    customContent: 'Contenido adaptado para cada nivel de idioma, desde A1 hasta C1 - puedes comenzar inmediatamente, independientemente de tu nivel actual.',
    expertDeveloped: 'Desarrollado con expertos',
    contentDevelopment: 'Todo el contenido fue desarrollado y revisado en colaboración con médicos, enfermeras y profesores de idiomas.',
    nurseOptimized: 'Optimizado para personal de enfermería',
    internationalNurses: 'Enfoque especial en las necesidades lingüísticas del personal de enfermería internacional en Alemania.',
    certificationRecognition: 'Reconocimiento de certificación',
    examPreparation: 'Preparación óptima para exámenes de idiomas para el reconocimiento profesional en el sistema sanitario alemán.',
    comparisonTitle: 'En comparación con aplicaciones generales de aprendizaje de idiomas',
    feature: 'Característica',
    generalApps: 'Aplicaciones generales',
    medicalVocabularyComparison: 'Limitado o inexistente',
    comprehensiveSpecialized: 'Completo y especializado',
    dialogScenarios: 'Escenarios de diálogo prácticos',
    everydayConversations: 'Conversaciones cotidianas generales',
    realisticMedical: 'Situaciones médicas realistas',
    learningGoal: 'Objetivo de aprendizaje',
    generalLanguageSkills: 'Habilidades lingüísticas generales',
    professionalCommunication: 'Comunicación profesional',
    professionalSupport: 'Apoyo para profesionales',
    minimal: 'Mínimo',
    specificPreparation: 'Preparación específica para la vida profesional diaria',
    pricingTitle: 'Precios simples y transparentes',
    pricingDescription: 'Elige el plan que mejor se adapte a tus objetivos de aprendizaje.',
    basic: 'Básico',
    forBeginners: 'Para principiantes',
    free: 'Gratis',
    professional: 'Profesional',
    forActiveLearners: 'Para estudiantes activos',
    team: 'Equipo',
    forInstitutions: 'Para instituciones',
    basicFeature1: 'Vocabulario médico básico',
    basicFeature2: '5 escenarios de diálogo al mes',
    basicFeature3: 'Resumen de progreso',
    proFeature1: 'Acceso completo al vocabulario especializado',
    proFeature2: 'Escenarios de diálogo ilimitados',
    proFeature3: 'Modo sin conexión para usar en cualquier lugar',
    proFeature4: 'Preparación para exámenes de idioma médico con opciones de tiempo',
    proFeature5: 'Análisis detallados de resultados',
    proFeature6: '1 mes gratis después de una racha de 3 meses',
    teamFeature1: 'Todo lo de Profesional',
    teamFeature2: 'Hasta 10 cuentas de usuario',
    teamFeature3: 'Área de administrador',
    teamFeature4: 'Informes de progreso para el equipo',
    teamFeature5: 'Simulaciones de exámenes orales',
    contactUs: 'Contáctanos',
    loyaltyProgram: 'Programa de fidelidad: 3+1',
    loyaltyDescription: 'Usa MedLingua regularmente durante 3 meses',
    loyaltyBenefit: '¡Y obtén el 4º mes de Premium gratis!',
    streak90: 'Racha de 90 días',
    oneFreeMonth: '= 1 mes Premium gratis',
    unlimitedRepeatable: 'Repetible ilimitadamente',
    readyToImprove: '¿Listo para mejorar tus habilidades lingüísticas médicas?',
    startTodayCta: 'Comienza hoy y prepárate para tu vida profesional cotidiana en el sistema sanitario alemán.',
    registerFree: 'Regístrate gratis',
    languageSelection: 'Seleccionar idioma',
    month: 'mes',
    year: 'año',
    recommended: 'Recomendado',
    selectLanguage: 'Seleccionar idioma',
    ctaHeading: '¿Listo para mejorar tus habilidades lingüísticas?',
    ctaText: 'Comienza ahora con los ejercicios y mejora tu comunicación profesional en el campo médico - para todos los niveles de idioma desde A1 hasta C1.',
    startWithExercises: 'Comenzar con ejercicios',
    swipeToSwitch: 'Desliza hacia la izquierda o derecha para cambiar entre pestañas',
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
    streak: 'Zile consecutive',
    completedScenarios: 'Scenarii finalizate',
    masteredVocabulary: 'Vocabular stăpânit',
    exercises: 'exerciții',
    of: 'din',
    days: 'zile',
    recommendedExercises: 'Exerciții recomandate',
    showAll: 'Arată toate',
    medicalGerman: 'Germană medicală pentru toate nivelurile lingvistice',
    improveYour: 'Îmbunătățește-ți',
    medicalCommunication: 'comunicarea medicală',
    trainScenarios: 'Exersează scenarii de dialog și terminologie pentru viața ta profesională de zi cu zi în domeniul sănătății, indiferent de nivelul tău lingvistic.',
    // Registration page
    createAccount: 'Creează cont',
    startJourney: 'Începe călătoria ta pentru a deveni un expert în limbaj medical',
    fullName: 'Numele tău complet',
    email: 'Email',
    password: 'Parolă',
    minPasswordLength: 'Parola trebuie să aibă cel puțin 6 caractere',
    skipOnboardingFlow: 'Omite fluxul de inițiere (poate fi completat mai târziu în setări)',
    registerBenefits: 'Cu înregistrarea vei primi:',
    benefit1: 'Acces la scenarii de dialog medical',
    benefit2: 'Antrenament de vocabular specializat',
    benefit3: 'Urmărirea progresului personal',
    register: 'Înregistrare',
    registration: 'Înregistrare',
    termsAndConditions: 'Prin înregistrare, accepți Termenii noștri de serviciu și Politica de confidențialitate.',
    alreadyRegistered: 'Deja înregistrat? Conectează-te acum',
    // Landing page
    startFree: 'Începe gratuit',
    learnMore: 'Află mai multe',
    specializedForMedical: 'Specializat pentru domeniul medical',
    medLinguaDifference: 'MedLingua se diferențiază de aplicațiile generale de învățare a limbilor prin concentrarea pe contextul medical.',
    medicalVocabulary: 'Terminologie medicală',
    learnTerms: 'Învață peste 2.000 de termeni medicali, diagnostice și fraze care sunt cu adevărat relevante în practica clinică zilnică.',
    practicalDialogs: 'Scenarii de dialog practice',
    practiceConversations: 'Exersează cu conversații realiste din rutina zilnică a spitalului - de la admiterea pacienților până la vizitele medicale.',
    allLanguageLevels: 'Pentru toate nivelurile lingvistice',
    customContent: 'Conținut adaptat pentru fiecare nivel lingvistic de la A1 la C1 - poți începe imediat, indiferent de nivelul tău actual.',
    expertDeveloped: 'Dezvoltat cu experți',
    contentDevelopment: 'Tot conținutul a fost dezvoltat și revizuit în colaborare cu medici, asistente medicale și profesori de limbă.',
    nurseOptimized: 'Optimizat pentru personalul de îngrijire',
    internationalNurses: 'Focus special pe nevoile lingvistice ale personalului de îngrijire internațional din Germania.',
    certificationRecognition: 'Recunoașterea certificării',
    examPreparation: 'Pregătire optimă pentru examenele lingvistice pentru recunoașterea profesională în sistemul de sănătate german.',
    comparisonTitle: 'În comparație cu aplicațiile generale de învățare a limbilor',
    feature: 'Caracteristică',
    generalApps: 'Aplicații generale',
    medicalVocabularyComparison: 'Limitat sau inexistent',
    comprehensiveSpecialized: 'Cuprinzător și specializat',
    dialogScenarios: 'Scenarii de dialog practice',
    everydayConversations: 'Conversații generale de zi cu zi',
    realisticMedical: 'Situații medicale realiste',
    learningGoal: 'Obiectiv de învățare',
    generalLanguageSkills: 'Abilități lingvistice generale',
    professionalCommunication: 'Comunicare profesională',
    professionalSupport: 'Suport pentru profesioniști',
    minimal: 'Minimal',
    specificPreparation: 'Pregătire specifică pentru viața profesională de zi cu zi',
    pricingTitle: 'Prețuri simple și transparente',
    pricingDescription: 'Alege planul care se potrivește cel mai bine obiectivelor tale de învățare.',
    basic: 'Basic',
    forBeginners: 'Pentru începători',
    free: 'Gratuit',
    professional: 'Profesional',
    forActiveLearners: 'Pentru cursanți activi',
    team: 'Echipă',
    forInstitutions: 'Pentru instituții',
    basicFeature1: 'Vocabular medical de bază',
    basicFeature2: '5 scenarii de dialog pe lună',
    basicFeature3: 'Prezentare generală a progresului',
    proFeature1: 'Acces complet la vocabularul specializat',
    proFeature2: 'Scenarii de dialog nelimitate',
    proFeature3: 'Mod offline pentru deplasări',
    proFeature4: 'Pregătire pentru examenul de limbă medicală cu opțiuni de timp',
    proFeature5: 'Analize detaliate ale rezultatelor',
    proFeature6: '1 lună gratuită după 3 luni consecutive',
    teamFeature1: 'Tot ce include planul Profesional',
    teamFeature2: 'Până la 10 conturi de utilizator',
    teamFeature3: 'Zonă de administrator',
    teamFeature4: 'Rapoarte de progres pentru echipă',
    teamFeature5: 'Simulări de examen oral',
    contactUs: 'Contactează-ne',
    loyaltyProgram: 'Program de fidelitate: 3+1',
    loyaltyDescription: 'Folosește MedLingua în mod regulat timp de 3 luni',
    loyaltyBenefit: 'Și primește a 4-a lună Premium gratuit!',
    streak90: '90 de zile consecutive',
    oneFreeMonth: '= 1 lună Premium gratuită',
    unlimitedRepeatable: 'Repetabil nelimitat',
    readyToImprove: 'Ești gata să-ți îmbunătățești abilitățile lingvistice medicale?',
    startTodayCta: 'Începe astăzi și pregătește-te pentru viața ta profesională de zi cu zi în sistemul de sănătate german.',
    registerFree: 'Înregistrează-te gratuit',
    languageSelection: 'Selectează limba',
    month: 'lună',
    year: 'an',
    recommended: 'Recomandat',
    selectLanguage: 'Selectează limba',
    ctaHeading: 'Pregătit să-ți îmbunătățești abilitățile lingvistice?',
    ctaText: 'Începe acum cu exercițiile și îmbunătățește-ți comunicarea profesională în domeniul medical - pentru toate nivelurile lingvistice de la A1 la C1.',
    startWithExercises: 'Începe cu exerciții',
    swipeToSwitch: 'Glisează la stânga sau la dreapta pentru a comuta între file',
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
    // Registration page
    createAccount: 'Utwórz konto',
    startJourney: 'Rozpocznij swoją podróż, aby stać się ekspertem w dziedzinie języka medycznego',
    fullName: 'Twoje imię i nazwisko',
    email: 'Email',
    password: 'Hasło',
    minPasswordLength: 'Hasło musi mieć co najmniej 6 znaków',
    skipOnboardingFlow: 'Pomiń proces onboardingu (można go ukończyć później w ustawieniach)',
    registerBenefits: 'Po rejestracji otrzymasz:',
    benefit1: 'Dostęp do medycznych scenariuszy dialogowych',
    benefit2: 'Specjalistyczne szkolenie słownictwa',
    benefit3: 'Osobiste śledzenie postępów',
    register: 'Zarejestruj się',
    registration: 'Rejestracja',
    termsAndConditions: 'Rejestrując się, akceptujesz nasze Warunki świadczenia usług i Politykę prywatności.',
    alreadyRegistered: 'Masz już konto? Zaloguj się teraz',
    // Landing page
    startFree: 'Zacznij za darmo',
    learnMore: 'Dowiedz się więcej',
    specializedForMedical: 'Specjalizacja w dziedzinie medycyny',
    medLinguaDifference: 'MedLingua różni się od ogólnych aplikacji do nauki języków, koncentrując się na kontekście medycznym.',
    medicalVocabulary: 'Słownictwo medyczne',
    learnTerms: 'Naucz się ponad 2000 terminów medycznych, diagnoz i zwrotów, które są naprawdę istotne w codziennej praktyce klinicznej.',
    practicalDialogs: 'Praktyczne scenariusze dialogowe',
    practiceConversations: 'Ćwicz realistyczne rozmowy z codziennej rutyny szpitalnej - od przyjęcia pacjenta po obchody.',
    allLanguageLevels: 'Dla wszystkich poziomów językowych',
    customContent: 'Treści dostosowane do każdego poziomu językowego od A1 do C1 - możesz zacząć od razu, niezależnie od Twojego obecnego poziomu.',
    expertDeveloped: 'Opracowany przez ekspertów',
    contentDevelopment: 'Cała zawartość została opracowana i zweryfikowana we współpracy z lekarzami, pielęgniarkami i nauczycielami języków.',
    nurseOptimized: 'Zoptymalizowany dla personelu pielęgniarskiego',
    internationalNurses: 'Szczególny nacisk na potrzeby językowe międzynarodowego personelu pielęgniarskiego w Niemczech.',
    certificationRecognition: 'Uznawanie certyfikatów',
    examPreparation: 'Optymalne przygotowanie do egzaminów językowych w celu uzyskania uznania zawodowego w niemieckim systemie opieki zdrowotnej.',
    comparisonTitle: 'W porównaniu z ogólnymi aplikacjami do nauki języków',
    feature: 'Funkcja',
    generalApps: 'Ogólne aplikacje',
    medicalVocabularyComparison: 'Ograniczone lub nieistniejące',
    comprehensiveSpecialized: 'Kompleksowe i specjalistyczne',
    dialogScenarios: 'Praktyczne scenariusze dialogowe',
    everydayConversations: 'Ogólne codzienne rozmowy',
    realisticMedical: 'Realistyczne sytuacje medyczne',
    learningGoal: 'Cel nauki',
    generalLanguageSkills: 'Ogólne umiejętności językowe',
    professionalCommunication: 'Komunikacja zawodowa',
    professionalSupport: 'Wsparcie dla profesjonalistów',
    minimal: 'Minimalne',
    specificPreparation: 'Specyficzne przygotowanie do codziennej pracy zawodowej',
    pricingTitle: 'Proste i przejrzyste ceny',
    pricingDescription: 'Wybierz plan, który najlepiej pasuje do Twoich celów edukacyjnych.',
    basic: 'Podstawowy',
    forBeginners: 'Dla początkujących',
    free: 'Bezpłatny',
    professional: 'Profesjonalny',
    forActiveLearners: 'Dla aktywnych uczących się',
    team: 'Zespół',
    forInstitutions: 'Dla instytucji',
    basicFeature1: 'Podstawowe słownictwo medyczne',
    basicFeature2: '5 scenariuszy dialogowych miesięcznie',
    basicFeature3: 'Przegląd postępów',
    proFeature1: 'Pełny dostęp do specjalistycznego słownictwa',
    proFeature2: 'Nieograniczone scenariusze dialogowe',
    proFeature3: 'Tryb offline do nauki w podróży',
    proFeature4: 'Przygotowanie do egzaminu z języka medycznego z opcjami czasowymi',
    proFeature5: 'Szczegółowe analizy wyników',
    proFeature6: '1 miesiąc za darmo po 3-miesięcznej serii',
    teamFeature1: 'Wszystko z planu Profesjonalnego',
    teamFeature2: 'Do 10 kont użytkowników',
    teamFeature3: 'Strefa administratora',
    teamFeature4: 'Raporty postępów dla zespołu',
    teamFeature5: 'Symulacje egzaminów ustnych',
    contactUs: 'Skontaktuj się z nami',
    loyaltyProgram: 'Program lojalnościowy: 3+1',
    loyaltyDescription: 'Korzystaj z MedLingua regularnie przez 3 miesiące',
    loyaltyBenefit: 'I otrzymaj 4. miesiąc Premium za darmo!',
    streak90: '90 dni pod rząd',
    oneFreeMonth: '= 1 miesiąc Premium za darmo',
    unlimitedRepeatable: 'Możliwość nieograniczonego powtarzania',
    readyToImprove: 'Gotowy, aby poprawić swoje medyczne umiejętności językowe?',
    startTodayCta: 'Rozpocznij już dziś i przygotuj się do swojego zawodowego życia codziennego w niemieckiej opiece zdrowotnej.',
    registerFree: 'Zarejestruj się za darmo',
    languageSelection: 'Wybierz język',
    month: 'miesiąc',
    year: 'rok',
    recommended: 'Polecane',
    selectLanguage: 'Wybierz język',
    ctaHeading: 'Gotowy, aby poprawić swoje umiejętności językowe?',
    ctaText: 'Rozpocznij teraz ćwiczenia i popraw swoją zawodową komunikację w dziedzinie medycyny - dla wszystkich poziomów językowych od A1 do C1.',
    startWithExercises: 'Rozpocznij ćwiczenia',
    swipeToSwitch: 'Przesuń w lewo lub prawo, aby przełączać między zakładkami',
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
  changeUILanguage: () => {},
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get initial language from localStorage, default to English
  const [userLanguage, setUserLanguageState] = useState<string>(
    localStorage.getItem('userLanguage') || 'en'
  );
  
  // The interface language is separate (for UI display)
  const [interfaceLanguage, setInterfaceLanguage] = useState<string>(
    localStorage.getItem('interfaceLanguage') || userLanguage in translations ? userLanguage : 'en'
  );
  
  // Try to get initial German dialect from localStorage, default to Standard German
  const [germanDialect, setGermanDialectState] = useState<string>(
    localStorage.getItem('germanDialect') || 'de-DE'
  );

  // Save language selection to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userLanguage', userLanguage);
  }, [userLanguage]);

  // Save interface language selection to localStorage
  useEffect(() => {
    localStorage.setItem('interfaceLanguage', interfaceLanguage);
    // Update document language for accessibility
    document.documentElement.lang = interfaceLanguage;
  }, [interfaceLanguage]);

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

  const changeUILanguage = (code: string) => {
    if (code in translations) {
      setInterfaceLanguage(code);
      // Force a re-render of translated content
      const event = new Event('languagechange');
      window.dispatchEvent(event);
    } else {
      console.warn(`Language ${code} is not supported for UI translations`);
    }
  };

  // Function to get a translation - falls back to key if translation not found
  const translate = (key: string): string => {
    if (!key) return '';
    
    const lang = interfaceLanguage in translations ? interfaceLanguage : 'en';
    const translation = translations[lang]?.[key];
    
    if (!translation) {
      console.warn(`Missing translation for key "${key}" in language "${lang}"`);
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
    changeUILanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
