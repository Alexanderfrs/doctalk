
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Practice from "./pages/Practice";
import Vocabulary from "./pages/Vocabulary";
import ScenarioDetail from "./pages/ScenarioDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LanguageCertification from "./pages/LanguageCertification";
import BrandBanner from "./components/brand/BrandBanner";
import Onboarding from "./pages/Onboarding";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Temporary auth state (replace with real auth later)
const useAuth = () => {
  // For demo purposes, we're using localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(true);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const onboardingStatus = localStorage.getItem("onboardingComplete") === "true";
    
    setIsAuthenticated(authStatus);
    setOnboardingComplete(onboardingStatus);
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    localStorage.setItem("onboardingComplete", "true");
    setOnboardingComplete(true);
  };

  return { 
    isAuthenticated, 
    login, 
    logout, 
    onboardingComplete,
    completeOnboarding
  };
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Route that checks if onboarding is complete
const OnboardingProtectedRoute = ({ children }) => {
  const { isAuthenticated, onboardingComplete } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

const App = () => {
  const { isAuthenticated, login, logout, onboardingComplete } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <BrandBanner />
              <Routes>
                {/* Public routes */}
                <Route 
                  path="/" 
                  element={<LandingPage isAuthenticated={isAuthenticated} onLogin={login} />} 
                />
                <Route 
                  path="/login" 
                  element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} 
                />
                <Route 
                  path="/register" 
                  element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onRegister={login} />} 
                />
                
                {/* Onboarding route */}
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected routes that require onboarding */}
                <Route 
                  path="/dashboard" 
                  element={
                    <OnboardingProtectedRoute>
                      <Dashboard onLogout={logout} />
                    </OnboardingProtectedRoute>
                  } 
                />
                <Route 
                  path="/practice" 
                  element={
                    <OnboardingProtectedRoute>
                      <Practice />
                    </OnboardingProtectedRoute>
                  } 
                />
                <Route 
                  path="/vocabulary" 
                  element={
                    <OnboardingProtectedRoute>
                      <Vocabulary />
                    </OnboardingProtectedRoute>
                  } 
                />
                <Route 
                  path="/scenario/:id" 
                  element={
                    <OnboardingProtectedRoute>
                      <ScenarioDetail />
                    </OnboardingProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <OnboardingProtectedRoute>
                      <Profile />
                    </OnboardingProtectedRoute>
                  } 
                />
                <Route 
                  path="/certification" 
                  element={
                    <OnboardingProtectedRoute>
                      <LanguageCertification />
                    </OnboardingProtectedRoute>
                  } 
                />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
