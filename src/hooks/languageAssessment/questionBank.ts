import { Question, QuestionBank } from './types';

// A1 level questions
const a1Questions: Question[] = [
  {
    id: 'a1_1',
    text: 'Wie heißt du?',
    options: ['Ich bin 25 Jahre alt.', 'Ich heiße Maria.', 'Ich komme aus Deutschland.', 'Ich wohne in Berlin.'],
    correctAnswer: 'Ich heiße Maria.',
    difficulty: 'A1',
    topic: 'personal_information'
  },
  {
    id: 'a1_2',
    text: 'Was ist das?',
    options: ['Das ist ein Buch.', 'Ich lese ein Buch.', 'Das Buch ist rot.', 'Ich mag Bücher.'],
    correctAnswer: 'Das ist ein Buch.',
    difficulty: 'A1',
    topic: 'objects'
  },
  {
    id: 'a1_3',
    text: 'Wo wohnst du?',
    options: ['Ich bin 30 Jahre alt.', 'Ich wohne in München.', 'Ich heiße Thomas.', 'Ich komme aus Österreich.'],
    correctAnswer: 'Ich wohne in München.',
    difficulty: 'A1',
    topic: 'personal_information'
  },
  {
    id: 'a1_4',
    text: 'Wie spät ist es?',
    options: ['Es ist Montag.', 'Es ist sonnig.', 'Es ist 10 Uhr.', 'Es ist warm.'],
    correctAnswer: 'Es ist 10 Uhr.',
    difficulty: 'A1',
    topic: 'time'
  },
  {
    id: 'a1_5',
    text: 'Welche Farbe hat der Apfel?',
    options: ['Der Apfel ist groß.', 'Der Apfel ist süß.', 'Der Apfel ist rot.', 'Der Apfel ist reif.'],
    correctAnswer: 'Der Apfel ist rot.',
    difficulty: 'A1',
    topic: 'colors'
  },
  {
    id: 'a1_healthcare_1',
    text: 'Wo tut es weh?',
    options: ['Hier tut es weh.', 'Ich bin krank.', 'Ich brauche Medikamente.', 'Ich gehe zum Arzt.'],
    correctAnswer: 'Hier tut es weh.',
    difficulty: 'A1',
    topic: 'healthcare'
  },
  {
    id: 'a1_healthcare_2',
    text: 'Was ist das auf Deutsch?',
    image: 'https://cdn-icons-png.flaticon.com/512/4486/4486026.png',
    options: ['Eine Tablette', 'Ein Pflaster', 'Eine Spritze', 'Ein Thermometer'],
    correctAnswer: 'Eine Tablette',
    difficulty: 'A1',
    topic: 'healthcare'
  }
];

