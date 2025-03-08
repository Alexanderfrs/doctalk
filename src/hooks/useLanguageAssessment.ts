
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

// Define question interface
interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  topic?: string;
  image?: string;
}

// Define assessment results interface
interface AssessmentResults {
  level: string;
  correctCount: number;
  totalQuestions: number;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

export const useLanguageAssessment = () => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1'>('A1');
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  // Enhanced comprehensive question bank covering various language skills
  const questionBank: AssessmentQuestion[] = [
    // A1 Level Questions (Beginner)
    {
      id: 'a1_1',
      question: 'Wie heißen Sie?',
      options: [
        { id: 'a', text: 'Ich bin 30 Jahre alt.' },
        { id: 'b', text: 'Ich heiße Maria.' },
        { id: 'c', text: 'Ich komme aus Polen.' },
        { id: 'd', text: 'Ich bin Krankenschwester.' }
      ],
      correctAnswer: 'b',
      level: 'A1',
      topic: 'introduction'
    },
    {
      id: 'a1_2',
      question: 'Welches Wort passt nicht zu den anderen?',
      options: [
        { id: 'a', text: 'Kopf' },
        { id: 'b', text: 'Arm' },
        { id: 'c', text: 'Bein' },
        { id: 'd', text: 'Tisch' }
      ],
      correctAnswer: 'd',
      level: 'A1',
      topic: 'vocabulary'
    },
    {
      id: 'a1_3',
      question: 'Was sagt man, wenn man ein Zimmer betritt?',
      options: [
        { id: 'a', text: 'Guten Tag!' },
        { id: 'b', text: 'Auf Wiedersehen!' },
        { id: 'c', text: 'Gute Nacht!' },
        { id: 'd', text: 'Vielen Dank!' }
      ],
      correctAnswer: 'a',
      level: 'A1',
      topic: 'greetings'
    },
    {
      id: 'a1_4',
      question: 'Der Patient hat ___ Schmerzen.',
      options: [
        { id: 'a', text: 'ein' },
        { id: 'b', text: 'einer' },
        { id: 'c', text: 'eine' },
        { id: 'd', text: 'einen' }
      ],
      correctAnswer: 'a',
      level: 'A1',
      topic: 'grammar'
    },
    {
      id: 'a1_5',
      question: 'Welches Körperteil ist unten?',
      options: [
        { id: 'a', text: 'Auge' },
        { id: 'b', text: 'Ohr' },
        { id: 'c', text: 'Fuß' },
        { id: 'd', text: 'Nase' }
      ],
      correctAnswer: 'c',
      level: 'A1',
      topic: 'body-parts'
    },
    {
      id: 'a1_6',
      question: 'Wie spät ist es?',
      options: [
        { id: 'a', text: 'Ich bin müde.' },
        { id: 'b', text: 'Es ist halb vier.' },
        { id: 'c', text: 'Heute ist Montag.' },
        { id: 'd', text: 'Das Wetter ist schön.' }
      ],
      correctAnswer: 'b',
      level: 'A1',
      topic: 'time'
    },
    // A2 Level Questions (Elementary)
    {
      id: 'a2_1',
      question: 'Wie fragt man nach dem Befinden eines Patienten?',
      options: [
        { id: 'a', text: 'Wie heißen Sie?' },
        { id: 'b', text: 'Wie geht es Ihnen heute?' },
        { id: 'c', text: 'Woher kommen Sie?' },
        { id: 'd', text: 'Was möchten Sie essen?' }
      ],
      correctAnswer: 'b',
      level: 'A2',
      topic: 'patient-communication'
    },
    {
      id: 'a2_2',
      question: 'Was bedeutet "der Blutdruck" auf Deutsch?',
      options: [
        { id: 'a', text: 'Blood test' },
        { id: 'b', text: 'Blood type' },
        { id: 'c', text: 'Blood pressure' },
        { id: 'd', text: 'Blood cell' }
      ],
      correctAnswer: 'c',
      level: 'A2',
      topic: 'medical-terms'
    },
    {
      id: 'a2_3',
      question: 'Vervollständigen Sie den Satz: "Der Patient ___ Fieber."',
      options: [
        { id: 'a', text: 'hat' },
        { id: 'b', text: 'ist' },
        { id: 'c', text: 'macht' },
        { id: 'd', text: 'gibt' }
      ],
      correctAnswer: 'a',
      level: 'A2',
      topic: 'grammar'
    },
    {
      id: 'a2_4',
      question: 'Welche Mahlzeit isst man normalerweise am Morgen?',
      options: [
        { id: 'a', text: 'Abendessen' },
        { id: 'b', text: 'Mittagessen' },
        { id: 'c', text: 'Frühstück' },
        { id: 'd', text: 'Brunch' }
      ],
      correctAnswer: 'c',
      level: 'A2',
      topic: 'daily-routine'
    },
    {
      id: 'a2_5',
      question: 'Was ist ein Thermometer?',
      options: [
        { id: 'a', text: 'Ein Gerät zum Messen des Blutdrucks' },
        { id: 'b', text: 'Ein Gerät zum Messen der Temperatur' },
        { id: 'c', text: 'Ein Gerät zum Messen des Blutzuckers' },
        { id: 'd', text: 'Ein Gerät zum Messen des Gewichts' }
      ],
      correctAnswer: 'b',
      level: 'A2',
      topic: 'medical-equipment'
    },
    {
      id: 'a2_6',
      question: 'Was sollte man vor einer Operation tun?',
      options: [
        { id: 'a', text: 'Viel essen und trinken' },
        { id: 'b', text: 'Sport machen' },
        { id: 'c', text: 'Eine Einwilligungserklärung unterschreiben' },
        { id: 'd', text: 'Viel schlafen' }
      ],
      correctAnswer: 'c',
      level: 'A2',
      topic: 'hospital-procedures'
    },
    // B1 Level Questions (Intermediate)
    {
      id: 'b1_1',
      question: 'Wie würden Sie einem Patienten erklären, dass er nüchtern zur Untersuchung kommen soll?',
      options: [
        { id: 'a', text: 'Sie müssen vor der Untersuchung viel trinken.' },
        { id: 'b', text: 'Sie dürfen vor der Untersuchung nicht essen und trinken.' },
        { id: 'c', text: 'Sie sollten vor der Untersuchung eine kleine Mahlzeit zu sich nehmen.' },
        { id: 'd', text: 'Sie können vor der Untersuchung normal essen und trinken.' }
      ],
      correctAnswer: 'b',
      level: 'B1',
      topic: 'patient-instructions'
    },
    {
      id: 'b1_2',
      question: 'Was ist die richtige Übersetzung für "Intensive care unit"?',
      options: [
        { id: 'a', text: 'Notaufnahme' },
        { id: 'b', text: 'Operationssaal' },
        { id: 'c', text: 'Intensivstation' },
        { id: 'd', text: 'Pflegeheim' }
      ],
      correctAnswer: 'c',
      level: 'B1',
      topic: 'medical-departments'
    },
    {
      id: 'b1_3',
      question: 'Ein Patient klagt über Atemnot. Was fragen Sie ihn?',
      options: [
        { id: 'a', text: 'Haben Sie Probleme beim Sprechen?' },
        { id: 'b', text: 'Seit wann haben Sie Schwierigkeiten beim Atmen?' },
        { id: 'c', text: 'Haben Sie Schmerzen in der Brust?' },
        { id: 'd', text: 'Alle genannten Fragen sind relevant.' }
      ],
      correctAnswer: 'd',
      level: 'B1',
      topic: 'respiratory-issues'
    },
    {
      id: 'b1_4',
      question: 'Welche Aussage zur Medikamentengabe ist korrekt?',
      options: [
        { id: 'a', text: 'Medikamente sollten immer mit Alkohol eingenommen werden.' },
        { id: 'b', text: 'Die Einnahmezeit von Medikamenten ist unwichtig.' },
        { id: 'c', text: 'Vor der Medikamentengabe muss die Identität des Patienten überprüft werden.' },
        { id: 'd', text: 'Patienten sollten selbst entscheiden, welche Dosis sie nehmen.' }
      ],
      correctAnswer: 'c',
      level: 'B1',
      topic: 'medication-administration'
    },
    {
      id: 'b1_5',
      question: 'Wie dokumentieren Sie einen Dekubitus?',
      options: [
        { id: 'a', text: 'Nur mündlich an den nächsten Dienst weitergeben' },
        { id: 'b', text: 'Größe, Lage, Aussehen und Behandlung in der Pflegedokumentation notieren' },
        { id: 'c', text: 'Es ist nicht notwendig, einen Dekubitus zu dokumentieren' },
        { id: 'd', text: 'Nur die Größe notieren' }
      ],
      correctAnswer: 'b',
      level: 'B1',
      topic: 'documentation'
    },
    {
      id: 'b1_6',
      question: 'Was bedeutet "hygienische Händedesinfektion"?',
      options: [
        { id: 'a', text: 'Kurzes Abspülen der Hände mit Wasser' },
        { id: 'b', text: 'Händewaschen mit Seife für 10 Sekunden' },
        { id: 'c', text: 'Einreiben der Hände mit einem alkoholischen Desinfektionsmittel für ca. 30 Sekunden' },
        { id: 'd', text: 'Tragen von Handschuhen' }
      ],
      correctAnswer: 'c',
      level: 'B1',
      topic: 'hygiene'
    },
    // B2 Level Questions (Upper Intermediate)
    {
      id: 'b2_1',
      question: 'Sie müssen einem Patienten erklären, dass er für eine Operation eine Einwilligungserklärung unterschreiben muss. Welche Formulierung ist am besten geeignet?',
      options: [
        { id: 'a', text: 'Sie müssen hier unterschreiben.' },
        { id: 'b', text: 'Unterschreiben Sie bitte diese Erklärung für die Operation.' },
        { id: 'c', text: 'Bevor wir mit der Operation beginnen können, benötigen wir Ihre schriftliche Einwilligung. Bitte lesen Sie das Formular sorgfältig durch und unterschreiben Sie es, wenn Sie einverstanden sind.' },
        { id: 'd', text: 'Ohne Ihre Unterschrift können wir nicht operieren.' }
      ],
      correctAnswer: 'c',
      level: 'B2',
      topic: 'patient-consent'
    },
    {
      id: 'b2_2',
      question: 'Ein Patient hat Schwellungen in den Beinen. Welche Anamnese-Frage ist am relevantesten?',
      options: [
        { id: 'a', text: 'Haben Sie Diabetes?' },
        { id: 'b', text: 'Nehmen Sie Medikamente für das Herz?' },
        { id: 'c', text: 'Haben Sie kürzlich eine lange Flugreise unternommen?' },
        { id: 'd', text: 'Alle diese Fragen sind relevant für die Anamnese bei Beinschwellungen.' }
      ],
      correctAnswer: 'd',
      level: 'B2',
      topic: 'clinical-assessment'
    },
    {
      id: 'b2_3',
      question: 'Was ist der Unterschied zwischen "Pflegebedürftigkeit" und "Hilfsbedürftigkeit"?',
      options: [
        { id: 'a', text: 'Es gibt keinen Unterschied.' },
        { id: 'b', text: 'Pflegebedürftigkeit bezieht sich auf medizinische Pflege, Hilfsbedürftigkeit auf Alltagshilfe.' },
        { id: 'c', text: 'Hilfsbedürftigkeit ist schwerwiegender als Pflegebedürftigkeit.' },
        { id: 'd', text: 'Pflegebedürftigkeit ist ein veralteter Begriff.' }
      ],
      correctAnswer: 'b',
      level: 'B2',
      topic: 'care-terminology'
    },
    {
      id: 'b2_4',
      question: 'Was ist bei der Schmerzanamnese zu berücksichtigen?',
      options: [
        { id: 'a', text: 'Nur die Intensität des Schmerzes ist relevant.' },
        { id: 'b', text: 'Die Schmerzanamnese sollte Lokalisation, Qualität, Intensität, zeitlicher Verlauf und beeinflussende Faktoren umfassen.' },
        { id: 'c', text: 'Eine Schmerzanamnese ist nur bei chirurgischen Patienten notwendig.' },
        { id: 'd', text: 'Schmerzen sind subjektiv und können daher nicht dokumentiert werden.' }
      ],
      correctAnswer: 'b',
      level: 'B2',
      topic: 'pain-assessment'
    },
    {
      id: 'b2_5',
      question: 'Wie reagieren Sie, wenn ein Patient nach der Diagnose fragt, die aber nur der Arzt mitteilen darf?',
      options: [
        { id: 'a', text: 'Ich teile ihm die Diagnose mit, da er ein Recht darauf hat.' },
        { id: 'b', text: 'Ich ignoriere die Frage und wechsle das Thema.' },
        { id: 'c', text: 'Ich erkläre dem Patienten, dass der behandelnde Arzt mit ihm über die Diagnose sprechen wird und biete an, den Arzt zu informieren, dass der Patient ein Gespräch wünscht.' },
        { id: 'd', text: 'Ich sage dem Patienten, dass es nicht meine Aufgabe ist, ihm die Diagnose mitzuteilen.' }
      ],
      correctAnswer: 'c',
      level: 'B2',
      topic: 'professional-boundaries'
    },
    {
      id: 'b2_6',
      question: 'Was versteht man unter dem Begriff "Prophylaxe"?',
      options: [
        { id: 'a', text: 'Die Behandlung einer akuten Erkrankung' },
        { id: 'b', text: 'Die Rehabilitation nach einer Erkrankung' },
        { id: 'c', text: 'Maßnahmen zur Linderung von Symptomen' },
        { id: 'd', text: 'Maßnahmen zur Vorbeugung von Erkrankungen oder Komplikationen' }
      ],
      correctAnswer: 'd',
      level: 'B2',
      topic: 'preventive-care'
    },
    // C1 Level Questions (Advanced)
    {
      id: 'c1_1',
      question: 'Eine Patientin hat eine Patientenverfügung und möchte diese besprechen. Wie reagieren Sie fachgerecht?',
      options: [
        { id: 'a', text: 'Ich leite Sie an unseren Verwaltungsbereich weiter.' },
        { id: 'b', text: 'Ich nehme mir Zeit für ein ausführliches Gespräch und erkläre Ihnen die rechtlichen und medizinischen Aspekte der Patientenverfügung sowie ihre Bedeutung für Ihre Behandlung.' },
        { id: 'c', text: 'Das ist ein Thema, das Sie mit Ihrem Hausarzt besprechen sollten.' },
        { id: 'd', text: 'Wir benötigen keine Patientenverfügung für Ihre aktuelle Behandlung.' }
      ],
      correctAnswer: 'b',
      level: 'C1',
      topic: 'patient-rights'
    },
    {
      id: 'c1_2',
      question: 'Ein Patient mit Demenz zeigt aggressives Verhalten. Welcher Ansatz ist im Sinne der personenzentrierten Pflege am geeignetsten?',
      options: [
        { id: 'a', text: 'Fixierung des Patienten, um seine Sicherheit zu gewährleisten' },
        { id: 'b', text: 'Verabreichung von Beruhigungsmitteln nach ärztlicher Anordnung' },
        { id: 'c', text: 'Analyse der möglichen Ursachen für das Verhalten, wie Schmerzen, Angst oder Umgebungsfaktoren, und entsprechende individuelle Anpassung der Pflege' },
        { id: 'd', text: 'Isolation des Patienten, um andere Patienten zu schützen' }
      ],
      correctAnswer: 'c',
      level: 'C1',
      topic: 'dementia-care'
    },
    {
      id: 'c1_3',
      question: 'Sie leiten eine Teambesprechung zur Verbesserung der Pflegequalität. Was ist der wichtigste Aspekt einer effektiven Moderation?',
      options: [
        { id: 'a', text: 'Strenge Zeiteinhaltung und schnelle Entscheidungsfindung' },
        { id: 'b', text: 'Förderung einer offenen Diskussionskultur, in der alle Teammitglieder ihre Beobachtungen und Vorschläge einbringen können' },
        { id: 'c', text: 'Präsentation vorgefertigter Lösungen zur Effizienzsteigerung' },
        { id: 'd', text: 'Klare Zuweisung von Aufgaben ohne Diskussionsmöglichkeit' }
      ],
      correctAnswer: 'b',
      level: 'C1',
      topic: 'team-leadership'
    },
    {
      id: 'c1_4',
      question: 'Was ist bei der Kommunikation mit Angehörigen von Patienten in kritischem Zustand zu beachten?',
      options: [
        { id: 'a', text: 'Fachbegriffe verwenden, um Kompetenz zu zeigen' },
        { id: 'b', text: 'Möglichst wenig Informationen geben, um nicht zu beunruhigen' },
        { id: 'c', text: 'Einfühlsam und verständlich kommunizieren, ehrlich sein, aber gleichzeitig Hoffnung nicht nehmen' },
        { id: 'd', text: 'Die Angehörigen sollten ausschließlich mit dem Arzt sprechen' }
      ],
      correctAnswer: 'c',
      level: 'C1',
      topic: 'family-communication'
    },
    {
      id: 'c1_5',
      question: 'Ein multimorbider Patient erhält verschiedene Medikamente von unterschiedlichen Fachärzten. Was ist in dieser Situation besonders wichtig?',
      options: [
        { id: 'a', text: 'Die Medikamente genau nach Verordnung verabreichen, ohne diese zu hinterfragen' },
        { id: 'b', text: 'Dem Patienten die Verantwortung für seine Medikation überlassen' },
        { id: 'c', text: 'Auf mögliche Wechselwirkungen achten und bei Bedenken Rücksprache mit dem Arzt halten' },
        { id: 'd', text: 'Die Dosierung eigenständig anpassen, wenn Nebenwirkungen auftreten' }
      ],
      correctAnswer: 'c',
      level: 'C1',
      topic: 'medication-management'
    },
    {
      id: 'c1_6',
      question: 'Was charakterisiert eine evidenzbasierte Pflegepraxis?',
      options: [
        { id: 'a', text: 'Ausschließliche Orientierung an Traditionen und bewährten Vorgehensweisen' },
        { id: 'b', text: 'Integration aktueller Forschungsergebnisse, klinischer Expertise und Patientenpräferenzen' },
        { id: 'c', text: 'Ausschließliche Befolgung von Anweisungen der ärztlichen Kollegen' },
        { id: 'd', text: 'Bevorzugung kostengünstiger Maßnahmen unabhängig von ihrer Wirksamkeit' }
      ],
      correctAnswer: 'b',
      level: 'C1',
      topic: 'evidence-based-practice'
    }
  ];

