
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quiz } from '@/data/quizzes';
import { getAllQuizzes } from '@/utils/quizUtils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QuizList = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  
  useEffect(() => {
    const userQuizzes = getAllQuizzes();
    const allQuizzes = [...window.quizzes || [], ...userQuizzes];
    setAvailableQuizzes(allQuizzes);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Available Quizzes</h1>
            <p className="text-gray-600">Choose a quiz to test your knowledge or join with a code.</p>
            <Button asChild className="mt-4">
              <Link to="/join">Join Quiz with Code</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableQuizzes.map((quiz) => (
              <Card 
                key={quiz.id} 
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="h-32 bg-gradient-to-br from-quiz-primary/80 to-quiz-accent/80 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white px-4 text-center">{quiz.title}</h3>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {quiz.category}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                      {quiz.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {quiz.timeLimit} min | {quiz.questions.length} questions
                    </div>
                    <Button asChild>
                      <Link to={`/take/${quiz.id}`}>
                        Start Quiz
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizList;