// A2 level questions
const a2Questions: Question[] = [
  {
    id: 'a2_1',
    text: 'Was hast du gestern gemacht?',
    options: ['Ich gehe ins Kino.', 'Ich bin ins Kino gegangen.', 'Ich werde ins Kino gehen.', 'Ich würde gerne ins Kino gehen.'],
    correctAnswer: 'Ich bin ins Kino gegangen.',
    difficulty: 'A2',
    topic: 'past_tense'
  },
  {
    id: 'a2_2',
    text: 'Wie kommst du zur Arbeit?',
    options: ['Mit dem Auto.', 'In einer Stunde.', 'Seit zwei Jahren.', 'Bei gutem Wetter.'],
    correctAnswer: 'Mit dem Auto.',
    difficulty: 'A2',
    topic: 'transportation'
  },
  {
    id: 'a2_3',
    text: 'Wie war das Wetter gestern?',
    options: ['Das Wetter wird schön sein.', 'Das Wetter ist schön.', 'Das Wetter war schön.', 'Das Wetter wäre schön.'],
    correctAnswer: 'Das Wetter war schön.',
    difficulty: 'A2',
    topic: 'weather'
  },
  {
    id: 'a2_4',
    text: 'Wann hast du Geburtstag?',
    options: ['Am 15. Mai.', 'Ich bin 25 Jahre alt.', 'Seit 1995.', 'In zwei Wochen.'],
    correctAnswer: 'Am 15. Mai.',
    difficulty: 'A2',
    topic: 'dates'
  },
  {
    id: 'a2_5',
    text: 'Was isst du zum Frühstück?',
    options: ['Um 7 Uhr.', 'In der Küche.', 'Brot mit Marmelade.', 'Mit meiner Familie.'],
    correctAnswer: 'Brot mit Marmelade.',
    difficulty: 'A2',
    topic: 'food'
  },
  {
    id: 'a2_healthcare_1',
    text: 'Wie oft müssen Sie die Tabletten einnehmen?',
    options: ['Einmal täglich.', 'Zweimal wöchentlich.', 'Dreimal monatlich.', 'Viermal jährlich.'],
    correctAnswer: 'Einmal täglich.',
    difficulty: 'A2',
    topic: 'healthcare'
  },
  {
    id: 'a2_healthcare_2',
    text: 'Was ist die korrekte Antwort auf die Frage: "Haben Sie Allergien?"',
    options: ['Ja, ich bin allergisch gegen Penicillin.', 'Mein Blutdruck ist normal.', 'Ich habe Fieber.', 'Ich esse dreimal am Tag.'],
    correctAnswer: 'Ja, ich bin allergisch gegen Penicillin.',
    difficulty: 'A2',
    topic: 'healthcare'
  }
];

// B1 level questions
const b1Questions: Question[] = [
  {
    id: 'b1_1',
    text: 'Warum lernst du Deutsch?',
    options: [
      'Weil ich in Deutschland arbeiten möchte.',
      'Obwohl ich in Deutschland arbeite.',
      'Damit ich in Deutschland arbeite.',
      'Als ich in Deutschland gearbeitet habe.'
    ],
    correctAnswer: 'Weil ich in Deutschland arbeiten möchte.',
    difficulty: 'B1',
    topic: 'reasons'
  },
  {
    id: 'b1_2',
    text: 'Was würdest du tun, wenn du im Lotto gewinnen würdest?',
    options: [
      'Ich habe viel Geld ausgegeben.',
      'Ich gebe viel Geld aus.',
      'Ich werde viel Geld ausgeben.',
      'Ich würde viel Geld ausgeben.'
    ],
    correctAnswer: 'Ich würde viel Geld ausgeben.',
    difficulty: 'B1',
    topic: 'conditional'
  },
  {
    id: 'b1_3',
    text: 'Wie lange wohnst du schon in Deutschland?',
    options: [
      'Nächstes Jahr ziehe ich nach Deutschland.',
      'Ich wohne seit drei Jahren in Deutschland.',
      'Ich habe drei Jahre in Deutschland gewohnt.',
      'In drei Jahren werde ich in Deutschland wohnen.'
    ],
    correctAnswer: 'Ich wohne seit drei Jahren in Deutschland.',
    difficulty: 'B1',
    topic: 'duration'
  },
  {
    id: 'b1_4',
    text: 'Welche Aussage verwendet den Konjunktiv II korrekt?',
    options: [
      'Wenn ich Zeit habe, gehe ich ins Kino.',
      'Wenn ich Zeit hätte, würde ich ins Kino gehen.',
      'Als ich Zeit hatte, ging ich ins Kino.',
      'Weil ich Zeit hatte, ging ich ins Kino.'
    ],
    correctAnswer: 'Wenn ich Zeit hätte, würde ich ins Kino gehen.',
    difficulty: 'B1',
    topic: 'grammar'
  },
  {
    id: 'b1_5',
    text: 'Was bedeutet der Ausdruck "die Daumen drücken"?',
    options: [
      'jemanden ärgern',
      'jemandem Glück wünschen',
      'etwas vergessen',
      'viel arbeiten'
    ],
    correctAnswer: 'jemandem Glück wünschen',
    difficulty: 'B1',
    topic: 'idioms'
  },
  {
    id: 'b1_healthcare_1',
    text: 'Ein Patient klagt über Schmerzen. Was ist die beste Antwort?',
    options: [
      'Können Sie mir bitte sagen, wo genau der Schmerz ist und wie stark er ist?',
      'Haben Sie heute gut geschlafen?',
      'Möchten Sie etwas essen?',
      'Wie alt sind Sie?'
    ],
    correctAnswer: 'Können Sie mir bitte sagen, wo genau der Schmerz ist und wie stark er ist?',
    difficulty: 'B1',
    topic: 'healthcare'
  },
  {
    id: 'b1_healthcare_2',
    text: 'Wie lautet die korrekte Anweisung für eine Blutabnahme?',
    options: [
      'Bitte ziehen Sie Ihre Jacke aus.',
      'Bitte machen Sie Ihren Arm frei und ballen Sie die Hand zur Faust.',
      'Bitte essen Sie vor der Untersuchung nichts.',
      'Bitte trinken Sie viel Wasser.'
    ],
    correctAnswer: 'Bitte machen Sie Ihren Arm frei und ballen Sie die Hand zur Faust.',
    difficulty: 'B1',
    topic: 'healthcare'
  }
];

