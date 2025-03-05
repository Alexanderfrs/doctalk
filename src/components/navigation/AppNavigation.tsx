
import React from "react";
import { Home, BookOpen, Mic, User, MessageCircle } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const AppNavigation: React.FC = () => {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Übungen", url: "/practice", icon: BookOpen },
    { name: "Vokabeln", url: "/vocabulary", icon: Mic },
    { name: "Dialog", url: "/scenario", icon: MessageCircle },
    { name: "Profil", url: "/profile", icon: User }
  ];

  return (
    <NavBar 
      items={navItems} 
      className="bottom-8 sm:bottom-auto sm:top-24 z-40"
    />
  );
};

export default AppNavigation;
