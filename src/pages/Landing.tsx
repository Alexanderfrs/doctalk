
import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import TargetUsersSection from "@/components/landing/TargetUsersSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import { useLanguage } from "@/contexts/LanguageContext";

const Landing = () => {
  const { translate } = useLanguage();

  return (
    <>
      <Helmet>
        <title>DocTalk - Medical German Learning</title>
        <meta name="description" content="Learn medical German for healthcare professionals" />
      </Helmet>
      
      <main className="min-h-screen">
        <HeroSection />
        <ProblemSolutionSection />
        <TargetUsersSection />
        <ComparisonSection />
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                {translate("simpleAndTransparentPricing")}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {translate("choosePlanThatSuits")}
              </p>
            </div>
            <PricingSection />
          </div>
        </section>
        
        <CTASection />
      </main>
    </>
  );
};

export default Landing;
