
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="container mx-auto mb-16 animate-fade-in" style={{ animationDelay: '1300ms' }}>
      <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Bereit, deine Sprachfähigkeiten zu verbessern?</h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          Starte jetzt mit den Übungen und verbessere deine berufliche Kommunikation im medizinischen Bereich - für alle Sprachniveaus von A1 bis C1.
        </p>
        <Button asChild size="lg" className="bg-white text-medical-600 hover:bg-white/90">
          <Link to="/practice">Mit Übungen beginnen</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
