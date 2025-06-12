
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface PracticeFiltersProps {
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const PracticeFilters: React.FC<PracticeFiltersProps> = ({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}) => {
  const categories = ['Alle', 'patient-care', 'teamwork', 'emergency', 'consultation', 'handover', 'elderly-care', 'disability-care'];
  const commonTags = ['Aufnahme', 'Anamnese', 'Notfall', 'Team', 'Kommunikation', 'Diagnose', 'Demenz', 'Mobilität', 'Behindertenbetreuung'];

  const hasActiveFilters = selectedCategory !== 'Alle' || selectedTags.length > 0;

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

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Zurücksetzen
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Kategorie
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-medical-50"
                onClick={() => onCategoryChange(category)}
              >
                {getCategoryLabel(category)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Themen
          </label>
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-medical-50"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeFilters;
