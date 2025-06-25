export interface PatientProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  condition: string;
  room?: string;
  personality: string;
  background: string;
  concerns: string[];
  mood: string;
  communication_style: string;
  family_situation?: string;
  profession?: string;
  hobbies?: string[];
  avatar_color: string;
}

const maleProfiles = [
  {
    name: "Heinrich Müller",
    age: 72,
    gender: 'male' as const,
    condition: "Herzinsuffizienz",
    room: "201A",
    personality: "Ruhig und nachdenklich, aber manchmal ungeduldig",
    background: "Ehemaliger Ingenieur, lebt allein nach dem Tod seiner Frau",
    concerns: ["Angst vor Verschlechterung", "Sorge um Selbstständigkeit"],
    mood: "Besorgt aber kooperativ",
    communication_style: "Direkt und sachlich, schätzt klare Informationen",
    family_situation: "Sohn besucht selten, Tochter wohnt weit weg",
    profession: "Pensionierter Maschinenbauingenieur",
    hobbies: ["Schach spielen", "Nachrichten lesen", "Gartenarbeit"],
    avatar_color: "from-blue-400 to-blue-600"
  },
  {
    name: "Ahmed Hassan",
    age: 45,
    gender: 'male' as const,
    condition: "Diabetes mellitus",
    room: "105B",
    personality: "Freundlich und gesprächig, aber manchmal ängstlich",
    background: "Taxifahrer mit Familie, spricht manchmal gemischtes Deutsch",
    concerns: ["Arbeitsplatz verlieren", "Familie versorgen können"],
    mood: "Nervös aber hilfsbereit",
    communication_style: "Höflich und respektvoll, bittet oft um Wiederholung",
    family_situation: "Verheiratet, drei Kinder",
    profession: "Taxifahrer",
    hobbies: ["Fußball schauen", "Mit Familie kochen", "Moschee besuchen"],
    avatar_color: "from-green-400 to-green-600"
  },
  {
    name: "Klaus Weber",
    age: 68,
    gender: 'male' as const,
    condition: "COPD",
    room: "302C",
    personality: "Manchmal mürrisch, aber im Herzen gutmütig",
    background: "Ehemaliger Bauarbeiter, starker Raucher gewesen",
    concerns: ["Atemnot", "Nicht mehr arbeiten können"],
    mood: "Frustriert aber lernbereit",
    communication_style: "Direkt, manchmal unwirsch, aber ehrlich",
    family_situation: "Geschieden, gelegentlicher Kontakt zu erwachsenen Kindern",
    profession: "Pensionierter Bauarbeiter",
    hobbies: ["Fernsehen", "Kreuzworträtsel", "Skat spielen"],
    avatar_color: "from-orange-400 to-orange-600"
  }
];

const femaleProfiles = [
  {
    name: "Maria Rossi",
    age: 58,
    gender: 'female' as const,
    condition: "Brustkrebs",
    room: "208A",
    personality: "Optimistisch aber manchmal ängstlich",
    background: "Lehrerin und Mutter, kämpft gegen Krebs",
    concerns: ["Heilungschancen", "Familie nicht belasten"],
    mood: "Tapfer aber verletzlich",
    communication_style: "Offen und dankbar für Unterstützung",
    family_situation: "Verheiratet, zwei erwachsene Töchter",
    profession: "Grundschullehrerin",
    hobbies: ["Lesen", "Backen", "Stricken", "Garten pflegen"],
    avatar_color: "from-pink-400 to-pink-600"
  },
  {
    name: "Elisabeth Schmidt",
    age: 84,
    gender: 'female' as const,
    condition: "Demenz",
    room: "401B",
    personality: "Früher sehr gesellig, jetzt oft verwirrt aber freundlich",
    background: "Ehemalige Verkäuferin, verwitwet",
    concerns: ["Vergesslichkeit", "Verwirrtheit"],
    mood: "Wechselhaft, manchmal ängstlich",
    communication_style: "Einfache Sprache nötig, wiederholte Erklärungen",
    family_situation: "Enkelin besucht regelmäßig",
    profession: "Pensionierte Verkäuferin",
    hobbies: ["Musik hören", "Alte Fotos anschauen", "Spazieren"],
    avatar_color: "from-purple-400 to-purple-600"
  },
  {
    name: "Anna Kowalski",
    age: 35,
    gender: 'female' as const,
    condition: "Schwangerschaft",
    room: "150A",
    personality: "Aufgeregt und neugierig, erste Schwangerschaft",
    background: "IT-Spezialistin, sehr gut informiert",
    concerns: ["Geburtsverlauf", "Gesundheit des Babys"],
    mood: "Nervös aber freudig",
    communication_style: "Detailierte Fragen, möchte alles verstehen",
    family_situation: "Verheiratet, werdende Erstmutter",
    profession: "Software-Entwicklerin",
    hobbies: ["Yoga", "Lesen", "Reisen", "Fotografieren"],
    avatar_color: "from-teal-400 to-teal-600"
  }
];

export const createPatientProfile = (category: string, scenario?: any): PatientProfile => {
  // Create more realistic profiles based on scenario
  const profiles = [...maleProfiles, ...femaleProfiles];
  
  if (scenario?.id === 'dementia-care') {
    return femaleProfiles.find(p => p.condition === 'Demenz') || profiles[0];
  }
  
  if (scenario?.id === 'admission') {
    return profiles[Math.floor(Math.random() * profiles.length)];
  }
  
  if (scenario?.id === 'medication') {
    return maleProfiles.find(p => p.condition === 'Diabetes mellitus') || profiles[0];
  }
  
  // Default random selection with more personality
  const selectedProfile = profiles[Math.floor(Math.random() * profiles.length)];
  
  return {
    ...selectedProfile,
    // Add some variation to make each interaction unique
    mood: Math.random() > 0.5 ? selectedProfile.mood : 
          selectedProfile.mood.includes('aber') ? 
          selectedProfile.mood.split(' aber ')[0] : 
          selectedProfile.mood
  };
};
