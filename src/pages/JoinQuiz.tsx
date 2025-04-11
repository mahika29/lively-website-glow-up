
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getQuizByShareCode } from '@/utils/quizUtils';

const JoinQuiz = () => {
  const [quizCode, setQuizCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    if (!quizCode.trim()) {
      toast({
        title: "Quiz code required",
        description: "Please enter a quiz code to join a quiz",
        variant: "destructive"
      });
      return;
    }

    const quiz = getQuizByShareCode(quizCode.toUpperCase());
    
    if (!quiz) {
      toast({
        title: "Invalid quiz code",
        description: "The quiz code you entered does not exist",
        variant: "destructive"
      });
      return;
    }

    // Navigate to the quiz
    navigate(`/take/${quiz.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Join a Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="quiz-code" className="block text-sm font-medium">
                  Enter Quiz Code
                </label>
                <Input
                  id="quiz-code"
                  placeholder="Enter 6-digit code (e.g., AB12CD)"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  className="font-mono text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleJoinQuiz}
              >
                Join Quiz
              </Button>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/take')}
              >
                Browse All Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default JoinQuiz;
