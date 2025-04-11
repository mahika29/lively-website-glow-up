
import React from 'react';
import { Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number | null;
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
}) => {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>
        
        {timeRemaining !== null && (
          <div className={`flex items-center space-x-1 
            ${timeRemaining < 60 ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Clock size={16} />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        )}
      </div>
      
      <Progress value={progressPercentage} className="mb-8" />
    </>
  );
};

export default QuizProgressBar;
