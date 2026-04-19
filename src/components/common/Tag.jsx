import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Tag Component.
 * Similar to a badge, but interactive with a removable "X" button.
 */
const Tag = ({
  label,
  onRemove,
  className = ''
}) => {
  return (
    <div 
      className={`
        inline-flex items-center justify-center px-3 py-1.5 text-[12px] 
        bg-[#F5F3ED] text-[#1B1B4D] border border-[#D4AF37]/30 
        rounded font-montserrat font-medium transition-all group
        ${className}
      `}
    >
      <span className="truncate max-w-[150px]">{label}</span>
      
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="ml-2 flex items-center justify-center w-4 h-4 rounded-full text-gray-500 hover:text-[#EF4444] hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  className: PropTypes.string
};

export default Tag;
