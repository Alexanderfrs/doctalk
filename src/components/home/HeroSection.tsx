
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Play } from "lucide-react";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const handleTrialClick = () => {
    navigate('/trial');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-medical-50 via-white to-medical-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-medical-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-medical-900 leading-tight">
              {translate("heroTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-medical-600 max-w-3xl mx-auto leading-relaxed">
              {translate("heroSubtitle")}
            </p>
          </div>

          {/* Free Trial CTA - Prominent placement */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-medical-100 max-w-md mx-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-medical-900">
                Try it free - no signup required
              </h3>
              <p className="text-sm text-medical-600">
                Experience a realistic medical conversation simulation
              </p>
              <Button
                onClick={handleTrialClick}
                size="lg"
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="space-y-4">
            <Button
              onClick={handleGetStarted}
              size="lg"
              variant="outline"
              className="bg-white/90 border-medical-300 text-medical-700 hover:bg-medical-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              {translate("getStarted")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Key benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-medical-900 mb-2">Realistic Dialogues</h4>
              <p className="text-sm text-medical-600">Practice with AI patients in authentic medical scenarios</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-medical-900 mb-2">Track Progress</h4>
              <p className="text-sm text-medical-600">Monitor your German medical communication improvement</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold text-medical-900 mb-2">Medical Vocabulary</h4>
              <p className="text-sm text-medical-600">Learn essential German medical terms and phrases</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
