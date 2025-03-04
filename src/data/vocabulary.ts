
export interface VocabularyWord {
  id: string;
  german: string;
  english: string;
  pronunciation?: string;
  example?: string;
  category: string;
  notes?: string;
  mastered?: boolean;
}

export interface VocabularyCategory {
  id: string;
  name: string;
  description: string;
  words: VocabularyWord[];
}

const vocabularyCategories: VocabularyCategory[] = [
  {
    id: 'vital-signs',
    name: 'Vitalzeichen',
    description: 'Begriffe rund um die Messung und Dokumentation von Vitalparametern',
    words: [
      {
        id: 'blood-pressure',
        german: 'der Blutdruck',
        english: 'blood pressure',
        pronunciation: 'bluut-drook',
        example: 'Der Blutdruck des Patienten ist heute erhöht.',
        category: 'vital-signs',
        notes: 'Often recorded as systolic/diastolic (e.g., 120/80)'
      },
      {
        id: 'pulse',
        german: 'der Puls',
        english: 'pulse',
        pronunciation: 'pools',
        example: 'Ihr Puls ist regelmäßig und kräftig.',
        category: 'vital-signs'
      },
      {
        id: 'temperature',
        german: 'die Temperatur',
        english: 'temperature',
        pronunciation: 'tem-peh-rah-toor',
        example: 'Die Temperatur wird axillär gemessen.',
        category: 'vital-signs'
      },
      {
        id: 'respiratory-rate',
        german: 'die Atemfrequenz',
        english: 'respiratory rate',
        pronunciation: 'ah-tem-freh-kvents',
        example: 'Seine Atemfrequenz liegt bei 18 Atemzügen pro Minute.',
        category: 'vital-signs'
      },
      {
        id: 'oxygen-saturation',
        german: 'die Sauerstoffsättigung',
        english: 'oxygen saturation',
        pronunciation: 'zow-er-shtof-zet-ee-goong',
        example: 'Die Sauerstoffsättigung ist auf 92% gefallen.',
        category: 'vital-signs',
        notes: 'Often abbreviated as SpO2'
      }
    ]
  },
  {
    id: 'pain-scale',
    name: 'Schmerzskala',
    description: 'Begriffe zur Beurteilung und Dokumentation von Schmerzen',
    words: [
      {
        id: 'pain',
        german: 'der Schmerz',
        english: 'pain',
        pronunciation: 'schmerts',
        example: 'Haben Sie Schmerzen?',
        category: 'pain-scale'
      },
      {
        id: 'pain-scale',
        german: 'die Schmerzskala',
        english: 'pain scale',
        pronunciation: 'schmerts-skah-lah',
        example: 'Auf einer Skala von 0 bis 10, wie stark sind Ihre Schmerzen?',
        category: 'pain-scale'
      },
      {
        id: 'severe-pain',
        german: 'starke Schmerzen',
        english: 'severe pain',
        pronunciation: 'shtar-keh schmerts-en',
        example: 'Der Patient klagt über starke Schmerzen im Rücken.',
        category: 'pain-scale'
      },
      {
        id: 'dull-pain',
        german: 'dumpfer Schmerz',
        english: 'dull pain',
        pronunciation: 'doompf-er schmerts',
        example: 'Sie beschreibt einen dumpfen Schmerz im Unterbauch.',
        category: 'pain-scale'
      },
      {
        id: 'sharp-pain',
        german: 'stechender Schmerz',
        english: 'sharp pain',
        pronunciation: 'stech-en-der schmerts',
        example: 'Der stechende Schmerz kommt und geht.',
        category: 'pain-scale'
      }
    ]
  },
  {
    id: 'medications',
    name: 'Medikamente',
    description: 'Begriffe rund um Medikamente und deren Verabreichung',
    words: [
      {
        id: 'tablet',
        german: 'die Tablette',
        english: 'tablet',
        pronunciation: 'tab-let-teh',
        example: 'Nehmen Sie diese Tablette dreimal täglich ein.',
        category: 'medications'
      },
      {
        id: 'injection',
        german: 'die Injektion',
        english: 'injection',
        pronunciation: 'in-yek-tsee-ohn',
        example: 'Die Injektion wird subkutan verabreicht.',
        category: 'medications'
      },
      {
        id: 'infusion',
        german: 'die Infusion',
        english: 'infusion',
        pronunciation: 'in-foo-zee-ohn',
        example: 'Die Infusion läuft mit 100ml pro Stunde.',
        category: 'medications'
      },
      {
        id: 'dose',
        german: 'die Dosierung',
        english: 'dose',
        pronunciation: 'doh-zee-roong',
        example: 'Die Dosierung wurde vom Arzt angepasst.',
        category: 'medications'
      },
      {
        id: 'side-effect',
        german: 'die Nebenwirkung',
        english: 'side effect',
        pronunciation: 'nay-ben-veer-koong',
        example: 'Übelkeit ist eine mögliche Nebenwirkung dieses Medikaments.',
        category: 'medications'
      }
    ]
  },
  {
    id: 'emergency',
    name: 'Notfälle',
    description: 'Wichtige Begriffe für Notfallsituationen',
    words: [
      {
        id: 'emergency',
        german: 'der Notfall',
        english: 'emergency',
        pronunciation: 'noht-fahl',
        example: 'Wir haben einen Notfall auf Station 3.',
        category: 'emergency'
      },
      {
        id: 'resuscitation',
        german: 'die Wiederbelebung',
        english: 'resuscitation',
        pronunciation: 'vee-der-beh-lay-boong',
        example: 'Die Wiederbelebungsmaßnahmen wurden sofort eingeleitet.',
        category: 'emergency'
      },
      {
        id: 'cardiac-arrest',
        german: 'der Herzstillstand',
        english: 'cardiac arrest',
        pronunciation: 'herts-shtil-shtand',
        example: 'Der Patient erlitt einen Herzstillstand.',
        category: 'emergency'
      },
      {
        id: 'defibrillator',
        german: 'der Defibrillator',
        english: 'defibrillator',
        pronunciation: 'de-fi-bri-lah-tor',
        example: 'Bringen Sie schnell den Defibrillator!',
        category: 'emergency'
      },
      {
        id: 'emergency-team',
        german: 'das Notfallteam',
        english: 'emergency team',
        pronunciation: 'noht-fahl-team',
        example: 'Das Notfallteam ist bereits unterwegs.',
        category: 'emergency'
      }
    ]
  }
];

export default vocabularyCategories;
