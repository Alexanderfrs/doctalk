
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { ScenarioHeader } from "@/components/scenario/ScenarioHeader";
import { ScenarioContent } from "@/components/scenario/ScenarioContent";
import { toast } from "sonner";
import scenarios, { Scenario } from "@/data/scenarios";
import { useIsMobile } from "@/hooks/use-mobile";
import AppHeader from "@/components/layout/AppHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

/**
 * ScenarioDetail page component
 * Displays a medical scenario with interactive elements for learning
 */
const ScenarioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Fetch scenario data based on ID
    const fetchScenario = async () => {
      try {
        setLoading(true);
        
        console.log("Looking for scenario with ID:", id);
        console.log("Available scenarios:", scenarios.map(s => ({ id: s.id, title: s.title })));
        
        // Find the scenario in our local data
        const foundScenario = scenarios.find(s => s.id === id);
        
        if (foundScenario) {
          console.log("Found scenario:", foundScenario.title);
          setScenario(foundScenario);
        } else {
          console.error("Scenario not found for ID:", id);
          toast.error("Szenario nicht gefunden");
          navigate('/practice');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scenario:", error);
        toast.error("Fehler beim Laden des Szenarios");
        setLoading(false);
      }
    };

    if (id) {
      fetchScenario();
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {isMobile ? <MobileHeader /> : <AppHeader />}
      <main className={cn("flex-grow", isMobile ? "pt-20 pb-24" : "pt-24")}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-6">
            <ScenarioHeader 
              scenario={scenario} 
              loading={loading} 
              onBack={handleBack} 
            />
            
            <div className="w-full flex justify-center">
              <ScenarioContent 
                scenario={scenario} 
                loading={loading} 
              />
            </div>
          </div>
        </div>
      </main>
      {!isMobile && <Footer />}
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default ScenarioDetail;
