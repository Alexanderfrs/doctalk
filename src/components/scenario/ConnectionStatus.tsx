
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Stethoscope } from "lucide-react";

type ConnectionStatusType = 'unknown' | 'testing' | 'connected' | 'failed';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  if (status === 'unknown') return null;

  const statusConfig = {
    connected: {
      className: 'border-green-200 bg-green-50',
      title: "AI Connected",
      description: "OpenAI integration is working. You can now have realistic medical conversations."
    },
    failed: {
      className: 'border-red-200 bg-red-50',
      title: "AI Connection Failed",
      description: "Could not connect to OpenAI. Check if OPENAI_API_KEY is properly configured in Supabase secrets."
    },
    testing: {
      className: 'border-yellow-200 bg-yellow-50',
      title: "Testing AI Connection...",
      description: "Verifying OpenAI API connection..."
    }
  };

  const config = statusConfig[status];

  return (
    <Alert className={config.className}>
      <Stethoscope className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription>{config.description}</AlertDescription>
    </Alert>
  );
};
