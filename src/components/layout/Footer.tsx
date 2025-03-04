
import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-medical-50 pt-12 pb-8 px-4 md:px-0 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-medical-500 text-white p-1.5 rounded-lg">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-medical-800">MedLingua</span>
            </div>
            <p className="text-neutral-600 text-sm">
              Sprachtraining für medizinisches Fachpersonal - verbessern Sie Ihre Kommunikation für eine optimale Patientenversorgung.
            </p>
            <div className="flex items-center mt-4 text-sm text-neutral-500">
              <Heart className="h-4 w-4 text-medical-400 mr-1" />
              <span>Mit Liebe erstellt für alle Pflegekräfte</span>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-neutral-800 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Übungen
                </Link>
              </li>
              <li>
                <Link to="/vocabulary" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Vokabeln
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Profil
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-neutral-800 mb-4">Kategorien</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice?category=patient-care" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Patientenversorgung
                </Link>
              </li>
              <li>
                <Link to="/practice?category=emergency" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Notfallsituationen
                </Link>
              </li>
              <li>
                <Link to="/practice?category=documentation" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Dokumentation
                </Link>
              </li>
              <li>
                <Link to="/practice?category=teamwork" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Teamarbeit
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-neutral-800 mb-4">Niveaustufen</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice?difficulty=beginner" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Anfänger (B1)
                </Link>
              </li>
              <li>
                <Link to="/practice?difficulty=intermediate" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Fortgeschritten (B1+)
                </Link>
              </li>
              <li>
                <Link to="/practice?difficulty=advanced" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Erfahren (B2)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} MedLingua. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-4 text-sm text-neutral-500">
            <Link to="/privacy" className="hover:text-medical-600 transition-colors">
              Datenschutz
            </Link>
            <Link to="/terms" className="hover:text-medical-600 transition-colors">
              Nutzungsbedingungen
            </Link>
            <Link to="/contact" className="hover:text-medical-600 transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
