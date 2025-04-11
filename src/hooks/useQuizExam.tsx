
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Quiz, saveQuizProgress, getQuizProgress, clearQuizProgress, saveQuizResult } from '@/data/quizzes';
import { useAuth } from '@/contexts/AuthContext';

export const useQuizExam = (quiz: Quiz | undefined) => {
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
  
  // Toggle fullscreen mode
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
  
  // Handle answer selection
  const handleSelectOption = useCallback((optionIndex: number) => {
    if (quizSubmitted) return;
    
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = optionIndex;
      return newAnswers;
    });
  }, [quizSubmitted, currentQuestionIndex]);
  
  // Handle quiz submission
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
  
  // Navigation functions
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
  
  return {
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
  };
};
