
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import BottomSheet from "@/components/mobile/BottomSheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface UnifiedPracticeFiltersProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  onClearFilters: () => void;
}

const UnifiedPracticeFilters: React.FC<UnifiedPracticeFiltersProps> = ({
  selectedTopic,
  onTopicChange,
  onClearFilters
}) => {
  const isMobile = useIsMobile();
  
  const topics = [
    'Alle', 
    'Patientenversorgung', 
    'Notfall',               // Emergency
    'Dokumentation',         // Documentation
    'Teamarbeit', 
    'Beratung', 
    'Übergabe', 
    'Altenpflege', 
    'Behindertenbetreuung'
  ];

  const hasActiveFilters = selectedTopic !== 'Alle';

  const filterContent = (
    <div className="space-y-6">
      {/* Topics Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Themen
        </label>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopic === topic ? "default" : "outline"}
              className="cursor-pointer hover:bg-medical-50 touch-target"
              onClick={() => onTopicChange(topic)}
            >
              {topic}
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
            Filter zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="mb-4">
        <BottomSheet
          trigger={
            <Button variant="outline" className="w-full justify-between touch-target">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Themen
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    1
                  </Badge>
                )}
              </div>
            </Button>
          }
          title="Themen Filter"
        >
          {filterContent}
        </BottomSheet>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              {selectedTopic}
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // Desktop version - inline filter
  return (
    <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Filter</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Zurücksetzen
          </Button>
        )}
      </div>
      {filterContent}
    </div>
  );
};

export default UnifiedPracticeFilters;
