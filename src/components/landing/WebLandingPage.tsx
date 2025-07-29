
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import AppHeader from "@/components/layout/AppHeader";
import SideNavigator from "@/components/navigation/SideNavigator";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/home/HeroSection";
import TargetUsersSection from "@/components/landing/TargetUsersSection";
import PricingSection from "@/components/landing/PricingSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import { LandingPageProps } from "@/types/landing";
import { useSwipeable } from "react-swipeable";
import waitlist from '@zootools/waitlist-js';

const WebLandingPage: React.FC<LandingPageProps> = ({
  onLogin
}) => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [currentSection, setCurrentSection] = useState("hero");

  const handleLogin = () => {
    navigate('/login');
  };
  
  const sections = [{
    id: "hero",
    label: translate("home")
  }, {
    id: "target-users",
    label: translate("whoItsFor")
  }, {
    id: "problem",
    label: translate("theProblem")
  }, {
    id: "solution",
    label: translate("whyChooseDocTalk")
  }, {
    id: "pricing",
    label: translate("pricing")
  }];

  // Improved scroll to section function with better smoothness
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Enhanced swipe gesture handling with debouncing
  const swipeHandlers = useSwipeable({
    onSwipedUp: eventData => {
      const currentSection = window.location.hash.replace('#', '') || 'hero';
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        scrollToSection(nextSection.id);
        window.history.pushState(null, '', `#${nextSection.id}`);
      }
    },
    onSwipedDown: eventData => {
      const currentSection = window.location.hash.replace('#', '') || 'hero';
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        scrollToSection(prevSection.id);
        window.history.pushState(null, '', `#${prevSection.id}`);
      }
    },
    trackTouch: true,
    trackMouse: false,
    delta: 100
  });

  // Handle anchor links for navigation with improved reliability
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        event.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const id = href.replace('#', '');
          scrollToSection(id);
          window.history.pushState(null, '', href);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Improved section tracking with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const heroSection = document.getElementById('hero');
        const targetUsersSection = document.getElementById('target-users');
        
        if (heroSection && targetUsersSection) {
          const heroRect = heroSection.getBoundingClientRect();
          const targetRect = targetUsersSection.getBoundingClientRect();
          
          const showNavigation = heroRect.bottom > window.innerHeight * 0.3 && targetRect.top > window.innerHeight * 0.3;
          setCurrentSection(showNavigation ? 'hero' : 'other');
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  return (
    <div className="h-screen overflow-y-auto scroll-snap-container" {...swipeHandlers}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <AppHeader onLogin={handleLogin} showSlogan={false} showAuthButtons={true} showLandingNavigation={currentSection === 'hero'} />
      </div>
      <SideNavigator sections={sections} />
      
      <section id="hero" className="scroll-snap-section">
        <div className="section-content">
          <HeroSection />
        </div>
      </section>

      <section id="target-users" className="scroll-snap-section bg-neutral-50">
        <div className="section-content">
          <TargetUsersSection />
        </div>
      </section>
      
      <section id="problem" className="scroll-snap-section">
        <div className="section-content">
          <ProblemSection />
        </div>
      </section>
      
      <section id="solution" className="scroll-snap-section bg-neutral-50">
        <div className="section-content">
          <SolutionSection />
        </div>
      </section>
      
      <section id="pricing" className="scroll-snap-section pricing-section">
        <div className="section-content">
          <PricingSection />
        </div>
      </section>
      
      <section id="footer" className="bg-medical-50 min-h-[400px] flex items-center justify-center last-section">
        <div className="section-footer">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default WebLandingPage;
