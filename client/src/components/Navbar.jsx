import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, Menu, X, User as UserIcon, LogOut, Bookmark, Scale, Sparkles, LayoutDashboard } from 'lucide-react';
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
    }, 50);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-bgMain/90 backdrop-blur-md border-b border-borderColor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-bgSecondary border border-borderColor rounded-xl flex items-center justify-center text-electricLime group-hover:border-electricLime transition">
              <Compass className="w-6 h-6 transform group-hover:rotate-45 transition duration-300" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-warmIvory group-hover:text-electricLime transition">
                Career<span className="text-electricLime">Scope</span>
              </span>
              <p className="text-[10px] text-mutedText tracking-wider uppercase font-semibold">Explore beyond</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/courses"
              className={`text-sm font-medium transition ${
                isActive('/courses') ? 'text-electricLime font-semibold' : 'text-warmIvory/80 hover:text-warmIvory'
              }`}
            >
              Explore Courses
            </Link>
            <Link
              to="/careers"
              className={`text-sm font-medium transition ${
                isActive('/careers') ? 'text-electricLime font-semibold' : 'text-warmIvory/80 hover:text-warmIvory'
              }`}
            >
              Career Paths
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition flex items-center space-x-1 ${
                    isActive('/dashboard') ? 'text-electricLime font-semibold' : 'text-warmIvory/80 hover:text-warmIvory'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/recommendations"
                  className={`text-sm font-medium transition flex items-center space-x-1 ${
                    isActive('/recommendations') ? 'text-electricLime font-semibold' : 'text-warmIvory/80 hover:text-warmIvory'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-softLilac" />
                  <span>Matches</span>
                </Link>
                <Link
                  to="/compare"
                  className={`text-sm font-medium transition flex items-center space-x-1 ${
                    isActive('/compare') ? 'text-electricLime font-semibold' : 'text-warmIvory/80 hover:text-warmIvory'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>Compare</span>
                </Link>
                <Link
                  to="/shortlist"
                  className={`text-sm font-medium transition flex items-center space-x-1 ${
                    isActive('/shortlist') ? 'text-electricLime font-semibold' : 'text-warmIvory/80 hover:text-warmIvory'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Saved</span>
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleHowItWorks}
                className="text-sm font-medium text-warmIvory/80 hover:text-warmIvory transition bg-transparent border-0 cursor-pointer p-0"
              >
                How It Works
              </button>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-1.5 bg-cardBg border border-borderColor hover:border-softLilac rounded-xl text-warmIvory text-xs font-semibold transition"
                >
                  <UserIcon className="w-4 h-4 text-softLilac" />
                  <span>{currentUser?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-bgSecondary hover:bg-borderColor text-mutedText hover:text-red-400 rounded-xl transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-warmIvory hover:text-electricLime transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-electricLime text-bgMain hover:bg-opacity-90 font-semibold rounded-xl text-sm transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 bg-cardBg border border-borderColor rounded-xl text-warmIvory"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-cardBg border-b border-borderColor px-4 pt-2 pb-6 space-y-4">
          <Link
            to="/courses"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-warmIvory hover:text-electricLime"
          >
            Explore Courses
          </Link>
          <Link
            to="/careers"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-warmIvory hover:text-electricLime"
          >
            Career Paths
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-warmIvory hover:text-electricLime"
              >
                Dashboard
              </Link>
              <Link
                to="/recommendations"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-warmIvory hover:text-electricLime"
              >
                Recommendations
              </Link>
              <Link
                to="/compare"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-warmIvory hover:text-electricLime"
              >
                Course Comparison
              </Link>
              <Link
                to="/shortlist"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-warmIvory hover:text-electricLime"
              >
                Saved Shortlist
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-softLilac"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="w-full text-left py-2 text-base font-medium text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 border-t border-borderColor flex flex-col space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-bgSecondary border border-borderColor text-warmIvory font-semibold rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-electricLime text-bgMain font-semibold rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
