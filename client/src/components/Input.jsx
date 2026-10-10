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
        <label className="block text-xs font-semibold text-mutedText uppercase tracking-wider">
          {label} {required && <span className="text-electricLime">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 bg-cardBg border ${
          error ? 'border-red-500' : 'border-borderColor'
        } rounded-xl text-warmIvory placeholder-mutedText/50 focus:outline-none focus:border-softLilac transition text-sm`}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
