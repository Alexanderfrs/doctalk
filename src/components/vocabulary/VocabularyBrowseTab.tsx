
import React from "react";
import VocabularySearch from "./VocabularySearch";
import VocabularyFilters from "./VocabularyFilters";
import PaginatedVocabularyGrid from "./PaginatedVocabularyGrid";
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

      <PaginatedVocabularyGrid words={words} />
    </div>
  );
};

export default VocabularyBrowseTab;
