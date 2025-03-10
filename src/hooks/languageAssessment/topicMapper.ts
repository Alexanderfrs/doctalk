
import { TopicWeight } from './types';

// Topic weights for different language skills
export const topicWeights: TopicWeight = {
  personal_information: 0.8,
  objects: 0.7,
  time: 0.7,
  colors: 0.6,
  past_tense: 0.9,
  transportation: 0.7,
  weather: 0.6,
  dates: 0.7,
  food: 0.6,
  reasons: 0.8,
  conditional: 0.9,
  duration: 0.8,
  grammar: 1.0,
  idioms: 0.9,
  passive_voice: 1.0,
  vocabulary: 0.8,
  relative_clauses: 0.9,
  prepositions: 0.8,
  formal_language: 0.9,
  subjunctive: 1.0,
  synonyms: 0.8,
  proverbs: 0.7,
  cases: 0.9,
  etymology: 0.7,
  stylistic_devices: 0.8,
  rhetoric: 0.8,
  latin_expressions: 0.7,
  healthcare: 1.0, // High weight for healthcare
  nursing_terminology: 1.1, // Added specific healthcare categories with higher weights
  medical_diagnosis: 1.1,
  emergency_medicine: 1.2,
  patient_care: 1.0
};

// Map topics to difficulty levels
export const topicDifficultyMap: Record<string, string[]> = {
  A1: ['personal_information', 'objects', 'time', 'colors', 'basic_verbs', 'healthcare', 'patient_care'],
  A2: ['past_tense', 'transportation', 'weather', 'dates', 'food', 'healthcare', 'nursing_terminology'],
  B1: ['reasons', 'conditional', 'duration', 'grammar', 'idioms', 'healthcare', 'medical_diagnosis'],
  B2: ['passive_voice', 'vocabulary', 'relative_clauses', 'prepositions', 'healthcare', 'emergency_medicine'],
  C1: ['formal_language', 'subjunctive', 'synonyms', 'proverbs', 'cases', 'healthcare', 'nursing_terminology', 'medical_diagnosis'],
  C2: ['etymology', 'stylistic_devices', 'rhetoric', 'latin_expressions', 'healthcare', 'emergency_medicine']
};

// Helper function to map a topic to its primary difficulty level
export function getTopicDifficultyLevel(topic: string): string {
  for (const [level, topics] of Object.entries(topicDifficultyMap)) {
    if (topics.includes(topic)) {
      return level;
    }
  }
  return 'B1'; // Default to middle level if topic not found
}

// Define healthcare vocabulary categories for rich learning content
export const healthcareCategories = [
  {
    id: 'nursing',
    name: 'Pflege',
    description: 'Vokabular für Pflegefachkräfte',
    terms: [
      { term: 'der Verband', definition: 'bandage' },
      { term: 'die Wunde', definition: 'wound' },
      { term: 'der Blutdruck', definition: 'blood pressure' },
      { term: 'die Pflegedokumentation', definition: 'care documentation' }
    ]
  },
  {
    id: 'diagnosis',
    name: 'Diagnostik',
    description: 'Begriffe für medizinische Diagnosen',
    terms: [
      { term: 'die Röntgenaufnahme', definition: 'X-ray image' },
      { term: 'der Ultraschall', definition: 'ultrasound' },
      { term: 'die Blutuntersuchung', definition: 'blood test' },
      { term: 'die Diagnose', definition: 'diagnosis' }
    ]
  },
  {
    id: 'emergency',
    name: 'Notfallmedizin',
    description: 'Vokabular für Notfallsituationen',
    terms: [
      { term: 'der Herzinfarkt', definition: 'heart attack' },
      { term: 'der Schlaganfall', definition: 'stroke' },
      { term: 'die Wiederbelebung', definition: 'resuscitation' },
      { term: 'der Defibrillator', definition: 'defibrillator' }
    ]
  }
];
