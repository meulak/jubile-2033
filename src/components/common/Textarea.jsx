import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Textarea component with floating label and custom styling.
 */
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  maxLength,
  showCounter = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value !== undefined && value !== null && value !== '';

  const handleFocus = (e) => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`relative w-full mb-6 ${className}`}>
      <div 
        className={`
          relative border rounded-[4px] bg-white transition-all duration-300 ease-in-out
          ${error ? 'border-[#EF4444]' : (isFocused ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-[0_0_8px_rgba(212,175,55,0.3)]' : 'border-[#D4AF37]/30')}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}
        `}
      >
        {/* Floating Label */}
        {label && (
          <label 
            htmlFor={name}
            className={`
              absolute left-4 transition-all duration-300 pointer-events-none font-serif
              ${(isFocused || isFilled) 
                ? '-translate-y-4 text-[12px] text-[#D4AF37] bg-white px-1 font-bold z-10' 
                : 'translate-y-3 text-[14px] text-gray-400 z-0'}
              ${error ? 'text-[#EF4444]' : ''}
            `}
          >
            {label} {required && '*'}
          </label>
        )}
        
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          rows={rows}
          placeholder={(isFocused || !label) ? placeholder : ''}
          className={`
            relative z-0 w-full bg-transparent px-4 py-3 outline-none font-serif text-[14px] text-[#1B1B4D] resize-y max-h-[300px] min-h-[100px]
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...rest}
        />
      </div>

      <div className="flex justify-between items-start mt-1">
        {/* Error Message */}
        <div className="flex-1">
          {error && (
            <div id={`${name}-error`} className="flex items-center text-[#EF4444] text-[12px] font-montserrat">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {typeof error === 'string' ? error : 'Ce champ est invalide'}
            </div>
          )}
        </div>

        {/* Character Counter */}
        {showCounter && maxLength && (
          <div className="text-[12px] text-gray-400 font-montserrat ml-4">
            {value.length} / {maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  showCounter: PropTypes.bool,
};

export default Textarea;
