
import React from 'react';
import { Check, X } from 'lucide-react';

interface QuizOptionProps {
  option: string;
  optionIndex: number;
  isSelected: boolean;
  isCorrect?: boolean | null;
  answersRevealed: boolean;
  selectedAnswer: number;
  onSelect: (optionIndex: number) => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  optionIndex,
  isSelected,
  isCorrect,
  answersRevealed,
  selectedAnswer,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(optionIndex)}
      className={`quiz-option flex items-center ${
        isSelected ? 'quiz-option-selected' : ''
      } ${
        answersRevealed && isCorrect
          ? 'quiz-option-correct' 
          : answersRevealed && isSelected && !isCorrect
            ? 'quiz-option-incorrect' 
            : ''
      }`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-medium ${
        isSelected 
          ? 'bg-quiz-neutral text-white' 
          : 'bg-gray-100 text-gray-700'
      } ${
        answersRevealed && isCorrect
          ? 'bg-quiz-correct text-white' 
          : answersRevealed && isSelected && !isCorrect
            ? 'bg-quiz-incorrect text-white' 
            : ''
      }`}>
        {String.fromCharCode(65 + optionIndex)}
      </div>
      <span className="flex-1">{option}</span>
      
      {answersRevealed && isCorrect && (
        <Check className="text-quiz-correct" size={20} />
      )}
      
      {answersRevealed && 
       selectedAnswer === optionIndex && 
       !isCorrect && (
        <X className="text-quiz-incorrect" size={20} />
      )}
    </div>
  );
};

export default QuizOption;
