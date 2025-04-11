
// Generate a 6-character alphanumeric share code
export const generateShareCode = (id: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  // Use the quiz id as part of the seed for consistency
  const seed = parseInt(id, 10) || Date.now();
  
  for (let i = 0; i < 6; i++) {
    const randomIndex = (seed + i * 17) % chars.length;
    code += chars[randomIndex];
  }
  
  return code;
};

// Store a share code in local storage
export const storeShareCode = (quizId: string, code: string): void => {
  // Get existing share codes
  const shareCodesJSON = localStorage.getItem('quiz_share_codes') || '{}';
  const shareCodes = JSON.parse(shareCodesJSON);
  
  // Add new code
  shareCodes[code] = quizId;
  
  // Save back to localStorage
  localStorage.setItem('quiz_share_codes', JSON.stringify(shareCodes));
};

// Look up a quiz id by share code
export const getQuizIdByCode = (code: string): string | null => {
  const shareCodesJSON = localStorage.getItem('quiz_share_codes') || '{}';
  const shareCodes = JSON.parse(shareCodesJSON);
  
  return shareCodes[code] || null;
};

// Check if a code exists
export const shareCodeExists = (code: string): boolean => {
  return getQuizIdByCode(code) !== null;
};
