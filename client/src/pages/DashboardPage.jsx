import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, BookOpen, Scale, Bookmark, ArrowRight,
  CheckCircle2, AlertCircle, MapPin, Sparkles, User, Layers
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
      setRecommendations(recsData.slice(0, 3));
      setShortlist(slData);
    } catch (err) {
      setError(err.message || 'Failed to load discovery workspace.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Retrieving your discovery logbook..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboardData} />;

  // Real profile completeness check
  let completedFields = 0;
  const totalFields = 4;
  if (user?.name) completedFields++;
  if (user?.stream) completedFields++;
  if (user?.interests && user.interests.length > 0) completedFields++;
  if (user?.assessmentResults?.completedAt) completedFields++;
  const profilePercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Welcome Header */}
      <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-8 md:p-10 shadow-atlas-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sage-light border border-borderAtlas rounded-full text-teal text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-coral" />
              <span>Student Expedition Logbook</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
              Welcome, {user?.name || 'Explorer'}.
            </h1>
            
            <p className="text-ink-light text-sm max-w-xl leading-relaxed">
              Academic Stream: <span className="font-bold text-coral bg-coral-light/60 px-2 py-0.5 rounded border border-coral/20">{user?.stream || 'Not yet specified'}</span>
              {user?.stream ? ' — Recommendations are calibrated to this qualification.' : ' — Set your stream in Profile to calibrate course eligibility.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/assessment">
              <Button size="md" className="shadow-atlas-sm">
                <span>{user?.assessmentResults?.completedAt ? 'Retake Assessment' : 'Take Assessment'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 inline" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="md">
                Edit Academic Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Workspace Summary Cards - Varied Asymmetric Sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Profile Completion */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <div className="flex justify-between items-center text-xs font-bold text-ink-muted uppercase tracking-wider">
            <span>Profile Calibration</span>
            <span className="text-teal font-serif text-sm">{profilePercentage}%</span>
          </div>
          <div className="w-full bg-sage-light h-2 rounded-full overflow-hidden border border-borderAtlas">
            <div className="bg-coral h-full transition-all duration-300 rounded-full" style={{ width: `${profilePercentage}%` }} />
          </div>
          <p className="text-xs text-ink-light">
            {profilePercentage === 100 ? 'All parameters calibrated.' : 'Complete your stream & interests for tighter matching.'}
          </p>
        </Card>

        {/* Assessment Status */}
        <Card className="space-y-2 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Interest Quiz</span>
          <div className="flex items-center space-x-2 pt-1">
            {user?.assessmentResults?.completedAt ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-teal" />
                <span className="font-serif text-lg font-bold text-teal">Completed</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-mustard-dark" />
                <span className="font-serif text-lg font-bold text-ink">Pending</span>
              </>
            )}
          </div>
          <p className="text-xs text-ink-light">
            {user?.assessmentResults?.completedAt ? 'Profile scores active' : '6-question discovery quiz'}
          </p>
        </Card>

        {/* Saved Courses Count */}
        <Card className="space-y-2 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Saved Degrees</span>
          <div className="font-serif text-3xl font-bold text-teal">
            {shortlist.courses?.length || 0}
          </div>
          <Link to="/shortlist" className="text-xs font-bold text-coral hover:underline inline-block">
            View saved courses →
          </Link>
        </Card>

        {/* Saved Careers Count */}
        <Card className="space-y-2 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Saved Careers</span>
          <div className="font-serif text-3xl font-bold text-teal">
            {shortlist.careers?.length || 0}
          </div>
          <Link to="/shortlist" className="text-xs font-bold text-teal hover:underline inline-block">
            View saved careers →
          </Link>
        </Card>

      </div>

      {/* CONTINUOUS EXPLORATION PORTALS */}
      <div className="space-y-5">
        <div className="border-b border-borderAtlas pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-coral">EXPEDITION ACTIONS</span>
          <h2 className="font-serif text-2xl font-bold text-teal">Continue Exploring</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/courses" className="bg-surface border border-borderAtlas hover:border-teal rounded-xl p-5 transition group shadow-atlas-sm flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-pale text-teal flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-teal group-hover:text-coral transition">Course Directory</h3>
              <p className="text-xs text-ink-light mt-1">Search through 28+ undergraduate programs.</p>
            </div>
            <span className="text-xs font-bold text-teal flex items-center space-x-1 pt-2 border-t border-borderAtlas/40">
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link to="/careers" className="bg-surface border border-borderAtlas hover:border-coral rounded-xl p-5 transition group shadow-atlas-sm flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-lg bg-coral-light text-coral flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-teal group-hover:text-coral transition">Career Roadmaps</h3>
              <p className="text-xs text-ink-light mt-1">Explore job sectors and educational progression.</p>
            </div>
            <span className="text-xs font-bold text-coral flex items-center space-x-1 pt-2 border-t border-borderAtlas/40">
              <span>View Roadmaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link to="/compare" className="bg-surface border border-borderAtlas hover:border-teal rounded-xl p-5 transition group shadow-atlas-sm flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-lg bg-mustard-light text-mustard-dark flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-teal group-hover:text-coral transition">Degree Comparison</h3>
              <p className="text-xs text-ink-light mt-1">Compare up to 3 programs side-by-side.</p>
            </div>
            <span className="text-xs font-bold text-teal flex items-center space-x-1 pt-2 border-t border-borderAtlas/40">
              <span>Compare Degrees</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link to="/recommendations" className="bg-surface border border-borderAtlas hover:border-teal rounded-xl p-5 transition group shadow-atlas-sm flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sage-light text-teal flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-teal group-hover:text-coral transition">Matched Courses</h3>
              <p className="text-xs text-ink-light mt-1">Weighted profile matching algorithm results.</p>
            </div>
            <span className="text-xs font-bold text-teal flex items-center space-x-1 pt-2 border-t border-borderAtlas/40">
              <span>See Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* SELECTED INTERESTS SUMMARY */}
      {user?.interests && user.interests.length > 0 && (
        <div className="bg-surface border border-borderAtlas rounded-xl p-6 space-y-3 shadow-atlas-sm">
          <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
            <h3 className="font-serif text-lg font-bold text-teal">Mapped Interest Attributes</h3>
            <Link to="/profile" className="text-xs font-bold text-coral hover:underline">Update in Profile →</Link>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {user.interests.map((interest) => (
              <Badge key={interest} variant="mustard">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* TOP RECOMMENDED COURSES PREVIEW */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-borderAtlas pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral">TAILORED EXPEDITIONS</span>
            <h2 className="font-serif text-2xl font-bold text-teal">Top Aligned Course Recommendations</h2>
            <p className="text-xs text-ink-light">Matched against your Intermediate stream and interest selections.</p>
          </div>
          <Link to="/recommendations" className="text-xs font-bold text-teal hover:text-coral transition flex items-center space-x-1">
            <span>View All Matches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recommendations.length === 0 ? (
          <Card className="text-center py-10 bg-surface">
            <p className="text-ink-light text-sm">
              Complete your profile stream or take the interest assessment to receive personalized recommendations.
            </p>
            <div className="mt-4">
              <Link to="/assessment">
                <Button size="sm">Start Assessment</Button>
              </Link>
            </div>
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
