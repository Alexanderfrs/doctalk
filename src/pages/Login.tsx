
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope, AtSign, Lock, ArrowRight, Github, Google } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (!email || !password) {
        toast.error("Bitte gib deine E-Mail und dein Passwort ein.");
        return;
      }
      
      // Demo login success
      toast.success("Erfolgreich angemeldet!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left panel - Login form */}
        <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16">
          <div className="mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-medical-500 text-white p-1.5 rounded-lg">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-medical-800">MedLingua</span>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-neutral-800">Willkommen zurück</h1>
              <p className="text-neutral-600">
                Melde dich an, um dein medizinisches Deutsch weiter zu verbessern.
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  E-Mail
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="deine@email.de" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                    Passwort
                  </label>
                  <Link to="/forgot-password" className="text-xs text-medical-600 hover:text-medical-700">
                    Passwort vergessen?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-medical-500 hover:bg-medical-600" 
                disabled={isLoading}
              >
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-neutral-50 text-neutral-500">Oder anmelden mit</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-neutral-600">
              Noch kein Konto?{" "}
              <Link to="/register" className="text-medical-600 hover:text-medical-700 font-medium">
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right panel - Image and information */}
        <div className="hidden md:block md:w-1/2 bg-medical-600 text-white">
          <div className="h-full flex flex-col p-16">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">
                Verbessere deine medizinische Kommunikation
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Mit MedLingua lernst du gezielt die Sprache, die du im medizinischen Alltag wirklich brauchst - für alle Sprachniveaus von A1 bis C1.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Spezialisiertes Fachvokabular</h3>
                    <p className="text-white/70 text-sm">
                      Lerne die Fachbegriffe, die du im medizinischen Bereich wirklich brauchst.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Praxisnahe Dialogszenarien</h3>
                    <p className="text-white/70 text-sm">
                      Übe realistische Gespräche aus dem Klinikalltag.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Personalisiertes Lernen</h3>
                    <p className="text-white/70 text-sm">
                      Lerne in deinem Tempo mit auf dich zugeschnittenen Übungen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-6 mt-8">
              <div className="flex items-center">
                <p className="text-white/70 text-sm">
                  "MedLingua hat mir geholfen, mich sicherer in der Kommunikation mit Patienten und Kollegen zu fühlen." 
                </p>
                <div className="ml-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="User" 
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
              <p className="text-sm font-medium mt-2">
                Elena Petrescu, Pflegekraft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
