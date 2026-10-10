import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Scale, ArrowRight, BookOpen, Compass } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { shortlistService } from '../services/shortlistService';

export default function ShortlistPage() {
  const [shortlist, setShortlist] = useState({ courses: [], careers: [] });
  const [comparedCourses, setComparedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShortlist();
    const savedCompare = localStorage.getItem('careerscope_compare');
    if (savedCompare) {
      setComparedCourses(JSON.parse(savedCompare));
    }
  }, []);

  const fetchShortlist = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await shortlistService.getShortlist();
      setShortlist(data);
    } catch (err) {
      setError(err.message || 'Failed to retrieve saved shortlist.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const updated = await shortlistService.removeItem(itemId);
      setShortlist(updated);
    } catch (err) {
      console.error('Remove error:', err);
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

  if (loading) return <LoadingSpinner text="Retrieving your saved shortlist..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchShortlist} />;

  const hasItems = (shortlist.courses && shortlist.courses.length > 0) || (shortlist.careers && shortlist.careers.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="border-b border-borderAtlas pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-mustard-light border border-mustard/40 rounded-full text-ink text-xs font-bold uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5 text-coral" />
          <span>EXPEDITION PORTFOLIO</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
          Saved Shortlist & Favorites
        </h1>
        
        <p className="text-ink-light text-sm max-w-xl leading-relaxed">
          Your bookmarked undergraduate programs and career pathways preserved for further evaluation and comparison.
        </p>
      </div>

      {!hasItems ? (
        <EmptyState
          title="You haven't saved any courses yet."
          description="Explore courses and career pathways, then bookmark the options you wish to revisit."
          actionText="Explore Course Directory"
          actionLink="/courses"
          icon={Bookmark}
        />
      ) : (
        <div className="space-y-12">
          
          {/* Saved Courses Section */}
          {shortlist.courses && shortlist.courses.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
                <h2 className="font-serif text-2xl font-bold text-teal flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-coral" />
                  <span>Saved Courses ({shortlist.courses.length})</span>
                </h2>
                <Link to="/courses" className="text-xs font-bold text-teal hover:text-coral transition">
                  Browse More Courses →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlist.courses.map((course) => {
                  const courseId = course._id || course.id;
                  const isCompared = comparedCourses.some(c => (c._id || c.id) === courseId);

                  return (
                    <Card key={courseId} className="flex flex-col justify-between h-full space-y-4 bg-surface border-borderAtlas">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="mustard">{course.degreeType}</Badge>
                          <button
                            onClick={() => handleRemove(courseId)}
                            className="p-1.5 text-ink-muted hover:text-coral transition rounded-full hover:bg-sage-light"
                            title="Remove from shortlist"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-teal">
                          <Link to={`/courses/${courseId}`} className="hover:text-coral transition">
                            {course.name}
                          </Link>
                        </h3>

                        <p className="text-ink-light text-xs leading-relaxed line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-borderAtlas flex items-center justify-between">
                        <Link
                          to={`/courses/${courseId}`}
                          className="text-xs font-bold text-teal hover:text-coral flex items-center space-x-1"
                        >
                          <span>View Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleToggleCompare(course)}
                          className={`p-1.5 rounded-lg text-xs font-medium border transition ${
                            isCompared
                              ? 'bg-teal text-white border-teal'
                              : 'bg-surface border-borderAtlas text-ink-light hover:text-teal hover:border-teal'
                          }`}
                          title={isCompared ? 'In Compare' : 'Add to Compare'}
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Saved Careers Section */}
          {shortlist.careers && shortlist.careers.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
                <h2 className="font-serif text-2xl font-bold text-teal flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-mustard-dark" />
                  <span>Saved Career Pathways ({shortlist.careers.length})</span>
                </h2>
                <Link to="/careers" className="text-xs font-bold text-teal hover:text-coral transition">
                  Explore More Careers →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlist.careers.map((career) => {
                  const careerId = career._id || career.id;
                  return (
                    <Card key={careerId} className="flex flex-col justify-between h-full space-y-4 bg-surface border-borderAtlas">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="teal">{career.sector} Sector</Badge>
                          <button
                            onClick={() => handleRemove(careerId)}
                            className="p-1.5 text-ink-muted hover:text-coral transition rounded-full hover:bg-sage-light"
                            title="Remove from shortlist"
                            aria-label="Remove career"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-teal">
                          <Link to={`/careers/${careerId}`} className="hover:text-coral transition">
                            {career.name}
                          </Link>
                        </h3>

                        <p className="text-ink-light text-xs leading-relaxed line-clamp-3">
                          {career.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-borderAtlas">
                        <Link
                          to={`/careers/${careerId}`}
                          className="text-xs font-bold text-teal hover:text-coral flex items-center space-x-1"
                        >
                          <span>Explore Career Roadmap</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