// B2 level questions
const b2QuestionsAdditions: Question[] = [
  {
    id: 'b2_medical_1',
    text: 'Was bedeutet die Abkürzung "DK" im klinischen Alltag?',
    options: ['Dokumentation', 'Dauerkatheter', 'Druckkontrolle', 'Diabeteskontrollen'],
    correctAnswer: 'Dauerkatheter',
    difficulty: 'B2',
    topic: 'healthcare'
  },
  {
    id: 'b2_medical_2',
    text: 'Welches der folgenden medizinischen Geräte wird für die künstliche Beatmung eingesetzt?',
    options: ['Infusionspumpe', 'Defibrillator', 'Beatmungsgerät', 'Endoskop'],
    correctAnswer: 'Beatmungsgerät',
    difficulty: 'B2',
    topic: 'healthcare'
  },
  {
    id: 'b2_medical_3',
    text: 'Was ist die korrekte Übersetzung für "Appendizitis"?',
    options: ['Mandelentzündung', 'Blinddarmentzündung', 'Lungenentzündung', 'Nierenentzündung'],
    correctAnswer: 'Blinddarmentzündung',
    difficulty: 'B2',
    topic: 'healthcare'
  }
];

const b2Questions = [
  {
    id: 'b2_1',
    text: 'Welche dieser Aussagen verwendet das Passiv korrekt?',
    options: [
      'Der Brief wurde gestern geschrieben.',
      'Der Brief hat gestern geschrieben.',
      'Der Brief wurde gestern schreiben.',
      'Der Brief ist gestern geschrieben.'
    ],
    correctAnswer: 'Der Brief wurde gestern geschrieben.',
    difficulty: 'B2',
    topic: 'passive_voice'
  },
  {
    id: 'b2_2',
    text: 'Welches Wort passt nicht zu den anderen?',
    options: ['beanspruchen', 'beanstanden', 'beantragen', 'beantworten'],
    correctAnswer: 'beanstanden',
    difficulty: 'B2',
    topic: 'vocabulary'
  },
  {
    id: 'b2_3',
    text: 'Welcher Satz enthält einen korrekten Relativsatz?',
    options: [
      'Der Mann, der ich gestern getroffen habe, ist Arzt.',
      'Der Mann, den ich gestern getroffen habe, ist Arzt.',
      'Der Mann, dessen ich gestern getroffen habe, ist Arzt.',
      'Der Mann, dem ich gestern getroffen habe, ist Arzt.'
    ],
    correctAnswer: 'Der Mann, den ich gestern getroffen habe, ist Arzt.',
    difficulty: 'B2',
    topic: 'relative_clauses'
  },
  {
    id: 'b2_4',
    text: 'Welche Präposition passt? "Ich freue mich ___ deinen Besuch."',
    options: ['über', 'auf', 'für', 'um'],
    correctAnswer: 'auf',
    difficulty: 'B2',
    topic: 'prepositions'
  },
  {
    id: 'b2_5',
    text: 'Was bedeutet die Redewendung "Hals- und Beinbruch"?',
    options: [
      'eine schwere Verletzung',
      'viel Glück',
      'eine Warnung vor Gefahr',
      'eine unheilbare Krankheit'
    ],
    correctAnswer: 'viel Glück',
    difficulty: 'B2',
    topic: 'idioms'
  },
  {
    id: 'b2_healthcare_1',
    text: 'Welcher Ausdruck gehört nicht zur medizinischen Fachsprache?',
    options: ['Anamnese', 'Diagnose', 'Therapie', 'Rezension'],
    correctAnswer: 'Rezension',
    difficulty: 'B2',
    topic: 'healthcare'
  },
  {
    id: 'b2_healthcare_2',
    text: 'Wie erklären Sie einem Patienten, dass er nüchtern zur Untersuchung kommen soll?',
    options: [
      'Sie müssen vor der Untersuchung 8 Stunden auf Essen und Trinken verzichten.',
      'Sie dürfen vor der Untersuchung keinen Alkohol trinken.',
      'Sie sollten vor der Untersuchung viel Wasser trinken.',
      'Sie müssen vor der Untersuchung duschen.'
    ],
    correctAnswer: 'Sie müssen vor der Untersuchung 8 Stunden auf Essen und Trinken verzichten.',
    difficulty: 'B2',
    topic: 'healthcare'
  },
  ...b2QuestionsAdditions
];

