import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const { translate } = useLanguage();
  return (
    <div className="h-screen overflow-y-auto" style={{scrollSnapType: 'y mandatory'}}>
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm py-4 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center text-neutral-600 hover:text-medical-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {translate('aboutUs.backToHome')}
            </Link>
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/fbff1d77-b805-4a84-9721-79292aad57c6.png"
                alt="DocTalk Logo"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-medical-600">DocTalk</span>
            </div>
          </div>
        </div>
      </header>

      {/* Our Story Section */}
      <section id="our-story" className="h-screen flex items-center justify-center pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              {translate('aboutUs.ourStory')}
            </h1>
            <h2 className="text-xl md:text-2xl text-medical-600 font-semibold mb-8">
              {translate('aboutUs.subtitle')}
            </h2>
            <div className="text-lg text-neutral-600 leading-relaxed space-y-6 max-w-3xl mx-auto">
              <p>
                {translate('aboutUs.description1')}
              </p>
              <p className="text-xl font-medium text-neutral-800">
                {translate('aboutUs.description2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="h-screen flex items-center justify-center bg-neutral-50 pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Vlada Kolisnyk */}
              <div className="text-center">
                <div className="w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden shadow-xl ring-4 ring-medical-100">
                  <img 
                    src="/lovable-uploads/vlada-profile-new.jpg"
                    alt="Vlada Kolisnyk"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) nextElement.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-medical-100 to-medical-200 flex items-center justify-center" style={{display: 'none'}}>
                    <span className="text-4xl font-bold text-medical-600">VK</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                  Vlada Kolisnyk
                </h3>
                <p className="text-medical-600 font-semibold text-lg mb-6">
                  {translate('aboutUs.vladaTitle')}
                </p>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                <p>
                    {translate('aboutUs.vladaDescription')}
                </p>
                </div>
              </div>

              {/* Alexander Fries */}
              <div className="text-center">
                <div className="w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden shadow-xl ring-4 ring-medical-100">
                  <img 
                    src="/lovable-uploads/alex.jpg"
                    alt="Alexander Fries"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) nextElement.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-medical-100 to-medical-200 flex items-center justify-center" style={{display: 'none'}}>
                    <span className="text-4xl font-bold text-medical-600">AF</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                  Alexander Fries
                </h3>
                <p className="text-medical-600 font-semibold text-lg mb-6">
                  {translate('aboutUs.alexTitle')}
                </p>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    {translate('aboutUs.alexDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="h-screen flex items-center justify-center pt-20" style={{scrollSnapAlign: 'start'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              {translate('aboutUs.ctaTitle')}
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              {translate('aboutUs.ctaSubtitle')}
            </p>
            <Link to="/">
              <Button className="bg-medical-500 hover:bg-medical-600 text-white px-8 py-4 text-lg">
                {translate('aboutUs.ctaButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer section with its own snap point to allow staying there */}
      <section id="footer" className="bg-medical-50 min-h-[400px] flex items-center justify-center" style={{scrollSnapAlign: 'start'}}>
        <Footer />
      </section>
    </div>
  );
};

export default AboutUs;
