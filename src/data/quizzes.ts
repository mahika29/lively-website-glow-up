export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  timeLimit: number; // in minutes
  questions: Question[];
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  thumbnail?: string;
}

export interface LeaderboardEntry {
  id: string;
  quizId: string;
  username: string;
  score: number;
  timeTaken: number; // in seconds
  completedAt: string;
}

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Web Development Basics',
    description: 'Test your knowledge of HTML, CSS, and JavaScript fundamentals.',
    author: 'TechTeacher',
    category: 'Programming',
    timeLimit: 10,
    difficulty: 'easy',
    createdAt: '2025-04-01T12:00:00Z',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web'],
    questions: [
      {
        id: 1,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Machine Learning',
          'Hyperlink Text Manipulation Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Which CSS property is used to change the text color?',
        options: [
          'text-style',
          'font-color',
          'color',
          'text-color'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'Which of the following is NOT a JavaScript data type?',
        options: [
          'String',
          'Boolean',
          'Integer',
          'Object'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'What is the correct way to comment in JavaScript?',
        options: [
          '// This is a comment',
          '/* This is a comment */',
          '<!-- This is a comment -->',
          'Both A and B'
        ],
        correctAnswer: 3
      },
      {
        id: 5,
        question: 'Which CSS property is used to add space between elements?',
        options: [
          'spacing',
          'margin',
          'padding',
          'gap'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '2',
    title: 'Science Quiz: Physics Fundamentals',
    description: 'Test your knowledge of basic physics concepts and principles.',
    author: 'ScienceGuru',
    category: 'Science',
    timeLimit: 15,
    difficulty: 'medium',
    createdAt: '2025-04-02T10:30:00Z',
    tags: ['Physics', 'Science', 'Education'],
    questions: [
      {
        id: 1,
        question: 'What is the SI unit of force?',
        options: [
          'Watt',
          'Joule',
          'Newton',
          'Pascal'
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'Which scientist formulated the laws of motion?',
        options: [
          'Albert Einstein',
          'Isaac Newton',
          'Galileo Galilei',
          'Nikola Tesla'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is the formula for calculating work?',
        options: [
          'W = F × d',
          'W = m × g',
          'W = m × a',
          'W = F × t'
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '3',
    title: 'General Knowledge Quiz',
    description: 'Test your knowledge across various subjects.',
    author: 'QuizMaster',
    category: 'General',
    timeLimit: 20,
    difficulty: 'medium',
    createdAt: '2025-04-03T15:45:00Z',
    tags: ['General Knowledge', 'Trivia', 'Fun'],
    questions: [
      {
        id: 1,
        question: 'Which planet is known as the Red Planet?',
        options: [
          'Venus',
          'Mars',
          'Jupiter',
          'Saturn'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Who wrote "Romeo and Juliet"?',
        options: [
          'Charles Dickens',
          'Jane Austen',
          'William Shakespeare',
          'F. Scott Fitzgerald'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is the capital of Japan?',
        options: [
          'Beijing',
          'Seoul',
          'Tokyo',
          'Bangkok'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '4',
    title: 'Mathematical Puzzles',
    description: 'Challenge your brain with these math problems.',
    author: 'MathWhiz',
    category: 'Mathematics',
    timeLimit: 30,
    difficulty: 'hard',
    createdAt: '2025-04-04T09:15:00Z',
    tags: ['Math', 'Puzzles', 'Problem Solving'],
    questions: [
      {
        id: 1,
        question: 'What is the value of x in the equation 2x + 5 = 13?',
        options: [
          '3',
          '4',
          '5',
          '6'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is the derivative of x²?',
        options: [
          'x',
          '2x',
          '2x²',
          'x³'
        ],
        correctAnswer: 1
      }
    ]
  }
];

export const leaderboard: LeaderboardEntry[] = [
  { 
    id: '1', 
    quizId: '1', 
    username: 'CodeNinja', 
    score: 90, 
    timeTaken: 480, 
    completedAt: '2025-04-05T14:30:00Z' 
  },
  { 
    id: '2', 
    quizId: '1', 
    username: 'WebWizard', 
    score: 85, 
    timeTaken: 520, 
    completedAt: '2025-04-05T15:45:00Z' 
  },
  { 
    id: '3', 
    quizId: '1', 
    username: 'HTMLHero', 
    score: 80, 
    timeTaken: 550, 
    completedAt: '2025-04-06T10:15:00Z' 
  },
  { 
    id: '4', 
    quizId: '2', 
    username: 'PhysicsPhenom', 
    score: 95, 
    timeTaken: 720, 
    completedAt: '2025-04-06T16:20:00Z' 
  },
  { 
    id: '5', 
    quizId: '2', 
    username: 'ScienceStudent', 
    score: 75, 
    timeTaken: 810, 
    completedAt: '2025-04-07T11:45:00Z' 
  },
  { 
    id: '6', 
    quizId: '3', 
    username: 'TriviaKing', 
    score: 100, 
    timeTaken: 900, 
    completedAt: '2025-04-07T19:30:00Z' 
  },
  { 
    id: '7', 
    quizId: '4', 
    username: 'MathMaster', 
    score: 90, 
    timeTaken: 1200, 
    completedAt: '2025-04-08T08:45:00Z' 
  },
  { 
    id: '8', 
    quizId: '4', 
    username: 'NumberNerd', 
    score: 85, 
    timeTaken: 1250, 
    completedAt: '2025-04-08T12:15:00Z' 
  }
];

export const saveQuizProgress = (quizId: string, answers: number[], currentQuestionIndex: number): void => {
  const progress = {
    answers,
    currentQuestionIndex,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(`quiz_progress_${quizId}`, JSON.stringify(progress));
};

export const getQuizProgress = (quizId: string): { answers: number[], currentQuestionIndex: number } | null => {
  const progress = localStorage.getItem(`quiz_progress_${quizId}`);
  if (!progress) return null;
  
  const parsed = JSON.parse(progress);
  const savedTime = new Date(parsed.timestamp).getTime();
  const currentTime = new Date().getTime();
  const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);
  
  if (hoursDiff > 24) {
    localStorage.removeItem(`quiz_progress_${quizId}`);
    return null;
  }
  
  return {
    answers: parsed.answers,
    currentQuestionIndex: parsed.currentQuestionIndex
  };
};

export const clearQuizProgress = (quizId: string): void => {
  localStorage.removeItem(`quiz_progress_${quizId}`);
};

export const saveQuizResult = (quizId: string, username: string, score: number, timeTaken: number): void => {
  const result = {
    id: `result_${Date.now()}`,
    quizId,
    username,
    score,
    timeTaken,
    completedAt: new Date().toISOString()
  };
  
  const resultsJson = localStorage.getItem('quiz_results') || '[]';
  const results = JSON.parse(resultsJson);
  
  results.push(result);
  
  localStorage.setItem('quiz_results', JSON.stringify(results));
};

export const getQuizResults = (): LeaderboardEntry[] => {
  const resultsJson = localStorage.getItem('quiz_results') || '[]';
  return JSON.parse(resultsJson);
};
