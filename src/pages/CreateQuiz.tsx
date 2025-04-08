
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Save, ArrowLeft, ArrowRight, Clock, HelpCircle, PlusCircle, Tag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define the question type
interface QuestionData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | null;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for quiz details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [timeLimit, setTimeLimit] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [tags, setTags] = useState('');
  
  // State for questions
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: null
    }
  ]);
  
  // Current editing question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Handle adding a new question
  const handleAddQuestion = () => {
    const newQuestion: QuestionData = {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: null
    };
    
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
    
    // Show toast notification
    toast({
      title: "Question added",
      description: `Question ${questions.length + 1} has been added.`,
    });
  };
  
  // Handle removing the current question
  const handleRemoveQuestion = () => {
    if (questions.length <= 1) {
      toast({
        title: "Cannot remove question",
        description: "A quiz must have at least one question.",
        variant: "destructive"
      });
      return;
    }
    
    const newQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
    setQuestions(newQuestions);
    
    // Adjust current question index if needed
    if (currentQuestionIndex >= newQuestions.length) {
      setCurrentQuestionIndex(newQuestions.length - 1);
    }
    
    toast({
      title: "Question removed",
      description: `Question ${currentQuestionIndex + 1} has been removed.`,
    });
  };
  
  // Handle question text change
  const handleQuestionChange = (value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = value;
    setQuestions(updatedQuestions);
  };
  
  // Handle option text change
  const handleOptionChange = (optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };
  
  // Handle correct answer selection
  const handleCorrectAnswerChange = (value: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };
  
  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Handle saving the quiz
  const handleSaveQuiz = () => {
    // Validate quiz details
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your quiz.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.question.trim()) {
        toast({
          title: "Empty question",
          description: `Question ${i + 1} is empty.`,
          variant: "destructive"
        });
        setCurrentQuestionIndex(i);
        return;
      }
      
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast({
            title: "Empty option",
            description: `Option ${j + 1} in Question ${i + 1} is empty.`,
            variant: "destructive"
          });
          setCurrentQuestionIndex(i);
          return;
        }
      }
      
      if (q.correctAnswer === null) {
        toast({
          title: "No correct answer",
          description: `No correct answer selected for Question ${i + 1}.`,
          variant: "destructive"
        });
        setCurrentQuestionIndex(i);
        return;
      }
    }
    
    // In a real app, you would save this data to a backend
    // For now, we'll just simulate success
    
    toast({
      title: "Quiz saved successfully!",
      description: `Your quiz "${title}" has been created with ${questions.length} questions.`,
    });
    
    // Navigate to the home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create a New Quiz</h1>
            <p className="text-gray-600">
              Fill in the details below to create your quiz. Add questions, options, and mark the correct answers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quiz Details */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Quiz Title</Label>
                      <Input 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Mathematics Fundamentals"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a brief description of your quiz"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Knowledge</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="language">Languages</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timeLimit" className="flex items-center">
                        <Clock size={16} className="mr-1" /> Time Limit (minutes)
                      </Label>
                      <Input 
                        id="timeLimit" 
                        type="number" 
                        min={1}
                        max={60}
                        value={timeLimit} 
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tags" className="flex items-center">
                        <Tag size={16} className="mr-1" /> Tags (comma separated)
                      </Label>
                      <Input 
                        id="tags" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g., algebra, equations, linear"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Questions</h2>
                    <span className="text-sm text-gray-500">{questions.length} total</span>
                  </div>
                  
                  <div className="space-y-2">
                    {questions.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          index === currentQuestionIndex 
                            ? 'bg-quiz-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Question {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={handleAddQuestion}
                  >
                    <Plus size={16} className="mr-2" /> Add Question
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Question Editor */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        <ArrowLeft size={16} className="mr-1" /> Previous
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={goToNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                      >
                        Next <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="question" className="flex items-center">
                        <HelpCircle size={16} className="mr-1" /> Question Text
                      </Label>
                      <Textarea 
                        id="question" 
                        value={questions[currentQuestionIndex].question} 
                        onChange={(e) => handleQuestionChange(e.target.value)}
                        placeholder="Enter your question here"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Options</Label>
                      {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-2">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={`w-10 h-10 min-w-10 ${
                                  questions[currentQuestionIndex].correctAnswer === optionIndex
                                    ? 'bg-quiz-primary text-white border-quiz-primary'
                                    : ''
                                }`}
                                onClick={() => handleCorrectAnswerChange(optionIndex)}
                              >
                                {String.fromCharCode(65 + optionIndex)}
                              </Button>
                              <Input 
                                className="ml-2 flex-1"
                                value={option} 
                                onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <span className="flex-1">
                        Click on an option letter to mark it as the correct answer.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handleRemoveQuestion}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} className="mr-2" /> Remove Question
                </Button>
                
                <div className="space-x-2">
                  <Button 
                    onClick={handleAddQuestion}
                    variant="outline"
                  >
                    <PlusCircle size={16} className="mr-2" /> Add Another Question
                  </Button>
                  <Button onClick={handleSaveQuiz}>
                    <Save size={16} className="mr-2" /> Save Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateQuiz;
