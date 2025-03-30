
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { ScenarioHeader } from "@/components/scenario/ScenarioHeader";
import { ScenarioContent } from "@/components/scenario/ScenarioContent";
import { ScenarioSidebar } from "@/components/scenario/ScenarioSidebar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import scenarios, { Scenario } from "@/data/scenarios";

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

  useEffect(() => {
    // Fetch scenario data based on ID
    const fetchScenario = async () => {
      try {
        setLoading(true);
        
        // Find the scenario in our local data
        const foundScenario = scenarios.find(s => s.id === id);
        
        if (foundScenario) {
          setScenario(foundScenario);
        } else {
          toast.error(t("scenarioNotFound"));
          navigate('/practice');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scenario:", error);
        toast.error(t("error.loading_scenario"));
        setLoading(false);
      }
    };

    if (id) {
      fetchScenario();
    }
  }, [id, t, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <ScenarioHeader 
          scenario={scenario} 
          loading={loading} 
          onBack={handleBack} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ScenarioContent 
              scenario={scenario} 
              loading={loading} 
            />
          </div>
          
          <div className="md:col-span-1">
            <ScenarioSidebar 
              scenario={scenario} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDetail;
