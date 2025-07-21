
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

  // Simple scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Add swipe gesture to navigate between sections on web
  const swipeHandlers = useSwipeable({
    onSwipedUp: eventData => {
      const currentSection = window.location.hash.replace('#', '') || 'hero';
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        const element = document.getElementById(nextSection.id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
          window.history.pushState(null, '', `#${nextSection.id}`);
        }
      }
    },
    onSwipedDown: eventData => {
      const currentSection = window.location.hash.replace('#', '') || 'hero';
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        const element = document.getElementById(prevSection.id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
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
        element.scrollIntoView({
          behavior: 'smooth'
        });
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
            element.scrollIntoView({
              behavior: 'smooth'
            });
            window.history.pushState(null, '', `#${id}`);
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const targetUsersSection = document.getElementById('target-users');
      
      if (heroSection && targetUsersSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const targetRect = targetUsersSection.getBoundingClientRect();
        
        // Show navigation only when hero section is prominently visible
        // Hide navigation when target-users section starts coming into view
        const showNavigation = heroRect.bottom > window.innerHeight * 0.3 && targetRect.top > window.innerHeight * 0.3;
        setCurrentSection(showNavigation ? 'hero' : 'other');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleWaitlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };
    return <div className="h-screen overflow-y-auto" style={{scrollSnapType: 'y mandatory'}} {...swipeHandlers}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <AppHeader onLogin={handleLogin} showSlogan={false} showAuthButtons={true} showLandingNavigation={currentSection === 'hero'} />
      </div>
      <SideNavigator sections={sections} />
      
      <section id="hero" className="h-screen flex items-center justify-center" style={{scrollSnapAlign: 'start'}}>
        <HeroSection />
      </section>

      <section id="target-users" className="h-screen flex items-center justify-center bg-neutral-50 pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <TargetUsersSection />
        </div>
      </section>
      
      <section id="problem" className="h-screen flex items-center justify-center pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <ProblemSection />
        </div>
      </section>
      
      <section id="solution" className="h-screen flex items-center justify-center bg-neutral-50 pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <SolutionSection />
        </div>
      </section>
      
      <section id="pricing" className="h-screen flex items-center justify-center pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <PricingSection />
        </div>
      </section>
      
      {/* Footer section with its own snap point to allow staying there */}
      <section id="footer" className="bg-medical-50 min-h-[400px] flex items-center justify-center" style={{scrollSnapAlign: 'start'}}>
        <Footer />
      </section>
    </div>;
};
export default WebLandingPage;
