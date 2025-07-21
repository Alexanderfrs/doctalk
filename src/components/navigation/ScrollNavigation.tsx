import React from 'react';

interface ScrollNavigation {
  sections: Array<{ id: string; label: string }>;
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const ScrollNavigation: React.FC<ScrollNavigation> = ({
  sections,
  currentSection,
  onSectionClick
}) => {
  return (
    <div className="scroll-nav-dots">
      {sections.map((section, index) => (
        <button
          key={section.id}
          className={`scroll-nav-dot ${index === currentSection ? 'active' : ''}`}
          onClick={() => onSectionClick(index)}
          aria-label={`Go to ${section.label} section`}
          title={section.label}
        />
      ))}
    </div>
  );
};

export default ScrollNavigation;
