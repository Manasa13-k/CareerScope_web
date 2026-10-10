import React from 'react';

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3.5 py-2.5 bg-surface border ${
          error ? 'border-coral focus:ring-coral/20' : 'border-borderAtlas focus:border-teal focus:ring-teal/20'
        } rounded-lg text-ink focus:outline-none focus:ring-2 transition text-sm cursor-pointer shadow-atlas-sm`}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val} className="bg-surface text-ink">
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="text-xs text-coral-dark mt-1 font-medium">{error}</p>}
    </div>
  );
}
