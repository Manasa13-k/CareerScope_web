import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ArrowRight, BookOpen } from 'lucide-react';
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
      setError(err.message || 'Failed to generate tailored course recommendations.');
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

  if (loading) return <LoadingSpinner text="Computing weighted alignment scores..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  const isCourseSaved = (courseId) => shortlist.courses.some(c => (c._id || c.id || c) === courseId);
  const isCourseCompared = (courseId) => comparedCourses.some(c => (c._id || c.id) === courseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="border-b border-borderAtlas pb-6 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-mustard-light border border-mustard/40 rounded-full text-ink text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-coral" />
          <span>WEIGHTED ALIGNMENT ENGINE</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
          Courses that match your profile
        </h1>
        
        <p className="text-ink-light text-sm sm:text-base max-w-2xl leading-relaxed">
          Course options scored against your Intermediate stream, subjects, and interest assessment choices. Match scores indicate alignment with your indicated preferences.
        </p>
      </div>

      {/* Recommendations Grid */}
      {recommendations.length === 0 ? (
        <EmptyState
          title="No recommendations mapped yet"
          description="Complete your student profile or take the interest assessment to receive tailored recommendations."
          actionText="Take Interest Assessment"
          actionLink="/assessment"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-ink-muted uppercase tracking-wider border-b border-borderAtlas pb-2">
            <span>{recommendations.length} Aligned Degree Programs Found</span>
            <span className="font-mono text-teal">PROFILE-SCORED CATALOGUE</span>
          </div>

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
        </div>
      )}

    </div>
  );
}
