import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Code } from 'lucide-react';

const PHPDatabaseGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">PHP Database Integration Guide</h1>
            <p className="text-gray-600">
              Follow these steps to integrate your Quiz App with PHP and MySQL for secure data storage and retrieval.
            </p>
          </div>
          
          <Tabs defaultValue="setup">
            <TabsList className="mb-4">
              <TabsTrigger value="setup">Database Setup</TabsTrigger>
              <TabsTrigger value="api">PHP API</TabsTrigger>
              <TabsTrigger value="frontend">Frontend Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup">
              <Card>
                <CardHeader>
                  <CardTitle>Setting Up MySQL Database</CardTitle>
                  <CardDescription>
                    Create a database and tables for your quiz application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Create Database</h3>
                    <p className="text-sm text-gray-600">
                      Create a new MySQL database for your quiz application:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`CREATE DATABASE quiz_app;
USE quiz_app;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Create Users Table</h3>
                    <p className="text-sm text-gray-600">
                      Create a table to store user information:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">3. Create Quizzes Table</h3>
                    <p className="text-sm text-gray-600">
                      Create a table to store quiz information:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  author_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  time_limit INT DEFAULT 10,
  share_code VARCHAR(10) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">4. Create Questions Table</h3>
                    <p className="text-sm text-gray-600">
                      Create a table to store questions:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  question_text TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer INT NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">5. Create Results Table</h3>
                    <p className="text-sm text-gray-600">
                      Create a table to store quiz results:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  user_id INT NOT NULL,
  score INT NOT NULL,
  time_taken INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>Creating PHP API Endpoints</CardTitle>
                  <CardDescription>
                    Build RESTful API endpoints with PHP and MySQL
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Database Connection</h3>
                    <p className="text-sm text-gray-600">
                      Create a file named <code className="bg-gray-100 px-1 py-0.5 rounded">db_connect.php</code>:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`<?php
// Database configuration
$host = "localhost";
$username = "your_username";
$password = "your_password";
$database = "quiz_app";

// Create database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
?>`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Authentication API</h3>
                    <p className="text-sm text-gray-600">
                      Create a file named <code className="bg-gray-100 px-1 py-0.5 rounded">auth.php</code>:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`<?php
include_once 'db_connect.php';

$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"), true);

switch ($request_method) {
    case 'POST':
        // Check if it's a login or register request
        $endpoint = basename($_SERVER['REQUEST_URI']);
        
        if ($endpoint === 'login') {
            // Login logic
            $email = $data['email'];
            $password = $data['password'];
            
            $stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 1) {
                $user = $result->fetch_assoc();
                
                // Verify password
                if (password_verify($password, $user['password'])) {
                    // Create response without password
                    unset($user['password']);
                    echo json_encode([
                        'success' => true,
                        'user' => $user
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Invalid credentials'
                    ]);
                }
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }
            
        } elseif ($endpoint === 'register') {
            // Register logic
            $username = $data['username'];
            $email = $data['email'];
            $password = password_hash($data['password'], PASSWORD_DEFAULT);
            
            // Check if user already exists
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
            $stmt->bind_param("ss", $email, $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                echo json_encode([
                    'success' => false,
                    'message' => 'User already exists'
                ]);
            } else {
                // Insert new user
                $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $username, $email, $password);
                
                if ($stmt->execute()) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'User registered successfully'
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Registration failed'
                    ]);
                }
            }
        }
        break;
        
    default:
        // Invalid request method
        header("HTTP/1.0 405 Method Not Allowed");
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
        break;
}

$conn->close();
?>`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">3. Quiz API</h3>
                    <p className="text-sm text-gray-600">
                      Create a file named <code className="bg-gray-100 px-1 py-0.5 rounded">quizzes.php</code>:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`<?php
include_once 'db_connect.php';

$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"), true);

