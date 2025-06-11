
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
  // Dashboard - Essential overview
  {
    id: 'welcome',
    page: '/dashboard',
    target: '[data-tutorial-target="welcome-header"]',
    title: 'Willkommen zu MedGerman!',
    description: 'Hier ist Ihr Dashboard mit Lernfortschritt und Empfehlungen für medizinisches Deutsch.',
    position: 'bottom'
  },
  {
    id: 'progress-overview',
    page: '/dashboard',
    target: '[data-tutorial-target="progress-overview"]',
    title: 'Ihr Lernfortschritt',
    description: 'Verfolgen Sie abgeschlossene Szenarien, Vokabeln und Ihren Lernstreak.',
    position: 'bottom'
  },
  {
    id: 'scenarios-tab',
    page: '/dashboard',
    target: '[data-tutorial-target="scenarios-tab"]',
    title: 'Medizinische Szenarien',
    description: 'Üben Sie mit realistischen Patientensituationen. Klicken Sie hier, um loszulegen!',
    position: 'bottom',
    action: 'navigate',
    nextPage: '/practice'
  },
  // Practice - Key features only
  {
    id: 'quick-start',
    page: '/practice',
    target: '[data-tutorial-target="quick-start"]',
    title: 'Schnellstart',
    description: 'Starten Sie sofort mit einem Szenario passend zu Ihrem Sprachniveau.',
    position: 'bottom'
  },
  {
    id: 'search-filters',
    page: '/practice',
    target: '[data-tutorial-target="search-filters"]',
    title: 'Szenarien finden',
    description: 'Nutzen Sie Suche und Filter, um spezifische medizinische Situationen zu finden.',
    position: 'bottom',
    action: 'navigate',
    nextPage: '/vocabulary'
  },
  // Vocabulary - Core functionality
  {
    id: 'vocabulary-tabs',
    page: '/vocabulary',
    target: '[data-tutorial-target="vocabulary-tabs"]',
    title: 'Vokabeln lernen',
    description: 'Durchsuchen Sie medizinische Begriffe oder starten Sie ein Vokabeltraining.',
    position: 'bottom'
  },
  {
    id: 'vocabulary-progress',
    page: '/vocabulary',
    target: '[data-tutorial-target="vocabulary-progress"]',
    title: 'Vokabel-Fortschritt',
    description: 'Sehen Sie, wie viele medizinische Begriffe Sie bereits beherrschen.',
    position: 'top',
    action: 'navigate',
    nextPage: '/profile'
  },
  // Profile - Essential settings
  {
    id: 'tutorial-complete',
    page: '/profile',
    target: '[data-tutorial-target="profile-header"]',
    title: 'Tutorial abgeschlossen!',
    description: 'Hier verwalten Sie Ihre Einstellungen und Lernziele. Sie können dieses Tutorial jederzeit über das Hilfe-Symbol neu starten. Viel Erfolg beim Deutschlernen!',
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
