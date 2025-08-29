
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TutorialProvider } from "./contexts/TutorialContext";
import { ViewModeProvider } from "./contexts/ViewModeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import ScenarioDetail from "./pages/ScenarioDetail";
import Vocabulary from "./pages/Vocabulary";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import TrialPage from "./pages/TrialPage";
import LandingPage from "./pages/LandingPage";
import LanguageCertification from "./pages/LanguageCertification";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <ViewModeProvider>
              <AuthProvider>
                <TutorialProvider>
                  <TooltipProvider>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/practice" element={<Practice />} />
                      <Route path="/scenario/:id" element={<ScenarioDetail />} />
                      <Route path="/vocabulary" element={<Vocabulary />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      <Route path="/trial" element={<TrialPage />} />
                      <Route path="/landing" element={<LandingPage />} />
                      <Route path="/language-certification" element={<LanguageCertification />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                  </TooltipProvider>
                </TutorialProvider>
              </AuthProvider>
            </ViewModeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
