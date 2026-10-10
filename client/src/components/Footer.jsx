import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bgSecondary border-t border-borderColor mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-cardBg border border-borderColor rounded-lg flex items-center justify-center text-electricLime">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-warmIvory">
                Career<span className="text-electricLime">Scope</span>
              </span>
            </div>
            <p className="text-mutedText text-sm max-w-md leading-relaxed">
              Explore beyond the obvious choices. Empowering intermediate students to discover courses and career pathways matching their unique interests, subjects, and goals.
            </p>
          </div>

          <div>
            <h4 className="text-warmIvory font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-mutedText">
              <li>
                <Link to="/courses" className="hover:text-electricLime transition">Explore Courses</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-electricLime transition">Career Paths</Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-electricLime transition">Interest Assessment</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-electricLime transition">Course Comparison</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-warmIvory font-semibold text-sm uppercase tracking-wider mb-4">Streams Supported</h4>
            <ul className="space-y-2 text-sm text-mutedText">
              <li>MPC — Mathematics, Physics, Chemistry</li>
              <li>BiPC — Biology, Physics, Chemistry</li>
              <li>MEC — Mathematics, Economics, Commerce</li>
              <li>CEC — Civics, Economics, Commerce</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-borderColor mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-mutedText">
          <p>© {new Date().getFullYear()} CareerScope. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built for Intermediate students exploring their future</span>
            <Heart className="w-3.5 h-3.5 text-softLilac inline fill-softLilac" />
          </p>
        </div>
      </div>
    </footer>
  );
}
