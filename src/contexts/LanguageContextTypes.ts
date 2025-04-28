
import { Language, GermanDialect } from '@/types/language';

export interface LanguageContextType {
  userLanguage: string;
  setUserLanguage: (code: string) => void;
  germanDialect: string;
  setGermanDialect: (code: string) => void;
  translate: (key: string) => string;
  getLanguageName: (code: string) => string;
  getDialectName: (code: string) => string;
  supportedLanguages: Language[];
  germanDialects: GermanDialect[];
  getCurrentLanguageTranslations: () => Record<string, string>;
  getGermanContent: (standardGerman: string) => string;
  interfaceLanguage: string;
  changeUILanguage: (code: string) => void;
}
