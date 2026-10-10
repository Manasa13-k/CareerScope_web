import React from 'react';

export default function Card({ children, className = '', hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-borderAtlas rounded-xl p-6 transition-all duration-200 shadow-atlas-sm ${
        hover ? 'hover:border-teal/40 hover:shadow-atlas hover:-translate-y-0.5' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
