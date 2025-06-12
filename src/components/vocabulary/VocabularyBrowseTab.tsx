
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import VocabularySearch from "./VocabularySearch";
import VocabularyFilters from "./VocabularyFilters";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";

interface VocabularyBrowseTabProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeCategory: string;
  activeDomain: string;
  isFiltersOpen: boolean;
  onCategoryChange: (category: string) => void;
  onDomainChange: (domain: string) => void;
  onFiltersToggle: () => void;
  onResetFilters: () => void;
  words: DeduplicatedVocabularyWord[];
}

const VocabularyBrowseTab: React.FC<VocabularyBrowseTabProps> = ({
  searchTerm,
  onSearchChange,
  activeCategory,
  activeDomain,
  isFiltersOpen,
  onCategoryChange,
  onDomainChange,
  onFiltersToggle,
  onResetFilters,
  words
}) => {
  return (
    <div className="space-y-6">
      <VocabularySearch
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <VocabularyFilters
        activeCategory={activeCategory}
        activeDomain={activeDomain}
        isFiltersOpen={isFiltersOpen}
        onCategoryChange={onCategoryChange}
        onDomainChange={onDomainChange}
        onFiltersToggle={onFiltersToggle}
        onResetFilters={onResetFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map((word) => (
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
                <p className="text-sm text-gray-500">{word.categories[0]}</p>
                {word.example && (
                  <p className="text-sm italic text-gray-500 border-l-2 border-medical-200 pl-3">
                    {word.example}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VocabularyBrowseTab;
