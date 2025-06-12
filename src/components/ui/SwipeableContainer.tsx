
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

interface SwipeableContainerProps {
  children: React.ReactNode;
  onSwipe?: (index: number) => void;
  initialIndex?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  className?: string;
}

const SwipeableContainer: React.FC<SwipeableContainerProps> = ({
  children,
  onSwipe,
  initialIndex = 0,
  showIndicators = false,
  showArrows = false,
  loop = false,
  className = "",
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const updateItemWidth = () => {
      if (containerRef.current) {
        setItemWidth(containerRef.current.offsetWidth);
      }
    };

    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);

    return () => window.removeEventListener("resize", updateItemWidth);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!loop && (index < 0 || index >= React.Children.count(children))) {
        return;
      }

      let newIndex = index;
      if (index < 0) {
        newIndex = React.Children.count(children) - 1;
      } else if (index >= React.Children.count(children)) {
        newIndex = 0;
      }

      setCurrentIndex(newIndex);
      onSwipe?.(newIndex);
    },
    [children, loop, onSwipe]
  );

  const handleSwipeLeft = () => {
    goToSlide(currentIndex + 1);
  };

  const handleSwipeRight = () => {
    goToSlide(currentIndex - 1);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: false,
  });

  const calculateTransform = () => {
    return `translateX(-${currentIndex * itemWidth}px)`;
  };

  return (
    <div className={`relative ${className}`} {...props}>
      <div
        className="swipeable-container overflow-hidden"
        ref={containerRef}
      >
        <div
          {...swipeHandlers}
          className="flex transition-transform duration-300"
          style={{
            width: `${itemWidth * React.Children.count(children)}px`,
            transform: calculateTransform(),
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              style={{ width: `${itemWidth}px`, flexShrink: 0 }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Page indicators */}
      {showIndicators && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {React.Children.map(children, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-medical-500"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2"
            onClick={() => goToSlide(currentIndex - 1)}
            aria-label="Previous Slide"
          >
            {"<"}
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2"
            onClick={() => goToSlide(currentIndex + 1)}
            aria-label="Next Slide"
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default SwipeableContainer;
