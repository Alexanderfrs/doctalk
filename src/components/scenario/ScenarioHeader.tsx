
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpenCheck, Stethoscope } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ScenarioHeaderProps {
  scenario: any;
  loading: boolean;
  onBack: () => void;
}

export const ScenarioHeader: React.FC<ScenarioHeaderProps> = ({
  scenario,
  loading,
  onBack
}) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">{t("common.back")}</span>
        </Button>
        
        {!loading && scenario && (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-primary/10">
              {scenario.category === "emergency" ? (
                <Stethoscope className="mr-1 h-3 w-3" />
              ) : (
                <BookOpenCheck className="mr-1 h-3 w-3" />
              )}
              {t(`scenario.category.${scenario.category}`)}
            </Badge>
            <Badge>{t(`scenario.difficulty.${scenario.difficulty}`)}</Badge>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <CardTitle className="text-2xl font-bold tracking-tight mt-2">
          {loading ? (
            <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
          ) : (
            scenario?.title || t("scenario.not_found")
          )}
        </CardTitle>
        
        {!loading && scenario && (
          <p className="text-muted-foreground mt-2">
            {scenario.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
