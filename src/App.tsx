import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Leaderboard from './pages/Leaderboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ShareQuiz from './pages/ShareQuiz';
import QuizExam from './pages/QuizExam';
import JoinQuiz from './pages/JoinQuiz';
import MongoDbIntegration from './pages/MongoDbIntegration';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/take" element={<TakeQuiz />} />
        <Route path="/take/:quizId" element={<TakeQuiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/share/:quizId" element={<ShareQuiz />} />
        <Route path="/exam/:quizId" element={<QuizExam />} />
        <Route path="/join" element={<JoinQuiz />} />
        <Route path="/mongodb-integration" element={<MongoDbIntegration />} />
      </Routes>
    </Router>
  );
};

export default App;

