
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TutorialProvider } from "./contexts/TutorialContext";
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
import Index from "./pages/Index";
import TutorialOverlay from "./components/tutorial/TutorialOverlay";
import "./styles/mobile.css";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Route that checks if onboarding is complete
const OnboardingProtectedRoute = ({ children }) => {
  const { isAuthenticated, onboardingComplete, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

// Route that's only accessible for non-authenticated users
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
    </div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TutorialProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <BrandBanner />
                  <TutorialOverlay />
                  <Routes>
                    {/* Index route for routing logic */}
                    <Route path="/index" element={<Index />} />
                    
                    {/* Public routes - only accessible when NOT authenticated */}
                    <Route 
                      path="/" 
                      element={
                        <PublicOnlyRoute>
                          <LandingPage />
                        </PublicOnlyRoute>
                      } 
                    />
                    <Route 
                      path="/login" 
                      element={
                        <PublicOnlyRoute>
                          <Login />
                        </PublicOnlyRoute>
                      } 
                    />
                    <Route 
                      path="/register" 
                      element={
                        <PublicOnlyRoute>
                          <Register />
                        </PublicOnlyRoute>
                      } 
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
                          <Dashboard />
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
            </TutorialProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
