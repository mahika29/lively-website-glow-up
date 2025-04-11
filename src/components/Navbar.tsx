
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useMediaQuery } from '@/hooks/use-mobile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-quiz-primary">Quick Quiz</span>
            </Link>
            
            {!isMobile && (
              <div className="ml-10 flex items-center space-x-4">
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') 
                      ? 'bg-quiz-primary/10 text-quiz-primary' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/create" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/create') 
                      ? 'bg-quiz-primary/10 text-quiz-primary' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Create Quiz
                </Link>
                <Link 
                  to="/take" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/take') 
                      ? 'bg-quiz-primary/10 text-quiz-primary' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Take Quiz
                </Link>
                <Link 
                  to="/leaderboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/leaderboard') 
                      ? 'bg-quiz-primary/10 text-quiz-primary' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Leaderboard
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            {user ? (
              <div className="ml-3 relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full" size="icon">
                      <Avatar>
                        <AvatarFallback className="bg-quiz-primary text-white">
                          {user.name ? user.name[0] : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email || 'user@example.com'}
                      </p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className="cursor-pointer text-red-600 flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="ml-4 flex items-center">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild className="ml-2">
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
            
            {isMobile && (
              <div className="ml-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-md text-gray-700 focus:outline-none"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isOpen && (
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
      )}
    </nav>
  );
};

export default Navbar;
