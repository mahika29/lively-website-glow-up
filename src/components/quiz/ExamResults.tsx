
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Quiz } from '@/data/quizzes';

interface ExamResultsProps {
  quiz: Quiz;
  score: number | null;
  username: string;
  startTime: number | null;
  onUsernameChange: (name: string) => void;
}

const ExamResults: React.FC<ExamResultsProps> = ({
  quiz,
  score,
  username,
  startTime,
  onUsernameChange
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-quiz-primary py-6 text-white text-center">
          <h1 className="text-3xl font-bold">Exam Completed!</h1>
          <p className="opacity-90 mt-2">{quiz.title}</p>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-7xl font-bold mb-2 text-quiz-primary">{score}%</div>
            <p className="text-gray-600">
              You got {score !== null && quiz ? Math.round((score / 100) * quiz.questions.length) : 0} 
              {' '}out of {quiz.questions.length} questions correct
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-2">Exam Summary</h3>
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
            
            <div className="flex justify-center mt-6">
              <Button asChild>
                <Link to="/">Exit to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
