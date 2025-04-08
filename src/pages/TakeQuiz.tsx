
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, Clock, AlertTriangle, Check, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  quizzes, Quiz, Question, saveQuizProgress, 
  getQuizProgress, clearQuizProgress, saveQuizResult 
} from '@/data/quizzes';

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the quiz by ID
  const quiz = quizzes.find(q => q.id === quizId);
  
  // State for quiz taking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answersRevealed, setAnswersRevealed] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // If no quizId is provided, show a list of all quizzes
  if (!quizId) {
    return <QuizList />;
  }
  
  // If quiz is not found, show error
  if (!quiz) {
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
  
  // Load saved progress when the component mounts
  useEffect(() => {
    if (!quizSubmitted && quiz) {
      // Initialize selected answers array
      const newAnswers = new Array(quiz.questions.length).fill(-1);
      setSelectedAnswers(newAnswers);
      
      // Check for saved progress
      const savedProgress = getQuizProgress(quiz.id);
      if (savedProgress) {
        toast({
          title: "Progress Restored",
          description: "We've loaded your previous progress for this quiz.",
        });
        setSelectedAnswers(savedProgress.answers);
        setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      }
      
      // Set the start time
      setStartTime(Date.now());
    }
  }, [quiz?.id, quizSubmitted]);
  
  // Initialize the timer when the component mounts
  useEffect(() => {
    if (!quizSubmitted && quiz.timeLimit > 0) {
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
  }, [quizSubmitted, quiz.timeLimit]);
  
  // Save progress whenever selectedAnswers or currentQuestionIndex changes
  useEffect(() => {
    if (!quizSubmitted && quiz) {
      saveQuizProgress(quiz.id, selectedAnswers, currentQuestionIndex);
    }
  }, [selectedAnswers, currentQuestionIndex, quizSubmitted, quiz]);
  
  // Format time remaining as MM:SS
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle option selection
  const handleSelectOption = (optionIndex: number) => {
    if (quizSubmitted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  // Navigate to the next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to the previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  // Handle quiz submission
  const handleSubmitQuiz = () => {
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
      title: "Quiz Submitted",
      description: `Your score: ${calculatedScore}%. You got ${correctAnswers} out of ${quiz.questions.length} questions correct.`,
    });
  };
  
  // Handle revealing answers
  const handleRevealAnswers = () => {
    setAnswersRevealed(true);
    setCurrentQuestionIndex(0);
  };
  
  // Handle saving result to leaderboard
  const handleSaveResult = () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to save your result.",
        variant: "destructive"
      });
      return;
    }
    
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 600;
    
    saveQuizResult(quiz.id, username, score || 0, timeTaken);
    
    toast({
      title: "Result Saved",
      description: "Your quiz result has been saved to the leaderboard!",
    });
    
    navigate('/leaderboard');
  };
  
  // Get the current question
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Determine if the current question has been answered
  const isCurrentQuestionAnswered = selectedAnswers[currentQuestionIndex] !== -1;
  
  // Render quiz results
  if (quizSubmitted && !answersRevealed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden">
              <div className="bg-quiz-primary py-6 text-white text-center">
                <h1 className="text-3xl font-bold">Quiz Completed!</h1>
                <p className="opacity-90 mt-2">{quiz.title}</p>
              </div>
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-7xl font-bold mb-2 text-quiz-primary">{score}%</div>
                  <p className="text-gray-600">
                    You got {selectedAnswers.filter((a, i) => a === quiz.questions[i].correctAnswer).length} 
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
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your name"
                        className="max-w-md"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button variant="outline" onClick={handleRevealAnswers}>
                      Review Answers
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="secondary" asChild>
                        <Link to="/take">Take Another Quiz</Link>
                      </Button>
                      <Button onClick={handleSaveResult}>
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
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
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
          
          {/* Progress and Timer */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            </div>
            
            {timeRemaining !== null && (
              <div className={`flex items-center space-x-1 
                ${timeRemaining < 60 ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Clock size={16} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>
          
          <Progress value={progressPercentage} className="mb-8" />
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    onClick={() => handleSelectOption(optionIndex)}
                    className={`quiz-option flex items-center ${
                      selectedAnswers[currentQuestionIndex] === optionIndex ? 'quiz-option-selected' : ''
                    } ${
                      answersRevealed && optionIndex === currentQuestion.correctAnswer 
                        ? 'quiz-option-correct' 
                        : answersRevealed && selectedAnswers[currentQuestionIndex] === optionIndex && 
                          optionIndex !== currentQuestion.correctAnswer 
                          ? 'quiz-option-incorrect' 
                          : ''
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-medium ${
                      selectedAnswers[currentQuestionIndex] === optionIndex 
                        ? 'bg-quiz-neutral text-white' 
                        : 'bg-gray-100 text-gray-700'
                    } ${
                      answersRevealed && optionIndex === currentQuestion.correctAnswer 
                        ? 'bg-quiz-correct text-white' 
                        : answersRevealed && selectedAnswers[currentQuestionIndex] === optionIndex && 
                          optionIndex !== currentQuestion.correctAnswer 
                          ? 'bg-quiz-incorrect text-white' 
                          : ''
                    }`}>
                      {String.fromCharCode(65 + optionIndex)}
                    </div>
                    <span className="flex-1">{option}</span>
                    
                    {answersRevealed && optionIndex === currentQuestion.correctAnswer && (
                      <Check className="text-quiz-correct" size={20} />
                    )}
                    
                    {answersRevealed && 
                     selectedAnswers[currentQuestionIndex] === optionIndex && 
                     optionIndex !== currentQuestion.correctAnswer && (
                      <X className="text-quiz-incorrect" size={20} />
                    )}
                  </div>
                ))}
              </div>
              
              {answersRevealed && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Explanation:</h3>
                  <p>
                    The correct answer is option {String.fromCharCode(65 + currentQuestion.correctAnswer)}: 
                    {' '}{currentQuestion.options[currentQuestion.correctAnswer]}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
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
              !quizSubmitted ? (
                <Button 
                  onClick={handleSubmitQuiz}
                  className="bg-quiz-primary hover:bg-quiz-accent"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/take">Finish</Link>
                </Button>
              )
            )}
          </div>
          
          {!quizSubmitted && (
            <div className="mt-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                <AlertTriangle className="text-yellow-500 mr-3 mt-0.5" size={18} />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">Before you submit</h3>
                  <p className="text-sm text-yellow-700">
                    Make sure you've answered all {quiz.questions.length} questions. You can navigate between questions 
                    to review your answers. Once submitted, you cannot change your answers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Component to list all available quizzes
const QuizList = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Available Quizzes</h1>
            <p className="text-gray-600">Choose a quiz to test your knowledge.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
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

export default TakeQuizPage;
