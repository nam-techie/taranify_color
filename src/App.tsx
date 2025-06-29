import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ColorPsychologyQuiz from './pages/ColorPsychologyQuiz';
import CommunityForum from './pages/CommunityForum';
import TravelMap from './pages/TravelMap';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import ExpenseTracker from './pages/ExpenseTracker';
import ProfilePage from './pages/ProfilePage';
import MyPostsPage from './pages/MyPostsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<ColorPsychologyQuiz />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/map" element={<TravelMap />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;