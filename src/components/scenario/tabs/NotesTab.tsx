
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const NotesTab: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <Textarea
          placeholder={t("scenario.take_notes_here")}
          className="min-h-[350px] resize-none"
        />
      </CardContent>
    </Card>
  );
};

export default NotesTab;