// Generate a random share code
function generateShareCode($length = 6) {
    return substr(str_shuffle(str_repeat($x='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)))), 1, $length);
}

switch ($request_method) {
    case 'GET':
        // Get all quizzes or a specific quiz
        if (isset($_GET['id'])) {
            // Get quiz by ID
            $quiz_id = $_GET['id'];
            $stmt = $conn->prepare("
                SELECT q.*, u.username as author_name 
                FROM quizzes q
                JOIN users u ON q.author_id = u.id
                WHERE q.id = ?
            ");
            $stmt->bind_param("i", $quiz_id);
            $stmt->execute();
            $quiz_result = $stmt->get_result();
            
            if ($quiz_result->num_rows === 1) {
                $quiz = $quiz_result->fetch_assoc();
                
                // Get questions for this quiz
                $stmt = $conn->prepare("SELECT * FROM questions WHERE quiz_id = ?");
                $stmt->bind_param("i", $quiz_id);
                $stmt->execute();
                $questions_result = $stmt->get_result();
                
                $questions = [];
                while ($question = $questions_result->fetch_assoc()) {
                    $question['options'] = json_decode($question['options']);
                    $questions[] = $question;
                }
                
                $quiz['questions'] = $questions;
                
                echo json_encode([
                    'success' => true,
                    'data' => $quiz
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Quiz not found'
                ]);
            }
        } elseif (isset($_GET['code'])) {
            // Get quiz by share code
            $share_code = $_GET['code'];
            $stmt = $conn->prepare("
                SELECT q.*, u.username as author_name 
                FROM quizzes q
                JOIN users u ON q.author_id = u.id
                WHERE q.share_code = ?
            ");
            $stmt->bind_param("s", $share_code);
            $stmt->execute();
            $quiz_result = $stmt->get_result();
            
            if ($quiz_result->num_rows === 1) {
                $quiz = $quiz_result->fetch_assoc();
                
                // Get questions for this quiz
                $stmt = $conn->prepare("SELECT * FROM questions WHERE quiz_id = ?");
                $stmt->bind_param("i", $quiz['id']);
                $stmt->execute();
                $questions_result = $stmt->get_result();
                
                $questions = [];
                while ($question = $questions_result->fetch_assoc()) {
                    $question['options'] = json_decode($question['options']);
                    $questions[] = $question;
                }
                
                $quiz['questions'] = $questions;
                
                echo json_encode([
                    'success' => true,
                    'data' => $quiz
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Quiz not found'
                ]);
            }
        } else {
            // Get all quizzes
            $result = $conn->query("
                SELECT q.*, u.username as author_name 
                FROM quizzes q
                JOIN users u ON q.author_id = u.id
                ORDER BY q.created_at DESC
            ");
            
            $quizzes = [];
            while ($row = $result->fetch_assoc()) {
                $quizzes[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'data' => $quizzes
            ]);
        }
        break;
        
    case 'POST':
        // Create a new quiz
        $title = $data['title'];
        $description = $data['description'];
        $author_id = $data['author_id'];
        $category = $data['category'];
        $difficulty = $data['difficulty'];
        $time_limit = $data['time_limit'];
        $questions = $data['questions'];
        
        // Generate share code
        $share_code = generateShareCode();
        
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // Insert quiz
            $stmt = $conn->prepare("INSERT INTO quizzes (title, description, author_id, category, difficulty, time_limit, share_code) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssissis", $title, $description, $author_id, $category, $difficulty, $time_limit, $share_code);
            $stmt->execute();
            
            $quiz_id = $conn->insert_id;
            
            // Insert questions
            foreach ($questions as $question) {
                $question_text = $question['question'];
                $options = json_encode($question['options']);
                $correct_answer = $question['correctAnswer'];
                
                $stmt = $conn->prepare("INSERT INTO questions (quiz_id, question_text, options, correct_answer) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("issi", $quiz_id, $question_text, $options, $correct_answer);
                $stmt->execute();
            }
            
            // Commit transaction
            $conn->commit();
            
            echo json_encode([
                'success' => true,
                'message' => 'Quiz created successfully',
                'quiz_id' => $quiz_id,
                'share_code' => $share_code
            ]);
            
        } catch (Exception $e) {
            // Rollback in case of error
            $conn->rollback();
            
            echo json_encode([
                'success' => false,
                'message' => 'Error creating quiz: ' . $e->getMessage()
            ]);
        }
        break;
        
    case 'PUT':
        // Update quiz
        if (isset($_GET['id'])) {
            $quiz_id = $_GET['id'];
            
            $title = $data['title'];
            $description = $data['description'];
            $category = $data['category'];
            $difficulty = $data['difficulty'];
            $time_limit = $data['time_limit'];
            
            $stmt = $conn->prepare("UPDATE quizzes SET title = ?, description = ?, category = ?, difficulty = ?, time_limit = ? WHERE id = ?");
            $stmt->bind_param("sssiii", $title, $description, $category, $difficulty, $time_limit, $quiz_id);
            
            if ($stmt->execute()) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Quiz updated successfully'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Error updating quiz'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Quiz ID is required'
            ]);
        }
        break;
        
    case 'DELETE':
        // Delete quiz
        if (isset($_GET['id'])) {
            $quiz_id = $_GET['id'];
            
            $stmt = $conn->prepare("DELETE FROM quizzes WHERE id = ?");
            $stmt->bind_param("i", $quiz_id);
            
            if ($stmt->execute()) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Quiz deleted successfully'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Error deleting quiz'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Quiz ID is required'
            ]);
        }
        break;
        
    default:
        // Invalid request method
        header("HTTP/1.0 405 Method Not Allowed");
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
        break;
}

$conn->close();
?>`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="frontend">
              <Card>
                <CardHeader>
                  <CardTitle>React Frontend Integration</CardTitle>
                  <CardDescription>
                    Connect your React app to the PHP backend
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Create API Service</h3>
                    <p className="text-sm text-gray-600">
                      Create a service to interact with your PHP backend:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`// src/services/api.ts
import axios from 'axios';
import { Quiz } from '@/data/quizzes';

const API_URL = 'http://your-domain.com/api'; // Replace with your PHP API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth services
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth.php?login', { email, password });
  return response.data;
};

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth.php?register', { username, email, password });
  return response.data;
};

