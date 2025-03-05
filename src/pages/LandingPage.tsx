
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { 
  Stethoscope, 
  Shield, 
  Users, 
  Globe, 
  GraduationCap,
  Heart,
  Award,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const LandingPage = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Schmidt",
      position: "Ärztin, Universitätsklinikum Berlin",
      text: "MedLingua hat mir geholfen, meine Deutschkenntnisse für den medizinischen Alltag deutlich zu verbessern. Besonders die spezialisierten Dialogübungen waren sehr hilfreich.",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Andrei Popescu",
      position: "Pflegefachkraft, Charité Berlin",
      text: "Als ich nach Deutschland kam, hatte ich große Schwierigkeiten mit der medizinischen Fachsprache. Mit MedLingua konnte ich gezielt das lernen, was ich täglich brauche.",
      avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Maria Gonzalez",
      position: "Krankenschwester, Helios Klinikum",
      text: "Die App ist perfekt für alle, die im medizinischen Bereich arbeiten. Die Inhalte sind praxisnah und ich konnte mein Lerntempo selbst bestimmen.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  const partnersAndInstitutions = [
    {
      name: "Universitätsklinikum Berlin",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "institution"
    },
    {
      name: "Deutsche Gesellschaft für Pflege",
      logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "institution"
    },
    {
      name: "Bundesverband ausländischer Pflegekräfte",
      logo: "https://images.unsplash.com/photo-1560131653-539eb351ce42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "institution"
    },
    {
      name: "Helios Kliniken",
      logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "partner"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-medical-500 text-white p-1.5 rounded-lg">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-medical-800">MedLingua</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-neutral-700 hover:text-medical-600 transition-colors">Funktionen</a>
              <a href="#testimonials" className="text-neutral-700 hover:text-medical-600 transition-colors">Erfolgsgeschichten</a>
              <a href="#partners" className="text-neutral-700 hover:text-medical-600 transition-colors">Partner</a>
              <a href="#pricing" className="text-neutral-700 hover:text-medical-600 transition-colors">Preise</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="hidden sm:inline-flex">Anmelden</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-medical-500 hover:bg-medical-600">Registrieren</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <main className="flex-grow pt-24">
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800 leading-tight">
                  Medizinisches Deutsch für <span className="text-medical-600">alle Sprachniveaus</span>
                </h1>
                <p className="text-lg text-neutral-600 mb-8 max-w-lg">
                  Die spezialisierte Sprachlern-Plattform für medizinisches Fachpersonal. Verbessere deine Kommunikation im Gesundheitswesen - von A1 bis C1.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-medical-500 hover:bg-medical-600">
                      Kostenlos starten
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button size="lg" variant="outline">
                      Mehr erfahren
                    </Button>
                  </a>
                </div>
                
                <div className="mt-8 flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {testimonials.map((testimonial, index) => (
                      <img 
                        key={index}
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">
                    <span className="font-semibold">4.9/5</span> von mehr als 2.400 medizinischen Fachkräften
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Medizinisches Personal in Deutschland"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-900/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-neutral-700">
                      "Mit MedLingua konnte ich meine Sprachbarrieren im medizinischen Alltag überwinden und fühle mich nun viel sicherer in der Kommunikation mit Patienten und Kollegen."
                    </p>
                    <div className="mt-2 flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                        alt="Elena Petrescu"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-xs font-semibold">Elena Petrescu</p>
                        <p className="text-xs text-neutral-500">Pflegekraft aus Rumänien</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section id="features" className="py-16 bg-neutral-50 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                Spezialisiert für den medizinischen Bereich
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                MedLingua unterscheidet sich von allgemeinen Sprachlern-Apps durch den Fokus auf den medizinischen Kontext.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Medizinisches Fachvokabular</h3>
                <p className="text-neutral-600">
                  Lerne über 2.000 medizinische Fachbegriffe, Diagnosen und Redewendungen, die im Klinikalltag wirklich relevant sind.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Praxisnahe Dialogszenarien</h3>
                <p className="text-neutral-600">
                  Übe mit realistischen Gesprächssituationen aus dem Krankenhausalltag - von der Patientenaufnahme bis zur Visite.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Für alle Sprachniveaus</h3>
                <p className="text-neutral-600">
                  Maßgeschneiderte Inhalte für jedes Sprachniveau von A1 bis C1 - du kannst sofort starten, egal wo du stehst.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mit Experten entwickelt</h3>
                <p className="text-neutral-600">
                  Alle Inhalte wurden in Zusammenarbeit mit Ärzten, Pflegekräften und Sprachlehrern entwickelt und geprüft.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Für Pflegekräfte optimiert</h3>
                <p className="text-neutral-600">
                  Besonderer Fokus auf die sprachlichen Bedürfnisse von internationalen Pflegekräften in Deutschland.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Zertifikatsanerkennung</h3>
                <p className="text-neutral-600">
                  Optimale Vorbereitung auf Sprachprüfungen für die berufliche Anerkennung im deutschen Gesundheitswesen.
                </p>
              </div>
            </div>
            
            <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-neutral-200">
              <h3 className="text-xl font-bold mb-4 text-center">Im Vergleich zu allgemeinen Sprachlern-Apps</h3>
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
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                Erfolgsgeschichten
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Erfahre, wie MedLingua medizinischen Fachkräften dabei hilft, sprachliche Barrieren zu überwinden.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-500">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 italic">"{testimonial.text}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-4 w-4 text-medical-500 mr-1" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Partners and institutions */}
        <section id="partners" className="py-16 bg-neutral-50 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                Vertrauen von führenden Institutionen
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                MedLingua wird von führenden medizinischen Einrichtungen und Organisationen empfohlen.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partnersAndInstitutions.map((partner, index) => (
                <div key={index} className="bg-white rounded-lg p-6 flex flex-col items-center justify-center h-32 shadow-sm border border-neutral-100">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <p className="mt-3 text-xs text-center text-neutral-500">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section id="pricing" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                Einfache und transparente Preise
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Wähle den Plan, der am besten zu deinen Lernzielen passt.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Basis</h3>
                  <p className="text-neutral-500 mt-1">Für Einsteiger</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">Kostenlos</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Grundlegendes medizinisches Vokabular</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>5 Dialogszenarien pro Monat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Fortschrittsübersicht</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full" variant="outline">
                    Kostenlos starten
                  </Button>
                </Link>
              </div>
              
              <div className="bg-medical-50 p-6 rounded-xl shadow-md border border-medical-200 relative">
                <div className="absolute -top-3 right-4 bg-medical-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Empfohlen
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Professional</h3>
                  <p className="text-neutral-500 mt-1">Für aktive Lerner</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">€9,99</span>
                  <span className="text-neutral-500"> / Monat</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Vollständiger Zugriff auf das Fachvokabular</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unbegrenzte Dialogszenarien</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aussprachetraining</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Personalisierte Lernempfehlungen</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full bg-medical-500 hover:bg-medical-600">
                    Jetzt starten
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Team</h3>
                  <p className="text-neutral-500 mt-1">Für Institutionen</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">€499</span>
                  <span className="text-neutral-500"> / Jahr</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Alles aus Professional</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Bis zu 20 Benutzerkonten</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Administratorbereich</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Fortschrittsberichte für das Team</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full" variant="outline">
                    Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit, deine medizinischen Sprachkenntnisse zu verbessern?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Starte noch heute und mache dich fit für deinen beruflichen Alltag im deutschen Gesundheitswesen.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-medical-600 hover:bg-white/90">
                  Kostenlos registrieren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
