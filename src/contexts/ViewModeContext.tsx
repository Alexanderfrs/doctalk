
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ViewMode = 'individual' | 'enterprise';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const useViewMode = (): ViewModeContextType => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};

interface ViewModeProviderProps {
  children: ReactNode;
}

export const ViewModeProvider: React.FC<ViewModeProviderProps> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('individual');

  // Initialize from URL parameter or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode') as ViewMode;
    const savedMode = localStorage.getItem('viewMode') as ViewMode;
    
    if (modeParam && (modeParam === 'individual' || modeParam === 'enterprise')) {
      setViewModeState(modeParam);
      localStorage.setItem('viewMode', modeParam);
    } else if (savedMode && (savedMode === 'individual' || savedMode === 'enterprise')) {
      setViewModeState(savedMode);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem('viewMode', mode);
    
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    window.history.replaceState({}, '', url.toString());
  };

  const toggleViewMode = () => {
    const newMode = viewMode === 'individual' ? 'enterprise' : 'individual';
    setViewMode(newMode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
