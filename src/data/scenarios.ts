
export interface DialogueLine {
  speaker: 'user' | 'patient' | 'doctor' | 'colleague';
  text: string;
  translation?: string;
  audio?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'patient-care' | 'emergency' | 'documentation' | 'teamwork';
  tags: string[];
  completed?: boolean;
  progress?: number;
  dialogue: DialogueLine[];
  vocabularyIds: string[];
}

const scenarios: Scenario[] = [
  {
    id: 'admission',
    title: 'Patientenaufnahme',
    description: 'Aufnahme eines neuen Patienten auf der Station',
    difficulty: 'beginner',
    category: 'patient-care',
    tags: ['aufnahme', 'anamnese', 'pflege'],
    progress: 0,
    dialogue: [
      {
        speaker: 'user',
        text: 'Guten Tag, Herr Müller. Ich bin Schwester Anna und werde mich heute um Sie kümmern.',
        translation: 'Good day, Mr. Müller. I am Nurse Anna and I will be taking care of you today.'
      },
      {
        speaker: 'patient',
        text: 'Hallo. Ich bin froh, dass ich endlich hier bin. Ich habe seit Tagen starke Schmerzen.',
        translation: 'Hello. I am glad that I am finally here. I have been in severe pain for days.'
      },
      {
        speaker: 'user',
        text: 'Das tut mir leid zu hören. Ich werde ein paar Fragen stellen, um Ihre Daten aufzunehmen. Können Sie mir sagen, wann die Schmerzen begonnen haben?',
        translation: 'I am sorry to hear that. I will ask a few questions to take your information. Can you tell me when the pain started?'
      },
      {
        speaker: 'patient',
        text: 'Die Schmerzen haben vor ungefähr einer Woche angefangen, aber seit gestern sind sie unerträglich geworden.',
        translation: 'The pain started about a week ago, but since yesterday it has become unbearable.'
      }
    ],
    vocabularyIds: ['vital-signs', 'pain-scale', 'admission']
  },
  {
    id: 'medication',
    title: 'Medikamentenverabreichung',
    description: 'Erklärung der Medikamenteneinnahme und möglicher Nebenwirkungen',
    difficulty: 'intermediate',
    category: 'patient-care',
    tags: ['medikamente', 'pflege', 'patientenaufklärung'],
    progress: 0,
    dialogue: [
      {
        speaker: 'user',
        text: 'Frau Schmidt, ich bringe Ihnen Ihre Morgenmedikation. Haben Sie schon gefrühstückt?',
        translation: 'Mrs. Schmidt, I am bringing you your morning medication. Have you had breakfast already?'
      },
      {
        speaker: 'patient',
        text: 'Ja, ich habe vor etwa 20 Minuten gefrühstückt. Was sind das für Tabletten?',
        translation: 'Yes, I had breakfast about 20 minutes ago. What kind of pills are these?'
      },
      {
        speaker: 'user',
        text: 'Das ist Ihr Blutdruckmedikament und ein Schmerzmittel. Das Blutdruckmedikament müssen Sie jeden Morgen einnehmen, das Schmerzmittel nur bei Bedarf.',
        translation: 'This is your blood pressure medication and a painkiller. You must take the blood pressure medication every morning, the painkiller only as needed.'
      },
      {
        speaker: 'patient',
        text: 'Gibt es Nebenwirkungen, auf die ich achten sollte?',
        translation: 'Are there side effects I should watch out for?'
      }
    ],
    vocabularyIds: ['medications', 'side-effects', 'administration']
  },
  {
    id: 'emergency',
    title: 'Notfallsituation',
    description: 'Umgang mit einem Patienten mit akuten Brustschmerzen',
    difficulty: 'advanced',
    category: 'emergency',
    tags: ['notfall', 'erstversorgung', 'teamarbeit'],
    progress: 0,
    dialogue: [
      {
        speaker: 'patient',
        text: 'Schwester! Ich bekomme... keine Luft... Schmerzen in der Brust!',
        translation: 'Nurse! I can\'t... breathe... chest pain!'
      },
      {
        speaker: 'user',
        text: 'Herr Weber, ich bin hier. Versuchen Sie ruhig zu atmen. Ich rufe sofort den Notarzt. Seit wann haben Sie die Schmerzen?',
        translation: 'Mr. Weber, I am here. Try to breathe calmly. I will call the emergency doctor immediately. Since when have you had the pain?'
      },
      {
        speaker: 'patient',
        text: 'Seit... etwa... 10 Minuten... Es drückt... so stark...',
        translation: 'For... about... 10 minutes... It\'s pressing... so hard...'
      },
      {
        speaker: 'user',
        text: 'Ich gebe Ihnen jetzt Sauerstoff und nehme Ihre Vitalzeichen. Meine Kollegin ruft bereits den Notarzt. Können Sie diese Tablette unter die Zunge legen?',
        translation: 'I will give you oxygen now and take your vital signs. My colleague is already calling the emergency doctor. Can you place this tablet under your tongue?'
      }
    ],
    vocabularyIds: ['emergency', 'vital-signs', 'cardiac']
  },
  {
    id: 'handover',
    title: 'Schichtübergabe',
    description: 'Übergabe der Patienteninformationen an die nächste Schicht',
    difficulty: 'intermediate',
    category: 'teamwork',
    tags: ['übergabe', 'dokumentation', 'teamarbeit'],
    progress: 0,
    dialogue: [
      {
        speaker: 'user',
        text: 'Hallo Maria, ich gebe dir die Übergabe für Zimmer 201 bis 210. In Zimmer 203 liegt Herr Fischer, 68 Jahre alt, zweiter Tag nach Hüft-OP.',
        translation: 'Hello Maria, I am handing over rooms 201 to 210 to you. In room 203 is Mr. Fischer, 68 years old, second day after hip surgery.'
      },
      {
        speaker: 'colleague',
        text: 'Wie waren seine Vitalzeichen bei der letzten Kontrolle?',
        translation: 'How were his vital signs at the last check?'
      },
      {
        speaker: 'user',
        text: 'Alle Werte stabil, Blutdruck 130/85, Puls 72, Temperatur 36,8. Er klagt über mäßige Schmerzen an der Operationsstelle, hat um 14 Uhr Ibuprofen bekommen.',
        translation: 'All values stable, blood pressure 130/85, pulse 72, temperature 36.8. He complains of moderate pain at the operation site, received ibuprofen at 2 pm.'
      },
      {
        speaker: 'colleague',
        text: 'Hat er heute schon mobilisiert? Und wie sieht die Wunde aus?',
        translation: 'Has he mobilized today? And how does the wound look?'
      }
    ],
    vocabularyIds: ['handover', 'vital-signs', 'postoperative']
  }
];

export default scenarios;
