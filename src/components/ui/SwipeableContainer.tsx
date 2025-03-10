
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SwipeableContainerProps {
  children: React.ReactNode[];
  onSwipe?: (index: number) => void;
  initialIndex?: number;
  className?: string;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
}

const SwipeableContainer: React.FC<SwipeableContainerProps> = ({
  children,
  onSwipe,
  initialIndex = 0,
  className,
  showIndicators = true,
  showArrows = true,
  loop = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.targetTouches[0].clientX;
    setTouchEndX(currentX);
    
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const diffX = (currentX - (touchStartX || 0));
    const percentMoved = (diffX / containerWidth) * 100;
    
    // Limit swiping to a certain percentage if not looping
    if (!loop) {
      if ((currentIndex === 0 && diffX > 0) || 
          (currentIndex === React.Children.count(children) - 1 && diffX < 0)) {
        setTranslateX(percentMoved * 0.2); // Resistance at edges
      } else {
        setTranslateX(percentMoved);
      }
    } else {
      setTranslateX(percentMoved);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping || touchStartX === null || touchEndX === null) {
      setIsSwiping(false);
      setTranslateX(0);
      return;
    }

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const SWIPE_THRESHOLD = containerWidth * 0.2; // 20% of container width
    
    const diffX = touchEndX - touchStartX;
    
    if (diffX > SWIPE_THRESHOLD) {
      // Swiped right
      if (currentIndex > 0 || loop) {
        handlePrev();
      }
    } else if (diffX < -SWIPE_THRESHOLD) {
      // Swiped left
      if (currentIndex < React.Children.count(children) - 1 || loop) {
        handleNext();
      }
    }
    
    setIsSwiping(false);
    setTouchStartX(null);
    setTouchEndX(null);
    setTranslateX(0);
  };

  const handleNext = () => {
    let nextIndex;
    
    if (currentIndex >= React.Children.count(children) - 1) {
      nextIndex = loop ? 0 : React.Children.count(children) - 1;
    } else {
      nextIndex = currentIndex + 1;
    }
    
    setCurrentIndex(nextIndex);
    if (onSwipe) onSwipe(nextIndex);
  };

  const handlePrev = () => {
    let prevIndex;
    
    if (currentIndex <= 0) {
      prevIndex = loop ? React.Children.count(children) - 1 : 0;
    } else {
      prevIndex = currentIndex - 1;
    }
    
    setCurrentIndex(prevIndex);
    if (onSwipe) onSwipe(prevIndex);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    if (onSwipe) onSwipe(index);
  };

  useEffect(() => {
    // Add keyboard navigation for accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const indicatorClasses = "w-2 h-2 rounded-full transition-all duration-300";

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      ref={containerRef}
    >
      <div
        className="flex transition-transform duration-300 h-full touch-pan-y"
        style={{
          transform: isSwiping 
            ? `translateX(${translateX}px)` 
            : `translateX(-${currentIndex * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div 
            key={index} 
            className="min-w-full flex-shrink-0 flex items-center justify-center"
            aria-hidden={index !== currentIndex}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && !isMobile && (
        <>
          <button
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-neutral-700 hover:bg-white transition-opacity",
              { "opacity-50 cursor-not-allowed": !loop && currentIndex === 0 }
            )}
            onClick={handlePrev}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous item"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-neutral-700 hover:bg-white transition-opacity",
              { "opacity-50 cursor-not-allowed": !loop && currentIndex === React.Children.count(children) - 1 }
            )}
            onClick={handleNext}
            disabled={!loop && currentIndex === React.Children.count(children) - 1}
            aria-label="Next item"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Page Indicators */}
      {showIndicators && React.Children.count(children) > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {React.Children.map(children, (_, index) => (
            <button
              key={index}
              className={cn(
                indicatorClasses,
                index === currentIndex 
                  ? "bg-medical-600 w-4" 
                  : "bg-neutral-300 hover:bg-neutral-400"
              )}
              onClick={() => goToIndex(index)}
              aria-label={`Go to item ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwipeableContainer;
