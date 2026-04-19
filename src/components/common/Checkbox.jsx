import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Custom Checkbox component.
 */
const Checkbox = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  className = '',
  required = false
}) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Emulate click to trigger standard onChange
      inputRef.current.click();
    }
  };

  return (
    <label 
      className={`
        inline-flex items-center cursor-pointer group mb-4 outline-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}
      `}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={!disabled ? handleKeyDown : undefined}
    >
      <div className="relative flex items-center justify-center">
        {/* Hidden Native Input for standard forms parsing */}
        <input 
          ref={inputRef}
          type="checkbox" 
          name={name}
          className="peer sr-only" 
          checked={checked} 
          onChange={onChange} 
          disabled={disabled}
          required={required}
          tabIndex={-1} 
        />
        
        {/* Custom Visual Box */}
        <div 
          className={`
            w-5 h-5 flex items-center justify-center rounded-[4px] border-2 transition-all duration-300 ease-in-out
            group-focus:ring-2 group-focus:ring-[#D4AF37]/50 group-focus:ring-offset-1
            ${checked ? 'bg-[#D4AF37] border-[#D4AF37]' : 'bg-white border-[#D4AF37]/40 group-hover:border-[#D4AF37]'}
          `}
        >
          {/* SVG Check Mark */}
          <svg 
            className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      {/* Label Text */}
      {label && (
        <span className="ml-3 font-serif text-[14px] text-[#1B1B4D] select-none">
          {label} {required && <span className="text-[#EF4444]">*</span>}
        </span>
      )}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool
};

export default Checkbox;
