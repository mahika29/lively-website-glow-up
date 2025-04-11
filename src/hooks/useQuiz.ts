
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Quiz, saveQuizProgress, getQuizProgress, clearQuizProgress, saveQuizResult } from '@/data/quizzes';

export const useQuiz = (quiz: Quiz | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answersRevealed, setAnswersRevealed] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Handle selection of an answer option
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
    if (!quiz) return;
    
    const unansweredCount = selectedAnswers.filter(a => a === -1).length;
    
    if (unansweredCount > 0 && !quizSubmitted) {
      toast({
        title: `${unansweredCount} question${unansweredCount > 1 ? 's' : ''} unanswered`,
        description: "Are you sure you want to submit? You can go back and review your answers.",
        variant: "destructive"
      });
      return;
    }
    
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setQuizSubmitted(true);
    
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 600;
    
    if (quiz) {
      clearQuizProgress(quiz.id);
    }
    
    toast({
      title: "Quiz Submitted",
      description: `Your score: ${calculatedScore}%. You got ${correctAnswers} out of ${quiz.questions.length} questions correct.`,
    });
  }, [quiz, selectedAnswers, quizSubmitted, startTime, toast]);

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

  // Handle reveal answers after submission
  const handleRevealAnswers = useCallback(() => {
    setAnswersRevealed(true);
    setCurrentQuestionIndex(0);
  }, []);

  // Handle saving results to leaderboard
  const handleSaveResult = useCallback(() => {
    if (!quiz) return;
    
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
  }, [quiz, username, score, startTime, toast, navigate]);
  
  // Initialize answers array and restore progress
  useEffect(() => {
    if (!quizSubmitted && quiz) {
      const newAnswers = new Array(quiz.questions.length).fill(-1);
      setSelectedAnswers(newAnswers);
      
      const savedProgress = getQuizProgress(quiz.id);
      if (savedProgress) {
        toast({
          title: "Progress Restored",
          description: "We've loaded your previous progress for this quiz.",
        });
        setSelectedAnswers(savedProgress.answers);
        setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      }
      
      setStartTime(Date.now());
    }
  }, [quiz, quizSubmitted, toast]);
  
  // Setup timer
  useEffect(() => {
    if (!quizSubmitted && quiz && quiz.timeLimit > 0) {
      setTimeRemaining(quiz.timeLimit * 60);
      
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quizSubmitted, quiz, handleSubmitQuiz]);
  
  // Save progress
  useEffect(() => {
    if (!quizSubmitted && quiz && selectedAnswers.length > 0) {
      saveQuizProgress(quiz.id, selectedAnswers, currentQuestionIndex);
    }
  }, [selectedAnswers, currentQuestionIndex, quizSubmitted, quiz]);

  return {
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
  };
};
