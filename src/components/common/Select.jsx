import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Custom Styled Select Dropdown.
 */
const Select = ({
  options = [],
  value,
  onChange,
  label,
  name,
  error,
  disabled = false,
  required = false,
  className = '',
  placeholder = 'Sélectionnez une option'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative w-full mb-6 ${className}`} ref={containerRef}>
      <div 
        className={`
          relative border rounded-[4px] bg-white transition-all duration-300 ease-in-out cursor-pointer
          ${error ? 'border-[#EF4444]' : (isOpen ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-[0_0_8px_rgba(212,175,55,0.3)]' : 'border-[#D4AF37]/30 hover:border-[#D4AF37]')}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}
        `}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Floating Label */}
        {label && (
          <label 
            className={`
              absolute left-4 transition-all duration-300 pointer-events-none font-serif
              ${(isOpen || selectedOption) 
                ? '-translate-y-4 text-[12px] text-[#D4AF37] bg-white px-1 font-bold z-10' 
                : 'translate-y-3 text-[14px] text-gray-400 z-0'}
              ${error ? 'text-[#EF4444]' : ''}
            `}
          >
            {label} {required && '*'}
          </label>
        )}

        <div className="flex items-center justify-between px-4 py-3">
          <span className={`font-serif text-[14px] truncate ${selectedOption ? 'text-[#1B1B4D]' : 'text-gray-400'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {/* Custom Arrow */}
          <svg 
            className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown Options List */}
      {isOpen && (
        <ul
          className="absolute z-50 w-full mt-1 bg-white border border-[#D4AF37]/30 rounded-[4px] shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`
                px-4 py-2 text-[14px] font-serif cursor-pointer transition-colors
                ${value === option.value ? 'bg-[#D4AF37]/10 font-bold text-[#1B1B4D]' : 'text-gray-700 hover:bg-[#F5F3ED]'}
              `}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center text-[#EF4444] text-[12px] mt-1 font-montserrat">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {typeof error === 'string' ? error : 'Ce champ est invalide'}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default Select;
