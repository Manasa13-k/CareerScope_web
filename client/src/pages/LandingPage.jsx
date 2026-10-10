import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass, ArrowRight, BookOpen, Target, Scale, Bookmark,
  TrendingUp, Layers, CheckCircle2, ChevronRight, Sparkles,
  MapPin, Atom, Cpu, HeartPulse, Sprout, Briefcase, Palette
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#how-it-works') {
      const timer = setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="space-y-24 pb-20 atlas-topography">
      
      {/* HERO SECTION - ASYMMETRIC EDITORIAL LAYOUT */}
      <section className="relative pt-10 pb-14 md:pt-20 md:pb-24 border-b border-borderAtlas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Editorial Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-mustard-light border border-mustard/40 rounded-full text-ink text-xs font-bold tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5 text-coral" />
                <span>YOUR NEXT CHAPTER STARTS HERE</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-teal leading-[1.08]">
                A world of <span className="italic text-coral">possibilities.</span><br />
                Find your path.
              </h1>

              <p className="text-ink-light text-base sm:text-lg max-w-xl leading-relaxed font-normal">
                Explore courses beyond the familiar choices, discover careers that match your interests, and make your next decision with confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <Link to="/assessment">
                  <Button size="lg" className="w-full sm:w-auto shadow-atlas">
                    <span>Explore My Options</span>
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </a>
              </div>

              {/* Supported Streams Quick Bar */}
              <div className="pt-6 border-t border-borderAtlas flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                <span className="font-bold uppercase tracking-wider text-teal">Streams:</span>
                <span className="px-2 py-0.5 bg-surface border border-borderAtlas rounded font-semibold text-ink">MPC</span>
                <span className="px-2 py-0.5 bg-surface border border-borderAtlas rounded font-semibold text-ink">BiPC</span>
                <span className="px-2 py-0.5 bg-surface border border-borderAtlas rounded font-semibold text-ink">MEC</span>
                <span className="px-2 py-0.5 bg-surface border border-borderAtlas rounded font-semibold text-ink">CEC</span>
                <span className="px-2 py-0.5 bg-surface border border-borderAtlas rounded font-semibold text-ink">Vocational</span>
              </div>
            </div>

            {/* Right Side Visual: Educational Pathways Illustration */}
            <div className="lg:col-span-5">
              <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 shadow-atlas-lg relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-borderAtlas pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-coral inline-block" />
                    <span className="font-serif text-lg font-bold text-teal">Branching Pathways</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase">PLATE I — MAP</span>
                </div>

                {/* Stylized Branching Pathways Diagram */}
                <div className="space-y-4 relative">
                  
                  {/* Origin Node */}
                  <div className="bg-ivory border-2 border-teal p-3.5 rounded-xl text-center shadow-sm relative z-10">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-coral block">Starting Waypoint</span>
                    <h4 className="font-serif text-lg font-bold text-teal">Intermediate Education</h4>
                    <p className="text-[11px] text-ink-light">11th–12th Grade Foundations</p>
                  </div>

                  {/* SVG Branching Lines */}
                  <div className="flex justify-center -my-2 relative z-0">
                    <svg width="280" height="42" viewBox="0 0 280 42" className="text-teal/40">
                      <path d="M140 0 V14 C140 24 35 24 35 38 V42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                      <path d="M140 0 V14 C140 24 140 24 140 38 V42" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M140 0 V14 C140 24 245 24 245 38 V42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                    </svg>
                  </div>

                  {/* Sector Branch Nodes */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-teal-pale border border-teal/30 p-2.5 rounded-lg text-center space-y-1">
                      <Cpu className="w-4 h-4 text-teal mx-auto" />
                      <span className="text-[11px] font-bold text-teal block leading-tight">Technology</span>
                      <span className="text-[9px] text-ink-muted block">AI, Data, Systems</span>
                    </div>

                    <div className="bg-coral-light border border-coral/30 p-2.5 rounded-lg text-center space-y-1">
                      <HeartPulse className="w-4 h-4 text-coral-dark mx-auto" />
                      <span className="text-[11px] font-bold text-coral-dark block leading-tight">Healthcare</span>
                      <span className="text-[9px] text-ink-muted block">Biotech, Pharma</span>
                    </div>

                    <div className="bg-mustard-light border border-mustard/40 p-2.5 rounded-lg text-center space-y-1">
                      <Sprout className="w-4 h-4 text-mustard-dark mx-auto" />
                      <span className="text-[11px] font-bold text-ink block leading-tight">Environment</span>
                      <span className="text-[9px] text-ink-muted block">Agri, Forestry</span>
                    </div>
                  </div>

                  {/* Secondary Sector Grid */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-sage-light border border-borderAtlas p-2.5 rounded-lg text-center space-y-1">
                      <Briefcase className="w-4 h-4 text-teal mx-auto" />
                      <span className="text-[11px] font-bold text-ink block leading-tight">Commerce</span>
                      <span className="text-[9px] text-ink-muted block">Finance, Economics</span>
                    </div>

                    <div className="bg-ivory border border-borderAtlas p-2.5 rounded-lg text-center space-y-1">
                      <Palette className="w-4 h-4 text-coral mx-auto" />
                      <span className="text-[11px] font-bold text-ink block leading-tight">Design & Arts</span>
                      <span className="text-[9px] text-ink-muted block">UX, Visual Media</span>
                    </div>

                    <div className="bg-teal-pale border border-teal/20 p-2.5 rounded-lg text-center space-y-1">
                      <Atom className="w-4 h-4 text-teal mx-auto" />
                      <span className="text-[11px] font-bold text-teal block leading-tight">Research</span>
                      <span className="text-[9px] text-ink-muted block">Statistics, Policy</span>
                    </div>
                  </div>

                  {/* Destination Marker */}
                  <div className="mt-4 p-3 bg-sage border border-borderAtlas rounded-xl text-center flex items-center justify-between">
                    <span className="text-xs font-bold text-teal flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-coral" />
                      <span>28+ Curated Degree Programs</span>
                    </span>
                    <Link to="/courses" className="text-xs font-bold text-teal hover:text-coral transition">
                      Explore Courses →
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C: COURSE DISCOVERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-borderAtlas pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-coral">DOMAIN EXPEDITIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal">
              There's more than one way forward.
            </h2>
          </div>
          <p className="text-sm text-ink-light max-w-md">
            Undergraduate programs grouped by domain to help you look past popular defaults and discover aligned degrees.
          </p>
        </div>

        {/* Varied Category Cards with Distinct Editorial Treatments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Technology & Computing */}
          <div className="bg-surface border-2 border-teal/20 rounded-xl p-6 hover:border-teal transition duration-200 space-y-4 flex flex-col justify-between shadow-atlas-sm group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-teal-pale text-teal flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-teal font-semibold">01 / COMPUTING</span>
              <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-teal transition">
                Technology & Computing
              </h3>
              <p className="text-xs text-ink-light leading-relaxed">
                Software development, data architecture, machine intelligence, and systems computing spanning engineering and applied science.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Tech CSE</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">BCA</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Sc Data Science</span>
              </div>
            </div>
            <Link to="/courses?sector=Technology" className="text-xs font-bold text-teal group-hover:text-coral transition flex items-center space-x-1 pt-3 border-t border-borderAtlas/60">
              <span>View Technology Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Health & Life Sciences */}
          <div className="bg-surface border-2 border-coral/30 rounded-xl p-6 hover:border-coral transition duration-200 space-y-4 flex flex-col justify-between shadow-atlas-sm group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-coral-light text-coral flex items-center justify-center font-bold">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-coral font-semibold">02 / LIFE SCIENCES</span>
              <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-coral transition">
                Health & Life Sciences
              </h3>
              <p className="text-xs text-ink-light leading-relaxed">
                Clinical practice, pharmacology, microbiology, genetics, and specialized allied diagnostic healthcare technologies.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Pharm</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Sc Biotech</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">Radiology Tech</span>
              </div>
            </div>
            <Link to="/courses?sector=Healthcare" className="text-xs font-bold text-coral group-hover:text-coral-dark transition flex items-center space-x-1 pt-3 border-t border-borderAtlas/60">
              <span>View Healthcare Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Agriculture & Environment */}
          <div className="bg-surface border-2 border-mustard/40 rounded-xl p-6 hover:border-mustard transition duration-200 space-y-4 flex flex-col justify-between shadow-atlas-sm group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-mustard-light text-ink flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6 text-mustard-dark" />
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-mustard-dark font-semibold">03 / BIO-RESOURCES</span>
              <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-teal transition">
                Agriculture & Ecology
              </h3>
              <p className="text-xs text-ink-light leading-relaxed">
                Sustainable food production, agronomy, forestry management, horticulture, and environmental science policy.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Sc Agriculture</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">Horticulture</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">Environmental Sci</span>
              </div>
            </div>
            <Link to="/courses?sector=Agriculture" className="text-xs font-bold text-teal group-hover:text-coral transition flex items-center space-x-1 pt-3 border-t border-borderAtlas/60">
              <span>View Agriculture Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Business & Commerce */}
          <div className="bg-surface border-2 border-borderAtlas rounded-xl p-6 hover:border-teal transition duration-200 space-y-4 flex flex-col justify-between shadow-atlas-sm group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-sage-light text-teal flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-teal font-semibold">04 / COMMERCE</span>
              <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-teal transition">
                Business & Economics
              </h3>
              <p className="text-xs text-ink-light leading-relaxed">
                Quantitative econometrics, corporate accounting, management dynamics, financial analytics, and strategic operations.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Com Hons</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">BBA</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.A. Economics</span>
              </div>
            </div>
            <Link to="/courses?sector=Business" className="text-xs font-bold text-teal group-hover:text-coral transition flex items-center space-x-1 pt-3 border-t border-borderAtlas/60">
              <span>View Business Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: Arts, Design & Humanities */}
          <div className="bg-surface border-2 border-borderAtlas rounded-xl p-6 hover:border-coral transition duration-200 space-y-4 flex flex-col justify-between shadow-atlas-sm group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-coral-light text-coral flex items-center justify-center font-bold">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-coral font-semibold">05 / DESIGN & ARTS</span>
              <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-coral transition">
                Design & Humanities
              </h3>
              <p className="text-xs text-ink-light leading-relaxed">
                User experience research, architecture, journalism, creative publishing, behavioral psychology, and diplomacy.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Des (UX)</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Arch</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">Journalism</span>
              </div>
            </div>
            <Link to="/courses?sector=Design" className="text-xs font-bold text-coral group-hover:text-coral-dark transition flex items-center space-x-1 pt-3 border-t border-borderAtlas/60">
              <span>View Design Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6: Science & Research */}
          <div className="bg-surface border-2 border-borderAtlas rounded-xl p-6 hover:border-mustard transition duration-200 space-y-4 flex flex-col justify-between shadow-atlas-sm group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-mustard-light text-ink flex items-center justify-center font-bold">
                <Atom className="w-6 h-6 text-mustard-dark" />
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-mustard-dark font-semibold">06 / MATHEMATICS</span>
              <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-teal transition">
                Pure & Applied Science
              </h3>
              <p className="text-xs text-ink-light leading-relaxed">
                Foundational mathematics, statistical modeling, actuarial computation, and research laboratory applications.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Sc Statistics</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Sc Mathematics</span>
                <span className="text-[11px] bg-ivory px-2 py-0.5 rounded border border-borderAtlas">B.Sc Biotech</span>
              </div>
            </div>
            <Link to="/courses?sector=Research" className="text-xs font-bold text-teal group-hover:text-coral transition flex items-center space-x-1 pt-3 border-t border-borderAtlas/60">
              <span>View Science Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION D: DISCOVERY PROCESS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-teal">EDITORIAL METHODOLOGY</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal">
            Start with what interests you.
          </h2>
          <p className="text-ink-light text-sm leading-relaxed">
            A structured three-step discovery framework designed to bridge your high school subjects with authentic future degrees.
          </p>
        </div>

        {/* Connected Pathway Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-surface border border-borderAtlas rounded-xl p-8 space-y-4 shadow-atlas-sm relative">
            <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
              <span className="font-serif text-3xl font-bold text-mustard-dark">01</span>
              <span className="text-xs font-mono uppercase text-ink-muted">STEP ONE</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-teal">Choose your stream</h3>
            <p className="text-ink-light text-xs leading-relaxed">
              Select your Intermediate academic foundation: MPC, BiPC, MEC, CEC, or other streams. This identifies real academic eligibility.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface border border-borderAtlas rounded-xl p-8 space-y-4 shadow-atlas-sm relative">
            <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
              <span className="font-serif text-3xl font-bold text-coral">02</span>
              <span className="text-xs font-mono uppercase text-ink-muted">STEP TWO</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-teal">Explore your interests</h3>
            <p className="text-ink-light text-xs leading-relaxed">
              Take our 6-question interest assessment. Answer scenario-based questions to map your genuine affinity towards tech, biology, design, or commerce.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface border border-borderAtlas rounded-xl p-8 space-y-4 shadow-atlas-sm relative">
            <div className="flex items-center justify-between border-b border-borderAtlas pb-3">
              <span className="font-serif text-3xl font-bold text-teal">03</span>
              <span className="text-xs font-mono uppercase text-ink-muted">STEP THREE</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-teal">Discover courses & careers</h3>
            <p className="text-ink-light text-xs leading-relaxed">
              Receive transparent match scores with detailed explanations of why each course aligns with your selected subjects and cognitive interests.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION E: WHY CAREERSCOPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-sage/40 border border-borderAtlas rounded-2xl p-8 md:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-coral">CLEAR GUIDANCE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal">
              Why explore with CareerScope?
            </h2>
            <p className="text-ink-light text-sm">
              We focus on curriculum clarity, eligibility awareness, and realistic pathways instead of promotional promises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface p-5 rounded-xl border border-borderAtlas space-y-2">
              <div className="w-8 h-8 rounded-lg bg-mustard-light text-mustard-dark flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-teal text-base">Unfamiliar Options</h4>
              <p className="text-xs text-ink-light leading-relaxed">
                Discover degree pathways beyond the three or four choices everyone in your neighborhood talks about.
              </p>
            </div>

            <div className="bg-surface p-5 rounded-xl border border-borderAtlas space-y-2">
              <div className="w-8 h-8 rounded-lg bg-coral-light text-coral flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-teal text-base">Course Curriculum</h4>
              <p className="text-xs text-ink-light leading-relaxed">
                Understand what courses actually teach: core subjects, technical skills developed, and post-graduate options.
              </p>
            </div>

            <div className="bg-surface p-5 rounded-xl border border-borderAtlas space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-pale text-teal flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-teal text-base">Connect Interests</h4>
              <p className="text-xs text-ink-light leading-relaxed">
                See direct connections between your high school subjects and real industry sector demands.
              </p>
            </div>

            <div className="bg-surface p-5 rounded-xl border border-borderAtlas space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sage-light text-teal flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="font-bold text-teal text-base">Compare Objectively</h4>
              <p className="text-xs text-ink-light leading-relaxed">
                Compare up to three programs side-by-side across eligibility, duration, skills, and career paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: MEMORABLE CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal text-ivory rounded-3xl p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-atlas-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-mustard/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-mustard">COMMENCE YOUR EXPEDITION</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory leading-tight">
              Your future is bigger than one choice.
            </h2>
            <p className="text-ivory/80 text-sm sm:text-base leading-relaxed">
              Join students discovering courses and career avenues tailored to their genuine talents and interests.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Start Exploring Now</span>
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-teal-dark border-ivory/30 text-ivory hover:bg-teal-light">
                  Browse All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