// C1 level questions
const c1QuestionsAdditions: Question[] = [
  {
    id: 'c1_medical_1',
    text: 'Was bedeutet die Abkürzung "COPD"?',
    options: [
      'Chronisch obstruktive Prostataerkrankung',
      'Chronisch obstruktive Lungenerkrankung',
      'Chronische Osteoporose mit peripherer Deformation',
      'Chronische Otitis mit pulmonaler Disposition'
    ],
    correctAnswer: 'Chronisch obstruktive Lungenerkrankung',
    difficulty: 'C1',
    topic: 'healthcare'
  },
  {
    id: 'c1_medical_2',
    text: 'Was bedeuten die Abkürzungen "RR" und "BZ" in der Patientendokumentation?',
    options: [
      'Rheumafaktor und Blutzucker',
      'Blutdruck und Blutzucker',
      'Rückenreflex und Blutzucker',
      'Blutdruck und Blutungszeit'
    ],
    correctAnswer: 'Blutdruck und Blutzucker',
    difficulty: 'C1',
    topic: 'healthcare'
  },
  {
    id: 'c1_medical_3',
    text: 'Welche dieser Formulierungen würde man in einer professionellen Pflegedokumentation verwenden?',
    options: [
      'Patient kann nicht laufen.',
      'Patient braucht viel Hilfe.',
      'Patient ist bettlägerig.',
      'Patient ist nur mit Hilfsmitteln und unter Aufsicht mobilisierbar.'
    ],
    correctAnswer: 'Patient ist nur mit Hilfsmitteln und unter Aufsicht mobilisierbar.',
    difficulty: 'C1',
    topic: 'healthcare'
  }
];

