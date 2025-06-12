
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, TrendingUp } from "lucide-react";
import VocabularySearch from "./VocabularySearch";
import VocabularyFilters from "./VocabularyFilters";
import CollapsibleSection from "@/components/mobile/CollapsibleSection";
import PracticeSetupDialog, { PracticeConfig } from "./PracticeSetupDialog";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";

interface VocabularyMobileViewProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeCategory: string;
  activeDomain: string;
  onCategoryChange: (category: string) => void;
  onDomainChange: (domain: string) => void;
  onResetFilters: () => void;
  words: DeduplicatedVocabularyWord[];
  availableCategories: string[];
  onStartPractice: (config: PracticeConfig) => void;
}

const VocabularyMobileView: React.FC<VocabularyMobileViewProps> = ({
  searchTerm,
  onSearchChange,
  activeCategory,
  activeDomain,
  onCategoryChange,
  onDomainChange,
  onResetFilters,
  words,
  availableCategories,
  onStartPractice
}) => {
  return (
    <div className="space-y-6">
      <VocabularySearch
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <CollapsibleSection
        title="Filter"
        icon={<Filter className="h-4 w-4" />}
        defaultOpen={false}
      >
        <VocabularyFilters
          activeCategory={activeCategory}
          activeDomain={activeDomain}
          isFiltersOpen={true}
          onCategoryChange={onCategoryChange}
          onDomainChange={onDomainChange}
          onFiltersToggle={() => {}}
          onResetFilters={onResetFilters}
        />
      </CollapsibleSection>

      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Vokabeltraining</h3>
          <p className="text-gray-600 mb-4 text-sm">
            {words.length} Vokabeln verfügbar
          </p>
          <PracticeSetupDialog
            availableCategories={availableCategories}
            onStartPractice={onStartPractice}
            totalWords={words.length}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {words.slice(0, 10).map((word) => (
          <Card key={word.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-medical-800">
                    {word.german}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {word.categories.map((category, index) => (
                      <span key={index} className="px-2 py-1 rounded text-xs font-medium bg-medical-100 text-medical-800">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{word.english}</p>
                {word.example && (
                  <p className="text-sm italic text-gray-500 border-l-2 border-medical-200 pl-3">
                    {word.example}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {words.length > 10 && (
          <div className="text-center text-gray-500 text-sm">
            +{words.length - 10} weitere Vokabeln
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyMobileView;
