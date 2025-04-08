
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';

// Get all unique categories and tags
const allCategories = Array.from(new Set(quizzes.map(quiz => quiz.category)));
const allDifficulties = ['easy', 'medium', 'hard'];

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  
  useEffect(() => {
    let filtered = [...quizzes];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(quiz => quiz.category === selectedCategory);
    }
    
    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }
    
    setFilteredQuizzes(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Explore Quizzes</h1>
          </div>
          
          {/* Search and filter UI */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {(selectedCategory || selectedDifficulty || searchTerm) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> Filters:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge variant="outline" className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      {selectedCategory}
                      <button 
                        className="ml-2"
                        onClick={() => setSelectedCategory(null)}
                      >
                        &times;
                      </button>
                    </Badge>
                  )}
                  {selectedDifficulty && (
                    <Badge variant="outline" className="flex items-center bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                      {selectedDifficulty}
                      <button 
                        className="ml-2"
                        onClick={() => setSelectedDifficulty(null)}
                      >
                        &times;
                      </button>
                    </Badge>
                  )}
                  {!selectedCategory && !selectedDifficulty && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">No filters applied</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex items-center mb-4">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold">Categories</h2>
            </div>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedCategory(null)}
                className={!selectedCategory ? "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100" : ""}
              >
                All
              </TabsTrigger>
              {allCategories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100" : ""}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* Difficulty tabs */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Tag className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold">Difficulty</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className={!selectedDifficulty ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" : ""}
                onClick={() => setSelectedDifficulty(null)}
              >
                All
              </Button>
              {allDifficulties.map(difficulty => (
                <Button 
                  key={difficulty} 
                  variant="outline" 
                  size="sm"
                  className={selectedDifficulty === difficulty ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" : ""}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quiz grid */}
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredQuizzes.map((quiz) => (
                <Card 
                  key={quiz.id} 
                  className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="h-32 bg-gradient-to-br from-quiz-primary/80 to-quiz-accent/80 dark:from-quiz-dark-primary/80 dark:to-quiz-dark-accent/80 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white px-4 text-center">{quiz.title}</h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded">
                        {quiz.category}
                      </span>
                      <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                        {quiz.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{quiz.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {quiz.questions.length} questions
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
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
