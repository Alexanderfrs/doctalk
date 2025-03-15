import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Stethoscope } from "lucide-react";
import Footer from "@/components/layout/Footer";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Demo login logic (no real authentication)
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (email && password) {
        // Log the user in
        onLogin();
        
        // Check if onboarding is complete
        const onboardingComplete = localStorage.getItem("onboardingComplete") === "true";
        
        // Navigate to appropriate page
        if (onboardingComplete) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      } else {
        setError("Bitte geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2">
              <div className="bg-medical-500 text-white p-2 rounded-lg">
                <Stethoscope className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-medical-800">MedLingua</span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Willkommen zurück</h1>
            <p className="text-neutral-600">
              Melden Sie sich an, um Ihre medizinischen Deutschkenntnisse zu verbessern
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="ihre.email@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <Link to="/forgot-password" className="text-sm text-medical-600 hover:underline">
                  Passwort vergessen?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-medical-500 hover:bg-medical-600" disabled={isSubmitting}>
              {isSubmitting ? "Anmeldung..." : "Anmelden"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Noch kein Konto?{" "}
              <Link to="/register" className="text-medical-600 hover:underline font-medium">
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
