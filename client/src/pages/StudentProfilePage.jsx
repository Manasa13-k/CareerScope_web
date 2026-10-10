import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sparkles, Check, Save } from 'lucide-react';
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

      setSuccessMsg('Profile saved successfully!');
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProfile} />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-warmIvory flex items-center space-x-2">
            <User className="w-8 h-8 text-electricLime" />
            <span>Student Profile</span>
          </h1>
          <p className="text-mutedText text-sm mt-1">
            Customize your academic background and domain preferences to refine recommendations
          </p>
        </div>

        <Button
          onClick={() => navigate('/assessment')}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Take Assessment</span>
        </Button>
      </div>

      {successMsg && (
        <div className="bg-electricLime/10 border border-electricLime/30 text-electricLime p-4 rounded-xl text-sm font-semibold flex items-center space-x-2 animate-fade-in">
          <Check className="w-5 h-5" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal & Academic Details */}
        <Card className="space-y-6">
          <h2 className="text-lg font-bold text-warmIvory border-b border-borderColor pb-3">
            Academic Background
          </h2>

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
              placeholder="Select your Intermediate Stream"
              required
            />
          </div>

          <Input
            label="Core Subjects (Comma separated)"
            name="subjects"
            value={formData.subjects}
            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            placeholder="e.g. Mathematics, Physics, Computer Science"
          />

          <Input
            label="Current Skills (Comma separated)"
            name="skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="e.g. Logic, Problem Solving, Writing, Coding"
          />
        </Card>

        {/* Interests Selection */}
        <Card className="space-y-4">
          <div className="flex justify-between items-center border-b border-borderColor pb-3">
            <div>
              <h2 className="text-lg font-bold text-warmIvory">Areas of Interest</h2>
              <p className="text-xs text-mutedText">Select subjects or activities you enjoy</p>
            </div>
            <span className="text-xs font-semibold text-softLilac">{formData.interests.length} Selected</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition flex items-center space-x-1.5 ${
                    selected
                      ? 'bg-electricLime text-bgMain border-electricLime'
                      : 'bg-bgSecondary text-mutedText border-borderColor hover:border-softLilac hover:text-warmIvory'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Career Sectors Selection */}
        <Card className="space-y-4">
          <div className="flex justify-between items-center border-b border-borderColor pb-3">
            <div>
              <h2 className="text-lg font-bold text-warmIvory">Preferred Career Sectors</h2>
              <p className="text-xs text-mutedText">Select industry domains you feel drawn towards</p>
            </div>
            <span className="text-xs font-semibold text-softLilac">{formData.preferredSectors.length} Selected</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {SECTOR_OPTIONS.map((sector) => {
              const selected = formData.preferredSectors.includes(sector);
              return (
                <button
                  type="button"
                  key={sector}
                  onClick={() => toggleSector(sector)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition flex items-center space-x-1.5 ${
                    selected
                      ? 'bg-softLilac text-bgMain border-softLilac'
                      : 'bg-bgSecondary text-mutedText border-borderColor hover:border-electricLime hover:text-warmIvory'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5" />}
                  <span>{sector}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4 pt-2">
          <Button type="submit" disabled={saving} size="lg" className="min-w-[160px]">
            <Save className="w-4 h-4 mr-2" />
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </Button>
        </div>

      </form>
    </div>
  );
}
