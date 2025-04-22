import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
}

export default function QuizNavigation({ 
  onNext, 
  onPrevious, 
  canGoBack, 
  isLastQuestion 
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between mt-4">
      {canGoBack ? (
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="border-2 border-green-light text-green-light hover:text-green-light/70 hover:border-green-light/70 bg-transparent hover:bg-transparent"
        >
          <ArrowLeft size={16} />
          Précédent
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button 
        onClick={onNext}
        className="text-white bg-green-light hover:bg-green-light/70"
      >
        {isLastQuestion ? 'Voir les résultats' : 'Suivant'}
        {!isLastQuestion && <ArrowRight size={16} />}
      </Button>
    </div>
  );
}