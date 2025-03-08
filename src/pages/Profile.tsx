import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Award, Book, Crown, FileText, Flag, Lightbulb, BarChart3, Save, Settings, Star, User, BookOpen as Book2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSelector from "@/components/language/LanguageSelector";
import AvatarSelector from "@/components/profile/AvatarSelector";
import { useLanguageAssessment } from "@/hooks/useLanguageAssessment";

const certificateTypes = [
  {
    id: "app-achievement",
    name: "App Achievement",
    description: "Internal certificates for completing app milestones",
    certificates: [
      { id: "medical-basics", name: "Medical Basics", level: "A2", completed: true, date: "2023-10-15" },
      { id: "hospital-communication", name: "Hospital Communication", level: "B1", completed: false },
      { id: "emergency-care", name: "Emergency Care", level: "B2", completed: false },
    ]
  },
  {
    id: "official-exam",
    name: "Official Exam Preparation",
    description: "Practice tests for official German language certificates",
    certificates: [
      { id: "telc-b1", name: "telc Deutsch B1 Pflege", level: "B1", completed: false },
      { id: "telc-b2", name: "telc Deutsch B2 Pflege", level: "B2", completed: false },
      { id: "goethe-b2", name: "Goethe-Zertifikat B2", level: "B2", completed: false },
    ]
  }
];

