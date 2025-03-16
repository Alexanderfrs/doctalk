
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Award, Book, FileText } from "lucide-react";

interface GoalsTabProps {
  dailyGoal: number;
  onSaveGoals: () => void;
  onTakeCertificateTest: (certId: string) => void;
}

const certificateTypes = [{
  id: "app-achievement",
  name: "App Achievement",
  description: "Internal certificates for completing app milestones",
  certificates: [{
    id: "medical-basics",
    name: "Medical Basics",
    level: "A2",
    completed: true,
    date: "2023-10-15"
  }, {
    id: "hospital-communication",
    name: "Hospital Communication",
    level: "B1",
    completed: false
  }, {
    id: "emergency-care",
    name: "Emergency Care",
    level: "B2",
    completed: false
  }]
}, {
  id: "official-exam",
  name: "Official Exam Preparation",
  description: "Practice tests for official German language certificates",
  certificates: [{
    id: "telc-b1",
    name: "telc Deutsch B1 Pflege",
    level: "B1",
    completed: false
  }, {
    id: "telc-b2",
    name: "telc Deutsch B2 Pflege",
    level: "B2",
    completed: false
  }, {
    id: "goethe-b2",
    name: "Goethe-Zertifikat B2",
    level: "B2",
    completed: false
  }]
}];

const GoalsTab: React.FC<GoalsTabProps> = ({
  dailyGoal,
  onSaveGoals,
  onTakeCertificateTest
}) => {
  const [goalValue, setGoalValue] = React.useState(dailyGoal);

  return (
    <div className="space-y-6">
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Lernziele</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Definieren Sie Ihre persönlichen Sprachlernziele
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="targetLevel">Ziel-Sprachniveau</Label>
            <Select defaultValue="b1">
              <SelectTrigger id="targetLevel">
                <SelectValue placeholder="Wählen Sie Ihr Ziel-Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a1">A1 - Anfänger</SelectItem>
                <SelectItem value="a2">A2 - Grundlegende Kenntnisse</SelectItem>
                <SelectItem value="b1">B1 - Fortgeschrittene Grundkenntnisse</SelectItem>
                <SelectItem value="b2">B2 - Selbständige Sprachverwendung</SelectItem>
                <SelectItem value="c1">C1 - Fachkundige Sprachkenntnisse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tägliches Lernziel (Minuten)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                value={[goalValue]} 
                min={5} 
                max={60} 
                step={5} 
                onValueChange={val => setGoalValue(val[0])} 
                className="flex-grow" 
              />
              <span className="font-medium w-12 text-center">{goalValue}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Ziel erreichen bis</Label>
            <Input id="deadline" type="date" defaultValue="2023-12-31" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="focusAreas">Schwerpunktbereiche</Label>
            <Select defaultValue="medical-communication">
              <SelectTrigger id="focusAreas">
                <SelectValue placeholder="Wählen Sie Ihre Schwerpunkte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical-vocabulary">Medizinisches Vokabular</SelectItem>
                <SelectItem value="medical-communication">Patientenkommunikation</SelectItem>
                <SelectItem value="documentation">Dokumentation & Berichte</SelectItem>
                <SelectItem value="emergencies">Notfallsituationen</SelectItem>
                <SelectItem value="workplace-communication">Arbeitsplatz-Kommunikation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSaveGoals}>Ziele speichern</Button>
        </CardFooter>
      </Card>
      
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Zertifikate</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Bereiten Sie sich auf offizielle Sprachzertifikate vor oder erwerben Sie App-Zertifikate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {certificateTypes.map(type => (
            <div key={type.id} className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Award className="h-5 w-5 text-medical-500" />
                {type.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">{type.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {type.certificates.map(cert => (
                  <div 
                    key={cert.id} 
                    className={`border rounded-lg p-3 ${
                      cert.completed 
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
                        : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{cert.name}</h4>
                      <Badge variant="outline">{cert.level}</Badge>
                    </div>
                    
                    {cert.completed ? (
                      <div className="text-sm text-green-700 dark:text-green-400 flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        Erworben am {cert.date}
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2" 
                        onClick={() => onTakeCertificateTest(cert.id)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Test starten
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsTab;
