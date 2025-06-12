
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLogo from "@/components/layout/AppLogo";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { translate } = useLanguage();
  const isMobile = useIsMobile();

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
      
      toast.success("Registration successful!");
      navigate("/onboarding");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (isMobile) {
      navigate("/", { state: { returnToOnboarding: true } });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back button - positioned prominently on mobile */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center border border-gray-200"
          >
            <X className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      )}

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-6">
              <AppLogo path="/" variant="minimal" size="large" />
            </div>
            <h1 className="text-2xl font-bold mt-6 mb-2">Create Account</h1>
            <p className="text-neutral-600">
              Start your journey to becoming a medical language expert
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">With registration you will receive:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Access to medical dialogue scenarios</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Specialized vocabulary training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Personal progress tracking</span>
                </li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-medical-500 hover:bg-medical-600" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            
            <p className="text-sm text-neutral-500 text-center">
              By registering, you accept our Terms of Service and Privacy Policy.
            </p>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already registered?{" "}
              <Link to="/login" className="text-medical-600 hover:underline font-medium">
                Login
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
