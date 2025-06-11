
import React, { useEffect, useState } from 'react';
import { useTutorial } from '@/contexts/TutorialContext';
import TutorialTooltip from './TutorialTooltip';

const TutorialOverlay: React.FC = () => {
  const { isActive, getCurrentStepData } = useTutorial();
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!isActive) {
      setTargetElement(null);
      return;
    }

    const stepData = getCurrentStepData();
    if (!stepData) return;

    // Find the target element
    const element = document.querySelector(stepData.target) as HTMLElement;
    if (element) {
      setTargetElement(element);
      
      // Calculate position for highlight
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      setHighlightStyle({
        position: 'absolute',
        top: rect.top + scrollTop - 8,
        left: rect.left + scrollLeft - 8,
        width: rect.width + 16,
        height: rect.height + 16,
        zIndex: 1001,
        pointerEvents: 'none',
        border: '2px solid #3B82F6',
        borderRadius: '8px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
        animation: 'pulse 2s infinite'
      });
    }
  }, [isActive, getCurrentStepData]);

  if (!isActive) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[1000]"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Highlight */}
      {targetElement && (
        <div style={highlightStyle} />
      )}
      
      {/* Tooltip */}
      <TutorialTooltip targetElement={targetElement} />
      
      {/* Add pulse animation styles using a style tag without jsx prop */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
            }
            100% {
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
            }
          }
        `
      }} />
    </>
  );
};

export default TutorialOverlay;
