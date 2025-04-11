
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface QuizSubmitWarningProps {
  totalQuestions: number;
}

const QuizSubmitWarning: React.FC<QuizSubmitWarningProps> = ({ totalQuestions }) => {
  return (
    <div className="mt-8">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
        <AlertTriangle className="text-yellow-500 mr-3 mt-0.5" size={18} />
        <div>
          <h3 className="font-medium text-yellow-800 mb-1">Before you submit</h3>
          <p className="text-sm text-yellow-700">
            Make sure you've answered all {totalQuestions} questions. You can navigate between questions 
            to review your answers. Once submitted, you cannot change your answers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmitWarning;
