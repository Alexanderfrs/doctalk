
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ResourcesTab: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="space-y-4">
          <h3 className="font-medium">{t("relevantGuidelines")}</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>American Heart Association Guidelines for CPR and ECC</li>
            <li>ACC/AHA Guidelines for STEMI Management</li>
            <li>ESC Guidelines for Acute Coronary Syndromes</li>
          </ul>
          
          <Separator />
          
          <h3 className="font-medium">{t("recommendedReadings")}</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Chest Pain Triage in Emergency Medicine</li>
            <li>Differential Diagnosis of Acute Chest Pain</li>
            <li>ECG Interpretation for Acute Coronary Syndromes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
