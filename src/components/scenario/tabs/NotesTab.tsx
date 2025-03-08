
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotesTab: React.FC = () => {
  const { t } = useTranslation();
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  
  // Load saved notes when component mounts
  useEffect(() => {
    const storedNotes = localStorage.getItem("scenario-notes");
    if (storedNotes) {
      setNotes(storedNotes);
      setSavedNotes(storedNotes);
    }
  }, []);
  
  // Save notes to localStorage
  const handleSave = () => {
    localStorage.setItem("scenario-notes", notes);
    setSavedNotes(notes);
    toast.success(t("general.saved_successfully"));
  };
  
  // Check if there are unsaved changes
  const hasUnsavedChanges = notes !== savedNotes;
  
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-4">
        <Textarea
          placeholder={t("scenario.take_notes_here")}
          className="min-h-[350px] resize-none touch-manipulation"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="touch-manipulation"
          >
            <Save className="h-4 w-4 mr-2" />
            {t("general.save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesTab;