const c1Questions = [
  {
    id: 'c1_1',
    text: 'Welche dieser Formulierungen ist für einen formellen Brief am besten geeignet?',
    options: [
      'Ich freue mich auf deine Antwort.',
      'Ich freue mich auf Ihre Antwort.',
      'Ich warte auf deine Antwort.',
      'Ich erwarte deine Antwort.'
    ],
    correctAnswer: 'Ich freue mich auf Ihre Antwort.',
    difficulty: 'C1',
    topic: 'formal_language'
  },
  {
    id: 'c1_2',
    text: 'Welcher Satz enthält einen korrekten Konjunktiv I in der indirekten Rede?',
    options: [
      'Er sagt, dass er krank ist.',
      'Er sagt, dass er krank sei.',
      'Er sagt, dass er krank wäre.',
      'Er sagt, dass er krank würde.'
    ],
    correctAnswer: 'Er sagt, dass er krank sei.',
    difficulty: 'C1',
    topic: 'subjunctive'
  },
  {
    id: 'c1_3',
    text: 'Welches Wort ist ein Synonym für "etw. berücksichtigen"?',
    options: [
      'etw. beeinflussen',
      'etw. beeinträchtigen',
      'etw. beachten',
      'etw. bearbeiten'
    ],
    correctAnswer: 'etw. beachten',
    difficulty: 'C1',
    topic: 'synonyms'
  },
  {
    id: 'c1_4',
    text: 'Vervollständigen Sie das Sprichwort: "Wer A sagt, muss auch ..."',
    options: ['Z sagen', 'B sagen', 'C sagen', 'nein sagen'],
    correctAnswer: 'B sagen',
    difficulty: 'C1',
    topic: 'proverbs'
  },
  {
    id: 'c1_5',
    text: 'Welcher Satz verwendet den Genitiv korrekt?',
    options: [
      'Trotz dem schlechten Wetter gingen wir spazieren.',
      'Wegen dem Regen blieben wir zu Hause.',
      'Aufgrund des starken Regens wurde das Fest abgesagt.',
      'Während dem Konzert schlief er ein.'
    ],
    correctAnswer: 'Aufgrund des starken Regens wurde das Fest abgesagt.',
    difficulty: 'C1',
    topic: 'cases'
  },
  {
    id: 'c1_healthcare_1',
    text: 'Welcher der folgenden Begriffe beschreibt keine Erkrankung des Herz-Kreislauf-Systems?',
    options: [
      'Hypertonie',
      'Tachykardie',
      'Myokardinfarkt',
      'Pneumonie'
    ],
    correctAnswer: 'Pneumonie',
    difficulty: 'C1',
    topic: 'healthcare'
  },
  {
    id: 'c1_healthcare_2',
    text: 'Wie würden Sie einem Patienten erklären, dass er ein MRT benötigt?',
    options: [
      'Wir müssen Ihr Blut untersuchen, um die Ursache festzustellen.',
      'Wir müssen eine Röntgenaufnahme machen, um einen Knochenbruch auszuschließen.',
      'Wir benötigen eine bildgebende Untersuchung mit einem Magnetresonanztomographen, um detaillierte Bilder Ihres Gewebes zu erhalten.',
      'Wir werden Ihre Haut mit Ultraschall untersuchen.'
    ],
    correctAnswer: 'Wir benötigen eine bildgebende Untersuchung mit einem Magnetresonanztomographen, um detaillierte Bilder Ihres Gewebes zu erhalten.',
    difficulty: 'C1',
    topic: 'healthcare'
  },
  ...c1QuestionsAdditions
];

// C2 level questions
const c2QuestionsAdditions: Question[] = [
  {
    id: 'c2_medical_1',
    text: 'Was ist ein "Stroke Patient"?',
    options: [
      'Ein Patient mit Schlaganfall',
      'Ein Patient mit Hitzschlag',
      'Ein Patient mit Herzinfarkt',
      'Ein Patient mit Lähmungserscheinungen'
    ],
    correctAnswer: 'Ein Patient mit Schlaganfall',
    difficulty: 'C2',
    topic: 'healthcare'
  },
  {
    id: 'c2_medical_2',
    text: 'Welche dieser Aussagen zur Dokumentation einer Wunde ist am präzisesten?',
    options: [
      'Die Wunde sieht gut aus.',
      'Die Wunde ist 2x3 cm groß, mit seröser Sekretion, Wundränder leicht gerötet.',
      'Die Wunde hat sich verbessert.',
      'Die Wunde ist groß und rot.'
    ],
    correctAnswer: 'Die Wunde ist 2x3 cm groß, mit seröser Sekretion, Wundränder leicht gerötet.',
    difficulty: 'C2',
    topic: 'healthcare'
  }
];

