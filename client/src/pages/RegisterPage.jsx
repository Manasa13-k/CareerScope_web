import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Eye, EyeOff, MapPin, CheckCircle } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { authService } from '../services/authService';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setLoading(true);
    try {
      await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 atlas-topography">
      <div className="w-full max-w-4xl bg-surface border-2 border-borderAtlas rounded-2xl shadow-atlas-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Editorial Banner */}
        <div className="md:col-span-5 bg-teal text-ivory p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-mustard/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <Link to="/" className="inline-flex items-center space-x-2 text-ivory group">
              <div className="w-9 h-9 rounded-lg bg-ivory text-teal flex items-center justify-center shadow-sm">
                <Compass className="w-5 h-5 text-teal" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-ivory">
                Career<span className="text-mustard">Scope</span>
              </span>
            </Link>

            <div className="pt-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-mustard block">
                BEGIN YOUR VOYAGE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory leading-snug">
                Chart your course beyond the defaults.
              </h3>
              <p className="text-ivory/80 text-xs sm:text-sm leading-relaxed">
                Create a student profile to unlock explainable course recommendations aligned with your high school subjects.
              </p>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="mt-8 pt-6 border-t border-teal-light/40 relative z-10 space-y-2.5">
            <div className="flex items-center space-x-2 text-xs text-ivory/90">
              <CheckCircle className="w-4 h-4 text-mustard shrink-0" />
              <span>Multi-stream support (MPC, BiPC, MEC, CEC)</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-ivory/90">
              <CheckCircle className="w-4 h-4 text-coral shrink-0" />
              <span>Transparent weighted scoring logic</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-ivory/90">
              <CheckCircle className="w-4 h-4 text-mustard shrink-0" />
              <span>Side-by-side degree comparison</span>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:col-span-7 p-8 sm:p-12 bg-surface flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-coral">STUDENT REGISTRATION</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-teal">Create Student Profile</h2>
              <p className="text-xs text-ink-light">Get started with your free personalized discovery journey.</p>
            </div>

            {error && (
              <div className="bg-coral-light border border-coral/30 text-coral-dark text-xs p-3.5 rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ananya Sharma"
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ananya@example.com"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-ink-muted hover:text-teal transition p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />

              <Button type="submit" fullWidth disabled={loading} size="lg" className="mt-2">
                {loading ? 'Creating Profile...' : 'Begin Exploration'}
              </Button>
            </form>

            <div className="text-center text-xs text-ink-light pt-2 border-t border-borderAtlas">
              <span>Already charted an account? </span>
              <Link to="/login" className="text-teal hover:underline font-bold">
                Log In
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
