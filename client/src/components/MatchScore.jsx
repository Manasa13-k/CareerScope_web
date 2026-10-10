import React from 'react';

export default function MatchScore({ score = 0, label = 'Match' }) {
  let color = 'text-electricLime border-electricLime/30 bg-electricLime/10';
  if (score < 60) {
    color = 'text-softLilac border-softLilac/30 bg-softLilac/10';
  }

  return (
    <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border ${color} font-bold text-xs`}>
      <span>{score}%</span>
      {label && <span className="opacity-80 font-normal uppercase text-[10px] tracking-wider">{label}</span>}
    </div>
  );
}
