import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Stethoscope, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/layout/Footer";

interface RegisterProps {
  onRegister?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
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

    // Demo registration logic (no real authentication)
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (name && email && password) {
        // Set authentication in localStorage
        localStorage.setItem("isAuthenticated", "true");
        
        // Reset onboarding status to false for new users
        localStorage.setItem("onboardingComplete", "false");
        
        // Call the register callback if provided
        if (onRegister) {
          onRegister();
        }
        
        // Show success message using sonner toast
        toast.success("Registrierung erfolgreich. Willkommen bei MedLingua!");
        
        // Navigate to onboarding
        navigate("/onboarding");
      } else {
        setError("Bitte füllen Sie alle Felder aus.");
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
            <h1 className="text-2xl font-bold mt-6 mb-2">Konto erstellen</h1>
            <p className="text-neutral-600">
              Starten Sie Ihre Reise zum medizinischen Sprachexperten
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ihr vollständiger Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
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
              <Label htmlFor="password">Passwort</Label>
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

            <div>
              <h3 className="font-medium mb-2">Mit der Registrierung erhalten Sie:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Zugang zu medizinischen Dialogszenarien</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Fachspezifisches Vokabeltraining</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Persönlichen Fortschritt verfolgen</span>
                </li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-medical-500 hover:bg-medical-600" disabled={isSubmitting}>
              {isSubmitting ? "Registrierung..." : "Registrieren"}
            </Button>
            
            <p className="text-sm text-neutral-500 text-center">
              Mit der Registrierung akzeptieren Sie unsere <Link to="/terms" className="text-medical-600 hover:underline">Nutzungsbedingungen</Link> und <Link to="/privacy" className="text-medical-600 hover:underline">Datenschutzrichtlinien</Link>.
            </p>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Bereits registriert?{" "}
              <Link to="/login" className="text-medical-600 hover:underline font-medium">
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
