
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import BottomSheet from "@/components/mobile/BottomSheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobilePracticeFiltersProps {
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const MobilePracticeFilters: React.FC<MobilePracticeFiltersProps> = ({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}) => {
  const isMobile = useIsMobile();
  const categories = ['Alle', 'patient-care', 'teamwork', 'emergency', 'consultation', 'handover', 'elderly-care', 'disability-care'];
  const commonTags = ['Aufnahme', 'Anamnese', 'Notfall', 'Team', 'Kommunikation', 'Diagnose', 'Demenz', 'Mobilität', 'Behindertenbetreuung'];

  const hasActiveFilters = selectedCategory !== 'Alle' || selectedTags.length > 0;
  const activeFiltersCount = (selectedCategory !== 'Alle' ? 1 : 0) + selectedTags.length;

  const getCategoryLabel = (category: string) => {
    const labels = {
      'Alle': 'Alle',
      'patient-care': 'Patientenversorgung',
      'teamwork': 'Teamarbeit',
      'emergency': 'Notfall',
      'consultation': 'Beratung',
      'handover': 'Übergabe',
      'elderly-care': 'Altenpflege',
      'disability-care': 'Behindertenbetreuung'
    };
    return labels[category] || category;
  };

  if (!isMobile) {
    return null;
  }

  const filterContent = (
    <div className="space-y-6">
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
