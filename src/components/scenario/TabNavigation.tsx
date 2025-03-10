
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Book, Lightbulb } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onChange?: (value: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <TabsList className="grid grid-cols-3 mb-4 touch-action-manipulation">
      <TabsTrigger 
        value="conversation" 
        className="md:text-sm text-xs"
        onClick={() => onChange && onChange("conversation")}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        <span className="md:inline hidden">{t("scenario.conversation")}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="resources" 
        className="md:text-sm text-xs"
        onClick={() => onChange && onChange("resources")}
      >
        <Book className="mr-2 h-4 w-4" />
        <span className="md:inline hidden">{t("scenario.resources")}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="notes" 
        className="md:text-sm text-xs"
        onClick={() => onChange && onChange("notes")}
      >
        <Lightbulb className="mr-2 h-4 w-4" />
        <span className="md:inline hidden">{t("scenario.notes")}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
