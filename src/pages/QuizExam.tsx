
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizzes } from '@/data/quizzes';
import { useQuizExam } from '@/hooks/useQuizExam';
import ExamInfoDialog from '@/components/quiz/ExamInfoDialog';
import ExitWarningDialog from '@/components/quiz/ExitWarningDialog';
import ExamHeader from '@/components/quiz/ExamHeader';
import ExamQuestion from '@/components/quiz/ExamQuestion';
import ExamResults from '@/components/quiz/ExamResults';
import ExamQuestionGrid from '@/components/quiz/ExamQuestionGrid';
import QuizNavigation from '@/components/quiz/QuizNavigation';

const QuizExam = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(undefined);
  
  // Find the quiz by ID
  useEffect(() => {
    if (quizId) {
      const foundQuiz = quizzes.find(q => q.id === quizId);
      setQuiz(foundQuiz);
    }
  }, [quizId]);
  
  // If quiz is not found, show error
  if (!quiz && quizId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-red-500 mb-4">Exam Not Found</h1>
          <p className="text-gray-600 mb-6">The exam you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }
  
  // Null check for quiz
  if (!quiz) {
    return <div className="flex items-center justify-center min-h-screen">Loading exam...</div>;
  }
  
  return <ExamContent quiz={quiz} />;
};

const ExamContent = ({ quiz }) => {
  const {
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    quizSubmitted,
    score,
    username,
    startTime,
    isFullscreen,
    showExitDialog,
    showInfoDialog,
    setCurrentQuestionIndex,
    setUsername,
    setShowExitDialog,
    handleSelectOption,
    handleSubmitQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    startExam,
    toggleFullscreen,
    formatTime
  } = useQuizExam(quiz);
  
  const navigate = useNavigate();
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  // Render the info dialog at the start
  if (showInfoDialog) {
    return (
      <ExamInfoDialog
        quiz={quiz}
        onStartExam={startExam}
        onCancel={() => navigate('/')}
      />
    );
  }
  
  // Render quiz results
  if (quizSubmitted) {
    return (
      <ExamResults
        quiz={quiz}
        score={score}
        username={username}
        startTime={startTime}
        onUsernameChange={setUsername}
      />
    );
  }
  
  // Main exam interface
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ExitWarningDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        onEndExam={handleSubmitQuiz}
        onReturnToFullscreen={() => {
          setShowExitDialog(false);
          toggleFullscreen();
        }}
      />
      
      <ExamHeader
        title={quiz.title}
        timeRemaining={timeRemaining}
        isFullscreen={isFullscreen}
        formatTime={formatTime}
        onToggleFullscreen={toggleFullscreen}
      />
      
      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="mb-6" />
        
        <ExamQuestion
          question={quiz.questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
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
        
        <ExamQuestionGrid
          totalQuestions={quiz.questions.length}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          onQuestionClick={setCurrentQuestionIndex}
        />
      </div>
    </div>
  );
};

export default QuizExam;
