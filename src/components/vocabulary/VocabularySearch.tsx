
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface VocabularySearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const VocabularySearch: React.FC<VocabularySearchProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="flex w-full max-w-full mb-6">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          className="pl-10 w-full"
          placeholder="Vokabeln suchen..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default VocabularySearch;
