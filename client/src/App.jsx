import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StudentProfilePage from './pages/StudentProfilePage';
import InterestAssessmentPage from './pages/InterestAssessmentPage';
import RecommendationsPage from './pages/RecommendationsPage';
import CourseExplorerPage from './pages/CourseExplorerPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CareerExplorerPage from './pages/CareerExplorerPage';
import CareerDetailsPage from './pages/CareerDetailsPage';
import CourseComparisonPage from './pages/CourseComparisonPage';
import ShortlistPage from './pages/ShortlistPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory text-ink selection:bg-mustard selection:text-ink">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CourseExplorerPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/careers" element={<CareerExplorerPage />} />
          <Route path="/careers/:id" element={<CareerDetailsPage />} />
          <Route path="/compare" element={<CourseComparisonPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <StudentProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <InterestAssessmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shortlist"
            element={
              <ProtectedRoute>
                <ShortlistPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
