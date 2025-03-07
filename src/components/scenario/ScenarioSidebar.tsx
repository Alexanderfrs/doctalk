
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, HelpCircle, Redo2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ScenarioSidebarProps {
  scenario: any;
  loading: boolean;
}

export const ScenarioSidebar: React.FC<ScenarioSidebarProps> = ({
  scenario,
  loading
}) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  
  const handleStartScenario = () => {
    setProgress(10);
    toast.success(t("scenario.started"));
  };
  
  const handleRestartScenario = () => {
    setProgress(0);
    toast.info(t("scenario.restarted"));
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-1/2 bg-muted animate-pulse rounded mb-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("scenario.objectives")}</CardTitle>
        </CardHeader>
        <CardContent>
          {scenario?.objectives ? (
            <ul className="space-y-2">
              {scenario.objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">{t("scenario.no_objectives")}</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("scenario.progress")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
              {progress}% {t("scenario.completed")}
            </p>
            
            <Separator />
            
            <div className="pt-2">
              <h3 className="font-medium mb-2">{t("scenario.status")}</h3>
              <div className="flex flex-wrap gap-2">
                {progress === 0 ? (
                  <Badge variant="outline" className="bg-muted/50">
                    {t("scenario.not_started")}
                  </Badge>
                ) : progress < 100 ? (
                  <Badge variant="outline" className="bg-primary/10">
                    {t("scenario.in_progress")}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    {t("scenario.completed")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {progress === 0 ? (
            <Button className="w-full" onClick={handleStartScenario}>
              {t("scenario.start_scenario")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" className="w-full" onClick={handleRestartScenario}>
              <Redo2 className="mr-2 h-4 w-4" />
              {t("scenario.restart_scenario")}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("scenario.help_resources")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="instructions">
              <AccordionTrigger>
                <div className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  {t("scenario.how_to_use")}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  {t("scenario.instructions_text")}
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                  <li>{t("scenario.instruction_1")}</li>
                  <li>{t("scenario.instruction_2")}</li>
                  <li>{t("scenario.instruction_3")}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};
