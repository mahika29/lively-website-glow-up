
import { Link, useLocation } from 'react-router-dom';

const NavLinks = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
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
  );
};

export default NavLinks;
