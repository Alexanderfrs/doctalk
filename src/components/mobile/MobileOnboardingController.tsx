
import React, { useState, useEffect } from "react";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import MobileOnboardingScreen from "./MobileOnboardingScreen";
import { useNavigate } from "react-router-dom";
import waitlist from '@zootools/waitlist-js';

const MobileOnboardingController: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    // Open ZooTools waitlist popup
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
  };

  const handleStart = () => {
    // Open ZooTools waitlist popup
    waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
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
