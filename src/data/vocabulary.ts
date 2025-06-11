export interface VocabularyWord {
  id: string;
  german: string;
  english: string;
  pronunciation?: string;
  example?: string;
  category: string;
  notes?: string;
  mastered?: boolean;
  abbreviation?: string;
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
        german: 'der Blutdruck (RR)',
        english: 'blood pressure',
        pronunciation: 'bluut-drook',
        example: 'RR: 120/80 mmHg - Der Blutdruck des Patienten ist heute erhöht.',
        category: 'vital-signs',
        notes: 'Often recorded as systolic/diastolic (e.g., 120/80). RR stands for Riva-Rocci',
        abbreviation: 'RR'
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
        german: 'die Sauerstoffsättigung (SpO2)',
        english: 'oxygen saturation',
        pronunciation: 'zow-er-shtof-zet-ee-goong',
        example: 'Die SpO2 ist auf 92% gefallen.',
        category: 'vital-signs',
        notes: 'SpO2 = Sauerstoffsättigung im Blut',
        abbreviation: 'SpO2'
      },
      {
        id: 'blood-sugar',
        german: 'der Blutzucker (BZ)',
        english: 'blood sugar',
        pronunciation: 'bluut-tsoo-ker',
        example: 'BZ vor dem Essen messen: 120 mg/dl.',
        category: 'vital-signs',
        notes: 'BZ = Blutzucker, normal range 70-100 mg/dl nüchtern',
        abbreviation: 'BZ'
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
  },
  {
    id: 'care-equipment',
    name: 'Pflegehilfsmittel',
    description: 'Tägliche Pflegehilfsmittel und Ausrüstung für die Patientenversorgung',
    words: [
      {
        id: 'rollator',
        german: 'der Rollator',
        english: 'rollator/walker',
        pronunciation: 'roll-ah-tor',
        example: 'Mit dem Rollator kann sie selbstständig zur Physiotherapie gehen.',
        category: 'care-equipment'
      },
      {
        id: 'wheelchair',
        german: 'der Rollstuhl',
        english: 'wheelchair',
        pronunciation: 'roll-shtool',
        example: 'Der Patient ist auf einen Rollstuhl angewiesen.',
        category: 'care-equipment'
      },
      {
        id: 'walking-cane',
        german: 'der Gehstock',
        english: 'walking cane',
        pronunciation: 'geh-shtock',
        example: 'Er benutzt einen Gehstock seit seiner Hüft-OP.',
        category: 'care-equipment'
      },
      {
        id: 'lift-hoist',
        german: 'der Patientenlift',
        english: 'patient lift/hoist',
        pronunciation: 'pah-tsi-en-ten-lift',
        example: 'Der Patientenlift erleichtert den Transfer ins Bett.',
        category: 'care-equipment'
      },
      {
        id: 'commode-chair',
        german: 'der Toilettenstuhl',
        english: 'commode chair',
        pronunciation: 'toy-let-ten-shtool',
        example: 'Der Toilettenstuhl steht neben dem Bett bereit.',
        category: 'care-equipment'
      },
      {
        id: 'shower-chair',
        german: 'der Duschstuhl',
        english: 'shower chair',
        pronunciation: 'doosh-shtool',
        example: 'Mit dem Duschstuhl kann sie sicher duschen.',
        category: 'care-equipment'
      },
      {
        id: 'grab-bars',
        german: 'die Haltegriffe',
        english: 'grab bars',
        pronunciation: 'hal-teh-grif-feh',
        example: 'Die Haltegriffe im Bad bieten zusätzliche Sicherheit.',
        category: 'care-equipment'
      },
      {
        id: 'bed-table',
        german: 'der Bettisch',
        english: 'over-bed table',
        pronunciation: 'bet-tish',
        example: 'Das Essen wird auf dem Bettisch serviert.',
        category: 'care-equipment'
      },
      {
        id: 'anti-slip-mat',
        german: 'die Rutschfeste Matte',
        english: 'anti-slip mat',
        pronunciation: 'rooch-fes-teh mat-teh',
        example: 'Die rutschfeste Matte verhindert Stürze im Bad.',
        category: 'care-equipment'
      },
      {
        id: 'bed-rails',
        german: 'das Bettgitter',
        english: 'bed rails',
        pronunciation: 'bet-git-ter',
        example: 'Das Bettgitter schützt vor nächtlichen Stürzen.',
        category: 'care-equipment'
      }
    ]
  },
  {
    id: 'elderly-care',
    name: 'Altenpflege',
    description: 'Fachbegriffe aus der Altenpflege und Geriatrie',
    words: [
      {
        id: 'geriatrics',
        german: 'die Geriatrie',
        english: 'geriatrics',
        pronunciation: 'geh-ree-ah-tree',
        example: 'Er arbeitet seit zehn Jahren in der Geriatrie.',
        category: 'elderly-care'
      },
      {
        id: 'care-level',
        german: 'der Pflegegrad',
        english: 'care level',
        pronunciation: 'pfle-geh-grahd',
        example: 'Die Bewohnerin hat Pflegegrad 3.',
        category: 'elderly-care'
      },
      {
        id: 'bedsore',
        german: 'der Dekubitus',
        english: 'bedsore/pressure ulcer',
        pronunciation: 'deh-koo-bee-toos',
        example: 'Regelmäßige Positionswechsel beugen Dekubitus vor.',
        category: 'elderly-care'
      },
      {
        id: 'care-home',
        german: 'das Pflegeheim',
        english: 'nursing home',
        pronunciation: 'pfle-geh-hime',
        example: 'Seine Mutter lebt seit zwei Jahren im Pflegeheim.',
        category: 'elderly-care'
      },
      {
        id: 'positioning',
        german: 'die Lagerung',
        english: 'positioning',
        pronunciation: 'lah-geh-roong',
        example: 'Die korrekte Lagerung ist wichtig zur Dekubitusprophylaxe.',
        category: 'elderly-care'
      }
    ]
  },
  {
    id: 'dementia',
    name: 'Demenz',
    description: 'Begriffe im Zusammenhang mit Demenzerkrankungen',
    words: [
      {
        id: 'dementia',
        german: 'die Demenz',
        english: 'dementia',
        pronunciation: 'deh-ments',
        example: 'Seine Demenz schreitet langsam voran.',
        category: 'dementia'
      },
      {
        id: 'alzheimers',
        german: 'die Alzheimer-Krankheit',
        english: "Alzheimer's disease",
        pronunciation: 'alts-hai-mer krank-hite',
        example: 'Alzheimer ist die häufigste Form der Demenz.',
        category: 'dementia'
      },
      {
        id: 'disorientation',
        german: 'die Desorientierung',
        english: 'disorientation',
        pronunciation: 'dess-oh-ree-en-tee-roong',
        example: 'Zeitliche Desorientierung ist ein typisches Symptom.',
        category: 'dementia'
      },
      {
        id: 'memory-loss',
        german: 'der Gedächtnisverlust',
        english: 'memory loss',
        pronunciation: 'ge-decht-niss-fair-loost',
        example: 'Der Gedächtnisverlust betrifft besonders das Kurzzeitgedächtnis.',
        category: 'dementia'
      },
      {
        id: 'validation',
        german: 'die Validation',
        english: 'validation therapy',
        pronunciation: 'vah-lee-dah-tsee-ohn',
        example: 'Validation ist eine Methode im Umgang mit dementen Menschen.',
        category: 'dementia'
      }
    ]
  },
  {
    id: 'disability-care',
    name: 'Behindertenbetreuung',
    description: 'Begriffe aus der Betreuung von Menschen mit Behinderungen',
    words: [
      {
        id: 'disability',
        german: 'die Behinderung',
        english: 'disability',
        pronunciation: 'be-hin-deh-roong',
        example: 'Sie arbeitet in einer Einrichtung für Menschen mit geistiger Behinderung.',
        category: 'disability-care'
      },
      {
        id: 'supported-living',
        german: 'das betreute Wohnen',
        english: 'supported living',
        pronunciation: 'be-troy-teh voh-nen',
        example: 'Das betreute Wohnen fördert die Selbstständigkeit.',
        category: 'disability-care'
      },
      {
        id: 'inclusion',
        german: 'die Inklusion',
        english: 'inclusion',
        pronunciation: 'in-kloo-zee-ohn',
        example: 'Inklusion bedeutet gleichberechtigte Teilhabe am gesellschaftlichen Leben.',
        category: 'disability-care'
      },
      {
        id: 'aac',
        german: 'die Unterstützte Kommunikation',
        english: 'augmentative and alternative communication (AAC)',
        pronunciation: 'oon-ter-shtutz-teh kom-moo-nee-kah-tsee-ohn',
        example: 'Unterstützte Kommunikation hilft Menschen, die nicht sprechen können.',
        category: 'disability-care'
      },
      {
        id: 'caregiver',
        german: 'die Betreuungskraft',
        english: 'caregiver',
        pronunciation: 'be-troy-oonks-kraft',
        example: 'Die Betreuungskraft organisiert verschiedene Freizeitaktivitäten.',
        category: 'disability-care'
      }
    ]
  },
  {
    id: 'mobility',
    name: 'Mobilität',
    description: 'Begriffe zur Mobilität und Bewegungsförderung',
    words: [
      {
        id: 'wheelchair',
        german: 'der Rollstuhl',
        english: 'wheelchair',
        pronunciation: 'roll-shtool',
        example: 'Der Patient ist auf einen Rollstuhl angewiesen.',
        category: 'mobility'
      },
      {
        id: 'walker',
        german: 'der Rollator',
        english: 'walker/rollator',
        pronunciation: 'roll-ah-tor',
        example: 'Mit dem Rollator kann sie selbstständig einkaufen gehen.',
        category: 'mobility'
      },
      {
        id: 'cane',
        german: 'der Gehstock',
        english: 'walking cane',
        pronunciation: 'geh-shtock',
        example: 'Er benutzt einen Gehstock seit seiner Hüft-OP.',
        category: 'mobility'
      },
      {
        id: 'transfer',
        german: 'der Transfer',
        english: 'transfer (moving a patient)',
        pronunciation: 'trans-fair',
        example: 'Der Transfer vom Bett in den Rollstuhl erfordert Unterstützung.',
        category: 'mobility'
      },
      {
        id: 'fall-prevention',
        german: 'die Sturzprophylaxe',
        english: 'fall prevention',
        pronunciation: 'shturts-pro-fy-lax-eh',
        example: 'Sturzprophylaxe ist besonders bei älteren Menschen wichtig.',
        category: 'mobility'
      }
    ]
  },
  {
    id: 'general-care',
    name: 'Allgemeine Pflege',
    description: 'Grundlegende Pflegebegriffe für den Alltag',
    words: [
      {
        id: 'care-plan',
        german: 'der Pflegeplan',
        english: 'care plan',
        pronunciation: 'pfle-geh-plahn',
        example: 'Der Pflegeplan wird regelmäßig aktualisiert.',
        category: 'general-care'
      },
      {
        id: 'hygiene',
        german: 'die Körperpflege',
        english: 'personal hygiene',
        pronunciation: 'kur-per-pfle-geh',
        example: 'Die Körperpflege findet morgens nach dem Frühstück statt.',
        category: 'general-care'
      },
      {
        id: 'nutrition',
        german: 'die Ernährung',
        english: 'nutrition',
        pronunciation: 'air-neh-roong',
        example: 'Eine ausgewogene Ernährung ist wichtig für die Genesung.',
        category: 'general-care'
      },
      {
        id: 'incontinence',
        german: 'die Inkontinenz',
        english: 'incontinence',
        pronunciation: 'in-kon-tee-nents',
        example: 'Bei Inkontinenz gibt es verschiedene Hilfsmittel.',
        category: 'general-care'
      },
      {
        id: 'documentation',
        german: 'die Dokumentation',
        english: 'documentation',
        pronunciation: 'do-koo-men-tah-tsee-ohn',
        example: 'Die Pflegedokumentation muss sorgfältig geführt werden.',
        category: 'general-care'
      }
    ]
  },
  {
    id: 'communication',
    name: 'Kommunikation',
    description: 'Begriffe zur Kommunikation im Pflegekontext',
    words: [
      {
        id: 'empathy',
        german: 'die Empathie',
        english: 'empathy',
        pronunciation: 'em-pah-tee',
        example: 'Empathie ist eine wichtige Eigenschaft in der Pflege.',
        category: 'communication'
      },
      {
        id: 'active-listening',
        german: 'das aktive Zuhören',
        english: 'active listening',
        pronunciation: 'ak-tee-veh tsoo-huh-ren',
        example: 'Aktives Zuhören bedeutet, dem Patienten volle Aufmerksamkeit zu schenken.',
        category: 'communication'
      },
      {
        id: 'sign-language',
        german: 'die Gebärdensprache',
        english: 'sign language',
        pronunciation: 'ge-behr-den-shprah-che',
        example: 'Die Pflegekraft beherrscht Grundlagen der Gebärdensprache.',
        category: 'communication'
      },
      {
        id: 'picture-cards',
        german: 'die Bildkarten',
        english: 'picture cards',
        pronunciation: 'bild-kar-ten',
        example: 'Mit Bildkarten kann er seine Bedürfnisse ausdrücken.',
        category: 'communication'
      },
      {
        id: 'nonverbal',
        german: 'die nonverbale Kommunikation',
        english: 'nonverbal communication',
        pronunciation: 'non-vair-bah-leh kom-moo-nee-kah-tsee-ohn',
        example: 'Achten Sie auch auf nonverbale Kommunikation wie Gesichtsausdruck und Körperhaltung.',
        category: 'communication'
      }
    ]
  },
  {
    id: 'diagnoses',
    name: 'Diagnosen',
    description: 'Häufige medizinische Diagnosen und Krankheiten',
    words: [
      {
        id: 'appendicitis',
        german: 'die Appendizitis',
        english: 'appendicitis',
        pronunciation: 'ap-pen-di-tsee-tis',
        example: 'Der Patient wurde mit akuter Appendizitis eingeliefert.',
        category: 'diagnoses',
        notes: 'Entzündung des Wurmfortsatzes des Blinddarms'
      },
      {
        id: 'pneumonia',
        german: 'die Pneumonie',
        english: 'pneumonia',
        pronunciation: 'pnoy-mo-nee',
        example: 'Die Röntgenaufnahme bestätigt eine Pneumonie im rechten Lungenflügel.',
        category: 'diagnoses',
        notes: 'Lungenentzündung'
      },
      {
        id: 'myocardial-infarction',
        german: 'der Myokardinfarkt',
        english: 'myocardial infarction',
        pronunciation: 'myo-kard-in-farkt',
        example: 'Der Patient hat einen akuten Myokardinfarkt erlitten.',
        category: 'diagnoses',
        notes: 'Herzinfarkt'
      },
      {
        id: 'stroke',
        german: 'der Schlaganfall',
        english: 'stroke',
        pronunciation: 'schlahg-an-fahl',
        example: 'Bei Verdacht auf Schlaganfall sofort den Notarzt rufen.',
        category: 'diagnoses',
        notes: 'Auch: Apoplex, Stroke'
      },
      {
        id: 'fracture',
        german: 'die Fraktur',
        english: 'fracture',
        pronunciation: 'frak-toor',
        example: 'Die Patientin hat eine Fraktur des rechten Handgelenks.',
        category: 'diagnoses',
        notes: 'Knochenbruch'
      },
      {
        id: 'copd',
        german: 'COPD (Chronisch obstruktive Lungenerkrankung)',
        english: 'COPD (Chronic Obstructive Pulmonary Disease)',
        pronunciation: 'tzay-oh-pay-day',
        example: 'Der Patient leidet seit Jahren an COPD, auch "Raucherlunge" genannt.',
        category: 'diagnoses',
        notes: 'COPD = Chronisch obstruktive Lungenerkrankung, umgangssprachlich "Raucherlunge"',
        abbreviation: 'COPD'
      }
    ]
  },
  {
    id: 'abbreviations',
    name: 'Medizinische Abkürzungen',
    description: 'Häufig verwendete medizinische Abkürzungen im Klinikalltag',
    words: [
      {
        id: 'bp',
        german: 'RR (Riva-Rocci)',
        english: 'BP (blood pressure)',
        pronunciation: 'err-err',
        example: 'RR: 120/80 mmHg',
        category: 'abbreviations',
        notes: 'Blutdruck nach Riva-Rocci-Methode',
        abbreviation: 'RR'
      },
      {
        id: 'bs',
        german: 'BZ (Blutzucker)',
        english: 'BS (blood sugar)',
        pronunciation: 'bay-tzett',
        example: 'BZ vor dem Essen messen: 120 mg/dl.',
        category: 'abbreviations',
        notes: 'BZ = Blutzucker, Normalwerte nüchtern 70-100 mg/dl',
        abbreviation: 'BZ'
      },
      {
        id: 'ecg',
        german: 'EKG (Elektrokardiogramm)',
        english: 'ECG/EKG',
        pronunciation: 'ay-kah-gay',
        example: 'Das EKG zeigt eine Sinustachykardie.',
        category: 'abbreviations',
        notes: 'EKG = Elektrokardiogramm, zeichnet Herzaktivität auf',
        abbreviation: 'EKG'
      },
      {
        id: 'copd-abbr',
        german: 'COPD (Chronisch obstruktive Lungenerkrankung)',
        english: 'COPD',
        pronunciation: 'tzay-oh-pay-day',
        example: 'Patient mit COPD braucht regelmäßige Atemtherapie.',
        category: 'abbreviations',
        notes: 'COPD = "Raucherlunge", chronische Lungenkrankheit',
        abbreviation: 'COPD'
      },
      {
        id: 'icu',
        german: 'ITS (Intensivstation)',
        english: 'ICU',
        pronunciation: 'ee-tay-ess',
        example: 'Der Patient wird auf die ITS verlegt.',
        category: 'abbreviations',
        notes: 'ITS = Intensivstation, auch Intensivtherapiestation',
        abbreviation: 'ITS'
      },
      {
        id: 'spo2-abbr',
        german: 'SpO2 (Sauerstoffsättigung)',
        english: 'SpO2 (oxygen saturation)',
        pronunciation: 'ess-pay-oh-zwei',
        example: 'SpO2 liegt bei 98% - das ist normal.',
        category: 'abbreviations',
        notes: 'SpO2 = Sauerstoffsättigung im Blut, normal >95%',
        abbreviation: 'SpO2'
      }
    ]
  },
  {
    id: 'ward-routines',
    name: 'Stationsalltag',
    description: 'Begriffe und Abläufe im täglichen Stationsalltag',
    words: [
      {
        id: 'foley',
        german: 'der Dauerkatheter (DK)',
        english: 'indwelling catheter (Foley)',
        pronunciation: 'dow-er-ka-tay-ter',
        example: 'Der Patient hat einen DK seit drei Tagen.',
        category: 'ward-routines',
        notes: 'Blasenkatheter zur langfristigen Harnableitung',
        abbreviation: 'DK'
      },
      {
        id: 'iv-line',
        german: 'der periphere Venenkatheter (PVK)',
        english: 'peripheral venous catheter (IV line)',
        pronunciation: 'pay-vay-kah',
        example: 'Der PVK muss gewechselt werden.',
        category: 'ward-routines',
        notes: 'Venenzugang',
        abbreviation: 'PVK'
      },
      {
        id: 'wound-care',
        german: 'die Wundversorgung',
        english: 'wound care',
        pronunciation: 'voond-fair-zor-goong',
        example: 'Die Wundversorgung erfolgt zweimal täglich.',
        category: 'ward-routines'
      },
      {
        id: 'vital-signs',
        german: 'die Vitalzeichenkontrolle',
        english: 'vital signs monitoring',
        pronunciation: 'vee-tal-tsai-chen-kon-trol-eh',
        example: 'Bitte führen Sie eine Vitalzeichenkontrolle durch.',
        category: 'ward-routines'
      },
      {
        id: 'med-admin',
        german: 'die Medikamentengabe',
        english: 'medication administration',
        pronunciation: 'meh-dee-kah-men-ten-gah-beh',
        example: 'Die Medikamentengabe erfolgt nach Plan.',
        category: 'ward-routines'
      }
    ]
  },
  {
    id: 'equipment',
    name: 'Medizinische Geräte',
    description: 'Medizintechnische Geräte und Ausstattung für den Pflege- und Krankenhausbereich',
    words: [
      {
        id: 'blood-pressure-monitor',
        german: 'das Blutdruckmessgerät',
        english: 'blood pressure monitor',
        pronunciation: 'bloot-drook-mess-geh-rayt',
        example: 'Das Blutdruckmessgerät zeigt 140/90 mmHg an.',
        category: 'equipment'
      },
      {
        id: 'stethoscope',
        german: 'das Stethoskop',
        english: 'stethoscope',
        pronunciation: 'steh-toh-skohp',
        example: 'Mit dem Stethoskop kann man Herz- und Lungengeräusche abhören.',
        category: 'equipment'
      },
      {
        id: 'thermometer',
        german: 'das Thermometer',
        english: 'thermometer',
        pronunciation: 'ter-mo-meh-ter',
        example: 'Das digitale Thermometer ist hygienischer als ein Quecksilberthermometer.',
        category: 'equipment'
      },
      {
        id: 'hospital-bed',
        german: 'das Pflegebett',
        english: 'hospital/nursing bed',
        pronunciation: 'pfleg-eh-bet',
        example: 'Das elektrische Pflegebett lässt sich in verschiedene Positionen bringen.',
        category: 'equipment'
      },
      {
        id: 'iv-stand',
        german: 'der Infusionsständer',
        english: 'IV stand',
        pronunciation: 'in-foo-zee-ohns-shten-der',
        example: 'Bitte bringen Sie den Infusionsständer ans Bett.',
        category: 'equipment'
      },
      {
        id: 'pulse-oximeter',
        german: 'das Pulsoximeter',
        english: 'pulse oximeter',
        pronunciation: 'puls-ox-ee-meh-ter',
        example: 'Das Pulsoximeter misst die Sauerstoffsättigung im Blut.',
        category: 'equipment'
      },
      {
        id: 'syringe',
        german: 'die Spritze',
        english: 'syringe',
        pronunciation: 'shprit-ze',
        example: 'Die Spritze wird für die Insulininjektion verwendet.',
        category: 'equipment'
      },
      {
        id: 'gloves',
        german: 'die Handschuhe',
        english: 'gloves',
        pronunciation: 'hand-shoo-eh',
        example: 'Bitte ziehen Sie vor dem Eingriff sterile Handschuhe an.',
        category: 'equipment',
        notes: 'Usually used in plural form'
      },
      {
        id: 'wheelchair-equip',
        german: 'der Rollstuhl',
        english: 'wheelchair',
        pronunciation: 'roll-shtool',
        example: 'Der Patient benötigt einen Rollstuhl für den Transport.',
        category: 'equipment'
      },
      {
        id: 'bandage',
        german: 'die Bandage',
        english: 'bandage',
        pronunciation: 'ban-dah-ge',
        example: 'Die Bandage unterstützt das verletzte Gelenk.',
        category: 'equipment'
      }
    ]
  },
  {
    id: 'documentation',
    name: 'Dokumentation',
    description: 'Typische Formulierungen für die Pflegedokumentation',
    words: [
      {
        id: 'doc-admission',
        german: 'Patient wurde aufgenommen mit...',
        english: 'Patient was admitted with...',
        pronunciation: 'pah-tsi-ent vur-deh ouf-geh-nom-men mit',
        example: 'Patient wurde aufgenommen mit akuten Bauchschmerzen.',
        category: 'documentation'
      },
      {
        id: 'doc-orientation',
        german: 'Patient ist zeitlich/örtlich/zur Person orientiert.',
        english: 'Patient is oriented to time/place/person.',
        pronunciation: 'pah-tsi-ent ist tseit-lich/ört-lich/tsoor pair-sohn ori-en-teert',
        example: 'Patient ist zeitlich, örtlich und zur Person voll orientiert.',
        category: 'documentation'
      },
      {
        id: 'doc-mobility',
        german: 'Patient ist selbstständig mobil.',
        english: 'Patient is independently mobile.',
        pronunciation: 'pah-tsi-ent ist selbst-sten-dig mo-beel',
        example: 'Patient ist selbstständig mobil mit Gehstock.',
        category: 'documentation'
      },
      {
        id: 'doc-wound',
        german: 'Wunde ist reizlos, ohne Sekretion.',
        english: 'Wound is clean, without secretion.',
        pronunciation: 'voon-deh ist reits-lohs, oh-neh seh-kreh-tsi-ohn',
        example: 'OP-Wunde ist reizlos, ohne Sekretion, Nahtmaterial in situ.',
        category: 'documentation'
      },
      {
        id: 'doc-medication',
        german: 'Medikamente wurden laut Anordnung verabreicht.',
        english: 'Medications were administered as prescribed.',
        pronunciation: 'meh-dee-kah-men-teh voor-den lout an-ord-nung fair-ab-reicht',
        example: 'Medikamente wurden laut Anordnung verabreicht, ohne Komplikationen.',
        category: 'documentation'
      }
    ]
  }
];

export default vocabularyCategories;
