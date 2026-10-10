import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass, ArrowRight, BookOpen, Target, Sparkles, Scale, Bookmark,
  TrendingUp, HelpCircle, Layers, CheckCircle2, ChevronRight, Lightbulb
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
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-softLilac/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-electricLime/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cardBg border border-borderColor text-softLilac text-xs font-semibold uppercase tracking-wider animate-bounce">
            <Sparkles className="w-4 h-4 text-electricLime" />
            <span>Discover your true potential</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-warmIvory max-w-4xl mx-auto leading-tight">
            Explore beyond the <span className="text-electricLime">obvious.</span>
          </h1>

          <p className="text-lg md:text-xl text-mutedText max-w-2xl mx-auto leading-relaxed font-normal">
            Discover courses and career paths that match your interests, background, and goals — not just the choices everyone talks about.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/assessment">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-electricLime/10">
                <span className="mr-2">Discover Your Path</span>
                <ArrowRight className="w-5 h-5 inline" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Courses
              </Button>
            </Link>
          </div>

          {/* Visual Pathway Diagram */}
          <div className="pt-12 max-w-4xl mx-auto">
            <div className="bg-cardBg/80 border border-borderColor rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase text-mutedText tracking-widest mb-6">
                Integrated Discovery Pathway
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                
                <div className="bg-bgSecondary border border-borderColor p-4 rounded-2xl text-center space-y-2 group hover:border-softLilac transition">
                  <div className="w-10 h-10 bg-softLilac/10 text-softLilac rounded-xl flex items-center justify-center mx-auto font-bold text-sm">01</div>
                  <h4 className="font-bold text-warmIvory text-sm">Intermediate</h4>
                  <p className="text-[11px] text-mutedText">MPC, BiPC, MEC, CEC</p>
                </div>

                <div className="hidden sm:flex justify-center text-borderColor">
                  <ChevronRight className="w-6 h-6 text-electricLime" />
                </div>

                <div className="bg-bgSecondary border border-borderColor p-4 rounded-2xl text-center space-y-2 group hover:border-softLilac transition">
                  <div className="w-10 h-10 bg-electricLime/10 text-electricLime rounded-xl flex items-center justify-center mx-auto font-bold text-sm">02</div>
                  <h4 className="font-bold text-warmIvory text-sm">Interests</h4>
                  <p className="text-[11px] text-mutedText">Tech, Biology, Design...</p>
                </div>

                <div className="hidden sm:flex justify-center text-borderColor">
                  <ChevronRight className="w-6 h-6 text-electricLime" />
                </div>

                <div className="bg-bgSecondary border border-borderColor p-4 rounded-2xl text-center space-y-2 group hover:border-softLilac transition">
                  <div className="w-10 h-10 bg-softLilac/10 text-softLilac rounded-xl flex items-center justify-center mx-auto font-bold text-sm">03</div>
                  <h4 className="font-bold text-warmIvory text-sm">Courses</h4>
                  <p className="text-[11px] text-mutedText">20+ Degrees & Specialties</p>
                </div>

                <div className="hidden sm:flex justify-center text-borderColor">
                  <ChevronRight className="w-6 h-6 text-electricLime" />
                </div>

                <div className="bg-bgSecondary border border-borderColor p-4 rounded-2xl text-center space-y-2 group hover:border-softLilac transition">
                  <div className="w-10 h-10 bg-electricLime/10 text-electricLime rounded-xl flex items-center justify-center mx-auto font-bold text-sm">04</div>
                  <h4 className="font-bold text-warmIvory text-sm">Career Paths</h4>
                  <p className="text-[11px] text-mutedText">15+ High-Growth Fields</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-warmIvory">
            Your stream doesn't define your future.
          </h2>
          <p className="text-mutedText text-base leading-relaxed">
            Many students know only the most popular career options. CareerScope helps them discover alternative courses and pathways based on their interests and background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="space-y-4 border-l-4 border-l-softLilac">
            <div className="w-12 h-12 bg-bgSecondary border border-borderColor rounded-xl flex items-center justify-center text-softLilac">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-warmIvory">Limited Awareness</h3>
            <p className="text-mutedText text-sm leading-relaxed">
              Most intermediate students are familiar with only 3 to 4 mainstream degree options despite hundreds of specialized pathways existing today.
            </p>
          </Card>

          <Card className="space-y-4 border-l-4 border-l-electricLime">
            <div className="w-12 h-12 bg-bgSecondary border border-borderColor rounded-xl flex items-center justify-center text-electricLime">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-warmIvory">Popularity-Driven Choices</h3>
            <p className="text-mutedText text-sm leading-relaxed">
              Decisions are frequently influenced by peer pressure or traditional social expectations rather than personal cognitive strengths and interests.
            </p>
          </Card>

          <Card className="space-y-4 border-l-4 border-l-softLilac">
            <div className="w-12 h-12 bg-bgSecondary border border-borderColor rounded-xl flex items-center justify-center text-softLilac">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-warmIvory">Unexplored Career Paths</h3>
            <p className="text-mutedText text-sm leading-relaxed">
              High-growth fields like UX Design, Data Analytics, Environmental Science, and Bio-Tech often go completely overlooked.
            </p>
          </Card>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-warmIvory">How It Works</h2>
          <p className="text-mutedText text-sm">Four simple steps to clarify your higher education journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="bg-cardBg border border-borderColor rounded-2xl p-6 space-y-3">
            <span className="text-3xl font-black text-electricLime">01</span>
            <h4 className="text-lg font-bold text-warmIvory">Tell us about yourself</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Select your Intermediate stream (MPC, BiPC, MEC, CEC) and favorite core subjects.
            </p>
          </div>

          <div className="bg-cardBg border border-borderColor rounded-2xl p-6 space-y-3">
            <span className="text-3xl font-black text-softLilac">02</span>
            <h4 className="text-lg font-bold text-warmIvory">Discover your interests</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Take our quick 6-question interest assessment to map out your core domain preferences.
            </p>
          </div>

          <div className="bg-cardBg border border-borderColor rounded-2xl p-6 space-y-3">
            <span className="text-3xl font-black text-electricLime">03</span>
            <h4 className="text-lg font-bold text-warmIvory">Explore matching courses</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              View scored recommendations with transparent explanations of why each course matches.
            </p>
          </div>

          <div className="bg-cardBg border border-borderColor rounded-2xl p-6 space-y-3">
            <span className="text-3xl font-black text-softLilac">04</span>
            <h4 className="text-lg font-bold text-warmIvory">Build your career path</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Explore job roles, compare up to 3 courses side-by-side, and save your top picks.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-warmIvory">Platform Features</h2>
          <p className="text-mutedText text-sm">Built to empower confident decision-making</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="space-y-3">
            <Target className="w-8 h-8 text-electricLime" />
            <h4 className="text-lg font-bold text-warmIvory">Interest Assessment</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Multi-step interactive questionnaire identifying your inclination towards technology, biology, design, business, and research.
            </p>
          </Card>

          <Card className="space-y-3">
            <BookOpen className="w-8 h-8 text-softLilac" />
            <h4 className="text-lg font-bold text-warmIvory">Course Discovery</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Comprehensive database of over 20 undergraduate degrees filtered by stream, duration, subject, and industry sector.
            </p>
          </Card>

          <Card className="space-y-3">
            <Sparkles className="w-8 h-8 text-electricLime" />
            <h4 className="text-lg font-bold text-warmIvory">Personalized Recommendations</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Transparent, multi-weighted matching engine calculating alignment percentages without declaring arbitrary "best" choices.
            </p>
          </Card>

          <Card className="space-y-3">
            <Compass className="w-8 h-8 text-softLilac" />
            <h4 className="text-lg font-bold text-warmIvory">Career Path Explorer</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Interactive roadmap visualizations connecting intermediate streams to degree options, skills, and real-world job roles.
            </p>
          </Card>

          <Card className="space-y-3">
            <Scale className="w-8 h-8 text-electricLime" />
            <h4 className="text-lg font-bold text-warmIvory">Course Comparison</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Side-by-side comparison table for evaluating eligibility, duration, main subjects, higher studies, and job roles.
            </p>
          </Card>

          <Card className="space-y-3">
            <Bookmark className="w-8 h-8 text-softLilac" />
            <h4 className="text-lg font-bold text-warmIvory">Shortlist & Save</h4>
            <p className="text-mutedText text-xs leading-relaxed">
              Save your favorite courses and career options into a personal workspace to revisit anytime.
            </p>
          </Card>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-bgSecondary via-cardBg to-bgSecondary border border-borderColor rounded-3xl p-10 md:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-electricLime/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-warmIvory">
            Your career has more than one possible path.
          </h2>
          <p className="text-mutedText text-base max-w-xl mx-auto">
            Take the first step toward discovering degree courses aligned with your genuine interests today.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg">
                <span>Start Exploring Now</span>
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
