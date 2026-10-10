import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Award } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

export default function CareerCard({ career }) {
  const careerId = career._id || career.id;

  return (
    <Card className="flex flex-col justify-between h-full group hover:border-softLilac transition-all duration-300">
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <Badge variant="lilac" className="flex items-center space-x-1">
            <Briefcase className="w-3 h-3" />
            <span>{career.sector}</span>
          </Badge>
        </div>

        <div>
          <h3 className="text-lg font-bold text-warmIvory group-hover:text-electricLime transition">
            <Link to={`/careers/${careerId}`}>{career.name}</Link>
          </h3>
        </div>

        <p className="text-mutedText text-xs leading-relaxed line-clamp-3">
          {career.description}
        </p>

        {/* Required Skills */}
        {career.skills && career.skills.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-borderColor/50">
            <p className="text-[11px] font-semibold text-mutedText uppercase tracking-wider flex items-center space-x-1">
              <Award className="w-3 h-3 text-electricLime" />
              <span>Key Skills</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {career.skills.slice(0, 4).map((sk) => (
                <span key={sk} className="px-2 py-0.5 bg-bgSecondary border border-borderColor text-warmIvory/90 text-[11px] rounded-md font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Courses */}
        {career.relatedCourses && career.relatedCourses.length > 0 && (
          <div className="text-xs text-mutedText pt-1">
            <span className="font-semibold text-warmIvory">Related Courses: </span>
            <span>{career.relatedCourses.slice(0, 2).join(', ')}</span>
          </div>
        )}

      </div>

      <div className="pt-4 mt-4 border-t border-borderColor">
        <Link
          to={`/careers/${careerId}`}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-electricLime hover:underline"
        >
          <span>Explore Career Pathway</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
