
import React from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { Award, BookOpen, Check, Calendar, FileText, Building, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHeader from "@/components/layout/MobileHeader";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { cn } from "@/lib/utils";

const LanguageCertification = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {isMobile ? <MobileHeader /> : <AppHeader />}
      
      <main className={cn("flex-grow", isMobile ? "pt-20 pb-24" : "pt-24")}>
        <div className="container mx-auto px-4 md:px-8">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="glass-panel p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-medical-600 mr-2" />
                    <span className="text-medical-600 font-semibold">DocTalk Certification</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
                    Zertifiziere deine <span className="text-gradient">medizinischen Sprachkenntnisse</span>
                  </h1>
                  <p className="text-lg text-neutral-600 mb-6">
                    Die offizielle Sprachzertifizierung für medizinisches Fachpersonal. Anerkannt von führenden Gesundheitseinrichtungen in Deutschland.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-medical-500 mr-2" />
                      <span>Offiziell anerkannt</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-medical-500 mr-2" />
                      <span>Fachspezifisch</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-medical-500 mr-2" />
                      <span>Online durchführbar</span>
                    </div>
                  </div>
                  <Button asChild size="lg" className="btn-primary">
                    <Link to="/profile">Zur Anmeldung</Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" 
                      alt="Medizinische Fachkraft mit Zertifikat" 
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Certificate Levels */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Unsere Zertifizierungsstufen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { level: 'Bronze', icon: <Award className="h-10 w-10 text-amber-600" />, description: 'Grundlegende medizinische Kommunikation (A1-A2)', color: 'bg-amber-50 border-amber-200' },
                { level: 'Silber', icon: <Award className="h-10 w-10 text-slate-500" />, description: 'Fortgeschrittene medizinische Kommunikation (B1-B2)', color: 'bg-slate-50 border-slate-200' },
                { level: 'Gold', icon: <Award className="h-10 w-10 text-yellow-500" />, description: 'Professionelle medizinische Kommunikation (C1-C2)', color: 'bg-yellow-50 border-yellow-200' }
              ].map((cert, index) => (
                <div key={index} className={`rounded-xl p-6 text-center border ${cert.color}`}>
                  <div className="flex justify-center mb-4">{cert.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{cert.level}-Zertifikat</h3>
                  <p className="text-neutral-600 mb-4">{cert.description}</p>
                  <Button variant="outline" className="w-full">Details ansehen</Button>
                </div>
              ))}
            </div>
          </section>
          
          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Vorteile der DocTalk-Zertifizierung</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Building className="h-6 w-6 text-medical-600" />, title: 'Anerkannt durch Kliniken', description: 'Von führenden Gesundheitseinrichtungen in Deutschland anerkannt' },
                { icon: <Calendar className="h-6 w-6 text-medical-600" />, title: 'Flexible Prüfungstermine', description: 'Online-Prüfung jederzeit möglich' },
                { icon: <FileText className="h-6 w-6 text-medical-600" />, title: 'Umfassendes Zertifikat', description: 'Detaillierte Auswertung deiner Sprachkompetenzen' },
                { icon: <BookOpen className="h-6 w-6 text-medical-600" />, title: 'Fachspezifische Inhalte', description: 'Auf den medizinischen Berufsalltag zugeschnitten' },
                { icon: <Globe className="h-6 w-6 text-medical-600" />, title: 'International verwendbar', description: 'Hilft bei der beruflichen Mobilität im Gesundheitswesen' },
                { icon: <Award className="h-6 w-6 text-medical-600" />, title: 'Karrierefördernd', description: 'Verbessert deine Chancen bei Bewerbungen im Gesundheitssektor' }
              ].map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                  <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Bereit für deine Zertifizierung?</h2>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Starte jetzt mit der Vorbereitung und verbessere deine Karrierechancen im medizinischen Bereich.
              </p>
              <Button asChild size="lg" className="bg-white text-medical-600 hover:bg-white/90">
                <Link to="/profile">Jetzt anmelden</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      {!isMobile && <Footer />}
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default LanguageCertification;
