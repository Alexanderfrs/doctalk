
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface GermanDialect {
  code: string;
  name: string;
  region: string;
}

// Supported languages
export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' }
];

// German dialects
export const germanDialects: GermanDialect[] = [
  { code: 'de-DE', name: 'Standarddeutsch', region: 'Deutschland' },
  { code: 'de-AT', name: 'Österreichisches Deutsch', region: 'Österreich' },
  { code: 'de-CH', name: 'Schweizerdeutsch', region: 'Schweiz' }
];
