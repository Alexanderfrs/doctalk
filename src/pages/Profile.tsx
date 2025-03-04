
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Settings,
  Award,
  Target,
  CreditCard,
  User,
  Bell,
  Languages,
  Clock,
  Calendar,
  CheckCircle,
  Crown,
  Sparkles,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import ProgressBar from "@/components/ui/ProgressBar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const FeatureCard = ({ title, description, icon, premium = false }) => (
  <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 flex gap-4 relative">
    <div className="bg-medical-50 rounded-lg p-2 h-fit">{icon}</div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
    {premium && (
      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs flex items-center">
        <Crown className="h-3 w-3 mr-0.5" /> Premium
      </div>
    )}
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [languageLevel, setLanguageLevel] = useState("beginner");
  const [subscription, setSubscription] = useState("basic");
  const [dailyGoal, setDailyGoal] = useState(15);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [assessmentProgress, setAssessmentProgress] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    toast.success("Sprachbewertung gestartet");
  };

  const handleNextAssessmentStep = () => {
    if (assessmentStep < 5) {
      setAssessmentStep(assessmentStep + 1);
      setAssessmentProgress(assessmentProgress + 20);
    } else {
      setAssessmentComplete(true);
      setLanguageLevel("intermediate");
      toast.success("Sprachbewertung abgeschlossen!");
    }
  };

  const handleUpdateSubscription = (plan) => {
    setSubscription(plan);
    toast.success(`Abo auf ${plan === "premium" ? "Premium" : "Basic"} aktualisiert`);
  };

  const handleSaveGoals = () => {
    toast.success("Lernziele gespeichert");
  };

  const handleSaveSettings = () => {
    toast.success("Einstellungen gespeichert");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center text-medical-700 text-2xl font-bold">
                MB
              </div>
              <div>
                <h1 className="text-2xl font-bold">Max Bauer</h1>
                <p className="text-neutral-600">
                  Sprachniveau: {languageLevel === "beginner" 
                    ? "Anfänger (A1-A2)" 
                    : languageLevel === "intermediate" 
                    ? "Mittelstufe (B1-B2)" 
                    : "Fortgeschritten (C1-C2)"}
                </p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center gap-2">
                  {subscription === "premium" ? (
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center">
                      <Crown className="h-4 w-4 mr-1" /> Premium-Nutzer
                    </div>
                  ) : (
                    <div className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full flex items-center">
                      Basic-Nutzer
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Einstellungen</span>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center gap-1">
                  <Languages className="h-4 w-4" />
                  <span className="hidden md:inline">Sprachbewertung</span>
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span className="hidden md:inline">Lernziele</span>
                </TabsTrigger>
                <TabsTrigger value="subscription" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden md:inline">Abo</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-medical-500" /> Persönliche Informationen
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Max Bauer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" type="email" defaultValue="max.bauer@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profession">Beruf</Label>
                      <Input id="profession" defaultValue="Krankenpfleger" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workplace">Arbeitsplatz</Label>
                      <Input id="workplace" defaultValue="Universitätsklinikum" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Bell className="h-5 w-5 text-medical-500" /> Benachrichtigungen
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Tägliche Erinnerungen</p>
                        <p className="text-sm text-neutral-600">Erhalte Erinnerungen, um deine täglichen Ziele zu erreichen</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">E-Mail-Benachrichtigungen</p>
                        <p className="text-sm text-neutral-600">Erhalte E-Mails über neue Übungen und deinen Fortschritt</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Languages className="h-5 w-5 text-medical-500" /> Spracheinstellungen
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ui-language">Sprache der Benutzeroberfläche</Label>
                      <Select defaultValue="de">
                        <SelectTrigger id="ui-language">
                          <SelectValue placeholder="Wähle eine Sprache" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="en">Englisch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="learning-focus">Lernfokus</Label>
                      <Select defaultValue="medical">
                        <SelectTrigger id="learning-focus">
                          <SelectValue placeholder="Wähle einen Fokus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">Medizinisches Fachvokabular</SelectItem>
                          <SelectItem value="nursing">Pflegerisches Fachvokabular</SelectItem>
                          <SelectItem value="general">Allgemeines Vokabular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveSettings}>Einstellungen speichern</Button>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-6">
                {!assessmentStarted ? (
                  <div className="text-center py-8 space-y-6">
                    <Languages className="h-12 w-12 text-medical-500 mx-auto" />
                    <h2 className="text-2xl font-bold">Bewerte dein Sprachniveau</h2>
                    <p className="text-neutral-600 max-w-lg mx-auto">
                      Nimm an einer 5-minütigen Bewertung teil, um dein aktuelles Deutsch-Niveau 
                      zu bestimmen. So können wir Übungen für dich personalisieren, die deinen 
                      Bedürfnissen entsprechen.
                    </p>
                    <Button onClick={handleStartAssessment} size="lg">
                      Sprachbewertung starten
                    </Button>
                  </div>
                ) : !assessmentComplete ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Sprachbewertung</h2>
                      <div className="text-sm text-neutral-600">
                        Schritt {assessmentStep} von 5
                      </div>
                    </div>

                    <ProgressBar 
                      value={assessmentProgress} 
                      max={100} 
                      className="w-full" 
                      size="sm"
                      label="Fortschritt"
                      showValue={true}
                    />

                    <div className="bg-neutral-50 rounded-lg p-6 space-y-4">
                      {assessmentStep === 1 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Wie würdest du dein Deutsch-Niveau einschätzen?</h3>
                          <RadioGroup defaultValue="beginner">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="beginner" id="beginner" />
                              <Label htmlFor="beginner">Anfänger (A1-A2)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="intermediate" id="intermediate" />
                              <Label htmlFor="intermediate">Mittelstufe (B1-B2)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="advanced" id="advanced" />
                              <Label htmlFor="advanced">Fortgeschritten (C1-C2)</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {assessmentStep === 2 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Wähle die passende Übersetzung für: "Der Patient hat starke Schmerzen."</h3>
                          <RadioGroup defaultValue="a">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q2-a" />
                              <Label htmlFor="q2-a">The patient has severe pain.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q2-b" />
                              <Label htmlFor="q2-b">The patient is in a lot of pain.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q2-c" />
                              <Label htmlFor="q2-c">The patient feels bad.</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {assessmentStep === 3 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Ergänze den folgenden Satz: "Die Krankenschwester _____ dem Patienten eine Spritze."</h3>
                          <RadioGroup defaultValue="b">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q3-a" />
                              <Label htmlFor="q3-a">machst</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q3-b" />
                              <Label htmlFor="q3-b">gibt</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q3-c" />
                              <Label htmlFor="q3-c">nehmen</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {assessmentStep === 4 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Lies den folgenden Text und beantworte die Frage:</h3>
                          <p className="text-neutral-700 bg-white p-3 rounded border border-neutral-200">
                            Herr Schmidt wurde gestern mit starken Bauchschmerzen ins Krankenhaus eingeliefert. 
                            Nach einer Untersuchung wurde eine Blinddarmentzündung diagnostiziert. 
                            Der Arzt entschied, dass eine Operation notwendig sei.
                          </p>
                          <p className="font-medium mt-4">Was wurde bei Herrn Schmidt diagnostiziert?</p>
                          <RadioGroup defaultValue="a">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q4-a" />
                              <Label htmlFor="q4-a">Eine Blinddarmentzündung</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q4-b" />
                              <Label htmlFor="q4-b">Starke Kopfschmerzen</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q4-c" />
                              <Label htmlFor="q4-c">Eine Grippe</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {assessmentStep === 5 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Wähle die grammatikalisch korrekte Antwort:</h3>
                          <p className="font-medium">Nachdem der Patient untersucht worden war, ...</p>
                          <RadioGroup defaultValue="b">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q5-a" />
                              <Label htmlFor="q5-a">er hat ein Rezept bekommen.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q5-b" />
                              <Label htmlFor="q5-b">bekam er ein Rezept.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q5-c" />
                              <Label htmlFor="q5-c">er bekommt ein Rezept.</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      <div className="pt-4">
                        <Button onClick={handleNextAssessmentStep}>
                          {assessmentStep < 5 ? "Weiter" : "Bewertung abschließen"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Bewertung abgeschlossen!</h2>
                    <div className="max-w-lg mx-auto">
                      <div className="bg-white rounded-lg p-6 border border-neutral-200 mb-4">
                        <h3 className="text-lg font-medium mb-2">Dein Sprachniveau</h3>
                        <div className="text-3xl font-bold text-medical-600 mb-4">B1-B2 (Mittelstufe)</div>
                        <p className="text-neutral-600">
                          Du hast gute Grundkenntnisse in Deutsch und kannst dich in vielen Situationen verständigen. 
                          Wir empfehlen dir, mit Übungen auf B1-B2 Niveau fortzufahren, um dein Vokabular zu erweitern 
                          und komplexere Strukturen zu üben.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-neutral-200">
                          <h4 className="font-medium mb-2">Stärken</h4>
                          <ul className="text-sm text-neutral-600 space-y-1">
                            <li className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" /> Grundlegendes medizinisches Vokabular
                            </li>
                            <li className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" /> Verständnis einfacher Texte
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-neutral-200">
                          <h4 className="font-medium mb-2">Verbesserungspotenzial</h4>
                          <ul className="text-sm text-neutral-600 space-y-1">
                            <li className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-yellow-500" /> Komplexe grammatikalische Strukturen
                            </li>
                            <li className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-yellow-500" /> Fachspezifisches Vokabular
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setActiveTab("goals")}>
                      Lernziele anpassen
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="goals" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-medical-500" /> Lernziele
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language-goal">Gewünschtes Sprachniveau</Label>
                      <Select defaultValue="b2">
                        <SelectTrigger id="language-goal">
                          <SelectValue placeholder="Wähle ein Ziel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a2">A2 (Grundlegende Kenntnisse)</SelectItem>
                          <SelectItem value="b1">B1 (Fortgeschrittene Grundkenntnisse)</SelectItem>
                          <SelectItem value="b2">B2 (Selbständige Sprachanwendung)</SelectItem>
                          <SelectItem value="c1">C1 (Fachkundige Sprachkenntnisse)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="focus-area">Schwerpunktbereich</Label>
                      <Select defaultValue="conversation">
                        <SelectTrigger id="focus-area">
                          <SelectValue placeholder="Wähle einen Schwerpunkt" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vocabulary">Vokabular erweitern</SelectItem>
                          <SelectItem value="grammar">Grammatik verbessern</SelectItem>
                          <SelectItem value="conversation">Gesprächsfähigkeiten</SelectItem>
                          <SelectItem value="medical">Medizinisches Fachvokabular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="daily-goal">Tägliches Lernziel (Minuten)</Label>
                        <span className="text-sm text-neutral-600">{dailyGoal} min</span>
                      </div>
                      <Slider 
                        id="daily-goal"
                        value={[dailyGoal]} 
                        min={5} 
                        max={60} 
                        step={5}
                        onValueChange={(value) => setDailyGoal(value[0])} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Zeitrahmen zum Erreichen des Ziels</Label>
                      <Select defaultValue="6months">
                        <SelectTrigger id="timeline">
                          <SelectValue placeholder="Wähle einen Zeitrahmen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1month">1 Monat</SelectItem>
                          <SelectItem value="3months">3 Monate</SelectItem>
                          <SelectItem value="6months">6 Monate</SelectItem>
                          <SelectItem value="1year">1 Jahr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleSaveGoals}>Lernziele speichern</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="subscription" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-medical-500" /> Abonnement
                  </h2>
                  
                  <p className="text-neutral-600">
                    Wähle den Plan, der am besten zu deinen Lernbedürfnissen passt. 
                    Du kannst jederzeit zwischen den Plänen wechseln.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className={`rounded-xl border p-6 space-y-4 ${subscription === 'basic' ? 'border-medical-500 bg-medical-50' : 'border-neutral-200'}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">Basic</h3>
                        <div className="bg-neutral-100 px-3 py-1 rounded-full text-neutral-700 text-sm">
                          Kostenlos
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Grundlegende Vokabelübungen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>5 Sprachszenarien pro Tag</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Grundlegendes Fortschrittstracking</span>
                        </li>
                      </ul>
                      
                      <Button 
                        onClick={() => handleUpdateSubscription('basic')}
                        variant={subscription === 'basic' ? 'default' : 'outline'}
                        className="w-full"
                      >
                        {subscription === 'basic' ? 'Aktueller Plan' : 'Downgraden'}
                      </Button>
                    </div>
                    
                    <div className={`rounded-xl border p-6 space-y-4 ${subscription === 'premium' ? 'border-yellow-500 bg-yellow-50' : 'border-neutral-200'}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1">
                          <h3 className="text-xl font-bold">Premium</h3>
                          <Crown className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 text-sm">
                          9,99 € / Monat
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Unbegrenzter Zugriff auf alle Übungen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Personalisierte Lernpläne</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Detailliertes Fortschrittstracking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Spezifische Fachvokabularübungen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Offline-Zugriff auf Inhalte</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                          <span className="font-medium">KI-basierte Konversationsübungen</span>
                        </li>
                      </ul>
                      
                      <Button 
                        onClick={() => handleUpdateSubscription('premium')}
                        variant={subscription === 'premium' ? 'default' : 'outline'}
                        className={`w-full ${subscription === 'premium' ? '' : 'border-yellow-500 text-yellow-700 hover:bg-yellow-50'}`}
                      >
                        {subscription === 'premium' ? 'Aktueller Plan' : 'Upgrade auf Premium'}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
            <h2 className="text-xl font-semibold mb-4">Funktionen im Überblick</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard 
                title="Vokabeltraining" 
                description="Übe medizinische und pflegerische Fachbegriffe"
                icon={<BookOpen className="h-5 w-5 text-medical-600" />}
              />
              <FeatureCard 
                title="Sprachszenarien" 
                description="Interaktive Dialogübungen für verschiedene Situationen"
                icon={<Languages className="h-5 w-5 text-medical-600" />}
              />
              <FeatureCard 
                title="Fortschrittsanalyse" 
                description="Verfolge deinen Lernfortschritt über die Zeit"
                icon={<Award className="h-5 w-5 text-medical-600" />}
                premium={true}
              />
              <FeatureCard 
                title="KI-Gesprächspartner" 
                description="Übe realistische Gespräche mit einem KI-Assistenten"
                icon={<Sparkles className="h-5 w-5 text-medical-600" />}
                premium={true}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
