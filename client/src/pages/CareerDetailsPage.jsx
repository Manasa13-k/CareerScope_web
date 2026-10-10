import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Compass, ArrowLeft, Award, GraduationCap, Layers, ChevronRight, BookOpen, Briefcase
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
      setError(err.message || 'Failed to retrieve career pathway details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Retrieving career roadmap..." />;
  if (error || !career) return <ErrorMessage message={error || 'Career roadmap not found'} onRetry={fetchCareerDetails} />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Navigation */}
      <div className="flex items-center justify-between border-b border-borderAtlas pb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-ink-light hover:text-teal text-xs font-bold uppercase tracking-wider transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Career Explorer</span>
        </button>
        <span className="text-xs font-mono text-ink-muted uppercase">CAREER DOSSIER</span>
      </div>

      {/* Main Dossier Header */}
      <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-8 sm:p-10 shadow-atlas-sm space-y-5">
        <Badge variant="mustard" className="flex items-center space-x-1 w-fit">
          <Compass className="w-3.5 h-3.5" />
          <span>{career.sector} Sector Pathway</span>
        </Badge>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal leading-tight">
          {career.name}
        </h1>
        
        <p className="text-ink-light text-base leading-relaxed font-normal pt-2 border-t border-borderAtlas/60">
          {career.description}
        </p>
      </div>

      {/* VISUAL CAREER PATHWAY PROGRESSION */}
      <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-8 shadow-atlas-sm space-y-6">
        <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal">
            PROGRESSION TIMELINE
          </span>
          <span className="text-[10px] font-mono text-ink-muted">ROADMAP STAGES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
          
          <div className="bg-ivory border border-borderAtlas p-3.5 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-coral uppercase tracking-wider">01 / Foundation</span>
            <h4 className="font-serif text-sm font-bold text-teal">Intermediate Stream</h4>
            <p className="text-[10px] text-ink-muted">11th–12th Grade</p>
          </div>

          <div className="hidden sm:flex justify-center text-borderAtlas">
            <ChevronRight className="w-5 h-5 text-teal" />
          </div>

          <div className="bg-ivory border border-borderAtlas p-3.5 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-mustard-dark uppercase tracking-wider">02 / Degree</span>
            <h4 className="font-serif text-sm font-bold text-teal">Undergraduate Degree</h4>
            <p className="text-[10px] text-ink-muted">3–4 Year Program</p>
          </div>

          <div className="hidden sm:flex justify-center text-borderAtlas">
            <ChevronRight className="w-5 h-5 text-teal" />
          </div>

          <div className="bg-ivory border border-borderAtlas p-3.5 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-teal uppercase tracking-wider">03 / Mastery</span>
            <h4 className="font-serif text-sm font-bold text-teal">Core Skill Building</h4>
            <p className="text-[10px] text-ink-muted">Applied Practice</p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center pt-2">
          
          <div className="hidden sm:block" />

          <div className="bg-sage-light border border-borderAtlas p-3.5 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-teal uppercase tracking-wider">04 / Focus</span>
            <h4 className="font-serif text-sm font-bold text-teal">Industry Specialization</h4>
            <p className="text-[10px] text-ink-muted">Projects & Internships</p>
          </div>

          <div className="bg-teal text-white border-2 border-teal p-3.5 rounded-xl space-y-1 shadow-atlas-sm">
            <span className="text-[10px] font-bold text-mustard uppercase tracking-wider">05 / Destination</span>
            <h4 className="font-serif text-base font-bold text-white">{career.name}</h4>
            <p className="text-[10px] text-ivory/80">Active Professional Role</p>
          </div>

        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Required Skills */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-coral" />
            <span>Requisite Industry Competencies</span>
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {career.skills && career.skills.map((sk) => (
              <span key={sk} className="px-3 py-1 bg-ivory border border-borderAtlas text-ink text-xs rounded-lg font-medium">
                {sk}
              </span>
            ))}
          </div>
        </Card>

        {/* Recommended Degree Courses */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-mustard-dark" />
            <span>Prerequisite Degree Pathways</span>
          </span>
          <ul className="space-y-2 text-xs text-ink">
            {career.relatedCourses && career.relatedCourses.map((rc, i) => (
              <li key={i} className="bg-ivory border border-borderAtlas p-2.5 rounded-lg flex items-center justify-between">
                <span className="font-medium">{rc}</span>
                <Link to="/courses" className="text-teal text-[11px] font-bold hover:text-coral transition">View In Catalog →</Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Educational Roadmaps */}
        <Card className="space-y-3 bg-surface border-borderAtlas">
          <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-teal" />
            <span>Education Trajectory Outline</span>
          </span>
          <ul className="space-y-2 text-xs text-ink-light">
            {career.educationPaths && career.educationPaths.map((ep, i) => (
              <li key={i} className="bg-ivory border border-borderAtlas p-3 rounded-lg leading-relaxed font-medium">
                {ep}
              </li>
            ))}
          </ul>
        </Card>

        {/* Related Roles & Higher Studies */}
        <Card className="space-y-4 bg-surface border-borderAtlas">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-coral" />
              <span>Related Professional Roles</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {career.relatedRoles && career.relatedRoles.map((rr) => (
                <span key={rr} className="px-2.5 py-1 bg-sage-light border border-borderAtlas text-teal text-xs rounded-md font-semibold">
                  {rr}
                </span>
              ))}
            </div>
          </div>

          {career.higherStudies && career.higherStudies.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-borderAtlas">
              <span className="text-xs font-bold uppercase tracking-widest text-teal flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-mustard-dark" />
                <span>Post-Graduate Specializations</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {career.higherStudies.map((hs) => (
                  <Badge key={hs} variant="teal">{hs}</Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

      </div>

    </div>
  );
}