  // Get a question by level
  const getQuestionsByLevel = (level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1') => {
    return questionBank.filter(q => q.level === level);
  };

  // Initialize test with appropriate questions
  const startAssessment = () => {
    // Start with A1 level questions
    const initialQuestions = getRandomQuestions(getQuestionsByLevel('A1'), 3);
    setActiveQuestions(initialQuestions);
    setAssessmentStarted(true);
    setAssessmentStep(1);
    setUserAnswers({});
    setCurrentDifficulty('A1');
    setConsecutiveCorrect(0);
    setConsecutiveWrong(0);
    
    toast.info("Der Test dauert ca. 5 Minuten und passt sich an Ihre Sprachkenntnisse an.", {
      duration: 5000,
    });
  };

  // Get random questions from a specific level
  const getRandomQuestions = (questions: AssessmentQuestion[], count: number) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  // Handle user answer
  const handleAnswer = (questionId: string, answerId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  // Improved adaptive algorithm for next question
  const handleNextStep = () => {
    const currentQuestion = activeQuestions[assessmentStep - 1];
    const isCorrect = userAnswers[currentQuestion.id] === currentQuestion.correctAnswer;
    
    // Update consecutive correct/wrong counters
    if (isCorrect) {
      setConsecutiveCorrect(prev => prev + 1);
      setConsecutiveWrong(0);
    } else {
      setConsecutiveWrong(prev => prev + 1);
      setConsecutiveCorrect(0);
    }

    // Check if we need to adjust difficulty for next questions
    let newDifficulty = currentDifficulty;
    
    // More responsive difficulty adjustment
    if (consecutiveCorrect >= 2) {
      // Increase difficulty if possible
      if (currentDifficulty === 'A1') newDifficulty = 'A2';
      else if (currentDifficulty === 'A2') newDifficulty = 'B1';
      else if (currentDifficulty === 'B1') newDifficulty = 'B2';
      else if (currentDifficulty === 'B2') newDifficulty = 'C1';
      
      if (newDifficulty !== currentDifficulty) {
        toast.info(`Die Fragen werden nun etwas schwieriger (Niveau ${newDifficulty}).`, {
          duration: 3000,
        });
        setConsecutiveCorrect(0);
      }
    } else if (consecutiveWrong >= 2) {
      // Decrease difficulty if possible
      if (currentDifficulty === 'C1') newDifficulty = 'B2';
      else if (currentDifficulty === 'B2') newDifficulty = 'B1';
      else if (currentDifficulty === 'B1') newDifficulty = 'A2';
      
      if (newDifficulty !== currentDifficulty) {
        toast.info(`Die Fragen werden nun etwas einfacher (Niveau ${newDifficulty}).`, {
          duration: 3000,
        });
        setConsecutiveWrong(0);
      }
    }
    
    // Update difficulty if changed
    if (newDifficulty !== currentDifficulty) {
      setCurrentDifficulty(newDifficulty);
      
      // Add questions of the new difficulty level
      const newQuestions = getRandomQuestions(getQuestionsByLevel(newDifficulty), 3);
      setActiveQuestions(prev => [...prev, ...newQuestions]);
    }
    
    // Limit assessment to maximum of 10 questions or 5 minutes
    const maxQuestions = 10;
    
    // Move to next question or complete assessment
    if (assessmentStep < Math.min(activeQuestions.length, maxQuestions)) {
      setAssessmentStep(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  // Complete the assessment and calculate results
  const completeAssessment = () => {
    let correctCount = 0;
    let maxLevel = 'A1';
    const levelPoints = { 'A1': 0, 'A2': 0, 'B1': 0, 'B2': 0, 'C1': 0 };
    const topicResults: Record<string, { correct: number, total: number }> = {};
    
    // Calculate correct answers and level statistics
    activeQuestions.slice(0, assessmentStep).forEach(question => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
        levelPoints[question.level]++;
      }
      
      // Track topic performance
      if (question.topic) {
        if (!topicResults[question.topic]) {
          topicResults[question.topic] = { correct: 0, total: 0 };
        }
        topicResults[question.topic].total++;
        if (isCorrect) {
          topicResults[question.topic].correct++;
        }
      }
    });
    
    // Determine the highest level with at least 2 correct answers
    if (levelPoints['C1'] >= 2) maxLevel = 'C1';
    else if (levelPoints['B2'] >= 2) maxLevel = 'B2';
    else if (levelPoints['B1'] >= 2) maxLevel = 'B1';
    else if (levelPoints['A2'] >= 2) maxLevel = 'A2';
    else maxLevel = 'A1';
    
    // Calculate overall score
    const answeredQuestions = activeQuestions.slice(0, assessmentStep).length;
    const score = Math.round((correctCount / answeredQuestions) * 100);
    
    // Identify strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    Object.entries(topicResults).forEach(([topic, result]) => {
      const percentage = (result.correct / result.total) * 100;
      if (percentage >= 70 && result.total >= 2) {
        strengths.push(formatTopicName(topic));
      } else if (percentage <= 40 && result.total >= 2) {
        weaknesses.push(formatTopicName(topic));
      }
    });
    
    // Save results
    const results: AssessmentResults = {
      level: maxLevel,
      correctCount,
      totalQuestions: answeredQuestions,
      score,
      strengths,
      weaknesses
    };
    
    // Update user level
    setCurrentLevel(maxLevel);
    
    // Display results
    const strengthsText = strengths.length > 0 
      ? `Stärken: ${strengths.join(', ')}`
      : '';
      
    const weaknessesText = weaknesses.length > 0
      ? `Verbesserungspotential: ${weaknesses.join(', ')}`
      : '';
      
    const messageDetail = `${strengthsText}\n${weaknessesText}`.trim();
    
    toast.success(`Assessment abgeschlossen! Ihr Niveau: ${maxLevel} (${score}% korrekt)`, {
      duration: 7000,
      description: messageDetail || "Machen Sie weiter so!"
    });
    
    // Reset assessment state
    setAssessmentStarted(false);
    
    // Store level in localStorage
    localStorage.setItem('userLanguageLevel', maxLevel);
    
    return results;
  };

