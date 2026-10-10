import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border tracking-wide';
  
  const variants = {
    default: 'bg-ivory text-ink border-borderAtlas',
    mustard: 'bg-mustard-light text-ink border-mustard/40 font-semibold',
    lime: 'bg-mustard-light text-ink border-mustard/40 font-semibold', // backward compat
    coral: 'bg-coral-light text-coral-dark border-coral/30 font-semibold',
    teal: 'bg-teal-pale text-teal border-teal/20 font-semibold',
    lilac: 'bg-teal-pale text-teal border-teal/20 font-semibold', // backward compat
    sage: 'bg-sage-light text-ink-light border-borderAtlas',
    muted: 'bg-ivory text-ink-muted border-borderAtlas',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
