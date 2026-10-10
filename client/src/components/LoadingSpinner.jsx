import React from 'react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="w-12 h-12 border-4 border-borderColor border-t-electricLime rounded-full animate-spin"></div>
      <p className="text-mutedText text-sm font-medium animate-pulse">{text}</p>
    </div>
  );
}
