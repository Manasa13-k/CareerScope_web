import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock, BookOpen, Bookmark, Scale, ArrowLeft, Check, Award,
  GraduationCap, Briefcase, Layers, Sparkles
} from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { courseService } from '../services/courseService';
import { shortlistService } from '../services/shortlistService';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [shortlist, setShortlist] = useState({ courses: [] });
  const [comparedCourses, setComparedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseDetails();
    const savedCompare = localStorage.getItem('careerscope_compare');
    if (savedCompare) {
      setComparedCourses(JSON.parse(savedCompare));
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const [cData, sl] = await Promise.all([
        courseService.getCourseById(id),
        shortlistService.getShortlist().catch(() => ({ courses: [] })),
      ]);
      setCourse(cData);
      setShortlist(sl);
    } catch (err) {
      setError(err.message || 'Failed to fetch course details.');
    } finally {
      setLoading(false);
    }
  };

  const isSaved = shortlist.courses.some(c => (c._id || c.id || c) === id);
  const isCompared = comparedCourses.some(c => (c._id || c.id) === id);

  const handleToggleSave = async () => {
    try {
      let updated;
      if (isSaved) {
        updated = await shortlistService.removeItem(id);
      } else {
        updated = await shortlistService.addCourse(id);
      }
      setShortlist(updated);
    } catch (err) {
      console.error('Save toggle error:', err);
    }
  };

  const handleToggleCompare = () => {
    if (!course) return;
    let updated;
    if (isCompared) {
      updated = comparedCourses.filter(c => (c._id || c.id) !== id);
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

  if (loading) return <LoadingSpinner text="Loading course details..." />;
  if (error || !course) return <ErrorMessage message={error || 'Course not found'} onRetry={fetchCourseDetails} />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-mutedText hover:text-warmIvory text-xs font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Header Card */}
      <Card className="space-y-6 bg-gradient-to-br from-cardBg via-cardBg to-bgSecondary border-softLilac/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {course.streams && course.streams.map((st) => (
                <Badge key={st} variant="lime">{st} Stream</Badge>
              ))}
              <Badge variant="muted">{course.duration}</Badge>
              <Badge variant="lilac">{course.degreeType}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-warmIvory">{course.name}</h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 shrink-0">
            <Button
              onClick={handleToggleCompare}
              variant={isCompared ? 'secondary' : 'outline'}
              size="md"
              className="flex items-center space-x-2"
            >
              <Scale className="w-4 h-4" />
              <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
            </Button>

            <Button
              onClick={handleToggleSave}
              variant={isSaved ? 'primary' : 'outline'}
              size="md"
              className="flex items-center space-x-2"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved' : 'Save Course'}</span>
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-borderColor/50 space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-mutedText">Overview</h3>
          <p className="text-warmIvory/90 text-sm leading-relaxed">{course.description}</p>
        </div>
      </Card>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Eligibility */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-electricLime flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>General Eligibility</span>
          </h3>
          <p className="text-mutedText text-sm leading-relaxed">{course.eligibility}</p>
        </Card>

        {/* Suitable Interests */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Suitable Interests & Sectors</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {course.interests && course.interests.map((interest) => (
              <Badge key={interest} variant="lime">{interest}</Badge>
            ))}
            {course.sectors && course.sectors.map((sec) => (
              <Badge key={sec} variant="lilac">{sec}</Badge>
            ))}
          </div>
        </Card>

        {/* Main Subjects */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Main Subjects & Topics</span>
          </h3>
          <ul className="space-y-2 text-xs text-warmIvory/90">
            {course.mainSubjects && course.mainSubjects.map((sub, i) => (
              <li key={i} className="flex items-center space-x-2 bg-bgSecondary p-2 rounded-lg border border-borderColor/50">
                <div className="w-1.5 h-1.5 rounded-full bg-electricLime" />
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Skills Developed */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-electricLime flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Skills Developed</span>
          </h3>
          <ul className="space-y-2 text-xs text-warmIvory/90">
            {course.skills && course.skills.map((sk, i) => (
              <li key={i} className="flex items-center space-x-2 bg-bgSecondary p-2 rounded-lg border border-borderColor/50">
                <div className="w-1.5 h-1.5 rounded-full bg-softLilac" />
                <span>{sk}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Higher Studies Opportunities */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-electricLime flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>Higher Studies Pathways</span>
          </h3>
          <ul className="space-y-2 text-xs text-warmIvory/90">
            {course.higherStudies && course.higherStudies.map((hs, i) => (
              <li key={i} className="bg-bgSecondary p-2.5 rounded-lg border border-borderColor/50">
                {hs}
              </li>
            ))}
          </ul>
        </Card>

        {/* Related Job Roles */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>Career Areas & Roles</span>
          </h3>
          <div className="space-y-2">
            <p className="text-xs text-mutedText">Job Roles:</p>
            <div className="flex flex-wrap gap-1.5">
              {course.jobRoles && course.jobRoles.map((jr) => (
                <span key={jr} className="px-2.5 py-1 bg-bgSecondary border border-borderColor text-warmIvory text-xs rounded-lg font-medium">
                  {jr}
                </span>
              ))}
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
}
