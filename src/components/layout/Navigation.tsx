
import React from "react";
import { Link } from "react-router-dom";
import { Heart, BookOpen, MessageCircle, User, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import LanguageSelector from "./LanguageSelector";

const Navigation = () => {
  const { translate } = useLanguage();

  const navItems = [
    {
      path: "/#who-its-for",
      labelKey: "whoItsFor",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      path: "/#why-doctalk",
      labelKey: "whyDocTalk",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      path: "/#pricing",
      labelKey: "pricing",
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-medical-100 p-2 rounded-lg">
            <img 
              src="/lovable-uploads/e5cd8dd8-2606-4511-89a3-d07aca2e94cf.png" 
              alt="DocTalk Logo" 
              className="h-6 w-6"
            />
          </div>
          <span className="text-xl font-bold text-medical-700">DocTalk</span>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav navItems={navItems} />

        {/* Language Selector */}
        <LanguageSelector />

        {/* Mobile Navigation */}
        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
};

export default Navigation;
