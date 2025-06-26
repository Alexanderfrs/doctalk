export interface PatientProfile {
  name?: string;
  age?: number;
  condition?: string;
  mood?: string;
  personality?: string;
  medicalHistory?: string;
  communicationStyle?: string;
  avatar_url?: string;
}

export interface UnifiedMedicalLLMOptions {
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: PatientProfile;
  userLanguage?: string;
  onError?: (error: string) => void;
  onConversationComplete?: (insights: string) => void;
}

export interface UnifiedResponse {
  patientReply: string;
  briefFeedback?: string;
  suggestionForNext?: string;
  progressUpdate: {
    completedGoals: number;
    totalGoals: number;
    currentObjective: string;
    isComplete: boolean;
  };
  conversationComplete?: boolean;
  performanceInsights?: string;
  patientProfile?: {
    name: string;
    mood: string;
    personality: string;
  };
  scenarioType: string;
  timestamp: string;
}

export interface UseUnifiedMedicalLLMReturn {
  generateUnifiedResponse: (userInput: string, conversationHistory: any[]) => Promise<UnifiedResponse>;
  currentPatientProfile: PatientProfile | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
  testConnection: () => Promise<boolean>;
  isConversationComplete: boolean;
}
