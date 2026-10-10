import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Briefcase, ArrowLeft, Award, GraduationCap, Layers, ChevronRight, BookOpen, UserCheck
} from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { careerService } from '../services/careerService';

export default function CareerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCareerDetails();
  }, [id]);

  const fetchCareerDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await careerService.getCareerById(id);
      setCareer(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch career details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading career pathway details..." />;
  if (error || !career) return <ErrorMessage message={error || 'Career not found'} onRetry={fetchCareerDetails} />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-mutedText hover:text-warmIvory text-xs font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Careers</span>
      </button>

      {/* Header Card */}
      <Card className="space-y-4 bg-gradient-to-br from-cardBg via-cardBg to-bgSecondary border-softLilac/30">
        <Badge variant="lilac" className="flex items-center space-x-1 w-fit">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{career.sector} Sector</span>
        </Badge>

        <h1 className="text-3xl md:text-4xl font-extrabold text-warmIvory">{career.name}</h1>
        <p className="text-warmIvory/90 text-sm leading-relaxed">{career.description}</p>
      </Card>

      {/* VISUAL CAREER PATHWAY DIAGRAM */}
      <Card className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-electricLime">
          Career Progression Visual Pathway
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
          
          <div className="bg-bgSecondary border border-borderColor p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-softLilac uppercase tracking-wider">Step 1</span>
            <h4 className="text-xs font-bold text-warmIvory">Intermediate</h4>
          </div>

          <div className="hidden sm:flex justify-center text-borderColor">
            <ChevronRight className="w-5 h-5 text-electricLime" />
          </div>

          <div className="bg-bgSecondary border border-borderColor p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-electricLime uppercase tracking-wider">Step 2</span>
            <h4 className="text-xs font-bold text-warmIvory">Undergrad Degree</h4>
          </div>

          <div className="hidden sm:flex justify-center text-borderColor">
            <ChevronRight className="w-5 h-5 text-electricLime" />
          </div>

          <div className="bg-bgSecondary border border-borderColor p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-softLilac uppercase tracking-wider">Step 3</span>
            <h4 className="text-xs font-bold text-warmIvory">Core Skills</h4>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center pt-2">
          
          <div className="hidden sm:block" />

          <div className="bg-bgSecondary border border-borderColor p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-electricLime uppercase tracking-wider">Step 4</span>
            <h4 className="text-xs font-bold text-warmIvory">Specialization</h4>
          </div>

          <div className="bg-electricLime/10 border border-electricLime/40 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-electricLime uppercase tracking-wider">Step 5</span>
            <h4 className="text-xs font-bold text-electricLime">{career.name}</h4>
          </div>

        </div>
      </Card>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Required Skills */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-electricLime flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Required Industry Skills</span>
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {career.skills && career.skills.map((sk) => (
              <span key={sk} className="px-3 py-1 bg-bgSecondary border border-borderColor text-warmIvory text-xs rounded-xl font-medium">
                {sk}
              </span>
            ))}
          </div>
        </Card>

        {/* Related Courses */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Recommended Degree Courses</span>
          </h3>
          <ul className="space-y-2 text-xs text-warmIvory">
            {career.relatedCourses && career.relatedCourses.map((rc, i) => (
              <li key={i} className="bg-bgSecondary border border-borderColor/50 p-2.5 rounded-xl flex items-center justify-between">
                <span>{rc}</span>
                <Link to="/courses" className="text-electricLime text-[11px] font-semibold hover:underline">Explore</Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Educational Pathways */}
        <Card className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Education Roadmap</span>
          </h3>
          <ul className="space-y-2 text-xs text-mutedText">
            {career.educationPaths && career.educationPaths.map((ep, i) => (
              <li key={i} className="bg-bgSecondary border border-borderColor/50 p-3 rounded-xl leading-relaxed text-warmIvory/90">
                {ep}
              </li>
            ))}
          </ul>
        </Card>

        {/* Related Roles & Higher Studies */}
        <Card className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-electricLime flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span>Related Job Roles</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {career.relatedRoles && career.relatedRoles.map((rr) => (
                <span key={rr} className="px-2.5 py-1 bg-bgSecondary border border-borderColor text-warmIvory text-xs rounded-lg font-medium">
                  {rr}
                </span>
              ))}
            </div>
          </div>

          {career.higherStudies && career.higherStudies.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-borderColor/50">
              <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>Post-Graduate Opportunities</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {career.higherStudies.map((hs) => (
                  <Badge key={hs} variant="lilac">{hs}</Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

      </div>

    </div>
  );
}
