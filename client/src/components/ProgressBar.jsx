import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-xs font-semibold text-mutedText">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-electricLime">{percentage}% Completed</span>
      </div>
      <div className="w-full bg-bgSecondary border border-borderColor rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-electricLime h-full transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
