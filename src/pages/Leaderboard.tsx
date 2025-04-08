
import { useState, useEffect } from 'react';
import { Trophy, Medal, Clock, Search, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes, leaderboard, LeaderboardEntry } from '@/data/quizzes';

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(leaderboard);
  const [selectedQuiz, setSelectedQuiz] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LeaderboardEntry | 'quizTitle';
    direction: 'asc' | 'desc';
  }>({ key: 'score', direction: 'desc' });
  const [topPerformers, setTopPerformers] = useState<LeaderboardEntry[]>([]);

  // Filter leaderboard entries based on search query and selected quiz
  useEffect(() => {
    let filtered = [...leaderboard];
    
    // Filter by quiz if selected
    if (selectedQuiz !== 'all') {
      filtered = filtered.filter(entry => entry.quizId === selectedQuiz);
    }
    
    // Filter by username search
    if (searchQuery) {
      filtered = filtered.filter(entry => 
        entry.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort the entries
    filtered.sort((a, b) => {
      if (sortConfig.key === 'quizTitle') {
        // Get quiz titles
        const quizA = quizzes.find(q => q.id === a.quizId)?.title || '';
        const quizB = quizzes.find(q => q.id === b.quizId)?.title || '';
        
        return sortConfig.direction === 'asc' 
          ? quizA.localeCompare(quizB)
          : quizB.localeCompare(quizA);
      }
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredLeaderboard(filtered);
  }, [searchQuery, selectedQuiz, sortConfig]);
  
  // Get top 3 performers for the trophy display
  useEffect(() => {
    const top = [...leaderboard]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setTopPerformers(top);
  }, []);
  
  // Handle sorting by column
  const handleSort = (key: keyof LeaderboardEntry | 'quizTitle') => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc'
    });
  };
  
  // Format timestamp to readable date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };
  
  // Format time taken (seconds) to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-gray-600">See who's topping the charts and how you compare.</p>
          </div>
          
          {/* Top Performers */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {topPerformers.map((entry, index) => {
                const quiz = quizzes.find(q => q.id === entry.quizId);
                return (
                  <div 
                    key={entry.id} 
                    className={`text-center ${
                      index === 0 
                        ? 'order-2 md:scale-110 md:-mt-4' 
                        : index === 1 
                          ? 'order-1' 
                          : 'order-3'
                    }`}
                  >
                    <div className={`relative inline-block mb-4 ${
                      index === 0 
                        ? 'text-yellow-500'
                        : index === 1 
                          ? 'text-gray-400'
                          : 'text-amber-700'
                    }`}>
                      {index === 0 ? (
                        <Trophy size={64} className="animate-pulse-scale" />
                      ) : (
                        <Medal size={50} />
                      )}
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-gray-100">
                        {index + 1}
                      </div>
                    </div>
                    <div className="font-bold text-lg mb-1">{entry.username}</div>
                    <div className="text-gray-500 text-sm">{quiz?.title}</div>
                    <div className="mt-2 font-bold text-2xl">{entry.score}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Filters and Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search by username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-64">
                  <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter size={16} className="mr-2" />
                        <SelectValue placeholder="Filter by quiz" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Quizzes</SelectItem>
                      {quizzes.map((quiz) => (
                        <SelectItem key={quiz.id} value={quiz.id}>
                          {quiz.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Leaderboard Table */}
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center font-medium"
                        onClick={() => handleSort('username')}
                      >
                        Username
                        {sortConfig.key === 'username' && (
                          sortConfig.direction === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center font-medium"
                        onClick={() => handleSort('quizTitle')}
                      >
                        Quiz
                        {sortConfig.key === 'quizTitle' && (
                          sortConfig.direction === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="text-right">
                      <button 
                        className="flex items-center font-medium ml-auto"
                        onClick={() => handleSort('score')}
                      >
                        Score
                        {sortConfig.key === 'score' && (
                          sortConfig.direction === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="text-right">
                      <button 
                        className="flex items-center font-medium ml-auto"
                        onClick={() => handleSort('timeTaken')}
                      >
                        Time
                        {sortConfig.key === 'timeTaken' && (
                          sortConfig.direction === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="text-right">
                      <button 
                        className="flex items-center font-medium ml-auto"
                        onClick={() => handleSort('completedAt')}
                      >
                        Date
                        {sortConfig.key === 'completedAt' && (
                          sortConfig.direction === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaderboard.length > 0 ? (
                    filteredLeaderboard.map((entry, index) => {
                      const quiz = quizzes.find(q => q.id === entry.quizId);
                      return (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>{entry.username}</TableCell>
                          <TableCell>{quiz?.title}</TableCell>
                          <TableCell className="text-right font-bold">
                            {entry.score}%
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Clock size={14} className="mr-1 text-gray-500" />
                              {formatTime(entry.timeTaken)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-gray-500">
                            {formatDate(entry.completedAt)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                        No entries found. Try changing your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