// Quiz services
export const fetchAllQuizzes = async () => {
  const response = await api.get('/quizzes.php');
  return response.data.data;
};

export const fetchQuizById = async (id: string) => {
  const response = await api.get(\`/quizzes.php?id=\${id}\`);
  return response.data.data;
};

export const fetchQuizByCode = async (code: string) => {
  const response = await api.get(\`/quizzes.php?code=\${code}\`);
  return response.data.data;
};

export const createQuiz = async (quiz: Omit<Quiz, 'id' | 'createdAt'>, authorId: number) => {
  const response = await api.post('/quizzes.php', { ...quiz, author_id: authorId });
  return response.data;
};

export const updateQuiz = async (id: string, quiz: Partial<Quiz>) => {
  const response = await api.put(\`/quizzes.php?id=\${id}\`, quiz);
  return response.data;
};

export const deleteQuiz = async (id: string) => {
  const response = await api.delete(\`/quizzes.php?id=\${id}\`);
  return response.data;
};

export default api;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Modify Local Storage Utils</h3>
                    <p className="text-sm text-gray-600">
                      Create a utility to switch between local storage and API:
                    </p>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>
{`// src/utils/storage.ts
import { Quiz } from '@/data/quizzes';
import * as api from '@/services/api';

// Configuration variable - set to true to use PHP backend
const USE_PHP_API = false;

// Quiz functions
export const saveQuiz = async (quiz: Omit<Quiz, 'id' | 'createdAt'>, userId?: number): Promise<string> => {
  if (USE_PHP_API && userId) {
    const response = await api.createQuiz(quiz, userId);
    return response.quiz_id.toString();
  } else {
    // Use existing localStorage implementation
    // ... (keep your existing localStorage code here)
  }
};

export const getAllQuizzes = async (): Promise<Quiz[]> => {
  if (USE_PHP_API) {
    return await api.fetchAllQuizzes();
  } else {
    // Use existing localStorage implementation
    // ... (keep your existing localStorage code here)
  }
};

export const getQuizById = async (id: string): Promise<Quiz | undefined> => {
  if (USE_PHP_API) {
    return await api.fetchQuizById(id);
  } else {
    // Use existing localStorage implementation
    // ... (keep your existing localStorage code here)
  }
};

export const getQuizByShareCode = async (code: string): Promise<Quiz | undefined> => {
  if (USE_PHP_API) {
    return await api.fetchQuizByCode(code);
  } else {
    // Use existing localStorage implementation
    // ... (keep your existing localStorage code here)
  }
};`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">3. Setup Instructions</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Deploy your PHP files to a web server with PHP and MySQL installed</li>
                      <li>Adjust your database connection details in <code>db_connect.php</code></li>
                      <li>Set the API_URL in <code>api.ts</code> to point to your PHP server</li>
                      <li>Set <code>USE_PHP_API = true</code> in <code>storage.ts</code> to switch to using the PHP backend</li>
                      <li>Add CORS headers to your server if needed for cross-domain requests</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Code className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium text-blue-800">Security Considerations</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          For a production environment, consider implementing:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-blue-700 mt-1">
                          <li>JWT authentication for more secure user sessions</li>
                          <li>Input validation and sanitization</li>
                          <li>Rate limiting to prevent abuse</li>
                          <li>HTTPS for all API communication</li>
                          <li>Prepared statements for all database queries (already implemented in examples)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PHPDatabaseGuide;
