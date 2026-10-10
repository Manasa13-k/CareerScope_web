import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { recommendationService } from '../services/recommendationService';
import { shortlistService } from '../services/shortlistService';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [shortlist, setShortlist] = useState({ courses: [] });
  const [comparedCourses, setComparedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [recs, sl] = await Promise.all([
        recommendationService.getRecommendations(),
        shortlistService.getShortlist().catch(() => ({ courses: [] })),
      ]);
      setRecommendations(recs);
      setShortlist(sl);

      const savedCompare = localStorage.getItem('careerscope_compare');
      if (savedCompare) {
        setComparedCourses(JSON.parse(savedCompare));
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = async (courseId) => {
    try {
      const isSaved = shortlist.courses.some(c => (c._id || c.id || c) === courseId);
      let updated;
      if (isSaved) {
        updated = await shortlistService.removeItem(courseId);
      } else {
        updated = await shortlistService.addCourse(courseId);
      }
      setShortlist(updated);
    } catch (err) {
      console.error('Save toggle error:', err);
    }
  };

  const handleToggleCompare = (course) => {
    const courseId = course._id || course.id;
    let updated;
    const exists = comparedCourses.some(c => (c._id || c.id) === courseId);
    if (exists) {
      updated = comparedCourses.filter(c => (c._id || c.id) !== courseId);
    } else {
      if (comparedCourses.length >= 3) {
        alert('You can compare a maximum of 3 courses at a time.');
        return;
      }
      updated = [...comparedCourses, course];
    }
    setComparedCourses(updated);
    localStorage.setItem('careerscope_compare', JSON.stringify(updated));
  };

  if (loading) return <LoadingSpinner text="Analyzing your profile and matching courses..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  const isCourseSaved = (courseId) => shortlist.courses.some(c => (c._id || c.id || c) === courseId);
  const isCourseCompared = (courseId) => comparedCourses.some(c => (c._id || c.id) === courseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-softLilac/10 border border-softLilac/30 rounded-full text-softLilac text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-electricLime" />
          <span>Profile-Aligned Match Score Engine</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-warmIvory">
          Courses that match your profile
        </h1>
        <p className="text-mutedText text-sm max-w-2xl">
          Course options scored against your intermediate stream, subjects, and interest assessment choices. Match scores indicate alignment with your profile.
        </p>
      </div>

      {/* Course List */}
      {recommendations.length === 0 ? (
        <EmptyState
          title="No recommendations found"
          description="Complete your student profile or take the interest assessment to receive tailored recommendations."
          actionText="Take Assessment"
          actionLink="/assessment"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <CourseCard
              key={item.course._id || item.course.id}
              course={item.course}
              matchScore={item.matchScore}
              explanation={item.explanation}
              isSaved={isCourseSaved(item.course._id || item.course.id)}
              isCompared={isCourseCompared(item.course._id || item.course.id)}
              onSave={handleToggleSave}
              onCompare={handleToggleCompare}
            />
          ))}
        </div>
      )}

    </div>
  );
}
