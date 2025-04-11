
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Code } from 'lucide-react';

const MongoDbIntegration = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">MongoDB Integration Guide</h1>
            <p className="text-gray-600">
              Follow these steps to integrate your Quiz App with MongoDB for secure data storage and retrieval.
            </p>
          </div>
          
          <Tabs defaultValue="backend">
            <TabsList className="mb-4">
              <TabsTrigger value="backend">Backend Setup</TabsTrigger>
              <TabsTrigger value="frontend">Frontend Integration</TabsTrigger>
              <TabsTrigger value="deploy">Deployment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="backend">
              <Card>
                <CardHeader>
                  <CardTitle>Setting Up MongoDB Backend</CardTitle>
                  <CardDescription>
                    Create a Node.js server with Express and MongoDB
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Create MongoDB Atlas Account</h3>
                    <p className="text-sm text-gray-600">
                      Sign up for a free account at <a href="https://www.mongodb.com/cloud/atlas" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a> and create a new cluster.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Set Up Express Server</h3>
                    <p className="text-sm text-gray-600">
                      Create a new Node.js project and install dependencies:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`npm init -y
npm install express mongoose cors dotenv`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">3. Create Database Connection</h3>
                    <p className="text-sm text-gray-600">
                      Create a <code className="bg-gray-100 px-1 py-0.5 rounded">db.js</code> file:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">4. Define Quiz Schema</h3>
                    <p className="text-sm text-gray-600">
                      Create a <code className="bg-gray-100 px-1 py-0.5 rounded">models/Quiz.js</code> file:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String, required: true },
  category: { type: String, required: true },
  timeLimit: { type: Number, default: 10 },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questions: [QuestionSchema],
  shareCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">5. Create API Routes</h3>
                    <p className="text-sm text-gray-600">
                      Create a <code className="bg-gray-100 px-1 py-0.5 rounded">routes/quizzes.js</code> file:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a new quiz
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get quiz by share code
router.get('/code/:code', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ shareCode: req.params.code });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="frontend">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend Integration</CardTitle>
                  <CardDescription>
                    Connect your React app to the MongoDB backend
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Create API Service</h3>
                    <p className="text-sm text-gray-600">
                      Create a <code className="bg-gray-100 px-1 py-0.5 rounded">src/services/api.ts</code> file:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`import axios from 'axios';
import { Quiz } from '@/data/quizzes';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchAllQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get('/quizzes');
  return response.data;
};

export const fetchQuizById = async (id: string): Promise<Quiz> => {
  const response = await api.get(\`/quizzes/\${id}\`);
  return response.data;
};

export const fetchQuizByCode = async (code: string): Promise<Quiz> => {
  const response = await api.get(\`/quizzes/code/\${code}\`);
  return response.data;
};

export const createQuiz = async (quiz: Omit<Quiz, 'id' | 'createdAt'>): Promise<Quiz> => {
  const response = await api.post('/quizzes', quiz);
  return response.data;
};

export const saveQuizResult = async (
  quizId: string, 
  username: string, 
  score: number, 
  timeTaken: number
): Promise<void> => {
  await api.post(\`/quizzes/\${quizId}/results\`, { username, score, timeTaken });
};

export default api;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Integrate with React Query</h3>
                    <p className="text-sm text-gray-600">
                      Update your components to use React Query for data fetching:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllQuizzes, createQuiz } from '@/services/api';

// In your component:
const { data: quizzes, isLoading, error } = useQuery({
  queryKey: ['quizzes'],
  queryFn: fetchAllQuizzes
});

const queryClient = useQueryClient();
const createQuizMutation = useMutation({
  mutationFn: createQuiz,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['quizzes'] });
  }
});

// To save a quiz:
const handleSaveQuiz = () => {
  createQuizMutation.mutate(newQuiz);
};`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deploy">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment</CardTitle>
                  <CardDescription>
                    Deploy your app and MongoDB backend
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Prepare for Deployment</h3>
                    <p className="text-sm text-gray-600">
                      Update your <code className="bg-gray-100 px-1 py-0.5 rounded">server.js</code> file:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quizzes', require('./routes/quizzes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Deploy to Heroku</h3>
                    <p className="text-sm text-gray-600">
                      Create a <code className="bg-gray-100 px-1 py-0.5 rounded">Procfile</code> file:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`web: node server.js`}
                      </pre>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Deploy to Heroku using Git:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`heroku create
git push heroku main
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku open`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">3. Alternative Deployment Options</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>MongoDB Atlas for the database</li>
                      <li>Vercel or Netlify for the React frontend</li>
                      <li>Railway or Render for the Express backend</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Code className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-blue-800">Ready to implement?</h3>
                <p className="text-sm text-blue-700 mt-1">
                  This guide provides a starting point for MongoDB integration. For a production environment,
                  you'll want to add user authentication, input validation, and error handling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MongoDbIntegration;
