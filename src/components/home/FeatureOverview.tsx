
import React from "react";
import { HeartPulse, MessageCircle, Brain, Globe, Clock, Award, Wifi, FileCheck } from "lucide-react";

const FeatureOverview = () => {
  // App unique benefits
  const uniqueFeatures = [
    {
      icon: <HeartPulse className="h-6 w-6 text-medical-600" />,
      title: "Medizinisches Fachvokabular",
      description: "Spezialisiertes Vokabular und Redewendungen für den medizinischen Alltag"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-medical-600" />,
      title: "Praxisnahe Dialogszenarien",
      description: "Übe realistische Gespräche mit Patienten und Kollegen aus dem Gesundheitswesen"
    },
    {
      icon: <Brain className="h-6 w-6 text-medical-600" />,
      title: "KI-gestützte Ausspracheübungen",
      description: "Erhalte sofortiges Feedback zu deiner Aussprache und verbessere deine Sprachkompetenz"
    },
    {
      icon: <Globe className="h-6 w-6 text-medical-600" />,
      title: "Für alle Sprachniveaus",
      description: "Angepasste Übungen für alle Sprachniveaus von A1 bis C1"
    }
  ];

  // Premium features
  const premiumFeatures = [
    {
      icon: <Wifi className="h-6 w-6 text-medical-600" />,
      title: "Offline-Modus",
      description: "Lerne auch unterwegs ohne Internetverbindung mit dem Offline-Modus für Premium-Nutzer"
    },
    {
      icon: <Clock className="h-6 w-6 text-medical-600" />,
      title: "FSP-Prüfungsvorbereitung",
      description: "Kapitelabschlusstests mit Zeitdruck-Option zur optimalen Vorbereitung auf die Fachspracheprüfung"
    },
    {
      icon: <Award className="h-6 w-6 text-medical-600" />,
      title: "Mündliche Prüfungssimulation",
      description: "Trainiere die mündliche Prüfung mit realistischen Simulationen und erhalte Feedback"
    },
    {
      icon: <FileCheck className="h-6 w-6 text-medical-600" />,
      title: "Detaillierte Ergebnisanalyse",
      description: "Erhalte umfassende Analysen deiner Testergebnisse mit ausführlichen Erklärungen"
    }
  ];

  // Loyalty program features
  const loyaltyProgram = [
    {
      title: "3-Monate-Streak-Bonus",
      description: "Bei 3 Monaten regelmäßiger Nutzung (Streak) erhältst du 1 Monat Premium kostenlos"
    },
    {
      title: "Fortgeschrittene Statistiken",
      description: "Verfolge deinen Lernfortschritt mit detaillierten Statistiken über Stärken und Schwächen"
    },
    {
      title: "Personalisierte Lernempfehlungen",
      description: "Erhalte auf dich zugeschnittene Empfehlungen basierend auf deinen Lerngewohnheiten"
    }
  ];

  return (
    <section className="container mx-auto mb-12 animate-fade-in" style={{ animationDelay: '900ms' }}>
      <h2 className="text-2xl font-semibold mb-6 text-center">MedLingua - Spezialtraining für medizinisches Personal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {uniqueFeatures.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-medical-50 rounded-xl p-6 border border-medical-200 mb-8">
        <h3 className="text-xl font-medium mb-6 text-center">Premium-Features für Fachspracheprüfungs-Vorbereitung</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 mb-8">
        <h3 className="text-xl font-medium mb-4 text-center">Unser Treue-Programm</h3>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-medical-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              3+1
            </div>
          </div>
          <h4 className="text-lg font-medium text-center mb-4">3 Monate Streak = 1 Monat Premium kostenlos</h4>
          <p className="text-center text-neutral-600 mb-6">Belohne deine Lernkonstanz mit einem kostenlosen Premium-Monat, wenn du 3 Monate lang regelmäßig lernst.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loyaltyProgram.map((item, index) => (
              <div key={index} className="p-4 border border-neutral-100 rounded-lg">
                <h5 className="font-medium mb-2">{item.title}</h5>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <h3 className="text-xl font-medium mb-4 text-center">Warum MedLingua statt allgemeiner Sprachlern-Apps?</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="py-3 px-4 text-left">Feature</th>
                <th className="py-3 px-4 text-center">Allgemeine Apps<br/>(Duolingo, Babbel, usw.)</th>
                <th className="py-3 px-4 text-center bg-medical-50 font-medium">MedLingua</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4">Medizinisches Fachvokabular</td>
                <td className="py-3 px-4 text-center">Begrenzt oder nicht vorhanden</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">Umfassend & spezialisiert</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4">Praxisnahe Dialogszenarien</td>
                <td className="py-3 px-4 text-center">Allgemeine Alltagsgespräche</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">Realistische medizinische Situationen</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4">FSP-Prüfungsvorbereitung</td>
                <td className="py-3 px-4 text-center">Keine spezifische Vorbereitung</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">Gezielte Tests & Übungen</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4">Lernziel</td>
                <td className="py-3 px-4 text-center">Allgemeine Sprachkenntnisse</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">Berufsbezogene Kommunikation</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Unterstützung von Fachkräften</td>
                <td className="py-3 px-4 text-center">Minimal</td>
                <td className="py-3 px-4 text-center bg-medical-50 font-medium">Spezifische Vorbereitung auf den Berufsalltag</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeatureOverview;
