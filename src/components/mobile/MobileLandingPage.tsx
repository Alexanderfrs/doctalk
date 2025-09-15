
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import MobileOnboardingScreen from "@/components/mobile/MobileOnboardingScreen";
import TrustedPartnersSection from "@/components/landing/TrustedPartnersSection";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import useScrollSnap from "@/hooks/useScrollSnap";
import ScrollNavigation from "@/components/navigation/ScrollNavigation";
import "@/styles/scroll-snap.css";
import waitlist from '@zootools/waitlist-js';

const MobileLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  
  // Check if we should return to onboarding
  const shouldReturnToOnboarding = location.state?.returnToOnboarding;
  
  const sections = [
    { id: "onboarding-1", label: "Screen 1" },
    { id: "onboarding-2", label: "Screen 2" },
    { id: "onboarding-3", label: "Screen 3" },
    { id: "onboarding-4", label: "Screen 4" },
    { id: "trusted-partners", label: "Partners" },
  ];

  const { currentSection, scrollToSection } = useScrollSnap(sections);
  
  useEffect(() => {
    setCurrentSlide(currentSection);
  }, [currentSection]);
  
  useEffect(() => {
    if (shouldReturnToOnboarding) {
      setCurrentSlide(0);
      scrollToSection(0);
      // Clear the state to prevent issues on future navigation
      navigate("/", { replace: true, state: {} });
    }
  }, [shouldReturnToOnboarding, navigate, scrollToSection]);

  const { isAuthenticated } = useAuth();

  const handleSwipe = (index: number) => {
    setCurrentSlide(index);
    scrollToSection(index);
  };

  const handleNext = () => {
    const nextSlide = Math.min(currentSlide + 1, 3);
    setCurrentSlide(nextSlide);
    scrollToSection(nextSlide);
  };

  const handleSkip = () => {
    // Open ZooTools waitlist popup
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const handleStart = () => {
    // Open ZooTools waitlist popup
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  return (
    <div className="scroll-snap-container bg-gradient-to-b from-medical-50 to-white">
      <ScrollNavigation 
        sections={sections}
        currentSection={currentSection}
        onSectionClick={scrollToSection}
      />
      
      <section id="onboarding-1" className="scroll-snap-section">
        <div className="section-content">
          <MobileOnboardingScreen
            screenNumber={1}
            onNext={handleNext}
            onSkip={handleSkip}
            onStart={handleStart}
            currentIndex={currentSlide}
          />
        </div>
      </section>
      
      <section id="onboarding-2" className="scroll-snap-section">
        <div className="section-content">
          <MobileOnboardingScreen
            screenNumber={2}
            onNext={handleNext}
            onSkip={handleSkip}
            onStart={handleStart}
            currentIndex={currentSlide}
          />
        </div>
      </section>
      
      <section id="onboarding-3" className="scroll-snap-section">
        <div className="section-content">
          <MobileOnboardingScreen
            screenNumber={3}
            onNext={handleNext}
            onSkip={handleSkip}
            onStart={handleStart}
            currentIndex={currentSlide}
          />
        </div>
      </section>
      
      <section id="onboarding-4" className="scroll-snap-section">
        <div className="section-content">
          <MobileOnboardingScreen
            screenNumber={4}
            onNext={handleNext}
            onSkip={handleSkip}
            onStart={handleStart}
            currentIndex={currentSlide}
            isLast={false}
          />
        </div>
      </section>
      
      <section id="trusted-partners" className="scroll-snap-section">
        <div className="section-content">
          <TrustedPartnersSection />
        </div>
      </section>
    </div>
  );
};

export default MobileLandingPage;
