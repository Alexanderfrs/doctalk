
import { useState, useEffect } from 'react';
import vocabularyCategories, { VocabularyWord } from '@/data/vocabulary';

export const useVocabulary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState<VocabularyWord[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDomain, setActiveDomain] = useState("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [masteredWords, setMasteredWords] = useState<string[]>([]);
  
  const allWords = vocabularyCategories.flatMap(category => category.words);

  useEffect(() => {
    const saved = localStorage.getItem('masteredWords');
    if (saved) {
      try {
        setMasteredWords(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading mastered words:", e);
      }
    }
  }, []);

  useEffect(() => {
    let result = [...allWords];
    
    if (activeCategory !== "all") {
      result = result.filter(word => word.category === activeCategory);
    }
    
    const domainCategories = {
      'hospital': ['vital-signs', 'emergency', 'medications', 'pain-scale', 'diagnoses', 'abbreviations', 'equipment'],
      'daily-care': ['ward-routines', 'documentation', 'mobility', 'general-care', 'care-equipment'],
      'elderly-care': ['elderly-care', 'dementia', 'mobility', 'general-care', 'care-equipment'],
      'disability-care': ['disability-care', 'communication', 'mobility', 'care-equipment']
    };
    
    const relevantCategories = domainCategories[activeDomain] || [];
    if (activeDomain !== 'all' && relevantCategories.length > 0) {
      result = result.filter(word => relevantCategories.includes(word.category));
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        word => 
          word.german.toLowerCase().includes(term) || 
          word.english.toLowerCase().includes(term) ||
          (word.example && word.example.toLowerCase().includes(term)) ||
          (word.notes && word.notes.toLowerCase().includes(term)) ||
          (word.abbreviation && word.abbreviation.toLowerCase().includes(term))
      );
    }
    
    result = result.map(word => ({
      ...word,
      mastered: masteredWords.includes(word.id)
    }));
    
    setFilteredWords(result);
  }, [activeCategory, activeDomain, searchTerm, allWords, masteredWords]);

  const updateMasteredStatus = (wordId: string, isMastered: boolean) => {
    let newMasteredWords = [...masteredWords];
    
    if (isMastered && !newMasteredWords.includes(wordId)) {
      newMasteredWords.push(wordId);
    } else if (!isMastered && newMasteredWords.includes(wordId)) {
      newMasteredWords = newMasteredWords.filter(id => id !== wordId);
    }
    
    setMasteredWords(newMasteredWords);
    localStorage.setItem('masteredWords', JSON.stringify(newMasteredWords));
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredWords,
    activeCategory,
    setActiveCategory,
    activeDomain,
    setActiveDomain,
    isFiltersOpen,
    setIsFiltersOpen,
    masteredWords,
    updateMasteredStatus,
    allWords
  };
};
