
import { commonTranslations } from './common';
import { onboardingTranslations } from './onboarding';
import { landingTranslations } from './landing';
import { goalsTranslations } from './goals';
import { spanishTranslations } from './es';
import { romanianTranslations, polishTranslations } from './other';
import { russianTranslations } from './ru';
import { turkishTranslations } from './tr';

// Merge all translation modules for each language
const mergeTranslations = (lang: string) => ({
  ...commonTranslations[lang] || {},
  ...onboardingTranslations[lang] || {},
  ...landingTranslations[lang] || {},
  ...goalsTranslations[lang] || {},
});

// Combine all translations
export const translations: Record<string, Record<string, string>> = {
  en: mergeTranslations('en'),
  de: mergeTranslations('de'),
  tr: mergeTranslations('tr'),
  es: spanishTranslations,
  ro: romanianTranslations,
  pl: polishTranslations,
  ru: russianTranslations
};

export default translations;
