
import { Quiz, LeaderboardEntry } from './quizzes';

// Function to parse quiz CSV data
export const importQuizzesFromCSV = (csvContent: string): Partial<Quiz>[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  const quizzes: Partial<Quiz>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const quiz: Partial<Quiz> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      if (!value) return;
      
      switch (header.trim().toLowerCase()) {
        case 'id':
          quiz.id = value;
          break;
        case 'title':
          quiz.title = value;
          break;
        case 'description':
          quiz.description = value;
          break;
        case 'author':
          quiz.author = value;
          break;
        case 'category':
          quiz.category = value;
          break;
        case 'timelimit':
        case 'time limit':
          quiz.timeLimit = parseInt(value, 10);
          break;
        case 'difficulty':
          quiz.difficulty = value as 'easy' | 'medium' | 'hard';
          break;
        case 'tags':
          quiz.tags = value.split(';');
          break;
      }
    });
    
    if (quiz.title) {
      quizzes.push(quiz);
    }
  }
  
  return quizzes;
};

// Function to parse results CSV data
export const importResultsFromCSV = (csvContent: string): Partial<LeaderboardEntry>[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  const results: Partial<LeaderboardEntry>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const result: Partial<LeaderboardEntry> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      if (!value) return;
      
      switch (header.trim().toLowerCase()) {
        case 'id':
          result.id = value;
          break;
        case 'quizid':
        case 'quiz id':
          result.quizId = value;
          break;
        case 'username':
        case 'user':
          result.username = value;
          break;
        case 'score':
          result.score = parseInt(value, 10);
          break;
        case 'timetaken':
        case 'time taken':
          result.timeTaken = parseInt(value, 10);
          break;
        case 'completedat':
        case 'completed at':
        case 'date':
          result.completedAt = value;
          break;
      }
    });
    
    if (result.username && result.quizId) {
      results.push(result);
    }
  }
  
  return results;
};

// Function to convert Excel-like structured data to Quiz objects
export const parseExcelData = (data: any[]): Partial<Quiz>[] => {
  return data.map(row => {
    const quiz: Partial<Quiz> = {
      id: row.ID || String(Date.now()),
      title: row.Title || 'Untitled Quiz',
      description: row.Description || '',
      author: row.Author || 'Unknown',
      category: row.Category || 'General',
      timeLimit: parseInt(row.TimeLimit, 10) || 10,
      difficulty: (row.Difficulty?.toLowerCase() || 'medium') as 'easy' | 'medium' | 'hard',
      tags: row.Tags ? row.Tags.split(';') : [],
      questions: []
    };
    
    return quiz;
  });
};

// Function to validate imported quiz data
export const validateQuizData = (quizData: Partial<Quiz>): string[] => {
  const errors: string[] = [];
  
  if (!quizData.title) {
    errors.push('Quiz title is required');
  }
  
  if (!quizData.questions || quizData.questions.length === 0) {
    errors.push('Quiz must have at least one question');
  } else {
    quizData.questions.forEach((question, index) => {
      if (!question.question) {
        errors.push(`Question ${index + 1} has no text`);
      }
      
      if (!question.options || question.options.length < 2) {
        errors.push(`Question ${index + 1} must have at least 2 options`);
      }
      
      if (question.correctAnswer === undefined || question.correctAnswer === null) {
        errors.push(`Question ${index + 1} has no correct answer specified`);
      }
    });
  }
  
  return errors;
};
