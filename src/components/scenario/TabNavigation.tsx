
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Book, Lightbulb } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface TabNavigationProps {
  activeTab: string;
  onChange?: (value: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChange }) => {
  const { t } = useTranslation();
  
  const tabTitles = {
    conversation: t('conversation'),
    resources: t('resources'),
    notes: t('notes')
  };
  
  return (
    <TabsList className="grid grid-cols-3 mb-4 touch-action-pan-y">
      {Object.entries(tabTitles).map(([value, label]) => (
        <TabsTrigger 
          key={value}
          value={value} 
          className="md:text-sm text-xs"
          onClick={() => onChange && onChange(value)}
          data-active={activeTab === value}
        >
          {value === "conversation" && <MessageSquare className="mr-2 h-4 w-4" />}
          {value === "resources" && <Book className="mr-2 h-4 w-4" />}
          {value === "notes" && <Lightbulb className="mr-2 h-4 w-4" />}
          <span className="md:inline hidden">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabNavigation;
