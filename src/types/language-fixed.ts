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

export const supportedLanguages: Language[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', nativeName: 'EN', flag: 'EN' }
];

export const germanDialects: GermanDialect[] = [
  { code: 'de-DE', name: 'Standard German', region: 'Germany' },
  { code: 'de-AT', name: 'Austrian German', region: 'Austria' },
  { code: 'de-CH', name: 'Swiss German', region: 'Switzerland' }
];
