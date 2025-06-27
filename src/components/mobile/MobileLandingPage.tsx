
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import MobileOnboardingScreen from "@/components/mobile/MobileOnboardingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import waitlist from '@zootools/waitlist-js';

const MobileLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  
  // Check if we should return to onboarding
  const shouldReturnToOnboarding = location.state?.returnToOnboarding;
  
  useEffect(() => {
    if (shouldReturnToOnboarding) {
      setCurrentSlide(0); // Reset to first slide
      // Clear the state to prevent issues on future navigation
      navigate("/", { replace: true, state: {} });
    }
  }, [shouldReturnToOnboarding, navigate]);

  const { isAuthenticated } = useAuth();

  const handleSwipe = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, 3));
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
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <SwipeableContainer
        onSwipe={handleSwipe}
        initialIndex={currentSlide}
        showIndicators={true}
        className="h-screen"
      >
        <MobileOnboardingScreen
          screenNumber={1}
          onNext={handleNext}
          onSkip={handleSkip}
          onStart={handleStart}
          currentIndex={currentSlide}
        />
        <MobileOnboardingScreen
          screenNumber={2}
          onNext={handleNext}
          onSkip={handleSkip}
          onStart={handleStart}
          currentIndex={currentSlide}
        />
        <MobileOnboardingScreen
          screenNumber={3}
          onNext={handleNext}
          onSkip={handleSkip}
          onStart={handleStart}
          currentIndex={currentSlide}
        />
        <MobileOnboardingScreen
          screenNumber={4}
          onNext={handleNext}
          onSkip={handleSkip}
          onStart={handleStart}
          currentIndex={currentSlide}
          isLast={true}
        />
      </SwipeableContainer>
    </div>
  );
};

export default MobileLandingPage;