const Profile = () => {
  const [email, setEmail] = useState("user@example.com");
  const [name, setName] = useState("Maria Schmidt");
  const [profession, setProfession] = useState("Krankenschwester");
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Maria");
  const [dailyGoal, setDailyGoal] = useState(20);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [subscription, setSubscription] = useState("basic");
  
  const { userLanguage, germanDialect } = useLanguage();
  const { theme, setTheme } = useTheme();

  const { 
    assessmentStarted,
    assessmentStep,
    currentQuestion,
    totalQuestions,
    userAnswers,
    currentLevel,
    startAssessment,
    handleAnswer,
    handleNextStep,
    completeAssessment
  } = useLanguageAssessment();

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('userAvatar', avatar);
    toast.success("Einstellungen gespeichert");
  };

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
  };

  const handleSaveGoals = () => {
    toast.success("Ziele gespeichert");
  };

  const handleUpgradeSubscription = () => {
    setSubscription("premium");
    toast.success("Upgrade auf Premium erfolgreich!");
  };

  const handleTakeCertificateTest = (certId) => {
    toast.info(`Test für ${certId} wird vorbereitet...`);
  };

  const renderQuestionOptions = () => {
    if (!currentQuestion) return null;
    
    const isOptionsObjects = currentQuestion.options.length > 0 && 
      typeof currentQuestion.options[0] !== 'string';
    
    if (isOptionsObjects) {
      return (currentQuestion.options as Array<{id: string; text: string}>).map(option => (
        <div
          key={option.id}
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            userAnswers.some(a => a.questionId === currentQuestion.id && a.selectedAnswer === option.id)
              ? "border-medical-500 bg-medical-50"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
          onClick={() => handleAnswer(currentQuestion.id, option.id)}
        >
          {option.text}
        </div>
      ));
    } else {
      return (currentQuestion.options as string[]).map((option, index) => (
        <div
          key={index}
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            userAnswers.some(a => a.questionId === currentQuestion.id && a.selectedAnswer === option)
              ? "border-medical-500 bg-medical-50"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
          onClick={() => handleAnswer(currentQuestion.id, option)}
        >
          {option}
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-12">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 mb-8">
            <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
              <AvatarSelector 
                currentAvatar={avatar} 
                onChange={handleAvatarChange} 
              />
              
              <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-1">{name}</h1>
                <p className="text-neutral-600 mb-2">{profession}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-medical-50 text-medical-700 hover:bg-medical-100">
                    <Flag className="h-3.5 w-3.5 mr-1" />
                    {userLanguage && (
                      <span>
                        {
                          useLanguage().supportedLanguages.find(
                            lang => lang.code === userLanguage
                          )?.nativeName || userLanguage
                        }
                      </span>
                    )}
                  </Badge>
                  <Badge variant="outline" className="bg-medical-50 text-medical-700 hover:bg-medical-100">
                    <Book className="h-3.5 w-3.5 mr-1" />
                    Niveau {currentLevel || "A2-B1"}
                  </Badge>
                  <Badge variant="outline" className="bg-neutral-50 hover:bg-neutral-100">
                    {subscription === "premium" ? (
                      <>
                        <Crown className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                        <span>Premium</span>
                      </>
                    ) : (
                      <span>Basic Plan</span>
                    )}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-sm">Tagesziel: {dailyGoal} Minuten</Label>
                    <span className="text-xs text-medical-600 font-medium">75% erreicht</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-sm">Vokabeln: 120/500</Label>
                    <span className="text-xs text-medical-600 font-medium">24%</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="settings">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span>Einstellungen</span>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Sprachtest</span>
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Ziele</span>
                </TabsTrigger>
                <TabsTrigger value="subscription" className="flex items-center gap-1">
                  <Crown className="h-4 w-4" />
                  <span>Abonnement</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil</CardTitle>
                    <CardDescription>
                      Verwalten Sie Ihre persönlichen Daten
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Ihr Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Ihre E-Mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profession">Beruf</Label>
                        <Input
                          id="profession"
                          placeholder="Ihre Beruf"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sprache</CardTitle>
                    <CardDescription>
                      Spracheinstellungen und Übersetzungsvoreinstellungen
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <LanguageSelector />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>App-Einstellungen</CardTitle>
                    <CardDescription>
                      Passen Sie die Anwendung an Ihre Bedürfnisse an
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications" className="flex flex-col space-y-1">
                        <span>Benachrichtigungen</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Erhalten Sie Erinnerungen für Ihre Lernziele
                        </span>
                      </Label>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="soundEffects" className="flex flex-col space-y-1">
                        <span>Soundeffekte</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Aktivieren Sie Soundeffekte während der Übungen
                        </span>
                      </Label>
                      <Switch
                        id="soundEffects"
                        checked={soundEffects}
                        onCheckedChange={setSoundEffects}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wählen Sie ein Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Hell</SelectItem>
                          <SelectItem value="dark">Dunkel</SelectItem>
                          <SelectItem value="system">Systemstandard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Einstellungen speichern</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="assessment" className="space-y-6">
                {!assessmentStarted ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Sprachtest</CardTitle>
                      <CardDescription>
                        Bestimmen Sie Ihr aktuelles Sprachniveau und erhalten Sie personalisierte Lernempfehlungen
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          Warum ein Sprachtest?
                        </h3>
                        <p className="text-neutral-600 text-sm mb-2">
                          Unser adaptiver Sprachtest hilft uns dabei, Ihr aktuelles Sprachniveau zu ermitteln und den Lernplan 
                          entsprechend anzupassen. Der Test dauert etwa 5 Minuten und passt sich Ihrem Sprachniveau an.
                        </p>
                        <ul className="text-sm text-neutral-600 space-y-1 mb-2">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full h-5 w-5 bg-medical-100 text-medical-700 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                            <span>Bestimmung Ihres aktuellen Sprachniveaus (A1-C1)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full h-5 w-5 bg-medical-100 text-medical-700 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                            <span>Identifizierung von Stärken und Schwächen</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full h-5 w-5 bg-medical-100 text-medical-700 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                            <span>Personalisierung Ihres Lernplans</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={startAssessment} className="w-full md:w-auto">
                        Test starten
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Sprachtest</CardTitle>
                      <CardDescription>
                        Frage {assessmentStep} von {totalQuestions}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="mb-2">
                        <Badge className="mb-2">{currentQuestion?.level || "A1"}</Badge>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                          <div 
                            className="bg-medical-500 h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${(assessmentStep / totalQuestions) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          {currentQuestion?.question || currentQuestion?.text}
                        </h3>
                        
                        {currentQuestion?.image && (
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img 
                              src={currentQuestion.image} 
                              alt="Question illustration" 
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          {renderQuestionOptions()}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleNextStep}
                        disabled={!userAnswers.some(a => a.questionId === currentQuestion?.id)}
                      >
                        {assessmentStep === totalQuestions ? "Test abschließen" : "Weiter"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lernziele</CardTitle>
                    <CardDescription>
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
                          value={[dailyGoal]}
                          min={5}
                          max={60}
                          step={5}
                          onValueChange={(val) => setDailyGoal(val[0])}
                          className="flex-grow"
                        />
                        <span className="font-medium w-12 text-center">{dailyGoal}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Ziel erreichen bis</Label>
                      <Input
                        id="deadline"
                        type="date"
                        defaultValue="2023-12-31"
                      />
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
                    <Button onClick={handleSaveGoals}>Ziele speichern</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Zertifikate</CardTitle>
                    <CardDescription>
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
                        <p className="text-sm text-neutral-600 mb-2">{type.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {type.certificates.map(cert => (
                            <div 
                              key={cert.id}
                              className={`border rounded-lg p-3 ${
                                cert.completed 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-white border-neutral-200"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{cert.name}</h4>
                                <Badge variant="outline">{cert.level}</Badge>
                              </div>
                              
                              {cert.completed ? (
                                <div className="text-sm text-green-700 flex items-center gap-1">
                                  <Award className="h-4 w-4" />
                                  Erworben am {cert.date}
                                </div>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="w-full mt-2"
                                  onClick={() => handleTakeCertificateTest(cert.id)}
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
              </TabsContent>
              
              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ihr aktuelles Abonnement</CardTitle>
                    <CardDescription>
                      {subscription === "premium" 
                        ? "Sie nutzen derzeit den Premium-Plan mit allen Funktionen" 
                        : "Sie nutzen derzeit den kostenlosen Basic-Plan"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4 bg-neutral-50">
                        <h3 className="font-medium mb-2">Basic Plan</h3>
                        <p className="text-2xl font-bold mb-4">Kostenlos</p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Begrenzter Zugang zu Übungsszenarien</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Grundlegende Vokabelübungen</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Beschränkte tägliche Übungen</span>
                          </li>
                        </ul>
                        
                        {subscription === "basic" && (
                          <div className="w-full text-center bg-neutral-200 text-neutral-700 py-1 rounded-md text-sm font-medium">
                            Ihr aktueller Plan
                          </div>
                        )}
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-medical-50 border-medical-200">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">Premium Plan</h3>
                          <Badge className="bg-yellow-500">Empfohlen</Badge>
                        </div>
                        <p className="text-2xl font-bold mb-4">€9.99 / Monat</p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-medical-200 text-medical-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Unbegrenzter Zugang zu allen Übungsszenarien</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-medical-200 text-medical-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Erweiterte Spracherkennung & Feedback</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-medical-200 text-medical-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Persönlicher Lernplan & Fortschrittsverfolgung</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-medical-200 text-medical-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Vorbereitung auf offizielle Sprachzertifikate</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="rounded-full h-5 w-5 bg-medical-200 text-medical-700 flex items-center justify-center flex-shrink-0">✓</div>
                            <span>Keine Werbung & Offline-Zugang</span>
                          </li>
                        </ul>
                        
                        {subscription === "premium" ? (
                          <div className="w-full text-center bg-medical-200 text-medical-800 py-1 rounded-md text-sm font-medium">
                            Ihr aktueller Plan
                          </div>
                        ) : (
                          <Button 
                            className="w-full"
                            variant="default"
                            onClick={handleUpgradeSubscription}
                          >
                            <Crown className="h-4 w-4 mr-2" />
                            Auf Premium upgraden
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {subscription === "premium" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Zahlungsinformationen</CardTitle>
                      <CardDescription>
                        Ihre Abonnementdaten und Zahlungsinformationen
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-neutral-50 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Nächste Zahlung:</span>
                          <span className="font-medium">15. November 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Zahlungsmethode:</span>
                          <span className="font-medium">Visa ****4242</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Automatische Verlängerung:</span>
                          <span className="font-medium text-green-600">Aktiviert</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Zahlungsmethode ändern
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          Abonnement kündigen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
