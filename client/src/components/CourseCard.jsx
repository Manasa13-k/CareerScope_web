import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Bookmark, Scale, ArrowRight, Check } from 'lucide-react';
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
    <Card className="flex flex-col justify-between h-full group hover:border-softLilac transition-all duration-300">
      <div className="space-y-4">
        
        {/* Header Badges & Match */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {course.streams && course.streams.map((st) => (
              <Badge key={st} variant="lime">
                {st}
              </Badge>
            ))}
            {course.duration && (
              <Badge variant="muted" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{course.duration}</span>
              </Badge>
            )}
          </div>

          {matchScore !== undefined && (
            <MatchScore score={matchScore} />
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-warmIvory group-hover:text-electricLime transition">
            <Link to={`/courses/${courseId}`}>{course.name}</Link>
          </h3>
          <p className="text-xs text-softLilac font-medium mt-0.5">{course.degreeType}</p>
        </div>

        {/* Description */}
        <p className="text-mutedText text-xs leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {/* Match Explanation if passed */}
        {explanation && (
          <div className="bg-bgSecondary/80 border border-borderColor rounded-xl p-3 text-xs text-warmIvory/90 leading-relaxed italic">
            "{explanation}"
          </div>
        )}

        {/* Relevant Interests / Sectors */}
        <div className="space-y-2 pt-2 border-t border-borderColor/50">
          <div className="flex flex-wrap gap-1">
            {course.sectors && course.sectors.map((sec) => (
              <span key={sec} className="px-2 py-0.5 bg-bgSecondary text-mutedText text-[11px] rounded-md font-medium">
                {sec}
              </span>
            ))}
            {course.interests && course.interests.slice(0, 3).map((interest) => (
              <span key={interest} className="px-2 py-0.5 bg-cardBg border border-borderColor text-softLilac text-[11px] rounded-md font-medium">
                {interest}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="pt-5 mt-4 border-t border-borderColor flex items-center justify-between gap-2">
        <Link
          to={`/courses/${courseId}`}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-electricLime hover:underline"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center space-x-1">
          {onCompare && (
            <button
              onClick={() => onCompare(course)}
              className={`p-2 rounded-xl text-xs font-semibold border transition ${
                isCompared
                  ? 'bg-softLilac/20 border-softLilac text-softLilac'
                  : 'bg-bgSecondary border-borderColor text-mutedText hover:text-warmIvory hover:border-softLilac'
              }`}
              title={isCompared ? 'Added to Compare' : 'Add to Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>
          )}

          {onSave && (
            <button
              onClick={() => onSave(courseId)}
              className={`p-2 rounded-xl text-xs font-semibold border transition ${
                isSaved
                  ? 'bg-electricLime/20 border-electricLime text-electricLime'
                  : 'bg-bgSecondary border-borderColor text-mutedText hover:text-warmIvory hover:border-electricLime'
              }`}
              title={isSaved ? 'Saved in Shortlist' : 'Save to Shortlist'}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
