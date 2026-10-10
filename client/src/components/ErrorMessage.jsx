import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message = 'An error occurred while loading data.', onRetry }) {
  return (
    <div className="bg-coral-light/60 border border-coral/30 rounded-xl p-8 text-center max-w-md mx-auto my-8 shadow-atlas-sm">
      <AlertCircle className="w-10 h-10 text-coral mx-auto mb-3" />
      <h3 className="font-serif text-xl font-bold text-teal mb-2">Notice on Data Retrieval</h3>
      <p className="text-ink-light text-sm mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-sage-light text-teal border border-borderAtlas rounded-lg text-sm font-semibold transition shadow-atlas-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload Section</span>
        </button>
      )}
    </div>
  );
}
