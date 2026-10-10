import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-xs font-bold text-ink-light tracking-wide uppercase">
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-coral inline-block" />
          <span>Section {currentStep} of {totalSteps}</span>
        </span>
        <span className="text-teal font-serif text-sm lowercase">{percentage}% completed</span>
      </div>
      <div className="w-full bg-sage-light border border-borderAtlas rounded-full h-2.5 overflow-hidden p-0.5">
        <div
          className="bg-teal h-full transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
