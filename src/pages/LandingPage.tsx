
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import AppHeader from "@/components/layout/AppHeader";
import { Stethoscope, Shield, Users, Globe, GraduationCap, Heart, Award, CheckCircle, ArrowRight, Wifi, Clock, FileCheck, Star } from "lucide-react";
import SideNavigator from "@/components/navigation/SideNavigator";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/home/HeroSection";
import CtaSection from "@/components/home/CtaSection";

interface LandingPageProps {
  onLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  
  const handleRegister = () => {
    navigate('/register');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const sections = [
    {
      id: "hero",
      label: translate("home")
    }, 
    {
      id: "features",
      label: translate("features")
    }, 
    {
      id: "pricing",
      label: translate("pricingTitle")
    }
  ];

  // Handle anchor links for navigation
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Add click event listeners to anchor links
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        event.preventDefault();
        const id = anchor.getAttribute('href')?.replace('#', '');
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <AppHeader onLogin={handleLogin} />
      
      <SideNavigator sections={sections} />
      
      <main className="flex-grow pt-24">
        <HeroSection />
        
        <section id="features" className="py-16 bg-neutral-50 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                {translate("specializedForMedical")}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {translate("medLinguaDifference")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{translate("medicalVocabulary")}</h3>
                <p className="text-neutral-600">
                  {translate("learnTerms")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{translate("practicalDialogs")}</h3>
                <p className="text-neutral-600">
                  {translate("practiceConversations")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{translate("allLanguageLevels")}</h3>
                <p className="text-neutral-600">
                  {translate("customContent")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{translate("expertDeveloped")}</h3>
                <p className="text-neutral-600">
                  {translate("contentDevelopment")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{translate("nurseOptimized")}</h3>
                <p className="text-neutral-600">
                  {translate("internationalNurses")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{translate("certificationRecognition")}</h3>
                <p className="text-neutral-600">
                  {translate("examPreparation")}
                </p>
              </div>
            </div>
            
            <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-neutral-200">
              <h3 className="text-xl font-bold mb-4 text-center">{translate("comparisonTitle")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-3 px-4 text-left">{translate("feature")}</th>
                      <th className="py-3 px-4 text-center">{translate("generalApps")}</th>
                      <th className="py-3 px-4 text-center bg-medical-50 font-medium">MedLingua</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4">{translate("medicalVocabulary")}</td>
                      <td className="py-3 px-4 text-center">{translate("medicalVocabularyComparison")}</td>
                      <td className="py-3 px-4 text-center bg-medical-50 font-medium">{translate("comprehensiveSpecialized")}</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4">{translate("dialogScenarios")}</td>
                      <td className="py-3 px-4 text-center">{translate("everydayConversations")}</td>
                      <td className="py-3 px-4 text-center bg-medical-50 font-medium">{translate("realisticMedical")}</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4">{translate("learningGoal")}</td>
                      <td className="py-3 px-4 text-center">{translate("generalLanguageSkills")}</td>
                      <td className="py-3 px-4 text-center bg-medical-50 font-medium">{translate("professionalCommunication")}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">{translate("professionalSupport")}</td>
                      <td className="py-3 px-4 text-center">{translate("minimal")}</td>
                      <td className="py-3 px-4 text-center bg-medical-50 font-medium">{translate("specificPreparation")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                {translate("pricingTitle")}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {translate("pricingDescription")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{translate("basic")}</h3>
                  <p className="text-neutral-500 mt-1">{translate("forBeginners")}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{translate("free")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("basicFeature1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("basicFeature2")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("basicFeature3")}</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" onClick={handleRegister}>
                  {translate("startFree")}
                </Button>
              </div>
              
              <div className="bg-medical-50 p-6 rounded-xl shadow-md border border-medical-200 relative">
                <div className="absolute -top-3 right-4 bg-medical-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {translate("recommended")}
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{translate("professional")}</h3>
                  <p className="text-neutral-500 mt-1">{translate("forActiveLearners")}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">€4,99</span>
                  <span className="text-neutral-500"> / {translate("month")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("proFeature1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("proFeature2")}</span>
                  </li>
                  <li className="flex items-start">
                    <Wifi className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("proFeature3")}</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("proFeature4")}</span>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("proFeature5")}</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("proFeature6")}</span>
                  </li>
                </ul>
                <Button className="w-full bg-medical-500 hover:bg-medical-600" onClick={handleRegister}>
                  {translate("startFree")}
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{translate("team")}</h3>
                  <p className="text-neutral-500 mt-1">{translate("forInstitutions")}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">€399</span>
                  <span className="text-neutral-500"> / {translate("year")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("teamFeature1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("teamFeature2")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("teamFeature3")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("teamFeature4")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("teamFeature5")}</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full" variant="outline">
                    {translate("contactUs")}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
              <div className="bg-medical-500 p-4 text-white text-center">
                <h3 className="text-xl font-semibold">{translate("loyaltyProgram")}</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-medical-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Award className="h-8 w-8 text-medical-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{translate("loyaltyDescription")}</h4>
                    <p className="text-neutral-600">{translate("loyaltyBenefit")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-center font-medium">{translate("streak90")}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-center font-medium">{translate("oneFreeMonth")}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-center font-medium">{translate("unlimitedRepeatable")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
