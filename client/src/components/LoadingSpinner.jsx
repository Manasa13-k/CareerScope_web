import React from 'react';
import { Compass } from 'lucide-react';

export default function LoadingSpinner({ text = 'Mapping course pathways...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-borderAtlas border-t-teal animate-spin" />
        <Compass className="w-5 h-5 text-coral absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="font-serif text-teal text-base font-semibold animate-pulse">{text}</p>
      <p className="text-xs text-ink-muted uppercase tracking-widest font-mono">CAREERSCOPE</p>
    </div>
  );
}
