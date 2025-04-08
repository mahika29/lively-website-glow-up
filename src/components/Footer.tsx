
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-quiz-primary">Quizzy</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Interactive learning platform for students and teachers.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/create" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Quiz Creation
                </Link>
              </li>
              <li>
                <Link to="/take" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Quiz Taking
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Flashcards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Teacher Guides
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Student Tutorials
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Quizzy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
