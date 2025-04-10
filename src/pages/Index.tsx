
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Brain, Clock, Trophy, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';

const Index = () => {
  const [featuredQuizzes, setFeaturedQuizzes] = useState(quizzes.slice(0, 3));
  const [statsVisible, setStatsVisible] = useState(false);
  
  useEffect(() => {
    // Animate stats into view when component mounts
    const timer = setTimeout(() => {
      setStatsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-quiz-primary to-quiz-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Create and Share Interactive Quizzes
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Quizzy makes it easy for teachers to create engaging quizzes and for students to learn interactively.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="bg-white text-quiz-primary hover:bg-white/90">
                  <Link to="/create">Create Quiz</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                  <Link to="/take">Take Quiz</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 animate-bounce-in">
                <h3 className="text-2xl font-bold mb-4">Sample Quiz Question</h3>
                <div className="mb-6">
                  <p className="text-lg mb-4">What does HTML stand for?</p>
                  <div className="space-y-3">
                    <div className="quiz-option border-white/30 hover:border-white/50 text-white">
                      Hyper Text Markup Language
                    </div>
                    <div className="quiz-option border-white/30 hover:border-white/50 text-white">
                      High Tech Machine Learning
                    </div>
                    <div className="quiz-option border-white/30 hover:border-white/50 text-white">
                      Hyperlink Text Manipulation Language
                    </div>
                    <div className="quiz-option border-white/30 hover:border-white/50 text-white">
                      Home Tool Markup Language
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-white text-quiz-primary hover:bg-white/90">
                    Next Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Book size={32} />, stat: '1,000+', label: 'Available Quizzes' },
              { icon: <Brain size={32} />, stat: '5M+', label: 'Questions Answered' },
              { icon: <Clock size={32} />, stat: '10 min', label: 'Avg. Completion Time' },
              { icon: <Trophy size={32} />, stat: '100k+', label: 'Active Users' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-xl p-6 shadow-sm border flex flex-col items-center text-center transition-all duration-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-quiz-primary mb-3">{item.icon}</div>
                <div className="text-3xl font-bold mb-2">{item.stat}</div>
                <div className="text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amazing Features for Everyone</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Designed with both teachers and students in mind, Quizzy offers a comprehensive set of tools to enhance the learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quiz Creation',
                description: 'Create engaging quizzes with multiple question types, time limits, and media content.',
                icon: <Book className="text-quiz-primary" size={40} />,
                link: '/create'
              },
              {
                title: 'Interactive Learning',
                description: 'Students can take quizzes from any device and get instant feedback on their answers.',
                icon: <Brain className="text-quiz-primary" size={40} />,
                link: '/take'
              },
              {
                title: 'Performance Tracking',
                description: 'Track student progress with detailed analytics and leaderboards.',
                icon: <Trophy className="text-quiz-primary" size={40} />,
                link: '/leaderboard'
              }
            ].map((feature, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-5">{feature.description}</p>
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-quiz-primary hover:text-quiz-accent font-medium"
                  >
                    Learn more <ChevronRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Quizzes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Quizzes</h2>
            <Link 
              to="/take" 
              className="text-quiz-primary hover:text-quiz-accent font-medium inline-flex items-center"
            >
              View all quizzes <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredQuizzes.map((quiz) => (
              <Card 
                key={quiz.id} 
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-quiz-primary/80 to-quiz-accent/80 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{quiz.title}</h3>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {quiz.category}
                    </span>
                    <span className="text-sm text-gray-500">{quiz.questions.length} questions</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {quiz.timeLimit} min
                    </div>
                    <Button asChild>
                      <Link to={`/take/${quiz.id}`}>
                        Take Quiz
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of students and professors who love using Quizzy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Quizzy has transformed how I conduct semester exams. The analytics help me identify areas where students need more support.",
                author: "Dr. Priya Sharma",
                role: "Professor, Delhi University",
                avatar: "https://randomuser.me/api/portraits/women/32.jpg"
              },
              {
                quote: "The practice quizzes helped me prepare better for my engineering exams. The instant feedback is really helpful!",
                author: "Rahul Patel",
                role: "B.Tech Student, IIT Bombay",
                avatar: "https://randomuser.me/api/portraits/men/44.jpg"
              },
              {
                quote: "As a college administrator, I appreciate how easy it is to manage multiple class assessments and track student progress.",
                author: "Prof. Rajesh Kumar",
                role: "HOD, VIT Vellore",
                avatar: "https://randomuser.me/api/portraits/men/67.jpg"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-sm border relative">
                <div className="text-3xl text-quiz-primary absolute top-4 left-4 opacity-20">"</div>
                <p className="text-gray-800 mb-6 pt-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-quiz-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Create your first quiz today and transform your teaching or learning experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-quiz-primary hover:bg-white/90">
              <Link to="/create">Create Quiz</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/20">
              <Link to="/take">Take Quiz</Link>
            </Button>
          </div>
          <div className="mt-12 flex justify-center space-x-8">
            {[
              { text: 'Free to use' },
              { text: 'No registration required' },
              { text: 'Works on all devices' }
            ].map((item, i) => (
              <div key={i} className="flex items-center text-sm md:text-base">
                <CheckCircle size={18} className="mr-2" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
