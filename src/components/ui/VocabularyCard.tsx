
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Play, Star } from 'lucide-react';
import useTextToSpeech from '@/hooks/useTextToSpeech';

interface VocabularyItem {
  id: string;
  german: string;
  english: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pronunciation?: string;
  example_sentence?: string;
  translation_example?: string;
  tags?: string[];
}

interface VocabularyCardProps {
  item: VocabularyItem;
  showTranslation?: boolean;
  onToggleTranslation?: () => void;
  onMarkImportant?: () => void;
  isImportant?: boolean;
  compact?: boolean;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  showTranslation = false,
  onToggleTranslation,
  onMarkImportant,
  isImportant = false,
  compact = false
}) => {
  const { speak, isSpeaking } = useTextToSpeech({
    autoPlay: true
  });

  const handlePlayAudio = () => {
    speak(item.german, 'user');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{item.german}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayAudio}
                  disabled={isSpeaking}
                  className="h-6 w-6 p-0"
                >
                  {isSpeaking ? (
                    <Volume2 className="h-3 w-3 animate-pulse" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
              </div>
              {showTranslation && (
                <p className="text-gray-600 mb-2">{item.english}</p>
              )}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                  {item.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onMarkImportant && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkImportant}
                  className={isImportant ? 'text-yellow-500' : 'text-gray-400'}
                >
                  <Star className={`h-4 w-4 ${isImportant ? 'fill-current' : ''}`} />
                </Button>
              )}
              {onToggleTranslation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleTranslation}
                >
                  {showTranslation ? 'Hide' : 'Show'} Translation
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            {item.german}
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayAudio}
              disabled={isSpeaking}
              className="h-6 w-6 p-0"
            >
              {isSpeaking ? (
                <Volume2 className="h-4 w-4 animate-pulse" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
          {onMarkImportant && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkImportant}
              className={isImportant ? 'text-yellow-500' : 'text-gray-400'}
            >
              <Star className={`h-5 w-5 ${isImportant ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
            {item.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showTranslation && (
          <div>
            <h4 className="font-medium text-gray-700 mb-1">English</h4>
            <p className="text-gray-600">{item.english}</p>
          </div>
        )}
        
        {item.pronunciation && (
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Pronunciation</h4>
            <p className="text-gray-600 font-mono">{item.pronunciation}</p>
          </div>
        )}
        
        {item.example_sentence && showTranslation && (
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Example</h4>
            <p className="text-gray-600 italic mb-1">{item.example_sentence}</p>
            {item.translation_example && (
              <p className="text-gray-500 text-sm">{item.translation_example}</p>
            )}
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {onToggleTranslation && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTranslation}
            className="w-full"
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VocabularyCard;
