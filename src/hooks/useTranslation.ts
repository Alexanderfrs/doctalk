
import { useLanguage } from '@/contexts/LanguageContext';

export const useTranslation = () => {
  const { translate, getGermanContent } = useLanguage();

  const getLocalizedContent = (key: string, germanContent?: string) => {
    const translatedText = translate(key);
    if (germanContent) {
      return {
        translation: translatedText,
        germanVersion: getGermanContent(germanContent)
      };
    }
    return translatedText;
  };

  return {
    t: translate,
    getLocalizedContent
  };
};
