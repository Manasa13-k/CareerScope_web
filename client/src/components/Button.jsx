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
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  const variants = {
    primary: 'bg-electricLime text-bgMain hover:bg-opacity-90 active:scale-[0.98]',
    secondary: 'bg-softLilac text-bgMain hover:bg-opacity-90 active:scale-[0.98]',
    outline: 'border border-borderColor bg-cardBg text-warmIvory hover:border-softLilac hover:bg-bgSecondary',
    ghost: 'text-warmIvory hover:bg-bgSecondary hover:text-electricLime',
    danger: 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