  // Format topic names for user display
  const formatTopicName = (topic: string): string => {
    const topicMap: Record<string, string> = {
      'introduction': 'Vorstellung',
      'vocabulary': 'Vokabular',
      'greetings': 'Begrüßungen',
      'body-parts': 'Körperteile',
      'grammar': 'Grammatik',
      'time': 'Zeitangaben',
      'patient-communication': 'Patientenkommunikation',
      'medical-terms': 'Medizinische Begriffe',
      'daily-routine': 'Tagesablauf',
      'medical-equipment': 'Medizinische Geräte',
      'hospital-procedures': 'Krankenhausverfahren',
      'patient-instructions': 'Patientenanweisungen',
      'medical-departments': 'Medizinische Abteilungen',
      'respiratory-issues': 'Atemwegsprobleme',
      'medication-administration': 'Medikamentengabe',
      'documentation': 'Dokumentation',
      'hygiene': 'Hygiene',
      'patient-consent': 'Patienteneinwilligung',
      'clinical-assessment': 'Klinische Beurteilung',
      'care-terminology': 'Pflegeterminologie',
      'pain-assessment': 'Schmerzbeurteilung',
      'professional-boundaries': 'Professionelle Grenzen',
      'preventive-care': 'Präventive Pflege',
      'patient-rights': 'Patientenrechte',
      'dementia-care': 'Demenzpflege',
      'team-leadership': 'Teamführung',
      'family-communication': 'Familienkommunikation',
      'medication-management': 'Medikamentenmanagement',
      'evidence-based-practice': 'Evidenzbasierte Praxis'
    };
    
    return topicMap[topic] || topic.replace(/-/g, ' ');
  };

  // Load saved level on component mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLanguageLevel');
    if (savedLevel) {
      setCurrentLevel(savedLevel);
    }
  }, []);

  // Current question based on assessment step
  const currentQuestion = useMemo(() => {
    if (!assessmentStarted || assessmentStep > activeQuestions.length) {
      return null;
    }
    return activeQuestions[assessmentStep - 1];
  }, [assessmentStarted, assessmentStep, activeQuestions]);

  return {
    assessmentStarted,
    assessmentStep,
    currentQuestion,
    totalQuestions: activeQuestions.length,
    userAnswers,
    currentLevel,
    startAssessment,
    handleAnswer,
    handleNextStep,
    completeAssessment
  };
};
