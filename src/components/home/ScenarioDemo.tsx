
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause, Volume2, MessageCircle, ThumbsUp, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConversationLine {
  speaker: "patient" | "user" | "system";
  text: string;
  translation?: string;
}

const ScenarioDemo: React.FC = () => {
  const { translate, interfaceLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  // Demo medical conversation in German with translations
  const conversation: ConversationLine[] = [
    { 
      speaker: "system", 
      text: translate("scenarioDemoContext"),
      translation: "Scenario: A nurse needs to explain to a patient how to take their new medication."
    },
    { 
      speaker: "patient", 
      text: "Ich habe diese Tabletten bekommen, aber ich bin mir nicht sicher, wie ich sie nehmen soll.",
      translation: "I got these pills, but I'm not sure how I should take them."
    },
    { 
      speaker: "user", 
      text: "Diese Tabletten müssen Sie zweimal täglich einnehmen. Eine am Morgen und eine am Abend, jeweils mit einer Mahlzeit.",
      translation: "You need to take these pills twice daily. One in the morning and one in the evening, each with a meal."
    },
    { 
      speaker: "patient", 
      text: "Und was passiert, wenn ich eine Dosis vergesse?",
      translation: "And what happens if I forget a dose?"
    },
    { 
      speaker: "user", 
      text: "Wenn Sie eine Dosis vergessen haben, nehmen Sie sie, sobald Sie sich erinnern. Wenn es jedoch fast Zeit für die nächste Dosis ist, überspringen Sie die versäumte Dosis und setzen Sie Ihren regulären Dosierungsplan fort.",
      translation: "If you've missed a dose, take it as soon as you remember. However, if it's almost time for your next dose, skip the missed dose and continue with your regular dosing schedule."
    },
    { 
      speaker: "patient", 
      text: "Gibt es Nebenwirkungen, auf die ich achten sollte?",
      translation: "Are there side effects I should watch out for?"
    },
    { 
      speaker: "user", 
      text: "Zu den häufigen Nebenwirkungen gehören leichte Kopfschmerzen und gelegentlich Übelkeit. Diese verschwinden normalerweise nach ein paar Tagen. Wenn Sie starke Nebenwirkungen bemerken, insbesondere Hautausschlag oder Atembeschwerden, kontaktieren Sie sofort einen Arzt.",
      translation: "Common side effects include mild headaches and occasionally nausea. These usually disappear after a few days. If you notice severe side effects, especially rash or difficulty breathing, contact a doctor immediately."
    },
    { 
      speaker: "patient", 
      text: "Vielen Dank für die Erklärung. Das ist sehr hilfreich.",
      translation: "Thank you for the explanation. That's very helpful."
    },
    {
      speaker: "system",
      text: translate("scenarioDemoComplete"),
      translation: "Scenario completed! You've successfully explained medication instructions to the patient."
    }
  ];

  // Simulate playing through the conversation
  React.useEffect(() => {
    if (isPlaying && currentIndex < conversation.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4000); // Show next line after 4 seconds
      
      return () => clearTimeout(timer);
    } else if (isPlaying && currentIndex === conversation.length - 1) {
      setIsPlaying(false);
      setVideoEnded(true);
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoEnded) {
      setCurrentIndex(0);
      setVideoEnded(false);
    }
  };

  const resetDemo = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setVideoEnded(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden">
      <div className="bg-medical-500 text-white p-4">
        <h3 className="font-semibold text-lg flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          {translate("scenarioDemoTitle")}
        </h3>
        <p className="text-sm text-white/90">{translate("scenarioDemoSubtitle")}</p>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="mr-2"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  {translate("pause")}
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  {videoEnded ? translate("replay") : translate("play")}
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-neutral-600"
            >
              <Volume2 className="h-4 w-4 mr-1" />
              {showTranslation ? translate("hideTranslation") : translate("showTranslation")}
            </Button>
          </div>
          
          {videoEnded && (
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{translate("scenarioCompleted")}</span>
            </div>
          )}
        </div>

        <div 
          className={cn(
            "bg-neutral-50 rounded-lg border border-neutral-200 p-4 mb-4",
            "h-[300px] md:h-[360px] overflow-y-auto"
          )}
        >
          {conversation.slice(0, currentIndex + 1).map((line, idx) => (
            <div key={idx} className={cn(
              "mb-4 last:mb-0 transition-opacity duration-300",
              idx === currentIndex ? "animate-fade-in" : ""
            )}>
              {line.speaker === "system" ? (
                <div className="bg-medical-50 text-medical-700 p-3 rounded-lg text-center text-sm mb-2">
                  {line.text}
                </div>
              ) : (
                <div className={cn(
                  "flex",
                  line.speaker === "patient" ? "justify-start" : "justify-end"
                )}>
                  <div className={cn(
                    "rounded-2xl p-3 max-w-[80%]",
                    line.speaker === "patient" 
                      ? "bg-neutral-200 text-neutral-800 rounded-tl-none" 
                      : "bg-medical-500 text-white rounded-tr-none"
                  )}>
                    <p className="text-sm">{line.text}</p>
                    {showTranslation && line.translation && (
                      <p className="text-xs mt-2 pt-2 border-t border-white/20">
                        {line.translation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-neutral-100 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">{translate("scenarioDemoExplanation")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{translate("scenarioDemoBenefit1")}</li>
            <li>{translate("scenarioDemoBenefit2")}</li>
            <li>{translate("scenarioDemoBenefit3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDemo;
