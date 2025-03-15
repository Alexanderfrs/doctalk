
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
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Temporary auth state (replace with real auth later)
const useAuth = () => {
  // For demo purposes, we're using localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  const { isAuthenticated, login, logout } = useAuth();

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
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard onLogout={logout} />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/practice" 
                  element={
                    <ProtectedRoute>
                      <Practice />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/vocabulary" 
                  element={
                    <ProtectedRoute>
                      <Vocabulary />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/scenario/:id" 
                  element={
                    <ProtectedRoute>
                      <ScenarioDetail />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/certification" 
                  element={
                    <ProtectedRoute>
                      <LanguageCertification />
                    </ProtectedRoute>
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
