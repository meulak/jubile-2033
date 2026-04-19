import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Badge Component.
 * Used for small labels, statuses, and visual indicators.
 */
const Badge = ({
  label,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  // --- BASE STYLES ---
  const baseStyles = 'inline-flex items-center justify-center font-montserrat font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap';

  // --- SIZES ---
  const sizeStyles = {
    sm: 'px-2 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-[12px]',
    lg: 'px-4 py-2 text-[13px]'
  };

  // --- VARIANTS ---
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 border border-gray-200',
    primary: 'bg-[#D4AF37] text-[#1B1B4D] border border-[#D4AF37]',
    success: 'bg-[#22C55E] text-white border border-[#22C55E]',
    warning: 'bg-[#EAB308] text-gray-900 border border-[#EAB308]',
    error: 'bg-[#EF4444] text-white border border-[#EF4444]'
  };

  return (
    <span 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default Badge;
