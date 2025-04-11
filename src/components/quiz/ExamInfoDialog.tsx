
import React from 'react';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/data/quizzes';

interface ExamInfoDialogProps {
  quiz: Quiz;
  onStartExam: () => void;
  onCancel: () => void;
}

const ExamInfoDialog: React.FC<ExamInfoDialogProps> = ({ quiz, onStartExam, onCancel }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <InfoIcon className="mx-auto h-12 w-12 text-quiz-primary mb-2" />
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <p className="text-sm text-gray-500 mt-1">Exam Mode</p>
        </div>
        
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-600">Time Limit:</span>
            <span className="font-medium">{quiz.timeLimit} minutes</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-600">Questions:</span>
            <span className="font-medium">{quiz.questions.length}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{quiz.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Difficulty:</span>
            <span className="font-medium capitalize">{quiz.difficulty}</span>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <p className="text-yellow-800 text-sm font-medium">Important Information</p>
          <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
            <li>This exam will launch in fullscreen mode</li>
            <li>Leaving fullscreen will be logged as a potential violation</li>
            <li>The timer will continue even if you exit fullscreen</li>
            <li>Once started, you must complete the exam</li>
          </ul>
        </div>
        
        <Button className="w-full" onClick={onStartExam}>
          Begin Exam
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full mt-3"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExamInfoDialog;
