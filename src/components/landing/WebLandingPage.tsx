import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import AppHeader from "@/components/layout/AppHeader";
import SideNavigator from "@/components/navigation/SideNavigator";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/home/HeroSection";
import TargetUsersSection from "@/components/landing/TargetUsersSection";
import PricingSection from "@/components/landing/PricingSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import { LandingPageProps } from "@/types/landing";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import waitlist from '@zootools/waitlist-js';

const WebLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const handleLogin = () => {
    navigate('/login');
  };

  const sections = [
    { id: "hero", label: translate("home") },
    { id: "target-users", label: "Who it's for" },
    { id: "problem-solution", label: "Why DocTalk" },
    { id: "pricing", label: translate("pricingTitle") },
    { id: "transform-career", label: "Transform Career" }
  ];

  // Add swipe gesture to navigate between sections on web
  const swipeHandlers = useSwipeable({
    onSwipedUp: (eventData) => {
      const currentSection = window.location.hash.replace('#', '') || 'hero';
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        const element = document.getElementById(nextSection.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${nextSection.id}`);
        }
      }
    },
    onSwipedDown: (eventData) => {
      const currentSection = window.location.hash.replace('#', '') || 'hero';
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        const element = document.getElementById(prevSection.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${prevSection.id}`);
        }
      }
    },
    trackTouch: true,
    trackMouse: false,
    delta: 100
  });

  // Handle anchor links for navigation
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

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

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  return (
    <div className="min-h-screen flex flex-col relative" {...swipeHandlers}>
      <AppHeader onLogin={handleLogin} showSlogan={false} showAuthButtons={false} />
      <SideNavigator sections={sections} />
      
      <main className="flex-grow pt-24">
        <div id="hero">
          <HeroSection />
        </div>

        <section id="target-users" className="py-16 px-4">
          <div className="container mx-auto">
            <TargetUsersSection />
          </div>
        </section>
        
        <section id="problem-solution">
          <ProblemSolutionSection />
        </section>
        
        <section id="pricing" className="py-16 bg-neutral-50 px-4">
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

        <section id="transform-career" className="py-16 bg-white px-4">
          <div className="container mx-auto">
            <div className="text-center bg-gradient-to-br from-medical-50 to-white rounded-2xl p-8 shadow-lg border border-medical-200 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
                Ready to Transform Your Medical Career in Germany?
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto text-lg">
                Join the professionals who are already preparing for success in German healthcare.
              </p>
              <Button 
                size="lg" 
                className="bg-medical-500 hover:bg-medical-600 text-white px-8"
                onClick={handleWaitlistClick}
              >
                Join Alpha Waitlist
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebLandingPage;
