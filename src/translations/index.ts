
import { englishTranslations } from './en';
import { germanTranslations } from './de';
import { spanishTranslations } from './es';
import { romanianTranslations } from './other';
import { russianTranslations } from './ru';

// Combine all translations (removed Turkish and Polish)
export const translations: Record<string, Record<string, string>> = {
  en: englishTranslations,
  de: germanTranslations,
  es: spanishTranslations,
  ro: romanianTranslations,
  ru: russianTranslations
};

export default translations;
