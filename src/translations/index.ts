
import { englishTranslations } from './en';
import { germanTranslations } from './de';
import { spanishTranslations } from './es';
import { romanianTranslations, polishTranslations } from './other';

// Combine all translations
export const translations: Record<string, Record<string, string>> = {
  en: englishTranslations,
  de: germanTranslations,
  es: spanishTranslations,
  ro: romanianTranslations,
  pl: polishTranslations,
  // Add empty objects with fallback to English for other languages
};

// Add translations for other languages with English fallback
['hr', 'tr', 'sr', 'bs', 'tl', 'hi', 'ar', 'vi'].forEach(lang => {
  translations[lang] = {
    ...englishTranslations, // Fallback to English
    // Add specific overrides for each language as needed
  };
});

export default translations;
