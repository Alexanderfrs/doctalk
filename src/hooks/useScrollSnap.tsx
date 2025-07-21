import { useEffect, useState, useCallback, useRef } from 'react';

interface ScrollSection {
  id: string;
  label: string;
}

interface UseScrollSnapReturn {
  currentSection: number;
  scrollToSection: (index: number) => void;
  scrollToNext: () => void;
  scrollToPrevious: () => void;
  isScrolling: boolean;
}

// Default export für Fast Refresh Kompatibilität
const useScrollSnap = (sections: ScrollSection[]): UseScrollSnapReturn => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();
  const lastScrollTime = useRef<number>(0);

  // Navigate to specific section
  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length || isScrolling) return;

    setIsScrolling(true);
    const sectionId = sections[index].id;
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Use smooth scrolling for better UX
      const container = document.querySelector('.scroll-snap-container');
      if (container) {
        const elementTop = element.offsetTop;
        container.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      } else {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      setCurrentSection(index);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to allow scrolling again
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  }, [sections, isScrolling]);

  // Navigate to next section
  const scrollToNext = useCallback(() => {
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  }, [currentSection, sections.length, scrollToSection]);

  // Navigate to previous section
  const scrollToPrevious = useCallback(() => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }, [currentSection, scrollToSection]);

  // Throttled wheel handler
  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 100) return; // Throttle to 100ms
    
    if (isScrolling) {
      e.preventDefault();
      return;
    }

    const deltaY = e.deltaY;
    const threshold = 30; // Lower threshold for better responsiveness

    if (Math.abs(deltaY) > threshold) {
      e.preventDefault();
      lastScrollTime.current = now;
      
      if (deltaY > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
    }
  }, [isScrolling, scrollToNext, scrollToPrevious]);

  // Handle wheel events for scroll navigation
  useEffect(() => {
    const container = document.querySelector('.scroll-snap-container') || document.body;
    
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          scrollToNext();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToPrevious();
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolling, scrollToNext, scrollToPrevious, scrollToSection, sections.length]);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when 60% of section is visible
      threshold: 0.6
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        
        if (entry.isIntersecting) {
          // Section is visible
          element.classList.remove('section-entering', 'section-exiting');
          element.classList.add('section-visible');
          
          // Update current section index
          const sectionId = element.id;
          const sectionIndex = sections.findIndex(section => section.id === sectionId);
          if (sectionIndex !== -1 && sectionIndex !== currentSection && !isScrolling) {
            setCurrentSection(sectionIndex);
          }
        } else {
          // Section is not visible
          element.classList.remove('section-visible');
          
          // Determine if section is above or below viewport
          const rect = element.getBoundingClientRect();
          if (rect.top < 0) {
            element.classList.add('section-exiting');
            element.classList.remove('section-entering');
          } else {
            element.classList.add('section-entering');
            element.classList.remove('section-exiting');
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
        // Initialize with entering state
        element.classList.add('section-entering');
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, currentSection, isScrolling]);

  // Handle touch gestures for mobile
  useEffect(() => {
    let startY = 0;
    let startX = 0;
    let endY = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;

      endY = e.changedTouches[0].clientY;
      endX = e.changedTouches[0].clientX;
      
      const deltaY = startY - endY;
      const deltaX = startX - endX;
      const threshold = 80;

      // Only handle vertical swipes (ignore horizontal)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          // Swiped up - go to next section
          scrollToNext();
        } else {
          // Swiped down - go to previous section
          scrollToPrevious();
        }
      }
    };

    const container = document.querySelector('.scroll-snap-container') || document.body;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isScrolling, scrollToNext, scrollToPrevious]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentSection,
    scrollToSection,
    scrollToNext,
    scrollToPrevious,
    isScrolling
  };
};

export default useScrollSnap;

// Named exports für TypeScript Typen
export type { ScrollSection, UseScrollSnapReturn };
