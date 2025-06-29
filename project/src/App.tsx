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
import ProfilePage from './pages/ProfilePage';
import MyPostsPage from './pages/MyPostsPage';
import FavoritesPage from './pages/FavoritesPage';
import OTPVerificationPage from './pages/OTPVerificationPage';

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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/otp-verification" element={<OTPVerificationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/notifications" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-white text-2xl">Trang Thông Báo - Đang phát triển</h1></div>} />
            <Route path="/settings" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-white text-2xl">Trang Cài Đặt - Đang phát triển</h1></div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;