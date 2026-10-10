import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sparkles, Check, Save, Compass } from 'lucide-react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { authService } from '../services/authService';

const STREAMS = ['MPC', 'BiPC', 'MEC', 'CEC', 'Other'];

const INTEREST_OPTIONS = [
  'Technology', 'Mathematics', 'Biology', 'Design', 'Business', 'Research',
  'Healthcare', 'Agriculture', 'Communication', 'Creativity', 'Problem Solving',
  'Teaching', 'Environment', 'Engineering'
];

const SECTOR_OPTIONS = [
  'Technology', 'Healthcare', 'Engineering', 'Agriculture', 'Finance',
  'Government', 'Education', 'Research', 'Business', 'Design', 'Media',
  'Law', 'Environment'
];

export default function StudentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    stream: '',
    subjects: '',
    interests: [],
    preferredSectors: [],
    skills: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await authService.getProfile();
      setFormData({
        name: user.name || '',
        stream: user.stream || '',
        subjects: Array.isArray(user.subjects) ? user.subjects.join(', ') : '',
        interests: user.interests || [],
        preferredSectors: user.preferredSectors || [],
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : '',
      });
    } catch (err) {
      setError(err.message || 'Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const toggleSector = (sector) => {
    setFormData(prev => {
      const exists = prev.preferredSectors.includes(sector);
      return {
        ...prev,
        preferredSectors: exists
          ? prev.preferredSectors.filter(s => s !== sector)
          : [...prev.preferredSectors, sector],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      const subjectsArray = formData.subjects
        ? formData.subjects.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      const skillsArray = formData.skills
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      await authService.updateProfile({
        name: formData.name,
        stream: formData.stream,
        subjects: subjectsArray,
        interests: formData.interests,
        preferredSectors: formData.preferredSectors,
        skills: skillsArray,
      });

      setSuccessMsg('Profile calibrated successfully! Recommendations updated.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);
    } catch (err) {
      setError(err.message || 'Failed to update student profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Retrieving student profile..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProfile} />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-borderAtlas pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-mustard-light border border-mustard/40 rounded-full text-ink text-xs font-bold uppercase tracking-wider">
            <User className="w-3.5 h-3.5 text-teal" />
            <span>STUDENT CALIBRATION</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
            Academic & Interest Profile
          </h1>
          <p className="text-ink-light text-sm max-w-xl leading-relaxed">
            Specify your 11th–12th grade Intermediate stream, core subjects, and personal interests to refine course eligibility and match percentages.
          </p>
        </div>

        <Button
          onClick={() => navigate('/assessment')}
          variant="secondary"
          size="md"
          className="flex items-center space-x-1.5 shadow-atlas-sm shrink-0"
        >
          <Sparkles className="w-4 h-4 text-ink" />
          <span>Take Interest Quiz</span>
        </Button>
      </div>

      {successMsg && (
        <div className="bg-sage-light border border-teal text-teal p-4 rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-atlas-sm">
          <Check className="w-5 h-5 text-teal shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Academic Foundation Card */}
        <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-6 shadow-atlas-sm">
          <div className="border-b border-borderAtlas pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-coral">ACADEMIC FOUNDATION</span>
            <h2 className="font-serif text-2xl font-bold text-teal">High School Qualification</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Student Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Select
              label="Intermediate Stream"
              name="stream"
              value={formData.stream}
              onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
              options={STREAMS}
              placeholder="Select Intermediate Stream"
              required
            />
          </div>

          <Input
            label="Core High School Subjects (Comma separated)"
            name="subjects"
            value={formData.subjects}
            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            placeholder="e.g. Mathematics, Physics, Chemistry, Computer Science"
          />

          <Input
            label="Current Skills & Talents (Comma separated)"
            name="skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="e.g. Logical Reasoning, Writing, Illustration, Basic Coding"
          />
        </div>

        {/* Interests Selection */}
        <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-5 shadow-atlas-sm">
          <div className="flex justify-between items-center border-b border-borderAtlas pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-mustard-dark">COGNITIVE AFFINITY</span>
              <h2 className="font-serif text-2xl font-bold text-teal">Areas of Interest</h2>
              <p className="text-xs text-ink-light mt-0.5">Select domains you naturally enjoy exploring.</p>
            </div>
            <span className="text-xs font-bold font-mono text-teal bg-teal-pale px-2.5 py-1 rounded border border-teal/20">
              {formData.interests.length} Selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition flex items-center space-x-1.5 ${
                    selected
                      ? 'bg-mustard text-ink border-mustard-dark shadow-atlas-sm'
                      : 'bg-ivory text-ink-light border-borderAtlas hover:border-teal hover:text-teal'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5 text-ink" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Career Sectors Selection */}
        <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-5 shadow-atlas-sm">
          <div className="flex justify-between items-center border-b border-borderAtlas pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-coral">ECONOMIC SECTORS</span>
              <h2 className="font-serif text-2xl font-bold text-teal">Preferred Industry Sectors</h2>
              <p className="text-xs text-ink-light mt-0.5">Select industry sectors you feel drawn toward.</p>
            </div>
            <span className="text-xs font-mono font-bold text-coral bg-coral-light px-2.5 py-1 rounded border border-coral/30">
              {formData.preferredSectors.length} Selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {SECTOR_OPTIONS.map((sector) => {
              const selected = formData.preferredSectors.includes(sector);
              return (
                <button
                  type="button"
                  key={sector}
                  onClick={() => toggleSector(sector)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition flex items-center space-x-1.5 ${
                    selected
                      ? 'bg-teal text-white border-teal shadow-atlas-sm'
                      : 'bg-ivory text-ink-light border-borderAtlas hover:border-teal hover:text-teal'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5 text-white" />}
                  <span>{sector}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Controls */}
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saving} size="lg" className="min-w-[180px] shadow-atlas">
            <Save className="w-4 h-4 mr-2" />
            <span>{saving ? 'Calibrating...' : 'Save Profile'}</span>
          </Button>
        </div>

      </form>
    </div>
  );
}
