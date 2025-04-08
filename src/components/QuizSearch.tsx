
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { quizzes } from '@/data/quizzes';
import { useNavigate } from 'react-router-dom';

interface QuizSearchProps {
  onClose?: () => void;
  className?: string;
}

const QuizSearch = ({ onClose, className = '' }: QuizSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof quizzes>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      setIsSearching(true);
      
      // Simple search logic - can be enhanced with more robust search algorithms
      const searchResults = quizzes.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setResults(searchResults);
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSelectQuiz = (quizId: string) => {
    navigate(`/take/${quizId}`);
    setSearchTerm('');
    if (onClose) onClose();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          type="text"
          placeholder="Search for quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={() => setSearchTerm('')}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      
      {searchTerm.trim().length > 2 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border overflow-hidden max-h-[50vh] overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map(quiz => (
                <li key={quiz.id} className="border-b last:border-b-0">
                  <button
                    onClick={() => handleSelectQuiz(quiz.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="font-medium">{quiz.title}</div>
                    <div className="text-xs text-gray-500 flex gap-2 mt-1">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-0.5 rounded text-xs">
                        {quiz.category}
                      </span>
                      <span className="text-gray-500">{quiz.questions.length} questions</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No quizzes found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizSearch;
