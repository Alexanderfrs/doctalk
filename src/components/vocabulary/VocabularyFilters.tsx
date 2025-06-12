
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Check, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabularyFiltersProps {
  activeCategory: string;
  activeDomain: string;
  isFiltersOpen: boolean;
  onCategoryChange: (category: string) => void;
  onDomainChange: (domain: string) => void;
  onFiltersToggle: () => void;
  onResetFilters: () => void;
}

const VocabularyFilters: React.FC<VocabularyFiltersProps> = ({
  activeCategory,
  activeDomain,
  isFiltersOpen,
  onCategoryChange,
  onDomainChange,
  onFiltersToggle,
  onResetFilters,
}) => {
  const categories = [
    { id: "all", label: "Alle Kategorien" },
    { id: "vital-signs", label: "Vitalzeichen" },
    { id: "emergency", label: "Notfälle" },
    { id: "medications", label: "Medikamente" },
    { id: "pain-scale", label: "Schmerzskala" },
    { id: "care-equipment", label: "Pflegehilfsmittel" },
    { id: "equipment", label: "Medizinische Geräte" },
    { id: "abbreviations", label: "Abkürzungen" },
    { id: "elderly-care", label: "Altenpflege" },
    { id: "disability-care", label: "Behindertenbetreuung" }
  ];

  const domains = [
    { id: "all", label: "Alle Bereiche" },
    { id: "hospital", label: "Krankenhaus" },
    { id: "elderly-care", label: "Altenpflege" },
    { id: "disability-care", label: "Behindertenbetreuung" },
    { id: "daily-care", label: "Tägliche Pflege" },
    { id: "emergency", label: "Notfallmedizin" }
  ];

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full md:hidden flex items-center justify-between mb-4"
        onClick={onFiltersToggle}
      >
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter anzeigen
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'transform rotate-180' : ''}`} />
      </Button>
      
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 mb-6 bg-white p-4 md:p-0 rounded-lg md:bg-transparent shadow-sm md:shadow-none`}>
        <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
          <p className="text-sm font-medium text-neutral-700 md:mr-2">Kategorie:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-full",
                  activeCategory === category.id
                    ? "bg-medical-50 text-medical-700 border-medical-200"
                    : "bg-white text-neutral-700 hover:bg-neutral-50"
                )}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.label}
                {activeCategory === category.id && <Check className="ml-1 h-3 w-3" />}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
          <p className="text-sm font-medium text-neutral-700 md:mr-2">Berufsbereich:</p>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <Button
                key={domain.id}
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-full",
                  activeDomain === domain.id
                    ? "bg-medical-50 text-medical-700 border-medical-200"
                    : "bg-white text-neutral-700 hover:bg-neutral-50"
                )}
                onClick={() => onDomainChange(domain.id)}
              >
                {domain.label}
                {activeDomain === domain.id && <Check className="ml-1 h-3 w-3" />}
              </Button>
            ))}
          </div>
        </div>
        
        {(activeCategory !== "all" || activeDomain !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-500 hover:text-neutral-700"
            onClick={onResetFilters}
          >
            <RefreshCw className="mr-1 h-3 w-3" />
            Filter zurücksetzen
          </Button>
        )}
      </div>
    </>
  );
};

export default VocabularyFilters;
