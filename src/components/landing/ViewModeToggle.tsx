
import React from 'react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Building2 } from 'lucide-react';

const ViewModeToggle = () => {
  const { viewMode, setViewMode } = useViewMode();
  const { translate } = useLanguage();

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-white rounded-full p-1 shadow-lg border border-neutral-200">
        <div className="flex items-center relative">
          {/* Individual/B2C Option */}
          <button
            onClick={() => setViewMode('individual')}
            className={`
              flex items-center px-4 py-2 rounded-full transition-all duration-300 relative z-10
              ${viewMode === 'individual' 
                ? 'text-white shadow-md' 
                : 'text-neutral-600 hover:text-neutral-800'
              }
            `}
          >
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium text-sm md:text-base">
              {translate('forHealthcareProfessionals')}
            </span>
          </button>

          {/* Enterprise/B2B Option */}
          <button
            onClick={() => setViewMode('enterprise')}
            className={`
              flex items-center px-4 py-2 rounded-full transition-all duration-300 relative z-10
              ${viewMode === 'enterprise' 
                ? 'text-white shadow-md' 
                : 'text-neutral-600 hover:text-neutral-800'
              }
            `}
          >
            <Building2 className="h-4 w-4 mr-2" />
            <span className="font-medium text-sm md:text-base">
              {translate('forHealthcareOrganizations')}
            </span>
          </button>

          {/* Sliding Background */}
          <div
            className={`
              absolute top-1 bottom-1 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full
              transition-all duration-300 ease-in-out
              ${viewMode === 'individual' 
                ? 'left-1 right-1/2 translate-x-0' 
                : 'left-1/2 right-1 translate-x-0'
              }
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewModeToggle;
