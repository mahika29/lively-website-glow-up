
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  quizSubmitted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
  quizSubmitted,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="ghost" 
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
      >
        <ChevronLeft size={16} className="mr-2" /> Previous
      </Button>
      
      {currentQuestionIndex < totalQuestions - 1 ? (
        <Button onClick={onNext}>
          Next <ChevronRight size={16} className="ml-2" />
        </Button>
      ) : (
        !quizSubmitted ? (
          <Button 
            onClick={onSubmit}
            className="bg-quiz-primary hover:bg-quiz-accent"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button asChild>
            <Link to="/take">Finish</Link>
          </Button>
        )
      )}
    </div>
  );
};

export default QuizNavigation;
