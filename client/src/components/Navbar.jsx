import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Navigation, Menu, X, User as UserIcon, LogOut, Bookmark, 
  Scale, Compass, LayoutDashboard, MapPin
} from 'lucide-react';
import { authService } from '../services/authService';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleHowItWorks = (e) => {
    if (e) e.preventDefault();
    navigate('/#how-it-works');
    setTimeout(() => {
      const el = document.getElementById('how-it-works');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-borderAtlas transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Editorial Symbol */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal text-ivory flex items-center justify-center shadow-atlas-sm group-hover:bg-coral transition-colors duration-300 relative overflow-hidden">
              <Compass className="w-5 h-5 transform group-hover:rotate-45 transition duration-300" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-mustard rounded-full opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-teal">
                Career<span className="text-coral">Scope</span>
              </span>
              <p className="text-[10px] tracking-wider text-ink-muted uppercase font-semibold">
                Explore beyond the obvious
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7">
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive('/courses')
                  ? 'text-teal font-bold border-b-2 border-coral pb-0.5'
                  : 'text-ink-light hover:text-teal'
              }`}
            >
              Explore Courses
            </Link>
            <Link
              to="/careers"
              className={`text-sm font-medium transition-colors ${
                isActive('/careers')
                  ? 'text-teal font-bold border-b-2 border-coral pb-0.5'
                  : 'text-ink-light hover:text-teal'
              }`}
            >
              Discover Careers
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/dashboard')
                      ? 'text-teal font-bold border-b-2 border-coral pb-0.5'
                      : 'text-ink-light hover:text-teal'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-mustard-dark" />
                  <span>Workspace</span>
                </Link>
                <Link
                  to="/recommendations"
                  className={`text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/recommendations')
                      ? 'text-teal font-bold border-b-2 border-coral pb-0.5'
                      : 'text-ink-light hover:text-teal'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-coral" />
                  <span>Matches</span>
                </Link>
                <Link
                  to="/compare"
                  className={`text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/compare')
                      ? 'text-teal font-bold border-b-2 border-coral pb-0.5'
                      : 'text-ink-light hover:text-teal'
                  }`}
                >
                  <Scale className="w-4 h-4 text-teal" />
                  <span>Compare</span>
                </Link>
                <Link
                  to="/shortlist"
                  className={`text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/shortlist')
                      ? 'text-teal font-bold border-b-2 border-coral pb-0.5'
                      : 'text-ink-light hover:text-teal'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-mustard-dark" />
                  <span>Saved</span>
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleHowItWorks}
                className="text-sm font-medium text-ink-light hover:text-teal transition-colors bg-transparent border-0 cursor-pointer p-0"
              >
                How It Works
              </button>
            )}
          </div>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-1.5 bg-surface border border-borderAtlas hover:border-teal rounded-full text-ink text-xs font-semibold shadow-atlas-sm transition"
                >
                  <UserIcon className="w-3.5 h-3.5 text-teal" />
                  <span>{currentUser?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-sage-light hover:bg-sage border border-borderAtlas text-ink-light hover:text-coral rounded-full transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-teal hover:text-coral transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-coral text-white hover:bg-coral-dark font-medium rounded-lg text-sm transition-all shadow-atlas-sm hover:shadow-atlas"
                >
                  Start Exploring
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 bg-surface border border-borderAtlas rounded-lg text-teal hover:text-coral focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-borderAtlas px-5 pt-3 pb-6 space-y-4 shadow-atlas">
          <Link
            to="/courses"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-teal"
          >
            Explore Courses
          </Link>
          <Link
            to="/careers"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-teal"
          >
            Discover Careers
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              handleHowItWorks();
            }}
            className="block w-full text-left py-2 text-base font-medium text-ink hover:text-teal"
          >
            How It Works
          </button>
          
          {isAuthenticated ? (
            <div className="pt-3 border-t border-borderAtlas space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-ink hover:text-teal"
              >
                Workspace Dashboard
              </Link>
              <Link
                to="/recommendations"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-ink hover:text-teal"
              >
                Course Matches
              </Link>
              <Link
                to="/compare"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-ink hover:text-teal"
              >
                Course Comparison
              </Link>
              <Link
                to="/shortlist"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-ink hover:text-teal"
              >
                Saved Shortlist
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-teal font-semibold"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="w-full text-left py-2 text-base font-medium text-coral"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-borderAtlas flex flex-col space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-ivory border border-borderAtlas text-teal font-semibold rounded-lg"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-coral text-white font-medium rounded-lg shadow-atlas-sm"
              >
                Start Exploring
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
