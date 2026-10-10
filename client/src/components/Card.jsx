import React from 'react';

export default function Card({ children, className = '', hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-cardBg border border-borderColor rounded-2xl p-6 transition duration-300 ${
        hover ? 'hover:border-softLilac/50 hover:shadow-xl hover:shadow-softLilac/5' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
