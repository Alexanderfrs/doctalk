
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import AppLogo from "@/components/layout/AppLogo";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { translate } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message || translate("loginFailed"));
        return;
      }
      
      toast.success(translate("loginSuccess"));
      navigate("/index"); // Let the Index component handle routing
    } catch (error) {
      console.error("Login error:", error);
      toast.error(translate("unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <AppLogo path="/" size="large" />
            <h1 className="text-2xl font-bold mt-6 mb-2">{translate("welcomeBack")}</h1>
            <p className="text-neutral-600">
              {translate("loginDescription")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{translate("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={translate("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{translate("password")}</Label>
                <Link to="/forgot-password" className="text-sm text-medical-600 hover:underline">
                  {translate("forgotPassword")}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
              {isSubmitting ? `${translate("logging")}...` : translate("login")}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              {translate("noAccount")}{" "}
              <Link to="/register" className="text-medical-600 hover:underline font-medium">
                {translate("registerNow")}
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
