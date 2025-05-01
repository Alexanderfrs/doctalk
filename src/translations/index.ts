
import { englishTranslations } from './en';
import { germanTranslations } from './de';
import { spanishTranslations } from './es';
import { romanianTranslations, polishTranslations } from './other';
import { russianTranslations } from './ru';
import { turkishTranslations } from './tr';

// Combine all translations
export const translations: Record<string, Record<string, string>> = {
  en: englishTranslations,
  de: germanTranslations,
  es: spanishTranslations,
  ro: romanianTranslations,
  pl: polishTranslations,
  ru: russianTranslations,
  tr: turkishTranslations
};

export default translations;
