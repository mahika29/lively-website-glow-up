
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes, Quiz } from '@/data/quizzes';
import { useQuiz } from '@/hooks/useQuiz';
import QuizList from '@/components/quiz/QuizList';
import QuizProgressBar from '@/components/quiz/QuizProgressBar';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizNavigation from '@/components/quiz/QuizNavigation';
import QuizSubmitWarning from '@/components/quiz/QuizSubmitWarning';
import QuizResultsSummary from '@/components/quiz/QuizResultsSummary';

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  
  // Fetch the quiz data
  useEffect(() => {
    if (quizId) {
      const foundQuiz = quizzes.find(q => q.id === quizId);
      setQuiz(foundQuiz);
    }
  }, [quizId]);
  
  // If no quizId is present, return the QuizList component
  if (!quizId) {
    return <QuizList />;
  }
  
  // If quiz not found and we've already checked, show error
  if (!quiz && quizId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Quiz Not Found</h1>
            <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/take">View All Quizzes</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Quiz is null safety check - return an early loading state
  if (!quiz) {
    return <div className="flex items-center justify-center min-h-screen">Loading quiz...</div>;
  }
  
  return <QuizContent quiz={quiz} />;
};

const QuizContent = ({ quiz }: { quiz: Quiz }) => {
  const {
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    quizSubmitted,
    answersRevealed,
    score,
    username,
    startTime,
    handleSelectOption,
    handleSubmitQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    handleRevealAnswers,
    handleSaveResult,
    setUsername,
  } = useQuiz(quiz);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  if (quizSubmitted && !answersRevealed) {
    return (
      <QuizResultsSummary
        quiz={quiz}
        score={score}
        username={username}
        startTime={startTime}
        onUsernameChange={setUsername}
        onSaveResult={handleSaveResult}
        onReviewAnswers={handleRevealAnswers}
      />
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {quiz.category}
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                {quiz.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {quiz.questions.length} questions
              </span>
            </div>
          </div>
          
          <QuizProgressBar
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            timeRemaining={timeRemaining}
          />
          
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            answersRevealed={answersRevealed}
            onSelectOption={handleSelectOption}
          />
          
          <QuizNavigation
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            quizSubmitted={quizSubmitted}
            onPrevious={goToPreviousQuestion}
            onNext={goToNextQuestion}
            onSubmit={handleSubmitQuiz}
          />
          
          {!quizSubmitted && (
            <QuizSubmitWarning totalQuestions={quiz.questions.length} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Fix window.quizzes for TypeScript
declare global {
  interface Window {
    quizzes?: Quiz[];
  }
}

export default TakeQuizPage;
