import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal/30 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  const variants = {
    primary: 'bg-coral text-white hover:bg-coral-dark active:scale-[0.99] shadow-atlas-sm hover:shadow-atlas',
    secondary: 'bg-mustard text-ink hover:bg-mustard-dark active:scale-[0.99] shadow-atlas-sm hover:shadow-atlas',
    teal: 'bg-teal text-white hover:bg-teal-dark active:scale-[0.99] shadow-atlas-sm',
    outline: 'border border-borderAtlas bg-surface text-teal hover:border-teal hover:bg-sage-light active:scale-[0.99]',
    ghost: 'text-ink-light hover:text-teal hover:bg-sage-light',
    danger: 'bg-coral-light border border-coral/30 text-coral-dark hover:bg-coral/20',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
