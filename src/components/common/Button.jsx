import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button component for the "Impronte Africane" project.
 * Supports multiple variants, sizes, states, and optional icons.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'tertiary' | 'danger'} [props.variant='primary'] - Button style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button dimensions
 * @param {boolean} [props.disabled=false] - Disables interaction and dims opacity
 * @param {boolean} [props.loading=false] - Shows spinner and disables interaction
 * @param {Function} [props.onClick=null] - Click handler
 * @param {React.ReactNode} props.children - Button text or content
 * @param {string} [props.className=''] - Optional custom CSS classes
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - HTML button type
 * @param {boolean} [props.fullWidth=false] - Makes width 100%
 * @param {React.ReactNode} [props.icon=null] - Optional SVG or Icon component
 * @param {'left' | 'right'} [props.iconPosition='left'] - Position relative to text
 * @param {string} [props.ariaLabel] - Accessibility label
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick = null,
  children,
  className = '',
  type = 'button',
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  ariaLabel,
  ...rest
}) => {
  // --- BASE STYLES ---
  // Default shared styling + transitions + interactions
  const baseStyles = 'inline-flex items-center justify-center font-montserrat uppercase font-bold tracking-wider rounded transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  // Interactive styles (hover, active translation, scale, opacity)
  const interactiveStyles = (disabled || loading)
    ? 'opacity-50 cursor-not-allowed'
    : 'hover:-translate-y-[2px] md:hover:shadow-lg active:scale-[0.98] active:translate-y-0 active:shadow-sm hover:opacity-90';

  // --- SIZES ---
  const sizeStyles = {
    sm: 'px-4 py-2 text-[12px]',
    md: 'px-5 py-3 text-[14px]',
    lg: 'px-6 py-4 text-[16px]'
  };

  // --- VARIANTS ---
  const variantStyles = {
    primary: 'bg-[#D4AF37] text-[#1B1B4D] focus-visible:ring-[#D4AF37] focus-visible:ring-offset-[#1B1B4D]',
    secondary: 'bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1B1B4D] focus-visible:ring-[#D4AF37] focus-visible:ring-offset-[#1B1B4D]',
    tertiary: 'bg-transparent text-[#D4AF37] hover:text-[#1B1B4D] hover:bg-[#D4AF37] focus-visible:ring-[#D4AF37] focus-visible:ring-offset-[#1B1B4D]',
    danger: 'bg-[#EF4444] text-white focus-visible:ring-[#EF4444]'
  };

  const widthStyle = fullWidth ? 'w-full' : 'w-auto';

  // --- LOADING SPINNER ---
  const renderSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      type={type}
      className={`
        ${baseStyles} 
        ${interactiveStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${widthStyle} 
        ${className}
      `}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {/* Icon Left or Loading Spinner */}
      {loading && renderSpinner()}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex">{icon}</span>
      )}
      
      {/* Text Content */}
      <span>{children}</span>
      
      {/* Icon Right */}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  ariaLabel: PropTypes.string
};

export default Button;

/*
// Usage Examples:
import Button from './Button';

// 1. Primary Default
<Button variant="primary" size="lg">Explorer</Button>

// 2. Secondary with Click
<Button variant="secondary" size="md" onClick={() => console.log('Clicked')}>Annuler</Button>

// 3. Loading state
<Button loading disabled>Chargement...</Button>

// 4. Danger Action
<Button variant="danger" size="sm">Supprimer l'élément</Button>
*/
