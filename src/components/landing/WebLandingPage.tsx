
import React from "react";
import AppHeader from "@/components/layout/AppHeader";
import HeroSection from "@/components/home/HeroSection";
import ProblemSolutionSection from "./ProblemSolutionSection";
import FeaturesGrid from "./FeaturesGrid";
import TargetUsersSection from "./TargetUsersSection";
import PricingSection from "./PricingSection";
import Footer from "@/components/layout/Footer";
import { LandingPageProps } from "@/types/landing";

const WebLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      
      <main className="pt-16">
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesGrid />
        <TargetUsersSection />
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default WebLandingPage;
