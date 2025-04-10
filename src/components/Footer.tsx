
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-quiz-primary">Quick Quiz</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Interactive learning platform for students and teachers.
            </p>
            <div className="pt-4">
              <p className="text-sm font-semibold">Developed and Owned by:</p>
              <p className="text-sm">Harshavardhan K</p>
              <p className="text-sm">Email: harshavardhan07224@gmail.com</p>
              <p className="text-sm">Phone: 9606264620</p>
            </div>
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
                <Link to="/flashcards" className="text-gray-500 dark:text-gray-400 hover:text-quiz-primary text-sm">
                  Flashcards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">User Types</h4>
            <ul className="space-y-2">
              <li className="text-gray-500 dark:text-gray-400 text-sm">
                <span className="font-medium">Students</span> - Join and create tests
              </li>
              <li className="text-gray-500 dark:text-gray-400 text-sm">
                <span className="font-medium">Teachers</span> - Create, modify and deploy tests
              </li>
              <li className="text-gray-500 dark:text-gray-400 text-sm">
                <span className="font-medium">Organizations</span> - Full access to all services
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">About</h4>
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
            © {currentYear} Quick Quiz. All rights reserved. This website belongs to Harshavardhan K.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
