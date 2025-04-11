
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from '@/data/quizzes';

interface ExamQuestionProps {
  question: Question;
  selectedAnswer: number;
  onSelectOption: (optionIndex: number) => void;
}

const ExamQuestion: React.FC<ExamQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectOption
}) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              onClick={() => onSelectOption(optionIndex)}
              className={`quiz-option flex items-center ${
                selectedAnswer === optionIndex ? 'quiz-option-selected' : ''
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-medium ${
                selectedAnswer === optionIndex 
                  ? 'bg-quiz-neutral text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {String.fromCharCode(65 + optionIndex)}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamQuestion;
