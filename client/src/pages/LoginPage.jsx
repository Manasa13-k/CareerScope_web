import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, ArrowRight, Eye, EyeOff, Lock, Mail, MapPin } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { authService } from '../services/authService';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 atlas-topography">
      <div className="w-full max-w-4xl bg-surface border-2 border-borderAtlas rounded-2xl shadow-atlas-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Editorial Visual & Welcome Banner */}
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
                STUDENT LOGBOOK ACCESS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory leading-snug">
                Welcome back to your exploration.
              </h3>
              <p className="text-ivory/80 text-xs sm:text-sm leading-relaxed">
                Resume your journey through courses, saved pathways, and tailored domain matches.
              </p>
            </div>
          </div>

          {/* Stylized Illustrated Route Badge */}
          <div className="mt-8 pt-6 border-t border-teal-light/40 relative z-10 space-y-3">
            <div className="flex items-center space-x-2 text-xs text-mustard font-semibold">
              <MapPin className="w-4 h-4 text-coral" />
              <span>Personal Discovery Workspace</span>
            </div>
            <p className="text-[11px] text-ivory/60 leading-relaxed italic">
              "Every course is a compass heading. Find the ones aligned with your curiosity."
            </p>
          </div>
        </div>

        {/* Right Side: Form Controls */}
        <div className="md:col-span-7 p-8 sm:p-12 bg-surface flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-coral">STUDENT SIGN IN</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-teal">Access Your Account</h2>
              <p className="text-xs text-ink-light">Enter your registered email and password to continue.</p>
            </div>

            {error && (
              <div className="bg-coral-light border border-coral/30 text-coral-dark text-xs p-3.5 rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your account password"
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

              <Button type="submit" fullWidth disabled={loading} size="lg" className="mt-2">
                {loading ? 'Authenticating...' : 'Sign In to CareerScope'}
              </Button>
            </form>

            <div className="text-center text-xs text-ink-light pt-2 border-t border-borderAtlas">
              <span>New student on CareerScope? </span>
              <Link to="/register" className="text-coral hover:underline font-bold">
                Create your student profile
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
