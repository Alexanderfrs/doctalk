
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface VocabularyMastery {
  id: string;
  user_id: string;
  word_id: string;
  category: string;
  mastery_level: number;
  last_practiced: string;
  correct_attempts: number;
  total_attempts: number;
  created_at: string;
  updated_at: string;
}

export const useVocabularyProgress = () => {
  const { user } = useAuth();
  const [vocabularyMastery, setVocabularyMastery] = useState<VocabularyMastery[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch vocabulary mastery data
  const fetchVocabularyMastery = async (category?: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      let query = supabase
        .from('vocabulary_mastery')
        .select('*')
        .eq('user_id', user.id);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('last_practiced', { ascending: false });

      if (error) {
        console.error('Error fetching vocabulary mastery:', error);
        return;
      }

      setVocabularyMastery(data || []);
    } catch (error) {
      console.error('Error fetching vocabulary mastery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Record vocabulary practice
  const recordVocabularyPractice = async (
    wordId: string,
    category: string,
    isCorrect: boolean
  ) => {
    if (!user) return false;

    try {
      // Get existing mastery record
      const { data: existing } = await supabase
        .from('vocabulary_mastery')
        .select('*')
        .eq('user_id', user.id)
        .eq('word_id', wordId)
        .single();

      let newMasteryLevel = 0;
      let correctAttempts = isCorrect ? 1 : 0;
      let totalAttempts = 1;

      if (existing) {
        correctAttempts = existing.correct_attempts + (isCorrect ? 1 : 0);
        totalAttempts = existing.total_attempts + 1;
        
        // Calculate new mastery level based on success rate and total attempts
        const successRate = correctAttempts / totalAttempts;
        
        if (totalAttempts >= 10 && successRate >= 0.9) {
          newMasteryLevel = 5; // Master
        } else if (totalAttempts >= 8 && successRate >= 0.8) {
          newMasteryLevel = 4; // Advanced
        } else if (totalAttempts >= 6 && successRate >= 0.7) {
          newMasteryLevel = 3; // Intermediate
        } else if (totalAttempts >= 4 && successRate >= 0.6) {
          newMasteryLevel = 2; // Basic
        } else if (totalAttempts >= 2) {
          newMasteryLevel = 1; // Beginner
        }
      } else {
        newMasteryLevel = isCorrect ? 1 : 0;
      }

      // Upsert vocabulary mastery record
      const { error } = await supabase
        .from('vocabulary_mastery')
        .upsert({
          user_id: user.id,
          word_id: wordId,
          category,
          mastery_level: newMasteryLevel,
          correct_attempts: correctAttempts,
          total_attempts: totalAttempts,
          last_practiced: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,word_id'
        });

      if (error) {
        console.error('Error recording vocabulary practice:', error);
        return false;
      }

      await fetchVocabularyMastery();
      return true;
    } catch (error) {
      console.error('Error recording vocabulary practice:', error);
      return false;
    }
  };

  // Get mastery statistics
  const getMasteryStats = () => {
    const totalWords = vocabularyMastery.length;
    const masteredWords = vocabularyMastery.filter(v => v.mastery_level >= 3).length;
    const beginnerWords = vocabularyMastery.filter(v => v.mastery_level === 1).length;
    const intermediateWords = vocabularyMastery.filter(v => v.mastery_level === 2).length;
    const advancedWords = vocabularyMastery.filter(v => v.mastery_level === 4).length;
    const expertWords = vocabularyMastery.filter(v => v.mastery_level === 5).length;

    return {
      totalWords,
      masteredWords,
      beginnerWords,
      intermediateWords,
      advancedWords,
      expertWords,
      masteryPercentage: totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0
    };
  };

  // Get words that need practice (low mastery or not practiced recently)
  const getWordsNeedingPractice = (limit = 10) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return vocabularyMastery
      .filter(v => {
        const lastPracticed = new Date(v.last_practiced);
        return v.mastery_level < 3 || lastPracticed < weekAgo;
      })
      .sort((a, b) => {
        // Prioritize by mastery level (lower first) then by last practiced (older first)
        if (a.mastery_level !== b.mastery_level) {
          return a.mastery_level - b.mastery_level;
        }
        return new Date(a.last_practiced).getTime() - new Date(b.last_practiced).getTime();
      })
      .slice(0, limit);
  };

  useEffect(() => {
    if (user) {
      fetchVocabularyMastery();
    }
  }, [user]);

  return {
    vocabularyMastery,
    isLoading,
    fetchVocabularyMastery,
    recordVocabularyPractice,
    getMasteryStats,
    getWordsNeedingPractice
  };
};
