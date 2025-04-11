
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, Clock, AlertTriangle, X, InfoIcon, LogOut, 
  Maximize, Minimize
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  quizzes, Quiz, saveQuizProgress, getQuizProgress, 
  clearQuizProgress, saveQuizResult 
} from '@/data/quizzes';

const QuizExam = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State for quiz taking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  
  // Define all callbacks at the component level - ensure consistent hook ordering
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        toast({
          title: "Fullscreen Error",
          description: `Error attempting to enable fullscreen mode: ${err.message}`,
          variant: "destructive"
        });
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  }, [toast]);
  
  const handleSubmitQuiz = useCallback(() => {
    // Make sure quiz is defined before using it
    if (!quiz) return;
    
    // Check if there are any unanswered questions
    const unansweredCount = selectedAnswers.filter(a => a === -1).length;
    
    if (unansweredCount > 0 && !quizSubmitted) {
      toast({
        title: `${unansweredCount} question${unansweredCount > 1 ? 's' : ''} unanswered`,
        description: "Are you sure you want to submit? You can go back and review your answers.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate score
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setQuizSubmitted(true);
    
    // Calculate time taken in seconds
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 600;
    
    // Clear progress since quiz is completed
    clearQuizProgress(quiz.id);
    
    toast({
      title: "Exam Submitted",
      description: `Your score: ${calculatedScore}%. You got ${correctAnswers} out of ${quiz.questions.length} questions correct.`,
    });
    
    // Exit fullscreen mode after submitting
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
    // If user is logged in, auto-save results with their name
    if (user) {
      saveQuizResult(quiz.id, user.name, calculatedScore, timeTaken);
    }
  }, [quiz, selectedAnswers, quizSubmitted, startTime, toast, user]);
  
  const handleSelectOption = useCallback((optionIndex: number) => {
    if (quizSubmitted) return;
    
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = optionIndex;
      return newAnswers;
    });
  }, [quizSubmitted, currentQuestionIndex]);
  
  const goToNextQuestion = useCallback(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [quiz, currentQuestionIndex]);
  
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);
  
  const startExam = useCallback(() => {
    if (!quiz) return;
    
    setShowInfoDialog(false);
    toggleFullscreen();
    
    // Initialize selected answers array
    const newAnswers = new Array(quiz.questions.length).fill(-1);
    setSelectedAnswers(newAnswers);
    
    // Set the start time
    setStartTime(Date.now());
    
    // Set the timer
    if (quiz.timeLimit > 0) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
  }, [quiz, toggleFullscreen]);
  
  // Find the quiz by ID
  useEffect(() => {
    if (quizId) {
      const foundQuiz = quizzes.find(q => q.id === quizId);
      setQuiz(foundQuiz);
    }
  }, [quizId]);
  
  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      
      // If exiting fullscreen and quiz not submitted, show warning
      if (!document.fullscreenElement && !quizSubmitted && !showInfoDialog) {
        setShowExitDialog(true);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [quizSubmitted, showInfoDialog]);
  
  // Initialize the timer when needed
  useEffect(() => {
    if (!quizSubmitted && !showInfoDialog && quiz && quiz.timeLimit > 0) {
      // Convert minutes to seconds
      setTimeRemaining(quiz.timeLimit * 60);
      
      // Start the timer
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            // Handle quiz submission on timeout
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Clean up on component unmount
      return () => clearInterval(timer);
    }
  }, [quizSubmitted, showInfoDialog, quiz, handleSubmitQuiz]);
  
  // Format time remaining as MM:SS
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
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
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Determine if the current question has been answered
  const isCurrentQuestionAnswered = selectedAnswers[currentQuestionIndex] !== -1;
  
  // Render the info dialog at the start
  if (showInfoDialog) {
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
          
          <Button className="w-full" onClick={startExam}>
            Begin Exam
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full mt-3"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  
  // Render quiz results
  if (quizSubmitted) {
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
                You got {selectedAnswers.filter((a, i) => a === quiz.questions[i].correctAnswer).length} 
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
              
              {!user && (
                <div className="mt-6">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                      Enter your name to save your result
                    </label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your name"
                      className="max-w-md"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-center mt-6">
                <Button onClick={() => navigate('/')}>
                  Exit to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render the exit warning dialog
  const exitWarningDialog = (
    <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Warning: Fullscreen Mode Exited</DialogTitle>
          <DialogDescription>
            Leaving fullscreen mode during an exam may be considered a violation. Please return to fullscreen mode to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mt-2">
          <AlertTriangle className="h-5 w-5 inline-block mr-2 text-yellow-600" />
          This event has been logged. Repeated violations may result in your exam being terminated.
        </div>
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="destructive" 
            className="gap-1"
            onClick={() => {
              setShowExitDialog(false);
              handleSubmitQuiz();
            }}
          >
            <LogOut size={16} /> End Exam
          </Button>
          <Button
            onClick={() => {
              setShowExitDialog(false);
              toggleFullscreen();
            }}
          >
            <Maximize size={16} className="mr-2" />
            Return to Fullscreen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  // Main exam interface
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {exitWarningDialog}
      
      <div className="bg-white py-3 px-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-lg text-quiz-primary">{quiz.title}</span>
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
            onClick={toggleFullscreen}
            className="text-gray-500"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="mb-6" />
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">{quiz.questions[currentQuestionIndex].question}</h2>
            
            <div className="space-y-3">
              {quiz.questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  onClick={() => handleSelectOption(optionIndex)}
                  className={`quiz-option flex items-center ${
                    selectedAnswers[currentQuestionIndex] === optionIndex ? 'quiz-option-selected' : ''
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-medium ${
                    selectedAnswers[currentQuestionIndex] === optionIndex 
                      ? 'bg-quiz-neutral text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {String.fromCharCode(65 + optionIndex)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft size={16} className="mr-2" /> Previous
          </Button>
          
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button 
              onClick={goToNextQuestion}
            >
              Next <ChevronRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitQuiz}
              className="bg-quiz-primary hover:bg-quiz-accent"
            >
              Submit Exam
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-8 gap-2 mt-8">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`h-10 w-10 rounded-md flex items-center justify-center text-sm font-medium
                ${currentQuestionIndex === index ? 'ring-2 ring-offset-2 ring-quiz-primary' : ''}
                ${selectedAnswers[index] !== -1 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizExam;
