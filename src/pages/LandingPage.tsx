
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import AppHeader from "@/components/layout/AppHeader";
import SideNavigator from "@/components/navigation/SideNavigator";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/home/HeroSection";
import CtaSection from "@/components/home/CtaSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import ComparisonTable from "@/components/landing/ComparisonTable";
import PricingSection from "@/components/landing/PricingSection";
import { LandingPageProps } from "@/types/landing";

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const handleLogin = () => {
    navigate('/login');
  };

  const sections = [
    { id: "hero", label: translate("home") },
    { id: "features", label: translate("features") },
    { id: "pricing", label: translate("pricingTitle") }
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
    return () => document.removeEventListener('click', handleAnchorClick);
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
            
            <FeaturesGrid />
            <ComparisonTable />
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
            
            <PricingSection />
          </div>
        </section>
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
