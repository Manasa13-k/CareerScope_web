import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Sparkles, BookOpen, Compass, Scale, Bookmark,
  UserCheck, ArrowRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { authService } from '../services/authService';
import { recommendationService } from '../services/recommendationService';
import { shortlistService } from '../services/shortlistService';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [shortlist, setShortlist] = useState({ courses: [], careers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [uData, recsData, slData] = await Promise.all([
        authService.getProfile(),
        recommendationService.getRecommendations().catch(() => []),
        shortlistService.getShortlist().catch(() => ({ courses: [], careers: [] })),
      ]);
      setUser(uData);
      setRecommendations(recsData.slice(0, 3)); // Top 3 recommended
      setShortlist(slData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading your dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboardData} />;

  // Calculate profile completion percentage
  let completedFields = 0;
  let totalFields = 4;
  if (user?.name) completedFields++;
  if (user?.stream) completedFields++;
  if (user?.interests && user.interests.length > 0) completedFields++;
  if (user?.assessmentResults && user.assessmentResults.completedAt) completedFields++;
  const profilePercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-cardBg via-bgSecondary to-cardBg border border-borderColor rounded-3xl p-8 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-electricLime/10 border border-electricLime/30 text-electricLime text-xs font-semibold mb-2">
              <span>Student Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-warmIvory">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-mutedText text-sm mt-1">
              Intermediate Stream: <span className="text-electricLime font-semibold">{user?.stream || 'Not Set'}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/assessment">
              <Button size="sm" className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Take Assessment</span>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Profile Completion */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center text-xs text-mutedText">
            <span className="font-semibold uppercase tracking-wider">Profile Setup</span>
            <span className="text-electricLime font-bold">{profilePercentage}%</span>
          </div>
          <div className="w-full bg-bgSecondary h-2 rounded-full overflow-hidden border border-borderColor">
            <div className="bg-electricLime h-full transition-all duration-300" style={{ width: `${profilePercentage}%` }} />
          </div>
          <p className="text-xs text-mutedText">
            {profilePercentage === 100 ? 'Profile fully configured!' : 'Complete your stream & assessment for better matches.'}
          </p>
        </Card>

        {/* Assessment Status */}
        <Card className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-mutedText">Assessment</span>
          <div className="flex items-center space-x-2">
            {user?.assessmentResults?.completedAt ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-electricLime" />
                <span className="font-bold text-warmIvory text-sm">Completed</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-softLilac" />
                <span className="font-bold text-warmIvory text-sm">Pending</span>
              </>
            )}
          </div>
          <p className="text-xs text-mutedText">
            {user?.assessmentResults?.completedAt ? 'Interest breakdown calculated' : 'Take 6-min quiz to refine matches'}
          </p>
        </Card>

        {/* Saved Courses */}
        <Card className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-mutedText">Saved Shortlist</span>
          <div className="text-2xl font-black text-warmIvory">
            {shortlist.courses?.length || 0} <span className="text-xs font-normal text-mutedText">Courses</span>
          </div>
          <Link to="/shortlist" className="text-xs font-bold text-electricLime hover:underline inline-block">
            View saved shortlist →
          </Link>
        </Card>

        {/* Saved Careers */}
        <Card className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-mutedText">Saved Careers</span>
          <div className="text-2xl font-black text-warmIvory">
            {shortlist.careers?.length || 0} <span className="text-xs font-normal text-mutedText">Careers</span>
          </div>
          <Link to="/shortlist" className="text-xs font-bold text-softLilac hover:underline inline-block">
            View saved careers →
          </Link>
        </Card>

      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-warmIvory">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/assessment" className="bg-cardBg border border-borderColor hover:border-electricLime rounded-2xl p-5 text-center space-y-2 transition group">
            <Sparkles className="w-6 h-6 text-electricLime mx-auto group-hover:scale-110 transition" />
            <h4 className="font-bold text-warmIvory text-sm">Take Assessment</h4>
          </Link>
          <Link to="/courses" className="bg-cardBg border border-borderColor hover:border-softLilac rounded-2xl p-5 text-center space-y-2 transition group">
            <BookOpen className="w-6 h-6 text-softLilac mx-auto group-hover:scale-110 transition" />
            <h4 className="font-bold text-warmIvory text-sm">Explore Courses</h4>
          </Link>
          <Link to="/careers" className="bg-cardBg border border-borderColor hover:border-electricLime rounded-2xl p-5 text-center space-y-2 transition group">
            <Compass className="w-6 h-6 text-electricLime mx-auto group-hover:scale-110 transition" />
            <h4 className="font-bold text-warmIvory text-sm">Explore Careers</h4>
          </Link>
          <Link to="/compare" className="bg-cardBg border border-borderColor hover:border-softLilac rounded-2xl p-5 text-center space-y-2 transition group">
            <Scale className="w-6 h-6 text-softLilac mx-auto group-hover:scale-110 transition" />
            <h4 className="font-bold text-warmIvory text-sm">Compare Courses</h4>
          </Link>
        </div>
      </div>

      {/* INTEREST SUMMARY */}
      {user?.interests && user.interests.length > 0 && (
        <Card className="space-y-3">
          <h2 className="text-base font-bold text-warmIvory border-b border-borderColor pb-3">
            My Selected Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <Badge key={interest} variant="lime">
                {interest}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* TOP RECOMMENDED COURSES PREVIEW */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-warmIvory">Top Aligned Course Recommendations</h2>
            <p className="text-xs text-mutedText">Based on your stream and interest profile</p>
          </div>
          <Link to="/recommendations" className="text-xs font-bold text-electricLime hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recommendations.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-mutedText text-sm">Complete your profile or assessment to view personalized recommendations.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <CourseCard
                key={item.course._id || item.course.id}
                course={item.course}
                matchScore={item.matchScore}
                explanation={item.explanation}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
