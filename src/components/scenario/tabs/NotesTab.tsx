
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotesTabProps {
  notes?: string;
  onNotesChange?: (notes: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ 
  notes: externalNotes, 
  onNotesChange 
}) => {
  const { t } = useTranslation();
  const [localNotes, setLocalNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  
  // Use external notes if provided, otherwise use local state
  const notes = externalNotes !== undefined ? externalNotes : localNotes;
  
  // Load saved notes when component mounts
  useEffect(() => {
    if (externalNotes === undefined) {
      const storedNotes = localStorage.getItem("scenario-notes");
      if (storedNotes) {
        setLocalNotes(storedNotes);
        setSavedNotes(storedNotes);
      }
    }
  }, [externalNotes]);
  
  // Save notes to localStorage
  const handleSave = () => {
    if (externalNotes === undefined) {
      localStorage.setItem("scenario-notes", notes);
      setSavedNotes(notes);
    }
    toast.success(t("general.saved_successfully"));
  };
  
  const handleNotesChange = (value: string) => {
    if (onNotesChange) {
      onNotesChange(value);
    } else {
      setLocalNotes(value);
    }
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
          onChange={(e) => handleNotesChange(e.target.value)}
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={externalNotes === undefined ? !hasUnsavedChanges : false}
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
