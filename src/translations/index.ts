
import { englishTranslations } from './en';
import { germanTranslations } from './de';

// Combine all translations
export const translations: Record<string, Record<string, string>> = {
  en: englishTranslations,
  de: germanTranslations
};

export default translations;
