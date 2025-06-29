
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { TutorialProvider } from "@/contexts/TutorialContext";
import { TTSProvider } from "@/contexts/TTSContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Vocabulary from "./pages/Vocabulary";
import ScenarioDetail from "./pages/ScenarioDetail";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import LanguageCertification from "./pages/LanguageCertification";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ViewModeProvider>
            <LanguageProvider>
              <AuthProvider>
                <TTSProvider>
                  <TutorialProvider>
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/practice" element={<Practice />} />
                        <Route path="/vocabulary" element={<Vocabulary />} />
                        <Route path="/scenario/:id" element={<ScenarioDetail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/certification" element={<LanguageCertification />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TutorialProvider>
                </TTSProvider>
              </AuthProvider>
            </LanguageProvider>
          </ViewModeProvider>
        </ThemeProvider>
      </TooltipProvider>
      <Toaster />
      <Sonner />
    </QueryClientProvider>
  );
}

export default App;
