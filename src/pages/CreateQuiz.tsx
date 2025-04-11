
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Quiz } from '@/data/quizzes';
import { saveQuiz } from '@/utils/quizUtils';

// Initial empty question structure
const emptyQuestion = {
  id: 0,
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0
};

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [timeLimit, setTimeLimit] = useState(30);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [questions, setQuestions] = useState([{ ...emptyQuestion }]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions, 
      { 
        ...emptyQuestion, 
        id: questions.length 
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "A quiz must have at least one question",
        variant: "destructive"
      });
    }
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { 
      ...updatedQuestions[index], 
      [field]: value 
    };
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setQuestions(updatedQuestions);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateQuiz = () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your quiz",
        variant: "destructive"
      });
      return false;
    }

    if (!description.trim()) {
      toast({
        title: "Missing description",
        description: "Please provide a description for your quiz",
        variant: "destructive"
      });
      return false;
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.question.trim()) {
        toast({
          title: "Incomplete question",
          description: `Question ${i + 1} is missing text`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check if all options have values
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast({
            title: "Incomplete options",
            description: `Question ${i + 1} has an empty option`,
            variant: "destructive"
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateQuiz()) return;

    try {
      const author = "Current User"; // This would come from auth context in a real app
      
      const quizData: Omit<Quiz, 'id' | 'createdAt'> = {
        title,
        description,
        category,
        author,
        timeLimit,
        difficulty,
        tags,
        questions
      };
      
      const quizId = saveQuiz(quizData);
      
      toast({
        title: "Quiz created!",
        description: "Your quiz has been successfully created",
      });
      
      // Navigate to share page
      navigate(`/share/${quizId}`);
    } catch (error) {
      toast({
        title: "Error creating quiz",
        description: "There was a problem creating your quiz",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Create a New Quiz</CardTitle>
                <CardDescription>Fill in the details to create your quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quiz Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Quiz Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                {/* Quiz Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Enter a description for your quiz"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full"
                    rows={3}
                  />
                </div>
                
                {/* Quiz Settings */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <Select 
                      value={category}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Knowledge</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="arts">Arts & Literature</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="movies">Movies & TV</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Time Limit */}
                  <div>
                    <label htmlFor="timeLimit" className="block text-sm font-medium mb-2">
                      Time Limit (minutes)
                    </label>
                    <Input
                      id="timeLimit"
                      type="number"
                      min={1}
                      max={180}
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(parseInt(e.target.value) || 30)}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Difficulty */}
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                      Difficulty
                    </label>
                    <Select 
                      value={difficulty}
                      onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)}
                    >
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
                </div>
                
                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium mb-2">
                    Tags
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag (press Enter)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addTag}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Questions Section */}
            <h2 className="text-xl font-semibold mb-4">Questions</h2>
            
            {questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="mb-6">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(questionIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Question Text */}
                  <div>
                    <label htmlFor={`question-${questionIndex}`} className="block text-sm font-medium mb-2">
                      Question
                    </label>
                    <Textarea
                      id={`question-${questionIndex}`}
                      placeholder="Enter your question"
                      value={question.question}
                      onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                      className="w-full"
                      rows={2}
                    />
                  </div>
                  
                  {/* Options */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Options (select the correct answer)</p>
                    
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3">
                        <button
                          type="button"
                          className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                            question.correctAnswer === optionIndex
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          } flex items-center justify-center focus:outline-none`}
                          onClick={() => setCorrectAnswer(questionIndex, optionIndex)}
                        >
                          {question.correctAnswer === optionIndex && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </button>
                        
                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                          className="flex-grow"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full mb-6"
              onClick={addQuestion}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
            
            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                Create Quiz
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateQuiz;
