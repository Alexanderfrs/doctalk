
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
  }
];

// B2 level questions
const b2Questions: Question[] = [
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
  }
];

// C1 level questions
const c1Questions: Question[] = [
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
  }
];

// C2 level questions
const c2Questions: Question[] = [
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
  }
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
