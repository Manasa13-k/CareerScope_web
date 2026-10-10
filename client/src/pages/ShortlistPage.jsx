import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Scale, ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
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
      setError(err.message || 'Failed to fetch shortlist.');
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

  if (loading) return <LoadingSpinner text="Fetching your saved shortlist..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchShortlist} />;

  const hasItems = (shortlist.courses && shortlist.courses.length > 0) || (shortlist.careers && shortlist.careers.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-warmIvory flex items-center space-x-3">
          <Bookmark className="w-8 h-8 text-electricLime" />
          <span>My Saved Shortlist</span>
        </h1>
        <p className="text-mutedText text-sm max-w-2xl">
          Your saved degree courses and career pathways in one place.
        </p>
      </div>

      {!hasItems ? (
        <EmptyState
          title="You haven't saved any courses yet."
          description="Explore courses and save the options you want to revisit later."
          actionText="Explore Courses"
          actionLink="/courses"
          icon={Bookmark}
        />
      ) : (
        <div className="space-y-10">
          
          {/* Saved Courses */}
          {shortlist.courses && shortlist.courses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-warmIvory flex items-center space-x-2 border-b border-borderColor pb-2">
                <BookOpen className="w-5 h-5 text-electricLime" />
                <span>Saved Courses ({shortlist.courses.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlist.courses.map((course) => {
                  const courseId = course._id || course.id;
                  const isCompared = comparedCourses.some(c => (c._id || c.id) === courseId);

                  return (
                    <Card key={courseId} className="flex flex-col justify-between h-full space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="lime">{course.degreeType}</Badge>
                          <button
                            onClick={() => handleRemove(courseId)}
                            className="p-1 text-mutedText hover:text-red-400 transition"
                            title="Remove from shortlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-bold text-warmIvory text-base">
                          <Link to={`/courses/${courseId}`} className="hover:text-electricLime transition">
                            {course.name}
                          </Link>
                        </h3>

                        <p className="text-mutedText text-xs leading-relaxed line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-borderColor flex items-center justify-between">
                        <Link
                          to={`/courses/${courseId}`}
                          className="text-xs font-bold text-electricLime hover:underline flex items-center space-x-1"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleToggleCompare(course)}
                          className={`p-2 rounded-xl text-xs font-semibold border transition ${
                            isCompared
                              ? 'bg-softLilac/20 border-softLilac text-softLilac'
                              : 'bg-bgSecondary border-borderColor text-mutedText hover:text-warmIvory hover:border-softLilac'
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

          {/* Saved Careers */}
          {shortlist.careers && shortlist.careers.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-warmIvory flex items-center space-x-2 border-b border-borderColor pb-2">
                <Briefcase className="w-5 h-5 text-softLilac" />
                <span>Saved Careers ({shortlist.careers.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlist.careers.map((career) => {
                  const careerId = career._id || career.id;
                  return (
                    <Card key={careerId} className="flex flex-col justify-between h-full space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="lilac">{career.sector}</Badge>
                          <button
                            onClick={() => handleRemove(careerId)}
                            className="p-1 text-mutedText hover:text-red-400 transition"
                            title="Remove from shortlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-bold text-warmIvory text-base">
                          <Link to={`/careers/${careerId}`} className="hover:text-electricLime transition">
                            {career.name}
                          </Link>
                        </h3>

                        <p className="text-mutedText text-xs leading-relaxed line-clamp-2">
                          {career.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-borderColor">
                        <Link
                          to={`/careers/${careerId}`}
                          className="text-xs font-bold text-electricLime hover:underline flex items-center space-x-1"
                        >
                          <span>Explore Pathway</span>
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
