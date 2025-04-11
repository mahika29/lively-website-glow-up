
import { Link } from 'react-router-dom';
import { ArrowRight, PenSquare, Users, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-quiz-primary animate-fade-in">
                Welcome to Quick Quiz
              </h1>
              <p className="max-w-[700px] text-lg md:text-xl text-gray-600 dark:text-gray-400 animate-fade-in">
                Create, share, and take quizzes with ease. Perfect for educators, students, and quiz enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in">
                <Button size="lg" className="bg-quiz-primary hover:bg-quiz-primary/90" asChild>
                  <Link to="/create">
                    Create Quiz
                    <PenSquare className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/join">
                    Join Quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-quiz-primary/10 text-quiz-primary flex items-center justify-center mb-4">
                    <PenSquare className="h-6 w-6" />
                  </div>
                  <CardTitle>Create</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create custom quizzes with multiple choice, true/false, and short answer questions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/create">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-quiz-primary/10 text-quiz-primary flex items-center justify-center mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share your quizzes with a simple code. Perfect for classrooms or remote learning.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/join">Join Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-quiz-primary/10 text-quiz-primary flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <CardTitle>Compete</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track scores on the leaderboard and see how you compare to others.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/leaderboard">View Leaderboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* PHP Database Integration Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">PHP Database Integration</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Quick Quiz supports PHP and MySQL integration for enterprise-level quiz management and analytics.
                </p>
              </div>
              <div className="flex-1 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900">
                <h3 className="text-xl font-semibold mb-3">Integration Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-quiz-primary"></span>
                    Unlimited quiz storage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-quiz-primary"></span>
                    Advanced analytics and reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-quiz-primary"></span>
                    User role management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-quiz-primary"></span>
                    Enhanced security features
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
