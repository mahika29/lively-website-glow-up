
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle } from 'lucide-react';
import { Quiz } from '@/data/quizzes';

interface QuizResultsSummaryProps {
  quiz: Quiz;
  score: number | null;
  username: string;
  startTime: number | null;
  onUsernameChange: (value: string) => void;
  onSaveResult: () => void;
  onReviewAnswers: () => void;
}

const QuizResultsSummary: React.FC<QuizResultsSummaryProps> = ({
  quiz,
  score,
  username,
  startTime,
  onUsernameChange,
  onSaveResult,
  onReviewAnswers,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-quiz-primary py-6 text-white text-center">
              <h1 className="text-3xl font-bold">Quiz Completed!</h1>
              <p className="opacity-90 mt-2">{quiz.title}</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-7xl font-bold mb-2 text-quiz-primary">{score}%</div>
                <p className="text-gray-600">
                  You got {Math.round((score || 0) * quiz.questions.length / 100)} 
                  {' '}out of {quiz.questions.length} questions correct
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Quiz Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Category:</div>
                    <div className="font-medium">{quiz.category}</div>
                    <div>Difficulty:</div>
                    <div className="font-medium capitalize">{quiz.difficulty}</div>
                    <div>Time taken:</div>
                    <div className="font-medium">
                      {startTime ? Math.floor((Date.now() - startTime) / 60000) : quiz.timeLimit} minutes
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                      Enter your name to save your result
                    </label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => onUsernameChange(e.target.value)}
                      placeholder="Your name"
                      className="max-w-md"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button variant="outline" onClick={onReviewAnswers}>
                    Review Answers
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="secondary" asChild>
                      <Link to="/take">Take Another Quiz</Link>
                    </Button>
                    <Button onClick={onSaveResult}>
                      Save Result
                    </Button>
                  </div>
                </div>
                
                {score && score >= 70 && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-green-600 font-medium py-2 px-4 rounded-full bg-green-50">
                      <Check size={18} /> Great job! You've passed this quiz!
                    </div>
                  </div>
                )}
                
                {score && score < 70 && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-amber-600 font-medium py-2 px-4 rounded-full bg-amber-50">
                      <AlertTriangle size={18} /> Keep practicing! You'll do better next time.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsSummary;
