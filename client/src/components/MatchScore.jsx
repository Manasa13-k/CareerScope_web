import React from 'react';

export default function MatchScore({ score = 0, label = 'Match Alignment' }) {
  let colorStyles = 'bg-teal-pale text-teal border-teal/30';
  if (score >= 80) {
    colorStyles = 'bg-mustard-light text-ink border-mustard/40';
  } else if (score < 60) {
    colorStyles = 'bg-sage-light text-ink-light border-borderAtlas';
  }

  return (
    <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border ${colorStyles} text-xs font-semibold shadow-atlas-sm`}>
      <span className="font-bold text-sm tracking-tight">{score}%</span>
      {label && (
        <span className="opacity-90 font-medium uppercase text-[10px] tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}
