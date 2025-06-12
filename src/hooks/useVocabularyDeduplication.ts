
import { useMemo } from 'react';
import { VocabularyWord } from '@/data/vocabulary';

export interface DeduplicatedVocabularyWord extends Omit<VocabularyWord, 'category'> {
  categories: string[];
}

export const useVocabularyDeduplication = (words: VocabularyWord[]) => {
  const deduplicatedWords = useMemo(() => {
    const wordMap = new Map<string, DeduplicatedVocabularyWord>();
    
    words.forEach(word => {
      const key = word.german.toLowerCase().trim();
      
      if (wordMap.has(key)) {
        const existing = wordMap.get(key)!;
        // Add category if not already present and limit to 3
        if (!existing.categories.includes(word.category) && existing.categories.length < 3) {
          existing.categories.push(word.category);
        }
      } else {
        wordMap.set(key, {
          ...word,
          categories: [word.category]
        });
      }
    });
    
    return Array.from(wordMap.values());
  }, [words]);
  
  return deduplicatedWords;
};
