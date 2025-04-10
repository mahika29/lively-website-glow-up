
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, PenLine, Share2, Code, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import UserProfileMenu from '@/components/UserProfileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-quiz-primary" />
              <span className="text-2xl font-bold text-quiz-primary">Quizzy</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className={`py-2 px-3 rounded-md text-sm font-medium ${isActivePath('/') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}>
              Home
            </Link>
            <Link to="/create" className={`py-2 px-3 rounded-md text-sm font-medium ${isActivePath('/create') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}>
              Create Quiz
            </Link>
            <Link to="/take" className={`py-2 px-3 rounded-md text-sm font-medium flex items-center gap-1 ${isActivePath('/take') || location.pathname.startsWith('/take/') ? 'text-quiz-primary font-semibold' : 'text-gray-700 hover:text-quiz-primary'}`}>
              <PenLine size={16} />
              Take Quiz
            </Link>
            <Link to="/leaderboard" className={`py-2 px-3 rounded-md text-sm font-medium ${isActivePath('/leaderboard') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}>
              Leaderboard
            </Link>
            {user && (
              <Link 
                to="/settings" 
                className={`py-2 px-3 rounded-md text-sm font-medium flex items-center gap-1 ${isActivePath('/settings') ? 'text-quiz-primary font-semibold' : 'text-gray-700 hover:text-quiz-primary'}`}
              >
                <Settings size={16} />
                Settings
              </Link>
            )}
            <UserProfileMenu />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <div className="mr-2">
              <UserProfileMenu />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link 
              to="/" 
              className={`block py-2 px-3 rounded-md text-base font-medium ${isActivePath('/') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`block py-2 px-3 rounded-md text-base font-medium ${isActivePath('/create') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Create Quiz
            </Link>
            <Link 
              to="/take" 
              className={`flex items-center gap-1 py-2 px-3 rounded-md text-base font-medium ${isActivePath('/take') || location.pathname.startsWith('/take/') ? 'text-quiz-primary font-semibold' : 'text-gray-700 hover:text-quiz-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <PenLine size={16} />
              Take Quiz
            </Link>
            <Link 
              to="/leaderboard" 
              className={`block py-2 px-3 rounded-md text-base font-medium ${isActivePath('/leaderboard') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            {user && (
              <Link 
                to="/settings" 
                className={`flex items-center gap-1 py-2 px-3 rounded-md text-base font-medium ${isActivePath('/settings') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
