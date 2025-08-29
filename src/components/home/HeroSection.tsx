
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, BookOpen, Users } from "lucide-react";

const HeroSection: React.FC = () => {
  const { translate } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const heroContent = {
    title: translate('hero.title'),
    description: translate('hero.description') || 'Learn Medical German with AI-powered scenarios',
    targetAudience: translate('hero.targetAudience'),
    trustSignals: [
      {
        icon: <Users className="h-4 w-4" />,
        text: translate('hero.trustSignal1')
      },
      {
        icon: <BookOpen className="h-4 w-4" />,
        text: translate('hero.trustSignal2')
      },
      {
        icon: <PlayCircle className="h-4 w-4" />,
        text: translate('hero.trustSignal3')
      }
    ]
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-medical-50 to-white py-20 px-4">
      <div className="container mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-medical-100 text-medical-800">
          {translate('hero.badge')}
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold text-medical-900 mb-6 leading-tight">
          {heroContent.title}
        </h1>
        
        <p className="text-xl text-medical-700 mb-8 max-w-3xl mx-auto">
          {heroContent.description}
        </p>
        
        <p className="text-lg text-medical-600 mb-8">
          {heroContent.targetAudience}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-medical-600 hover:bg-medical-700"
          >
            {translate('hero.cta')}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/trial')}
          >
            {translate('hero.trial')}
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-medical-600">
          {heroContent.trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2">
              {signal.icon}
              <span>{signal.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
