
export interface PatientProfile {
  name: string;
  age: number;
  condition: string;
  mood: string;
  personality: string;
  communicationStyle: string;
}

export const createPatientProfile = (scenarioType: string, scenario: any): PatientProfile => {
  const profiles = {
    'patient-care': {
      name: 'Frau Müller',
      age: 65,
      condition: scenario?.description || 'Routineuntersuchung',
      mood: 'leicht besorgt',
      personality: 'höflich aber ängstlich',
      communicationStyle: 'direkt aber respektvoll'
    },
    'emergency': {
      name: 'Herr Schmidt',
      age: 45,
      condition: 'Brustschmerzen',
      mood: 'panisch',
      personality: 'gestresst und ängstlich',
      communicationStyle: 'kurz und abgehackt durch Schmerz'
    },
    'handover': {
      name: 'Dr. Weber',
      age: 38,
      condition: 'Schichtübergabe',
      mood: 'konzentriert',
      personality: 'professionell und sachlich',
      communicationStyle: 'medizinisch präzise'
    },
    'elderly-care': {
      name: 'Herr Hoffmann',
      age: 82,
      condition: 'Demenz, leichte Verwirrung',
      mood: 'verwirrt aber freundlich',
      personality: 'freundlich aber vergesslich',
      communicationStyle: 'langsam und manchmal wiederholt'
    },
    'disability-care': {
      name: 'Lisa',
      age: 28,
      condition: 'geistige Behinderung',
      mood: 'unsicher aber kooperativ',
      personality: 'freundlich aber hilfesuchend',
      communicationStyle: 'einfach und direkt'
    }
  };

  return profiles[scenarioType] || profiles['patient-care'];
};
