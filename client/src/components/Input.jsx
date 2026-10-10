import React from 'react';

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-ink-light uppercase tracking-wider">
          {label} {required && <span className="text-coral">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3.5 py-2.5 bg-surface border ${
          error ? 'border-coral focus:ring-coral/20' : 'border-borderAtlas focus:border-teal focus:ring-teal/20'
        } rounded-lg text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 transition text-sm shadow-atlas-sm`}
      />
      {error && <p className="text-xs text-coral-dark mt-1 font-medium">{error}</p>}
    </div>
  );
}
