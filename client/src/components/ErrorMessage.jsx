import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message = 'An error occurred while loading data.', onRetry }) {
  return (
    <div className="bg-cardBg border border-red-500/30 rounded-xl p-6 text-center max-w-md mx-auto my-8">
      <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-warmIvory mb-2">Something went wrong</h3>
      <p className="text-mutedText text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-bgSecondary hover:bg-borderColor text-warmIvory rounded-lg text-sm font-medium transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
