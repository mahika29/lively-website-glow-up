
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
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
            <Link to="/take" className={`py-2 px-3 rounded-md text-sm font-medium ${isActivePath('/take') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}>
              Take Quiz
            </Link>
            <Link to="/leaderboard" className={`py-2 px-3 rounded-md text-sm font-medium ${isActivePath('/leaderboard') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}>
              Leaderboard
            </Link>
            <Button className="ml-4">Sign In</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
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
              className={`block py-2 px-3 rounded-md text-base font-medium ${isActivePath('/take') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Take Quiz
            </Link>
            <Link 
              to="/leaderboard" 
              className={`block py-2 px-3 rounded-md text-base font-medium ${isActivePath('/leaderboard') ? 'text-quiz-primary' : 'text-gray-700 hover:text-quiz-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Button className="mt-2 w-full">Sign In</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
