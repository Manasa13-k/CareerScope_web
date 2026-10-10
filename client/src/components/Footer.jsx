import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-teal text-ivory border-t-4 border-mustard mt-24 relative overflow-hidden">
      {/* Background contour lines & watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-mustard/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-ivory text-teal flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5 text-teal" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory">
                Career<span className="text-mustard">Scope</span>
              </span>
            </div>
            
            <p className="text-ivory/80 text-sm leading-relaxed max-w-sm">
              CareerScope is an educational discovery platform for students completing 11th and 12th grade. We map alternative courses, clarify eligibility, and connect personal interests with real-world careers.
            </p>

            <div className="flex items-center space-x-2 text-xs text-mustard uppercase tracking-widest font-bold">
              <span>EXPLORE BEYOND THE FAMILIAR</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-ivory flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-mustard" />
              <span>Explore CareerScope</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory/80">
              <li>
                <Link to="/courses" className="hover:text-mustard transition flex items-center space-x-1">
                  <span>Explore Courses Directory</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-mustard transition flex items-center space-x-1">
                  <span>Discover Career Pathways</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-mustard transition flex items-center space-x-1">
                  <span>Interest Assessment Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-mustard transition flex items-center space-x-1">
                  <span>Course Comparison Matrix</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Intermediate Streams */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-ivory flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-coral" />
              <span>Supported Intermediate Streams</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-teal-dark/60 p-2.5 rounded-lg border border-teal-light/40">
                <span className="font-bold text-mustard block">MPC</span>
                <span className="text-ivory/70 text-[11px]">Maths, Physics, Chem</span>
              </div>
              <div className="bg-teal-dark/60 p-2.5 rounded-lg border border-teal-light/40">
                <span className="font-bold text-coral block">BiPC</span>
                <span className="text-ivory/70 text-[11px]">Biology, Physics, Chem</span>
              </div>
              <div className="bg-teal-dark/60 p-2.5 rounded-lg border border-teal-light/40">
                <span className="font-bold text-mustard block">MEC</span>
                <span className="text-ivory/70 text-[11px]">Maths, Economics, Comm</span>
              </div>
              <div className="bg-teal-dark/60 p-2.5 rounded-lg border border-teal-light/40">
                <span className="font-bold text-coral block">CEC</span>
                <span className="text-ivory/70 text-[11px]">Civics, Economics, Comm</span>
              </div>
            </div>
            <p className="text-[11px] text-ivory/60 italic pt-1">
              Also supporting vocational and alternative higher secondary streams.
            </p>
          </div>

        </div>

        {/* Editorial Colophon */}
        <div className="border-t border-teal-light/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <p>© {new Date().getFullYear()} CareerScope. Built for students navigating their next chapter.</p>
          <div className="flex items-center space-x-4">
            <span>Independent Educational Platform</span>
            <span className="w-1 h-1 rounded-full bg-mustard inline-block" />
            <span>Not affiliated with coaching centers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
