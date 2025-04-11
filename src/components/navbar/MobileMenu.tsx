
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="pt-2 pb-4 space-y-1 px-4">
        <Link 
          to="/" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive('/') 
              ? 'bg-quiz-primary/10 text-quiz-primary' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/create" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive('/create') 
              ? 'bg-quiz-primary/10 text-quiz-primary' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setIsOpen(false)}
        >
          Create Quiz
        </Link>
        <Link 
          to="/take" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive('/take') 
              ? 'bg-quiz-primary/10 text-quiz-primary' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setIsOpen(false)}
        >
          Take Quiz
        </Link>
        <Link 
          to="/join" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive('/join') 
              ? 'bg-quiz-primary/10 text-quiz-primary' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setIsOpen(false)}
        >
          Join Quiz
        </Link>
        <Link 
          to="/leaderboard" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive('/leaderboard') 
              ? 'bg-quiz-primary/10 text-quiz-primary' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setIsOpen(false)}
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
