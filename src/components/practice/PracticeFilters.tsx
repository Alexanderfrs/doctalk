
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface PracticeFiltersProps {
  selectedLevel: string;
  selectedCategory: string;
  selectedTags: string[];
  onLevelChange: (level: string) => void;
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const PracticeFilters: React.FC<PracticeFiltersProps> = ({
  selectedLevel,
  selectedCategory,
  selectedTags,
  onLevelChange,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}) => {
  const levels = ['Alle', 'B1', 'B2', 'C1', 'C2'];
  const categories = ['Alle', 'patient-care', 'teamwork', 'emergency', 'consultation', 'handover'];
  const commonTags = ['Aufnahme', 'Anamnese', 'Notfall', 'Team', 'Kommunikation', 'Diagnose', 'Medikamente', 'Übergabe'];

  const hasActiveFilters = selectedLevel !== 'Alle' || selectedCategory !== 'Alle' || selectedTags.length > 0;

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

        {/* Level Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Schwierigkeitsgrad
          </label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Badge
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                className="cursor-pointer hover:bg-medical-50"
                onClick={() => onLevelChange(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
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
                {category === 'Alle' ? 'Alle' : 
                 category === 'patient-care' ? 'Patientenversorgung' :
                 category === 'teamwork' ? 'Teamarbeit' :
                 category === 'emergency' ? 'Notfall' :
                 category === 'consultation' ? 'Beratung' :
                 category === 'handover' ? 'Übergabe' : category}
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
