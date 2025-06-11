
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

const ResourcesTab: React.FC = () => {
  const { t } = useTranslation();
  
  const guidelines = [
    {
      title: "S3-Leitlinie Behandlung akuter perioperativer und posttraumatischer Schmerzen",
      url: "https://www.awmf.org/leitlinien/detail/ll/001-025.html",
      description: "AWMF-Leitlinie zur Schmerzbehandlung"
    },
    {
      title: "Nationale VersorgungsLeitlinie Herzinsuffizienz",
      url: "https://www.leitlinien.de/herzinsuffizienz",
      description: "Bundesärztekammer Leitlinie"
    },
    {
      title: "ESC Guidelines for Acute Coronary Syndromes",
      url: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Acute-Coronary-Syndromes-ACS-Guidelines",
      description: "European Society of Cardiology"
    },
    {
      title: "Reanimationsleitlinien des German Resuscitation Council",
      url: "https://www.grc-org.de/leitlinien",
      description: "Deutsche Wiederbelebungsleitlinien"
    }
  ];

  const readings = [
    {
      title: "Pflegewiki - Medizinische Terminologie",
      url: "https://www.pflegewiki.de/wiki/Hauptseite",
      description: "Umfassende Pflegewissen-Datenbank"
    },
    {
      title: "DocCheck Flexikon - Medizinlexikon",
      url: "https://flexikon.doccheck.com/de/Hauptseite",
      description: "Medizinisches Nachschlagewerk"
    },
    {
      title: "Bundesministerium für Gesundheit - Pflegeberufe",
      url: "https://www.bundesgesundheitsministerium.de/themen/pflege.html",
      description: "Offizielle Informationen zu Pflegeberufen"
    },
    {
      title: "Deutsche Gesellschaft für Pflegewissenschaft",
      url: "https://dg-pflegewissenschaft.de/",
      description: "Wissenschaftliche Grundlagen der Pflege"
    },
    {
      title: "Pflegepädagogik Online",
      url: "https://www.pflegepaedagogik-online.de/",
      description: "Bildungsressourcen für Pflegekräfte"
    }
  ];

  const LinkItem: React.FC<{title: string, url: string, description: string}> = ({ title, url, description }) => (
    <li className="mb-3">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-start gap-2 text-medical-700 hover:text-medical-800 transition-colors group"
      >
        <ExternalLink className="h-4 w-4 mt-0.5 group-hover:scale-110 transition-transform" />
        <div>
          <span className="font-medium underline decoration-1 decoration-transparent group-hover:decoration-current transition-all">
            {title}
          </span>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </a>
    </li>
  );
  
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4 text-medical-800">{t("relevantGuidelines")}</h3>
            <ul className="space-y-3">
              {guidelines.map((guideline, index) => (
                <LinkItem key={index} {...guideline} />
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4 text-medical-800">{t("recommendedReadings")}</h3>
            <ul className="space-y-3">
              {readings.map((reading, index) => (
                <LinkItem key={index} {...reading} />
              ))}
            </ul>
          </div>

          <Separator />
          
          <div className="bg-medical-50 p-4 rounded-lg">
            <h4 className="font-medium text-medical-800 mb-2">Wichtiger Hinweis</h4>
            <p className="text-sm text-medical-700">
              Diese Ressourcen dienen ausschließlich Bildungszwecken. Für aktuelle medizinische Entscheidungen 
              konsultieren Sie immer die neuesten offiziellen Leitlinien und Ihre Fachvorgesetzten.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
