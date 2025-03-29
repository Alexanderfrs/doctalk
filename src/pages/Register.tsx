
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Stethoscope, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skipOnboardingFlow, setSkipOnboardingFlow] = useState(false);
  
  const navigate = useNavigate();
  const { signUp, skipOnboarding } = useAuth();
  const { translate } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { error } = await signUp(email, password, name);
      
      if (error) {
        setError(error.message || "Registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      toast.success("Registration successful. Welcome to MedLingua!");
      
      // Skip onboarding if checkbox is checked
      if (skipOnboardingFlow) {
        await skipOnboarding();
        navigate("/dashboard");
      } else {
        // Navigate to onboarding
        navigate("/onboarding");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
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
            <h1 className="text-2xl font-bold mt-6 mb-2">{translate("createAccount")}</h1>
            <p className="text-neutral-600">
              {translate("startJourney")}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{translate("fullName")}</Label>
              <Input
                id="name"
                type="text"
                placeholder={translate("fullName")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{translate("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{translate("password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{translate("minPasswordLength")}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="skipOnboarding" 
                checked={skipOnboardingFlow}
                onCheckedChange={(checked) => setSkipOnboardingFlow(checked === true)}
              />
              <Label 
                htmlFor="skipOnboarding" 
                className="text-sm cursor-pointer"
              >
                {translate("skipOnboardingFlow")}
              </Label>
            </div>

            <div>
              <h3 className="font-medium mb-2">{translate("registerBenefits")}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{translate("benefit1")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{translate("benefit2")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{translate("benefit3")}</span>
                </li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-medical-500 hover:bg-medical-600" disabled={isSubmitting}>
              {isSubmitting ? translate("registration") + "..." : translate("register")}
            </Button>
            
            <p className="text-sm text-neutral-500 text-center">
              {translate("termsAndConditions")}
            </p>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              {translate("alreadyRegistered")}{" "}
              <Link to="/login" className="text-medical-600 hover:underline font-medium">
                {translate("login")}
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
