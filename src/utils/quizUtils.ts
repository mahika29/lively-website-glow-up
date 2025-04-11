
import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question } from '@/data/quizzes';
import { generateShareCode, storeShareCode } from '@/utils/shareCodeUtils';

// Function to save a quiz to localStorage (temporary until MongoDB integration)
export const saveQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>): string => {
  const id = uuidv4();
  const newQuiz: Quiz = {
    ...quiz,
    id,
    createdAt: new Date().toISOString(),
  };

  // Get existing quizzes from localStorage
  const storedQuizzes = localStorage.getItem('quizzes');
  const quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
  
  // Add new quiz
  quizzes.push(newQuiz);
  
  // Save back to localStorage
  localStorage.setItem('quizzes', JSON.stringify(quizzes));

  // Generate and store a share code
  const shareCode = generateShareCode(id);
  storeShareCode(id, shareCode);
  
  return id;
};

// Function to get all quizzes from localStorage
export const getAllQuizzes = (): Quiz[] => {
  const storedQuizzes = localStorage.getItem('quizzes');
  return storedQuizzes ? JSON.parse(storedQuizzes) : [];
};

// Function to get a quiz by ID
export const getQuizById = (id: string): Quiz | undefined => {
  const quizzes = getAllQuizzes();
  return quizzes.find(quiz => quiz.id === id);
};

// Function to get a quiz by share code
export const getQuizByShareCode = (code: string): Quiz | undefined => {
  const shareCodesJSON = localStorage.getItem('quiz_share_codes') || '{}';
  const shareCodes = JSON.parse(shareCodesJSON);
  const quizId = shareCodes[code];
  
  if (!quizId) return undefined;
  
  return getQuizById(quizId);
};
