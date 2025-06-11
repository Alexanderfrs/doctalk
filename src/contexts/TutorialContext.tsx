
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface TutorialStep {
  id: string;
  page: '/dashboard' | '/practice' | '/vocabulary' | '/profile';
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'navigate';
  nextPage?: string;
}

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  currentPage: string;
  steps: TutorialStep[];
  startTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
  restartTutorial: () => void;
  setCurrentPage: (page: string) => void;
  getCurrentStepData: () => TutorialStep | null;
  isCompleted: boolean;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

const tutorialSteps: TutorialStep[] = [
  // Dashboard steps
  {
    id: 'welcome',
    page: '/dashboard',
    target: '[data-tutorial-target="welcome-header"]',
    title: 'Willkommen zu MedGerman!',
    description: 'Hier ist Ihr persönliches Dashboard mit Ihrem Lernfortschritt und Empfehlungen.',
    position: 'bottom'
  },
  {
    id: 'progress-overview',
    page: '/dashboard',
    target: '[data-tutorial-target="progress-overview"]',
    title: 'Ihr Fortschritt',
    description: 'Verfolgen Sie Ihre abgeschlossenen Szenarien, gemeisterten Vokabeln und wöchentlichen Ziele.',
    position: 'bottom'
  },
  {
    id: 'learning-roadmap',
    page: '/dashboard',
    target: '[data-tutorial-target="roadmap-tab"]',
    title: 'Personalisierter Lernpfad',
    description: 'Ihr individueller Lernpfad basiert auf Ihrem Sprachniveau und Ihren Zielen.',
    position: 'bottom'
  },
  {
    id: 'scenarios-tab',
    page: '/dashboard',
    target: '[data-tutorial-target="scenarios-tab"]',
    title: 'Medizinische Szenarien',
    description: 'Üben Sie mit realistischen Patientensituationen, um Ihre Kommunikationsfähigkeiten zu verbessern.',
    position: 'bottom'
  },
  {
    id: 'navigate-to-practice',
    page: '/dashboard',
    target: '[data-tutorial-target="scenarios-tab"]',
    title: 'Jetzt üben!',
    description: 'Lassen Sie uns zur Übungsseite gehen, um zu sehen, wie Sie mit Szenarien arbeiten können.',
    position: 'bottom',
    action: 'navigate',
    nextPage: '/practice'
  },
  // Practice page steps
  {
    id: 'practice-overview',
    page: '/practice',
    target: '[data-tutorial-target="practice-progress"]',
    title: 'Übungsfortschritt',
    description: 'Hier sehen Sie Ihre Übungsstatistiken und Ihren aktuellen Lernstand.',
    position: 'bottom'
  },
  {
    id: 'quick-start',
    page: '/practice',
    target: '[data-tutorial-target="quick-start"]',
    title: 'Schnellstart',
    description: 'Starten Sie sofort mit einem Szenario, das zu Ihrem Sprachniveau passt.',
    position: 'bottom'
  },
  {
    id: 'search-filters',
    page: '/practice',
    target: '[data-tutorial-target="search-filters"]',
    title: 'Suchen und Filtern',
    description: 'Verwenden Sie die Suchfunktion und Filter, um spezifische Szenarien zu finden.',
    position: 'bottom'
  },
  {
    id: 'navigate-to-vocabulary',
    page: '/practice',
    target: '[data-tutorial-target="search-filters"]',
    title: 'Vokabeln lernen',
    description: 'Lassen Sie uns jetzt zur Vokabelseite gehen, um zu sehen, wie Sie Ihren Wortschatz erweitern können.',
    position: 'bottom',
    action: 'navigate',
    nextPage: '/vocabulary'
  },
  // Vocabulary page steps
  {
    id: 'vocabulary-tabs',
    page: '/vocabulary',
    target: '[data-tutorial-target="vocabulary-tabs"]',
    title: 'Vokabel-Modi',
    description: 'Durchsuchen Sie Vokabeln oder starten Sie ein interaktives Training.',
    position: 'bottom'
  },
  {
    id: 'vocabulary-practice',
    page: '/vocabulary',
    target: '[data-tutorial-target="practice-tab"]',
    title: 'Vokabeltraining',
    description: 'Testen Sie Ihr Wissen mit unserem interaktiven Vokabeltraining.',
    position: 'bottom'
  },
  {
    id: 'vocabulary-progress',
    page: '/vocabulary',
    target: '[data-tutorial-target="vocabulary-progress"]',
    title: 'Vokabel-Fortschritt',
    description: 'Verfolgen Sie, wie viele Vokabeln Sie bereits gemeistert haben.',
    position: 'top'
  },
  {
    id: 'navigate-to-profile',
    page: '/vocabulary',
    target: '[data-tutorial-target="vocabulary-progress"]',
    title: 'Profil-Einstellungen',
    description: 'Zum Abschluss schauen wir uns Ihre Profileinstellungen an.',
    position: 'top',
    action: 'navigate',
    nextPage: '/profile'
  },
  // Profile page steps
  {
    id: 'profile-overview',
    page: '/profile',
    target: '[data-tutorial-target="profile-header"]',
    title: 'Ihr Profil',
    description: 'Hier können Sie Ihre Einstellungen anpassen und Ihre Lernziele verwalten.',
    position: 'bottom'
  },
  {
    id: 'profile-tabs',
    page: '/profile',
    target: '[data-tutorial-target="profile-tabs"]',
    title: 'Profil-Bereiche',
    description: 'Verwalten Sie Ihre Einstellungen, Ziele und Ihr Abonnement in den verschiedenen Tabs.',
    position: 'bottom'
  },
  {
    id: 'tutorial-complete',
    page: '/profile',
    target: '[data-tutorial-target="profile-tabs"]',
    title: 'Tutorial abgeschlossen!',
    description: 'Sie kennen jetzt alle wichtigen Funktionen. Viel Erfolg beim Deutschlernen! Sie können dieses Tutorial jederzeit über das Hilfe-Symbol neu starten.',
    position: 'bottom'
  }
];

export const TutorialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState('/dashboard');
  const [isCompleted, setIsCompleted] = useState(() => {
    return localStorage.getItem('tutorial-completed') === 'true';
  });

  const startTutorial = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    setCurrentPage('/dashboard');
    setIsCompleted(false);
    localStorage.setItem('tutorial-completed', 'false');
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      const nextStepData = tutorialSteps[currentStep + 1];
      if (nextStepData.page !== currentPage) {
        setCurrentPage(nextStepData.page);
      }
    } else {
      // Tutorial completed
      setIsActive(false);
      setIsCompleted(true);
      localStorage.setItem('tutorial-completed', 'true');
    }
  }, [currentStep, currentPage]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      const prevStepData = tutorialSteps[currentStep - 1];
      if (prevStepData.page !== currentPage) {
        setCurrentPage(prevStepData.page);
      }
    }
  }, [currentStep, currentPage]);

  const skipTutorial = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
    localStorage.setItem('tutorial-completed', 'true');
  }, []);

  const restartTutorial = useCallback(() => {
    startTutorial();
  }, [startTutorial]);

  const getCurrentStepData = useCallback(() => {
    return tutorialSteps[currentStep] || null;
  }, [currentStep]);

  const value: TutorialContextType = {
    isActive,
    currentStep,
    currentPage,
    steps: tutorialSteps,
    startTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    restartTutorial,
    setCurrentPage,
    getCurrentStepData,
    isCompleted
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
