
import React from 'react';
import { Clock, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExamHeaderProps {
  title: string;
  timeRemaining: number | null;
  isFullscreen: boolean;
  formatTime: (seconds: number | null) => string;
  onToggleFullscreen: () => void;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
  title,
  timeRemaining,
  isFullscreen,
  formatTime,
  onToggleFullscreen
}) => {
  return (
    <div className="bg-white py-3 px-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <span className="font-bold text-lg text-quiz-primary">{title}</span>
        <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Exam Mode
        </span>
      </div>
      <div className="flex items-center gap-3">
        {timeRemaining !== null && (
          <div className={`flex items-center space-x-1 font-mono text-lg font-bold
            ${timeRemaining < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}
          >
            <Clock size={18} />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleFullscreen}
          className="text-gray-500"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default ExamHeader;
