
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import QuizOption from './QuizOption';
import { Question } from '@/data/quizzes';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number;
  answersRevealed: boolean;
  onSelectOption: (optionIndex: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  answersRevealed,
  onSelectOption,
}) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, optionIndex) => (
            <QuizOption
              key={optionIndex}
              option={option}
              optionIndex={optionIndex}
              isSelected={selectedAnswer === optionIndex}
              isCorrect={answersRevealed ? optionIndex === question.correctAnswer : null}
              answersRevealed={answersRevealed}
              selectedAnswer={selectedAnswer}
              onSelect={onSelectOption}
            />
          ))}
        </div>
        
        {answersRevealed && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">Explanation:</h3>
            <p>
              The correct answer is option {String.fromCharCode(65 + question.correctAnswer)}: 
              {' '}{question.options[question.correctAnswer]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
