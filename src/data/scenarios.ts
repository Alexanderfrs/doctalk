
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
  category: 'patient-care' | 'emergency' | 'documentation' | 'teamwork' | 'elderly-care' | 'disability-care';
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
    vocabularyIds: ['vital-signs', 'pain-scale', 'general-care']
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
    vocabularyIds: ['medications', 'side-effects', 'general-care']
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
  },
  // New scenarios for elderly care
  {
    id: 'dementia-care',
    title: 'Demenzpflege',
    description: 'Betreuung eines Bewohners mit Demenz im Pflegeheim',
    difficulty: 'intermediate',
    category: 'elderly-care',
    tags: ['demenz', 'altenpflege', 'kommunikation'],
    progress: 0,
    dialogue: [
      {
        speaker: 'user',
        text: 'Guten Morgen, Frau Becker. Wie haben Sie geschlafen?',
        translation: 'Good morning, Mrs. Becker. How did you sleep?'
      },
      {
        speaker: 'patient',
        text: 'Wer sind Sie? Ich will nach Hause! Wo ist mein Mann?',
        translation: 'Who are you? I want to go home! Where is my husband?'
      },
      {
        speaker: 'user',
        text: 'Ich bin Pflegerin Lisa, Frau Becker. Ich helfe Ihnen heute. Ihr Mann kommt später zu Besuch. Möchten Sie erstmal frühstücken?',
        translation: 'I am Caregiver Lisa, Mrs. Becker. I am helping you today. Your husband will visit later. Would you like to have breakfast first?'
      },
      {
        speaker: 'patient',
        text: 'Mein Mann... ja, er kommt immer zum Frühstück. Ist der Kaffee schon fertig?',
        translation: 'My husband... yes, he always comes for breakfast. Is the coffee ready yet?'
      }
    ],
    vocabularyIds: ['elderly-care', 'dementia', 'general-care']
  },
  {
    id: 'mobility-assistance',
    title: 'Mobilitätshilfe',
    description: 'Unterstützung eines älteren Patienten bei der Mobilisierung',
    difficulty: 'beginner',
    category: 'elderly-care',
    tags: ['mobilität', 'altenpflege', 'sturz-prävention'],
    progress: 0,
    dialogue: [
      {
        speaker: 'user',
        text: 'Herr Schmidt, wir sollten heute ein wenig spazieren gehen. Wie fühlen sich Ihre Beine an?',
        translation: 'Mr. Schmidt, we should go for a little walk today. How do your legs feel?'
      },
      {
        speaker: 'patient',
        text: 'Meine Knie schmerzen etwas, aber ich würde gerne aufstehen. Ich sitze schon den ganzen Tag.',
        translation: 'My knees hurt a little, but I would like to get up. I have been sitting all day.'
      },
      {
        speaker: 'user',
        text: 'Gut, ich helfe Ihnen. Nehmen Sie Ihren Gehstock und stützen Sie sich auf meinen Arm. Wir stehen langsam auf, in Ihrem Tempo.',
        translation: 'Good, I will help you. Take your walking stick and lean on my arm. We will stand up slowly, at your pace.'
      },
      {
        speaker: 'patient',
        text: 'Danke, das ist sehr hilfreich. Wohin gehen wir?',
        translation: 'Thank you, that is very helpful. Where are we going?'
      }
    ],
    vocabularyIds: ['mobility', 'elderly-care', 'general-care']
  },
  // New scenario for disability care
  {
    id: 'communication-disability',
    title: 'Kommunikation bei geistiger Behinderung',
    description: 'Unterstützung und Kommunikation mit Bewohnern mit geistiger Behinderung',
    difficulty: 'intermediate',
    category: 'disability-care',
    tags: ['behindertenbetreuung', 'kommunikation', 'unterstützte-kommunikation'],
    progress: 0,
    dialogue: [
      {
        speaker: 'user',
        text: 'Hallo Thomas, möchtest du heute zum Gruppenfrühstück kommen oder in deinem Zimmer essen?',
        translation: 'Hello Thomas, would you like to come to the group breakfast today or eat in your room?'
      },
      {
        speaker: 'patient',
        text: '...',
        translation: '...'
      },
      {
        speaker: 'user',
        text: 'Hier sind die Bildkarten. Kannst du mir zeigen, was du möchtest? Hier ist das Bild für "Gruppenfrühstück" und hier für "im Zimmer essen".',
        translation: 'Here are the picture cards. Can you show me what you want? Here is the picture for "group breakfast" and here for "eating in the room".'
      },
      {
        speaker: 'patient',
        text: '...(zeigt auf Gruppenfrühstück)',
        translation: '...(points to group breakfast)'
      }
    ],
    vocabularyIds: ['disability-care', 'communication', 'general-care']
  }
];

export default scenarios;
