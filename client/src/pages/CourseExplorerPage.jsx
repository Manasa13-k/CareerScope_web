import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import Input from '../components/Input';
import Select from '../components/Select';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { courseService } from '../services/courseService';
import { shortlistService } from '../services/shortlistService';

const STREAMS = ['All', 'MPC', 'BiPC', 'MEC', 'CEC', 'Other'];
const SECTORS = ['All', 'Technology', 'Healthcare', 'Engineering', 'Agriculture', 'Finance', 'Business', 'Design', 'Environment', 'Research', 'Media'];
const INTERESTS = ['All', 'Technology', 'Mathematics', 'Biology', 'Design', 'Business', 'Research', 'Healthcare', 'Agriculture', 'Communication', 'Problem Solving', 'Engineering'];
const DURATIONS = ['All', '3 Years', '4 Years', '5.5 Years'];

export default function CourseExplorerPage() {
  const [courses, setCourses] = useState([]);
  const [shortlist, setShortlist] = useState({ courses: [] });
  const [comparedCourses, setComparedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    stream: 'All',
    sector: 'All',
    interest: 'All',
    duration: 'All',
  });

  useEffect(() => {
    fetchCourses();
    const savedCompare = localStorage.getItem('careerscope_compare');
    if (savedCompare) {
      setComparedCourses(JSON.parse(savedCompare));
    }
  }, [filters]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const [data, sl] = await Promise.all([
        courseService.getCourses(filters),
        shortlistService.getShortlist().catch(() => ({ courses: [] })),
      ]);
      setCourses(data);
      setShortlist(sl);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
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

  const isCourseSaved = (courseId) => shortlist.courses.some(c => (c._id || c.id || c) === courseId);
  const isCourseCompared = (courseId) => comparedCourses.some(c => (c._id || c.id) === courseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-warmIvory flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-electricLime" />
          <span>Course Explorer</span>
        </h1>
        <p className="text-mutedText text-sm max-w-2xl">
          Discover degree programs, higher studies opportunities, and skill outcomes across all major intermediate streams.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-cardBg border border-borderColor rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3 relative">
            <Input
              placeholder="Search by course name, skills, or degree..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Select
              label="Stream"
              value={filters.stream}
              onChange={(e) => handleFilterChange('stream', e.target.value)}
              options={STREAMS}
              placeholder=""
            />
            <Select
              label="Sector"
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              options={SECTORS}
              placeholder=""
            />
            <Select
              label="Interest"
              value={filters.interest}
              onChange={(e) => handleFilterChange('interest', e.target.value)}
              options={INTERESTS}
              placeholder=""
            />
            <Select
              label="Duration"
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              options={DURATIONS}
              placeholder=""
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <LoadingSpinner text="Fetching courses database..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchCourses} />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses match your filters"
          description="Try broadening your stream or sector search criteria."
          onAction={() => setFilters({ search: '', stream: 'All', sector: 'All', interest: 'All', duration: 'All' })}
          actionText="Reset Filters"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-mutedText">
            <span>Showing {courses.length} degree programs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id || course.id}
                course={course}
                isSaved={isCourseSaved(course._id || course.id)}
                isCompared={isCourseCompared(course._id || course.id)}
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
