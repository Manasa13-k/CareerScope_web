import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Award, BookOpen } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

export default function CareerCard({ career }) {
  const careerId = career._id || career.id;

  return (
    <Card className="flex flex-col justify-between h-full bg-surface border-borderAtlas hover:border-teal/50 hover:shadow-atlas transition-all duration-300 group">
      <div className="space-y-4">
        
        {/* Sector Badge */}
        <div className="flex items-center justify-between border-b border-borderAtlas/60 pb-3">
          <Badge variant="mustard" className="flex items-center space-x-1">
            <Compass className="w-3 h-3 text-ink" />
            <span>{career.sector} Sector</span>
          </Badge>
          <span className="text-[10px] uppercase font-bold tracking-widest text-ink-muted">
            PATHWAY
          </span>
        </div>

        {/* Career Title */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-teal group-hover:text-coral transition-colors">
            <Link to={`/careers/${careerId}`}>{career.name}</Link>
          </h3>
        </div>

        {/* Description */}
        <p className="text-ink-light text-xs leading-relaxed line-clamp-3">
          {career.description}
        </p>

        {/* Key Required Skills */}
        {career.skills && career.skills.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-borderAtlas/40">
            <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest flex items-center space-x-1">
              <Award className="w-3 h-3 text-coral" />
              <span>Key Requisite Skills</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {career.skills.slice(0, 4).map((sk) => (
                <span key={sk} className="px-2 py-0.5 bg-sage-light text-ink text-[11px] rounded border border-borderAtlas/60 font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Degree Courses */}
        {career.relatedCourses && career.relatedCourses.length > 0 && (
          <div className="text-xs text-ink-light pt-1 flex items-start space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
            <p className="line-clamp-1">
              <span className="font-bold text-teal">Degrees: </span>
              <span>{career.relatedCourses.slice(0, 2).join(', ')}</span>
            </p>
          </div>
        )}

      </div>

      <div className="pt-4 mt-4 border-t border-borderAtlas">
        <Link
          to={`/careers/${careerId}`}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal hover:text-coral transition-colors"
        >
          <span>Explore Educational Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
