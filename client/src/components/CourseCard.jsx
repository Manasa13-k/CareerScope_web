import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bookmark, Scale, ArrowRight, Check, BookOpen } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import MatchScore from './MatchScore';

export default function CourseCard({
  course,
  matchScore,
  explanation,
  isSaved = false,
  isCompared = false,
  onSave,
  onCompare,
}) {
  const courseId = course._id || course.id;

  return (
    <Card className="flex flex-col justify-between h-full bg-surface border-borderAtlas hover:border-teal/50 hover:shadow-atlas transition-all duration-300 group relative">
      <div className="space-y-4">
        
        {/* Stream Badges & Duration Header */}
        <div className="flex items-start justify-between gap-2 border-b border-borderAtlas/60 pb-3">
          <div className="flex flex-wrap gap-1.5 items-center">
            {course.streams && course.streams.map((st) => (
              <Badge key={st} variant={st === 'MPC' ? 'mustard' : st === 'BiPC' ? 'coral' : 'sage'}>
                {st} Stream
              </Badge>
            ))}
            {course.duration && (
              <span className="inline-flex items-center space-x-1 text-xs text-ink-muted pl-1">
                <Clock className="w-3.5 h-3.5 text-teal" />
                <span>{course.duration}</span>
              </span>
            )}
          </div>

          {matchScore !== undefined && (
            <MatchScore score={matchScore} />
          )}
        </div>

        {/* Degree Subtitle & Course Title */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-teal font-bold block">
            {course.degreeType}
          </span>
          <h3 className="font-serif text-xl font-bold text-ink group-hover:text-teal transition-colors leading-snug">
            <Link to={`/courses/${courseId}`}>{course.name}</Link>
          </h3>
        </div>

        {/* Description */}
        <p className="text-ink-light text-xs leading-relaxed line-clamp-3 font-normal">
          {course.description}
        </p>

        {/* Match Explanation if passed */}
        {explanation && (
          <div className="bg-sage-light/70 border border-borderAtlas rounded-lg p-3 text-xs text-teal leading-relaxed font-serif italic">
            "{explanation}"
          </div>
        )}

        {/* Main Subjects / Focus Areas */}
        {course.mainSubjects && course.mainSubjects.length > 0 && (
          <div className="pt-2 border-t border-borderAtlas/40">
            <p className="text-[10px] uppercase tracking-widest text-ink-muted font-bold mb-1.5 flex items-center space-x-1">
              <BookOpen className="w-3 h-3 text-mustard-dark" />
              <span>Core Subject Areas</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {course.mainSubjects.slice(0, 3).map((sub, i) => (
                <span key={i} className="px-2 py-0.5 bg-ivory border border-borderAtlas/80 text-ink text-[11px] rounded font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-borderAtlas flex items-center justify-between gap-3">
        <Link
          to={`/courses/${courseId}`}
          className="inline-flex items-center space-x-1 text-xs font-bold text-teal hover:text-coral transition-colors"
        >
          <span>Explore Course</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center space-x-1.5">
          {onCompare && (
            <button
              onClick={() => onCompare(course)}
              className={`p-1.5 rounded-lg text-xs font-medium border transition ${
                isCompared
                  ? 'bg-teal text-white border-teal'
                  : 'bg-surface border-borderAtlas text-ink-light hover:text-teal hover:border-teal'
              }`}
              title={isCompared ? 'Added to Comparison' : 'Add to Comparison'}
              aria-label="Compare course"
            >
              <Scale className="w-4 h-4" />
            </button>
          )}

          {onSave && (
            <button
              onClick={() => onSave(courseId)}
              className={`p-1.5 rounded-lg text-xs font-medium border transition ${
                isSaved
                  ? 'bg-coral text-white border-coral'
                  : 'bg-surface border-borderAtlas text-ink-light hover:text-coral hover:border-coral'
              }`}
              title={isSaved ? 'Saved in Shortlist' : 'Save to Shortlist'}
              aria-label="Save course"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
