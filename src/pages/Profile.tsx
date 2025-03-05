
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Settings,
  BarChart3,
  Trophy,
  Calendar,
  Bell,
  LogOut,
  Globe,
  CheckCircle,
  Crown,
  Sparkles,
  DollarSign,
  BookOpen,
  Award,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Profile = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState("basic");
  const [language, setLanguage] = useState("german");
  const [currentLevel, setCurrentLevel] = useState("b1");
  const [dailyGoal, setDailyGoal] = useState(20);
  const [weeklyGoalDays, setWeeklyGoalDays] = useState(5);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [currentAssessmentQuestion, setCurrentAssessmentQuestion] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificateType, setSelectedCertificateType] = useState("app");

  // Simulate loading delay for animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveSettings = () => {
    toast.success("Einstellungen wurden gespeichert");
  };

  const handleLogout = () => {
    toast.success("Sie wurden erfolgreich abgemeldet");
  };

  const handleAssessmentSubmit = () => {
    setAssessmentComplete(true);
    toast.success("Sprachbewertung abgeschlossen");
    // In a real app, we would analyze the answers and set the level
    setCurrentLevel("b1");
  };

  const handleChangeDailyGoal = (newGoal) => {
    setDailyGoal(newGoal);
    toast.success(`Tagesziel auf ${newGoal} Minuten aktualisiert`);
  };

  const handleChangeWeeklyGoal = (days) => {
    setWeeklyGoalDays(days);
    toast.success(`Wöchentliches Ziel auf ${days} Tage aktualisiert`);
  };

  const handleUpgradeSubscription = () => {
    setCurrentSubscription("premium");
    toast.success("Ihr Abonnement wurde auf Premium aktualisiert");
  };

  const assessmentQuestions = [
    {
      id: 1,
      question: "Wie würden Sie Ihre aktuelle Deutschkenntnisse einschätzen?",
      options: [
        { value: "a1", label: "Anfänger (A1) - Grundlegende Ausdrücke" },
        { value: "a2", label: "Grundlegend (A2) - Einfache Konversationen" },
        { value: "b1", label: "Mittelstufe (B1) - Alltägliche Gespräche" },
        { value: "b2", label: "Fortgeschritten (B2) - Komplexe Themen" },
        { value: "c1", label: "Kompetent (C1) - Fließende Kommunikation" }
      ]
    },
    {
      id: 2,
      question: "Was sind Ihre Stärken beim Deutschlernen?",
      options: [
        { value: "reading", label: "Lesen" },
        { value: "writing", label: "Schreiben" },
        { value: "speaking", label: "Sprechen" },
        { value: "listening", label: "Hörverstehen" },
        { value: "vocabulary", label: "Wortschatz" }
      ]
    },
    {
      id: 3,
      question: "Was sind Ihre Hauptziele beim Deutschlernen?",
      options: [
        { value: "work", label: "Berufliche Kommunikation" },
        { value: "certification", label: "Sprachzertifikate" },
        { value: "daily", label: "Alltägliche Gespräche" },
        { value: "technical", label: "Fachbegriffe verstehen" },
        { value: "confidence", label: "Selbstsicherer sprechen" }
      ]
    },
    {
      id: 4,
      question: "Welche medizinischen Bereiche sind für Sie am relevantesten?",
      options: [
        { value: "nursing", label: "Krankenpflege" },
        { value: "elder", label: "Altenpflege" },
        { value: "disability", label: "Behindertenbetreuung" },
        { value: "emergency", label: "Notfallmedizin" },
        { value: "admin", label: "Administrative Aufgaben" }
      ]
    },
    {
      id: 5,
      question: "Wie viel Zeit können Sie täglich für das Deutschlernen aufwenden?",
      options: [
        { value: "5", label: "Weniger als 5 Minuten" },
        { value: "15", label: "Etwa 15 Minuten" },
        { value: "30", label: "Etwa 30 Minuten" },
        { value: "60", label: "Etwa 1 Stunde" },
        { value: "more", label: "Mehr als 1 Stunde" }
      ]
    }
  ];

  const certificates = [
    {
      id: "app-basic",
      type: "app",
      name: "Grundlagen der medizinischen Kommunikation",
      description: "Ein Grundlagenzertifikat für medizinisches Deutsch und Kommunikation im Gesundheitswesen.",
      requirements: "Abschluss von mindestens 10 Übungen und 75% Erfolgsquote.",
      level: "A2-B1",
      icon: BookOpen
    },
    {
      id: "app-advanced",
      type: "app",
      name: "Fortgeschrittene medizinische Kommunikation",
      description: "Ein fortgeschrittenes Zertifikat für detaillierte medizinische Fachsprache und komplexe Interaktionen.",
      requirements: "Abschluss von mindestens 25 Übungen, 80% Erfolgsquote und Abschlussprüfung.",
      level: "B1-B2",
      icon: Award
    },
    {
      id: "app-specialist",
      type: "app",
      name: "Fachspezialist Medizinisches Deutsch",
      description: "Ein Spezialistenzertifikat für Ihren gewählten medizinischen Bereich mit umfangreicher Fachsprache.",
      requirements: "Abschluss von 40 Übungen, 85% Erfolgsquote, spezialisierte Prüfung.",
      level: "B2-C1",
      icon: Trophy
    },
    {
      id: "official-telc",
      type: "official",
      name: "telc Deutsch B1+ Medizin Pflege",
      description: "Offizielles telc-Zertifikat für Pflegekräfte, das grundlegende Sprachkenntnisse bescheinigt.",
      requirements: "Externe Prüfung bei einem telc-Prüfungszentrum.",
      level: "B1+",
      icon: CheckCircle
    },
    {
      id: "official-goethe",
      type: "official",
      name: "Goethe-Zertifikat B1/B2",
      description: "Offizielles Goethe-Institut Zertifikat, das allgemeine Sprachkenntnisse bescheinigt.",
      requirements: "Externe Prüfung beim Goethe-Institut.",
      level: "B1/B2",
      icon: Globe
    },
    {
      id: "official-dsd",
      type: "official",
      name: "Deutsches Sprachdiplom (DSD)",
      description: "Offizielles Sprachdiplom der Kultusministerkonferenz, anerkannt für berufliche Zwecke.",
      requirements: "Externe Prüfung bei einer DSD-akkreditierten Einrichtung.",
      level: "B2/C1",
      icon: Award
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-neutral-800">Mein Profil</h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left sidebar */}
            <div className="md:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-neutral-100 h-fit">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-medical-100 text-medical-500 flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12" />
                </div>
                <h2 className="text-xl font-semibold">Max Mustermann</h2>
                <p className="text-neutral-500">Pflegefachkraft</p>
                <div className="flex items-center justify-center mt-2">
                  <span className="px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">
                    {currentLevel.toUpperCase()} • {currentSubscription === "premium" ? "Premium" : "Basis"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Einstellungen
                </Button>
                <Button
                  variant={activeTab === "assessment" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("assessment")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Sprachbewertung
                </Button>
                <Button
                  variant={activeTab === "goals" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("goals")}
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Lernziele
                </Button>
                <Button
                  variant={activeTab === "certificates" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("certificates")}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Zertifikate
                </Button>
                <Button
                  variant={activeTab === "subscription" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("subscription")}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Abonnement
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-neutral-500"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Abmelden
                </Button>
              </div>
            </div>

            {/* Right content area */}
            <div className="md:col-span-9">
              {activeTab === "settings" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-semibold mb-6">Kontoeinstellungen</h2>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Persönliche Informationen</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Vollständiger Name</Label>
                          <Input id="fullName" defaultValue="Max Mustermann" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-Mail-Adresse</Label>
                          <Input id="email" type="email" defaultValue="max.mustermann@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profession">Beruf</Label>
                          <Input id="profession" defaultValue="Pflegefachkraft" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workSetting">Arbeitsumfeld</Label>
                          <Select defaultValue="hospital">
                            <SelectTrigger>
                              <SelectValue placeholder="Wählen Sie Ihr Arbeitsumfeld" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hospital">Krankenhaus</SelectItem>
                              <SelectItem value="clinic">Klinik</SelectItem>
                              <SelectItem value="eldercare">Altenpflege</SelectItem>
                              <SelectItem value="disability">Behindertenbetreuung</SelectItem>
                              <SelectItem value="ambulance">Rettungsdienst</SelectItem>
                              <SelectItem value="other">Sonstiges</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">App-Einstellungen</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-normal">Benachrichtigungen</Label>
                            <p className="text-sm text-neutral-500">Erhalten Sie Erinnerungen und Updates</p>
                          </div>
                          <Switch
                            checked={notificationsEnabled}
                            onCheckedChange={setNotificationsEnabled}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-normal">Ton</Label>
                            <p className="text-sm text-neutral-500">Aktivieren Sie Sound-Effekte</p>
                          </div>
                          <Switch
                            checked={soundEnabled}
                            onCheckedChange={setSoundEnabled}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-normal">Dunkelmodus</Label>
                            <p className="text-sm text-neutral-500">Wechseln Sie zum dunklen Thema</p>
                          </div>
                          <Switch
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-normal">Automatische Audiowiedergabe</Label>
                            <p className="text-sm text-neutral-500">Spielt Audioinhalte automatisch ab</p>
                          </div>
                          <Switch
                            checked={autoPlay}
                            onCheckedChange={setAutoPlay}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSaveSettings}>Einstellungen speichern</Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "assessment" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-semibold mb-6">Sprachbewertung</h2>

                  {!assessmentComplete ? (
                    <div className="space-y-6">
                      <p className="text-neutral-600">
                        Beantworten Sie einige Fragen, damit wir Ihren aktuellen Sprachstand besser verstehen und Ihnen passende Inhalte anbieten können.
                      </p>

                      <div className="flex items-center gap-2 mb-6">
                        <Progress value={(currentAssessmentQuestion + 1) / assessmentQuestions.length * 100} className="h-2" />
                        <span className="text-sm text-neutral-500">
                          {currentAssessmentQuestion + 1}/{assessmentQuestions.length}
                        </span>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            {assessmentQuestions[currentAssessmentQuestion].question}
                          </h3>

                          <RadioGroup
                            value={assessmentAnswers[assessmentQuestions[currentAssessmentQuestion].id]}
                            onValueChange={(value) => {
                              setAssessmentAnswers({
                                ...assessmentAnswers,
                                [assessmentQuestions[currentAssessmentQuestion].id]: value
                              });
                            }}
                          >
                            <div className="space-y-3">
                              {assessmentQuestions[currentAssessmentQuestion].options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2 bg-neutral-50 hover:bg-neutral-100 p-3 rounded-lg transition-colors">
                                  <RadioGroupItem value={option.value} id={option.value} />
                                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (currentAssessmentQuestion > 0) {
                                setCurrentAssessmentQuestion(currentAssessmentQuestion - 1);
                              }
                            }}
                            disabled={currentAssessmentQuestion === 0}
                          >
                            Zurück
                          </Button>
                          <Button
                            onClick={() => {
                              if (currentAssessmentQuestion < assessmentQuestions.length - 1) {
                                setCurrentAssessmentQuestion(currentAssessmentQuestion + 1);
                              } else {
                                handleAssessmentSubmit();
                              }
                            }}
                            disabled={!assessmentAnswers[assessmentQuestions[currentAssessmentQuestion].id]}
                          >
                            {currentAssessmentQuestion < assessmentQuestions.length - 1 ? "Weiter" : "Abschließen"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Bewertung abgeschlossen!</h3>
                        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                          Basierend auf Ihren Antworten haben wir Ihr Sprachniveau als B1 eingestuft.
                          Wir haben Ihre Lernpläne und Übungen entsprechend angepasst.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Ihre Ergebnisse</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-neutral-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-neutral-500 mb-2">Sprachniveau</h4>
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-600 flex items-center justify-center mr-3">
                                <Trophy className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-lg font-semibold">B1 Mittelstufe</p>
                                <p className="text-sm text-neutral-500">Selbständige Sprachanwendung</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-neutral-500 mb-2">Stärken</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Hörverstehen</span>
                                <span className="text-medical-600 font-medium">Fortgeschritten</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Wortschatz</span>
                                <span className="text-medical-600 font-medium">Mittelstufe</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-neutral-500 mb-2">Verbesserungsbereiche</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Grammatik</span>
                                <span className="text-amber-600 font-medium">Grundlegend</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Aussprache</span>
                                <span className="text-amber-600 font-medium">Grundlegend</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-neutral-500 mb-2">Empfehlungen</h4>
                            <ul className="text-sm space-y-1 list-disc pl-5">
                              <li>Fokus auf medizinische Fachsprache</li>
                              <li>Übungen zur Patientenkommunikation</li>
                              <li>Praxis der Aussprache medizinischer Begriffe</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          onClick={() => {
                            setAssessmentComplete(false);
                            setCurrentAssessmentQuestion(0);
                            setAssessmentAnswers({});
                          }}
                        >
                          Neue Bewertung starten
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "goals" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-semibold mb-6">Lernziele</h2>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tagesziel</h3>
                      <p className="text-neutral-600">
                        Legen Sie fest, wie viel Zeit Sie täglich für das Deutschlernen aufwenden möchten.
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          {[10, 20, 30].map((minutes) => (
                            <button
                              key={minutes}
                              className={`p-4 rounded-lg border text-center transition-colors ${
                                dailyGoal === minutes
                                  ? "bg-medical-50 border-medical-200 text-medical-700"
                                  : "bg-white border-neutral-200 hover:bg-neutral-50"
                              }`}
                              onClick={() => handleChangeDailyGoal(minutes)}
                            >
                              <div className="text-xl font-semibold">{minutes}</div>
                              <div className="text-sm">Minuten</div>
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {[45, 60].map((minutes) => (
                            <button
                              key={minutes}
                              className={`p-4 rounded-lg border text-center transition-colors ${
                                dailyGoal === minutes
                                  ? "bg-medical-50 border-medical-200 text-medical-700"
                                  : "bg-white border-neutral-200 hover:bg-neutral-50"
                              }`}
                              onClick={() => handleChangeDailyGoal(minutes)}
                            >
                              <div className="text-xl font-semibold">{minutes}</div>
                              <div className="text-sm">Minuten</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Wöchentliches Ziel</h3>
                      <p className="text-neutral-600">
                        An wie vielen Tagen pro Woche möchten Sie lernen?
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                          <button
                            key={days}
                            className={`h-10 min-w-[40px] px-3 rounded-full transition-colors ${
                              weeklyGoalDays === days
                                ? "bg-medical-100 text-medical-700"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                            onClick={() => handleChangeWeeklyGoal(days)}
                          >
                            {days}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Langfristige Ziele</h3>
                      <p className="text-neutral-600">
                        Was möchten Sie mit dem Deutschlernen erreichen?
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 bg-neutral-50 hover:bg-neutral-100 p-3 rounded-lg transition-colors">
                          <CheckCircle className="h-5 w-5 text-medical-500" />
                          <Label className="flex-1 cursor-pointer">
                            Zertifikat B2 innerhalb von 6 Monaten erreichen
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-neutral-50 hover:bg-neutral-100 p-3 rounded-lg transition-colors">
                          <CheckCircle className="h-5 w-5 text-medical-500" />
                          <Label className="flex-1 cursor-pointer">
                            Selbstbewusste Kommunikation mit Patienten und Kollegen
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-neutral-50 hover:bg-neutral-100 p-3 rounded-lg transition-colors">
                          <CheckCircle className="h-5 w-5 text-medical-500" />
                          <Label className="flex-1 cursor-pointer">
                            Medizinische Fachsprache sicher beherrschen
                          </Label>
                        </div>

                        <Button variant="outline" className="w-full mt-2">
                          <Trophy className="h-4 w-4 mr-2" />
                          Neues Ziel hinzufügen
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "certificates" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-semibold mb-6">Zertifikate & Prüfungen</h2>

                  <Tabs defaultValue="app">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="app">App-Zertifikate</TabsTrigger>
                      <TabsTrigger value="official">Offizielle Sprachprüfungen</TabsTrigger>
                    </TabsList>

                    <TabsContent value="app" className="space-y-6">
                      <p className="text-neutral-600">
                        Verdienen Sie Zertifikate, indem Sie unsere Übungen abschließen und Ihre Sprachkenntnisse verbessern.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certificates
                          .filter(cert => cert.type === "app")
                          .map(certificate => (
                            <Card key={certificate.id} className="overflow-hidden">
                              <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                  <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-600 flex items-center justify-center mr-3">
                                    <certificate.icon className="h-5 w-5" />
                                  </div>
                                  <div className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                                    {certificate.level}
                                  </div>
                                </div>
                                <CardTitle className="text-lg mt-3">{certificate.name}</CardTitle>
                                <CardDescription>{certificate.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <p className="font-medium text-neutral-700">Anforderungen:</p>
                                <p className="text-neutral-600">{certificate.requirements}</p>
                              </CardContent>
                              <CardFooter className="border-t pt-4 flex justify-between">
                                <div className="text-sm text-neutral-500 flex items-center">
                                  <Trophy className="h-4 w-4 mr-1" />
                                  In Arbeit
                                </div>
                                <Button size="sm">Üben</Button>
                              </CardFooter>
                            </Card>
                          ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="official" className="space-y-6">
                      <p className="text-neutral-600">
                        Bereiten Sie sich auf offizielle Sprachprüfungen vor, die Ihre Deutschkenntnisse bescheinigen.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certificates
                          .filter(cert => cert.type === "official")
                          .map(certificate => (
                            <Card key={certificate.id} className="overflow-hidden">
                              <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                  <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center mr-3">
                                    <certificate.icon className="h-5 w-5" />
                                  </div>
                                  <div className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                                    {certificate.level}
                                  </div>
                                </div>
                                <CardTitle className="text-lg mt-3">{certificate.name}</CardTitle>
                                <CardDescription>{certificate.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <p className="font-medium text-neutral-700">Anforderungen:</p>
                                <p className="text-neutral-600">{certificate.requirements}</p>
                              </CardContent>
                              <CardFooter className="border-t pt-4">
                                <Button size="sm" className="w-full">Auf Prüfung vorbereiten</Button>
                              </CardFooter>
                            </Card>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeTab === "subscription" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-semibold mb-6">Abonnement verwalten</h2>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Aktuelles Abonnement</h3>

                      <div className={`bg-gradient-to-r ${
                        currentSubscription === "premium" 
                          ? "from-purple-500 to-indigo-600" 
                          : "from-neutral-100 to-neutral-200"
                      } rounded-xl p-6 text-${currentSubscription === "premium" ? "white" : "neutral-800"}`}>
                        <div className="flex items-center mb-4">
                          {currentSubscription === "premium" ? (
                            <Crown className="h-6 w-6 mr-2" />
                          ) : (
                            <User className="h-6 w-6 mr-2" />
                          )}
                          <h4 className="text-xl font-bold">
                            {currentSubscription === "premium" ? "Premium" : "Basis"} Plan
                          </h4>
                        </div>

                        <p className={`text-${currentSubscription === "premium" ? "white/80" : "neutral-600"} mb-4`}>
                          {currentSubscription === "premium"
                            ? "Sie genießen alle Premium-Funktionen mit unbegrenztem Zugriff auf alle Inhalte."
                            : "Ihr Basisplan gibt Ihnen Zugriff auf grundlegende Funktionen."}
                        </p>

                        {currentSubscription === "premium" && (
                          <div className="flex items-center mb-4">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">Erneuert sich am 15. Juni 2024</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {currentSubscription !== "premium" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Auf Premium upgraden</h3>
                        <p className="text-neutral-600">
                          Erhalten Sie Zugriff auf alle Premium-Funktionen und -Inhalte.
                        </p>

                        <Card className="border-2 border-medical-200">
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-xl flex items-center">
                                <Crown className="h-5 w-5 mr-2 text-medical-500" />
                                Premium-Abonnement
                              </CardTitle>
                              <div className="px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">
                                Empfohlen
                              </div>
                            </div>
                            <CardDescription>Unbegrenzter Zugriff auf alle Premium-Funktionen</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold">€9,99</span>
                              <span className="text-neutral-500 ml-1">/ Monat</span>
                            </div>

                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-medical-500 mr-2 shrink-0 mt-0.5" />
                                <span>Unbegrenzter Zugriff auf alle Übungen und Szenarien</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-medical-500 mr-2 shrink-0 mt-0.5" />
                                <span>Detaillierte Sprachanalyse und Fortschrittsverfolgung</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-medical-500 mr-2 shrink-0 mt-0.5" />
                                <span>Personalisierte Lernpläne für medizinisches Deutsch</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-medical-500 mr-2 shrink-0 mt-0.5" />
                                <span>Prüfungsvorbereitung für offizielle Sprachzertifikate</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-medical-500 mr-2 shrink-0 mt-0.5" />
                                <span>Keine Werbung und Offline-Zugriff</span>
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={handleUpgradeSubscription}>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Jetzt upgraden
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    )}

                    {currentSubscription === "premium" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Zahlungsinformationen</h3>
                        <div className="bg-neutral-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-6 bg-neutral-800 rounded mr-3"></div>
                              <div>
                                <p className="font-medium">VISA •••• 4242</p>
                                <p className="text-sm text-neutral-500">Läuft ab: 12/25</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Ändern</Button>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button variant="outline" className="text-neutral-500">
                            Abonnement kündigen
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
