
import React, { useState, useEffect } from 'react';
import { HeartPulse, X, Award, BookOpen, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    const saved = localStorage.getItem('brandBannerDismissed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    localStorage.setItem('brandBannerDismissed', 'true');
    
    // Remove banner from DOM after animation
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (dismissed) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-white rounded-lg shadow-lg border border-medical-100 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="p-4">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-medical-500 flex items-center justify-center text-white mr-3">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-medical-700">DocTalk</h3>
            <p className="text-xs text-neutral-500">Healthcare Language Excellence</p>
          </div>
        </div>
        
        <p className="text-sm mb-3 text-neutral-600">
          Entdecke unsere neue Sprachzertifizierung für medizinisches Personal!
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-medical-50 text-medical-700">
            <Award className="h-3 w-3 mr-1" />
            Zertifiziert
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-medical-50 text-medical-700">
            <BookOpen className="h-3 w-3 mr-1" />
            Fachspezifisch
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-medical-50 text-medical-700">
            <MessageCircle className="h-3 w-3 mr-1" />
            Praxisnah
          </span>
        </div>
        
        <Link 
          to="/certification"
          className="block w-full bg-medical-500 hover:bg-medical-600 text-white rounded-md py-2 px-4 text-center text-sm font-medium transition-colors"
        >
          Mehr erfahren
        </Link>
      </div>
    </div>
  );
};

export default BrandBanner;
