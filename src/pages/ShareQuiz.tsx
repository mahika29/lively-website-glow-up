
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, Code, Copy, Check, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';

const ShareQuiz = () => {
  const { quizId } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string>('');
  
  const quiz = quizzes.find(q => q.id === quizId);
  
  useEffect(() => {
    // Generate a unique share code when the component mounts
    if (quiz) {
      const code = generateShareCode(quiz.id);
      setShareCode(code);
    }
  }, [quiz]);
  
  // Generate a 6-character alphanumeric share code
  const generateShareCode = (id: string) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    // Use the quiz id as part of the seed for consistency
    const seed = parseInt(id, 10) || Date.now();
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = (seed + i * 17) % chars.length;
      code += chars[randomIndex];
    }
    
    return code;
  };
  
  // Handle copy to clipboard functionality
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
    });
  };
  
  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Quiz Not Found</h1>
            <p className="text-gray-600 mb-6">The quiz you're trying to share doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/create">Create a Quiz</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const shareUrl = `${window.location.origin}/take/${quiz.id}`;
  const examUrl = `${window.location.origin}/exam/${quiz.id}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Share2 className="mr-2 text-quiz-primary" />
            <h1 className="text-2xl font-bold">Share Quiz</h1>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>
                {quiz.description}
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="link">
              <TabsList className="mx-6">
                <TabsTrigger value="link" className="flex items-center gap-1">
                  <LinkIcon size={14} />
                  <span>Share Link</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-1">
                  <Code size={14} />
                  <span>Share Code</span>
                </TabsTrigger>
                <TabsTrigger value="exam" className="flex items-center gap-1">
                  <Users size={14} />
                  <span>Exam Mode</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="link" className="px-6">
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Share this link with others so they can take your quiz:
                  </p>
                  
                  <div className="flex space-x-2">
                    <Input 
                      value={shareUrl} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCopy(shareUrl, 'Link')}
                    >
                      {copied === 'Link' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="code" className="px-6">
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Share this code with others. They can enter it to access your quiz:
                  </p>
                  
                  <div className="flex space-x-2">
                    <div className="w-full">
                      <div className="bg-gray-100 p-4 rounded text-center font-mono text-xl tracking-widest font-bold">
                        {shareCode}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCopy(shareCode, 'Code')}
                    >
                      {copied === 'Code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="exam" className="px-6">
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Use Exam Mode to proctor a timed assessment. This will lock students in fullscreen mode:
                  </p>
                  
                  <div className="flex space-x-2">
                    <Input 
                      value={examUrl} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCopy(examUrl, 'Exam URL')}
                    >
                      {copied === 'Exam URL' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline" asChild>
                <Link to="/create">Back to My Quizzes</Link>
              </Button>
              <Button asChild>
                <Link to={`/take/${quiz.id}`}>Preview Quiz</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Quiz Sharing Options</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                  <span className="absolute flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </span>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Share Link</span>: Users can access your quiz directly through this link.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                  <span className="absolute flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </span>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Share Code</span>: Users can enter this code on the quiz page to find your quiz.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                  <span className="absolute flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </span>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Exam Mode</span>: Perfect for classroom assessments. Users will be locked in fullscreen until they complete the quiz.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShareQuiz;
