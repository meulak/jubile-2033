import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Pill Component.
 * Larger than a badge, fully rounded borders, often used for categories or complex labels.
 */
const Pill = ({
  label,
  icon = null,
  className = ''
}) => {
  return (
    <div 
      className={`
        inline-flex items-center justify-center px-4 py-2 text-[14px] 
        bg-[#1B1B4D]/5 text-[#1B1B4D] border border-[#1B1B4D]/15 
        rounded-full font-montserrat font-medium transition-colors hover:bg-[#1B1B4D]/10
        ${className}
      `}
    >
      {icon && (
        <span className="mr-2 flex-shrink-0 text-current opacity-70">
          {icon}
        </span>
      )}
      <span className="truncate">{label}</span>
    </div>
  );
};

Pill.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string
};

export default Pill;