const c2Questions = [
  {
    id: 'c2_1',
    text: 'Welches dieser Wörter ist ein Fremdwort lateinischen Ursprungs?',
    options: ['Fenster', 'Philosophie', 'Kindergarten', 'Rucksack'],
    correctAnswer: 'Philosophie',
    difficulty: 'C2',
    topic: 'etymology'
  },
  {
    id: 'c2_2',
    text: 'Welche stilistische Figur wird im folgenden Satz verwendet? "Die Sonne lacht vom Himmel."',
    options: ['Metapher', 'Personifikation', 'Alliteration', 'Euphemismus'],
    correctAnswer: 'Personifikation',
    difficulty: 'C2',
    topic: 'stylistic_devices'
  },
  {
    id: 'c2_3',
    text: 'Welcher dieser Ausdrücke ist ein Pleonasmus?',
    options: [
      'weißer Schimmel',
      'dunkle Nacht',
      'lautes Geräusch',
      'kalter Winter'
    ],
    correctAnswer: 'weißer Schimmel',
    difficulty: 'C2',
    topic: 'rhetoric'
  },
  {
    id: 'c2_4',
    text: 'Welches Wort hat eine andere etymologische Herkunft als die anderen?',
    options: ['Fenster', 'Mauer', 'Ziegel', 'Wand'],
    correctAnswer: 'Fenster',
    difficulty: 'C2',
    topic: 'etymology'
  },
  {
    id: 'c2_5',
    text: 'Was bedeutet der Ausdruck "in medias res gehen"?',
    options: [
      'sich in die Mitte stellen',
      'direkt zur Sache kommen',
      'Streit vermeiden',
      'eine Pause machen'
    ],
    correctAnswer: 'direkt zur Sache kommen',
    difficulty: 'C2',
    topic: 'latin_expressions'
  },
  {
    id: 'c2_healthcare_1',
    text: 'Wie lautet die korrekte Bezeichnung für die Zellschicht, die die Blutgefäße von innen auskleidet?',
    options: [
      'Endothel',
      'Epithel',
      'Peritoneum',
      'Perikard'
    ],
    correctAnswer: 'Endothel',
    difficulty: 'C2',
    topic: 'healthcare'
  },
  {
    id: 'c2_healthcare_2',
    text: 'Welche der folgenden Aussagen zu einer informierten Einwilligung (Informed Consent) ist korrekt?',
    options: [
      'Die Einwilligung muss immer schriftlich erfolgen.',
      'Bei bewusstlosen Patienten ist keine Einwilligung erforderlich.',
      'Die Einwilligung muss freiwillig, nach angemessener Aufklärung und bei bestehender Einwilligungsfähigkeit erfolgen.',
      'Für Routineuntersuchungen ist keine Einwilligung erforderlich.'
    ],
    correctAnswer: 'Die Einwilligung muss freiwillig, nach angemessener Aufklärung und bei bestehender Einwilligungsfähigkeit erfolgen.',
    difficulty: 'C2',
    topic: 'healthcare'
  },
  ...c2QuestionsAdditions
];

// Export a complete question bank organized by difficulty level
export const questionBank: QuestionBank = {
  A1: a1Questions,
  A2: a2Questions,
  B1: b1Questions,
  B2: b2Questions,
  C1: c1Questions,
  C2: c2Questions
};
