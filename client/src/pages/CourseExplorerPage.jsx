import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Compass, RotateCcw } from 'lucide-react';
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
  const [searchParams] = useSearchParams();
  const initialSector = searchParams.get('sector') || 'All';

  const [courses, setCourses] = useState([]);
  const [shortlist, setShortlist] = useState({ courses: [] });
  const [comparedCourses, setComparedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    stream: 'All',
    sector: initialSector,
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
      setError(err.message || 'Failed to retrieve course catalogue.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      stream: 'All',
      sector: 'All',
      interest: 'All',
      duration: 'All',
    });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="border-b border-borderAtlas pb-6 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-mustard-light border border-mustard/40 rounded-full text-ink text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-teal" />
          <span>CURATED DEGREE DIRECTORY</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
          Undergraduate Course Directory
        </h1>
        
        <p className="text-ink-light text-sm sm:text-base max-w-2xl leading-relaxed">
          Explore realistic undergraduate degrees matching Intermediate foundations in MPC, BiPC, MEC, and CEC. Compare eligibility, core curricula, and post-graduate pathways.
        </p>
      </div>

      {/* Filter Control Console */}
      <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-5 shadow-atlas-sm">
        
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="w-full lg:w-1/3">
            <Input
              placeholder="Search by degree name, subject, or career role..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Select
              label="Stream"
              value={filters.stream}
              onChange={(e) => handleFilterChange('stream', e.target.value)}
              options={STREAMS}
              placeholder=""
            />
            <Select
              label="Domain Sector"
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              options={SECTORS}
              placeholder=""
            />
            <Select
              label="Interest Area"
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

        {/* Quick Stream Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-borderAtlas/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-ink-muted uppercase tracking-wider mr-1">Stream Filter:</span>
            {STREAMS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleFilterChange('stream', st)}
                className={`px-2.5 py-1 rounded-md font-semibold border transition ${
                  filters.stream === st
                    ? 'bg-teal text-white border-teal'
                    : 'bg-ivory border-borderAtlas text-ink-light hover:border-teal'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {(filters.search || filters.stream !== 'All' || filters.sector !== 'All' || filters.interest !== 'All' || filters.duration !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-coral hover:underline inline-flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Results Section */}
      {loading ? (
        <LoadingSpinner text="Cataloguing degree entries..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchCourses} />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses match the active filters"
          description="Try selecting 'All' streams or clearing your keyword search to broaden the results."
          onAction={handleResetFilters}
          actionText="Clear All Filters"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-ink-muted uppercase tracking-wider border-b border-borderAtlas pb-2">
            <span>Displaying {courses.length} educational degree programs</span>
            <span className="font-mono text-teal">CAREERSCOPE DIRECTORY</span>
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
