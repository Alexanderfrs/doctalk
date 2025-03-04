
import React from "react";
import { cn } from "@/lib/utils";
import { Scenario } from "@/data/scenarios";
import ProgressBar from "./ProgressBar";
import { Heart, MessageCircle, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ScenarioCardProps {
  scenario: Scenario;
  onClick?: () => void;
  className?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'patient-care':
      return <Heart className="h-5 w-5 text-red-500" />;
    case 'teamwork':
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    default:
      return <Stethoscope className="h-5 w-5 text-medical-500" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700';
    case 'advanced':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-neutral-100 text-neutral-700';
  }
};

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onClick,
  className,
}) => {
  const navigate = useNavigate();

  const handleStartExercise = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/scenario/${scenario.id}`);
  };
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100 overflow-hidden animate-scale-in card-hover",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-medical-500" />
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {getCategoryIcon(scenario.category)}
          <span className="text-sm text-neutral-500">{scenario.category}</span>
        </div>
        
        <div className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getDifficultyColor(scenario.difficulty))}>
          {scenario.difficulty}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-medical-600 transition-colors">
        {scenario.title}
      </h3>
      
      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
        {scenario.description}
      </p>
      
      {scenario.progress !== undefined && (
        <ProgressBar 
          value={scenario.progress} 
          max={100} 
          showValue={true}
          size="sm"
          label="Fortschritt"
          className="mb-4"
        />
      )}
      
      <div className="flex gap-1 flex-wrap mt-auto mb-3">
        {scenario.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Button 
        size="sm" 
        className="w-full bg-white text-medical-600 border border-medical-200 hover:bg-medical-50"
        onClick={handleStartExercise}
      >
        Übung starten
      </Button>
    </div>
  );
};

export default ScenarioCard;
