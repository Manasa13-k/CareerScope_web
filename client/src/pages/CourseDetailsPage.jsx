import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock, BookOpen, Bookmark, Scale, ArrowLeft, Check, Award,
  GraduationCap, Briefcase, Layers, Sparkles, MapPin, Compass
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
      setError(err.message || 'Failed to retrieve course details.');
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

  if (loading) return <LoadingSpinner text="Retrieving degree dossier..." />;
  if (error || !course) return <ErrorMessage message={error || 'Course dossier not found'} onRetry={fetchCourseDetails} />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Back Navigation */}
      <div className="flex items-center justify-between border-b border-borderAtlas pb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-ink-light hover:text-teal text-xs font-bold uppercase tracking-wider transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </button>
        <span className="text-xs font-mono text-ink-muted uppercase">PLATE REF: {course._id?.slice(-6) || 'DOSSIER'}</span>
      </div>

      {/* Main Dossier Header Card */}
      <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-8 sm:p-10 shadow-atlas-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              {course.streams && course.streams.map((st) => (
                <Badge key={st} variant="mustard">
                  {st} Intermediate Stream
                </Badge>
              ))}
              <Badge variant="teal">{course.duration}</Badge>
              <Badge variant="sage">{course.degreeType}</Badge>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal leading-tight">
              {course.name}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 shrink-0 pt-2">
            <Button
              onClick={handleToggleCompare}
              variant={isCompared ? 'teal' : 'outline'}
              size="md"
              className="flex items-center space-x-2"
            >
              <Scale className="w-4 h-4" />
              <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
            </Button>

            <Button
              onClick={handleToggleSave}
              variant={isSaved ? 'secondary' : 'primary'}
              size="md"
              className="flex items-center space-x-2"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved in Shortlist' : 'Save Course'}</span>
            </Button>
          </div>
        </div>

        {/* Course Overview */}
        <div className="pt-6 border-t border-borderAtlas space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-coral block">
            COURSE OVERVIEW
          </span>
          <p className="text-ink-light text-base leading-relaxed font-normal">
            {course.description}
          </p>
        </div>
      </div>

      {/* Structured Details Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Eligibility */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-coral" />
            <span>General Eligibility Criteria</span>
          </span>
          <p className="text-ink-light text-sm leading-relaxed bg-ivory p-3.5 rounded-lg border border-borderAtlas">
            {course.eligibility}
          </p>
        </Card>

        {/* Suitable Interests & Sectors */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-mustard-dark" />
            <span>Aligned Interests & Domain Sectors</span>
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.interests && course.interests.map((interest) => (
              <Badge key={interest} variant="mustard">{interest}</Badge>
            ))}
            {course.sectors && course.sectors.map((sec) => (
              <Badge key={sec} variant="coral">{sec}</Badge>
            ))}
          </div>
        </Card>

        {/* Main Subjects */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-teal" />
            <span>Core Subjects & Topics Covered</span>
          </span>
          <ul className="space-y-2 text-xs text-ink">
            {course.mainSubjects && course.mainSubjects.map((sub, i) => (
              <li key={i} className="flex items-center space-x-2 bg-ivory p-2.5 rounded-lg border border-borderAtlas">
                <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                <span className="font-medium">{sub}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Skills Developed */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-coral" />
            <span>Key Competencies Developed</span>
          </span>
          <ul className="space-y-2 text-xs text-ink">
            {course.skills && course.skills.map((sk, i) => (
              <li key={i} className="flex items-center space-x-2 bg-ivory p-2.5 rounded-lg border border-borderAtlas">
                <span className="w-1.5 h-1.5 rounded-full bg-mustard-dark shrink-0" />
                <span className="font-medium">{sk}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Higher Studies Pathways */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-mustard-dark" />
            <span>Post-Graduate & Higher Study Avenues</span>
          </span>
          <ul className="space-y-2 text-xs text-ink-light">
            {course.higherStudies && course.higherStudies.map((hs, i) => (
              <li key={i} className="bg-ivory p-3 rounded-lg border border-borderAtlas font-medium">
                {hs}
              </li>
            ))}
          </ul>
        </Card>

        {/* Related Job Roles */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <Briefcase className="w-4 h-4 text-coral" />
            <span>Representative Career Job Roles</span>
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.jobRoles && course.jobRoles.map((jr) => (
              <span key={jr} className="px-3 py-1 bg-sage-light border border-borderAtlas text-teal text-xs rounded-md font-semibold">
                {jr}
              </span>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}
