
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="container mx-auto mb-12">
      <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <span className="inline-block px-3 py-1 bg-medical-100 text-medical-800 rounded-full text-sm font-medium mb-4">
            Medizinisches Deutsch für alle Sprachniveaus
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
            Verbessere deine <span className="text-gradient">medizinische Kommunikation</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            Trainiere Dialogszenarien und Fachvokabular für deinen beruflichen Alltag im Gesundheitswesen, unabhängig von deinem Sprachniveau.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/practice">Übung starten</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary">
              <Link to="/vocabulary">Vokabeln lernen</Link>
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
              alt="Medizinisches Personal bei der Arbeit" 
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
