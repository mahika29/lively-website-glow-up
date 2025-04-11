
import React from 'react';

interface ExamQuestionGridProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  selectedAnswers: number[];
  onQuestionClick: (index: number) => void;
}

const ExamQuestionGrid: React.FC<ExamQuestionGridProps> = ({
  totalQuestions,
  currentQuestionIndex,
  selectedAnswers,
  onQuestionClick
}) => {
  return (
    <div className="grid grid-cols-8 gap-2 mt-8">
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(index)}
          className={`h-10 w-10 rounded-md flex items-center justify-center text-sm font-medium
            ${currentQuestionIndex === index ? 'ring-2 ring-offset-2 ring-quiz-primary' : ''}
            ${selectedAnswers[index] !== -1 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ExamQuestionGrid;
