
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, TestTube } from "lucide-react";

interface ScenarioHeaderControlsProps {
  connectionStatus: 'unknown' | 'testing' | 'connected' | 'failed';
  conversationLength: number;
  onTestConnection: () => void;
  onResetConversation: () => void;
}

export const ScenarioHeaderControls: React.FC<ScenarioHeaderControlsProps> = ({
  connectionStatus,
  conversationLength,
  onTestConnection,
  onResetConversation
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onTestConnection}
        disabled={connectionStatus === 'testing'}
      >
        {connectionStatus === 'testing' ? (
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
        ) : (
          <TestTube className="h-4 w-4 mr-1" />
        )}
        Test AI
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onResetConversation}
        disabled={conversationLength <= 2}
      >
        <RefreshCw className="h-4 w-4 mr-1" /> 
        Reset
      </Button>
    </div>
  );
};
