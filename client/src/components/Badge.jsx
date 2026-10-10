import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  let baseStyles = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border';
  
  const variants = {
    default: 'bg-bgSecondary text-warmIvory border-borderColor',
    lime: 'bg-electricLime/10 text-electricLime border-electricLime/30',
    lilac: 'bg-softLilac/10 text-softLilac border-softLilac/30',
    muted: 'bg-bgSecondary text-mutedText border-borderColor',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
