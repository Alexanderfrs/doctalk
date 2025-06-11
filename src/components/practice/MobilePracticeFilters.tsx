
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import BottomSheet from "@/components/mobile/BottomSheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobilePracticeFiltersProps {
  selectedLevel: string;
  selectedCategory: string;
  selectedTags: string[];
  onLevelChange: (level: string) => void;
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const MobilePracticeFilters: React.FC<MobilePracticeFiltersProps> = ({
  selectedLevel,
  selectedCategory,
  selectedTags,
  onLevelChange,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}) => {
  const isMobile = useIsMobile();
  const levels = ['Alle', 'B1', 'B2', 'C1', 'C2'];
  const categories = ['Alle', 'patient-care', 'teamwork', 'emergency', 'consultation', 'handover'];
  const commonTags = ['Aufnahme', 'Anamnese', 'Notfall', 'Team', 'Kommunikation', 'Diagnose'];

  const hasActiveFilters = selectedLevel !== 'Alle' || selectedCategory !== 'Alle' || selectedTags.length > 0;
  const activeFiltersCount = (selectedLevel !== 'Alle' ? 1 : 0) + 
                            (selectedCategory !== 'Alle' ? 1 : 0) + 
                            selectedTags.length;

  const getCategoryLabel = (category: string) => {
    const labels = {
      'Alle': 'Alle',
      'patient-care': 'Patientenversorgung',
      'teamwork': 'Teamarbeit',
      'emergency': 'Notfall',
      'consultation': 'Beratung',
      'handover': 'Übergabe'
    };
    return labels[category] || category;
  };

  if (!isMobile) {
    return null;
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Level Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Schwierigkeitsgrad
        </label>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <Badge
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              className="cursor-pointer hover:bg-medical-50 touch-target"
              onClick={() => onLevelChange(level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Kategorie
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-medical-50 touch-target"
              onClick={() => onCategoryChange(category)}
            >
              {getCategoryLabel(category)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Themen
        </label>
        <div className="flex flex-wrap gap-2">
          {commonTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-medical-50 touch-target"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Alle Filter zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-4">
      <BottomSheet
        trigger={
          <Button variant="outline" className="w-full justify-between touch-target">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
          </Button>
        }
        title="Filter"
      >
        {filterContent}
      </BottomSheet>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedLevel !== 'Alle' && (
            <Badge variant="secondary" className="text-xs">
              Level: {selectedLevel}
            </Badge>
          )}
          {selectedCategory !== 'Alle' && (
            <Badge variant="secondary" className="text-xs">
              {getCategoryLabel(selectedCategory)}
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobilePracticeFilters;
