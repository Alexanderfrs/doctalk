
import React, { useState, useEffect } from "react";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import MobileOnboardingScreen from "./MobileOnboardingScreen";
import { useNavigate } from "react-router-dom";

const MobileOnboardingController: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    // Navigate to the same zootools waitlist signup
    window.open('https://zootoolshq.typeform.com/doctalk?typeform-source=e4c99325-c529-497f-8a5d-2c84f475bf0f.lovableproject.com', '_blank');
  };

  const handleStart = () => {
    // Navigate to the same zootools waitlist signup
    window.open('https://zootoolshq.typeform.com/doctalk?typeform-source=e4c99325-c529-497f-8a5d-2c84f475bf0f.lovableproject.com', '_blank');
  };

  const handleSwipe = (index: number) => {
    setCurrentIndex(index);
  };

  const screens = [
    <MobileOnboardingScreen 
      key="screen1"
      screenNumber={1} 
      onNext={handleNext} 
      onSkip={handleSkip} 
      onStart={handleStart}
      currentIndex={currentIndex}
    />,
    <MobileOnboardingScreen 
      key="screen2"
      screenNumber={2} 
      onNext={handleNext} 
      onSkip={handleSkip} 
      onStart={handleStart}
      currentIndex={currentIndex}
    />,
    <MobileOnboardingScreen 
      key="screen3"
      screenNumber={3} 
      onNext={handleNext} 
      onSkip={handleSkip} 
      onStart={handleStart}
      currentIndex={currentIndex}
    />,
    <MobileOnboardingScreen 
      key="screen4"
      screenNumber={4} 
      onNext={handleNext} 
      onSkip={handleSkip} 
      onStart={handleStart}
      currentIndex={currentIndex}
      isLast={true}
    />
  ];

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <SwipeableContainer
        onSwipe={handleSwipe}
        initialIndex={currentIndex}
        showIndicators={true}
        showArrows={false}
        loop={false}
        className="h-full"
        key={currentIndex} // Force re-render when currentIndex changes
      >
        {screens}
      </SwipeableContainer>
    </div>
  );
};

export default MobileOnboardingController;
