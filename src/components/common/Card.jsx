import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Reusable Card component for articles, events, and resources.
 *
 * @param {Object} props
 * @param {string} [props.image] - URL of the card's top image
 * @param {string} [props.imageAlt] - Alt text for accessibility
 * @param {string} props.title - Main title (required)
 * @param {string} [props.description] - Short description (clamped to max 150 chars in display)
 * @param {string} [props.category] - Badge text
 * @param {string|Function} [props.link] - URL string (for react-router) or onClick function
 * @param {string} [props.linkText="Lire plus"] - Text for the bottom link/button
 * @param {React.ReactNode} [props.footer] - Custom footer (replaces link logic)
 * @param {Function} [props.onClick] - Click handler for the whole card
 * @param {string} [props.className] - Extra CSS classes
 * @param {boolean} [props.hoverable=true] - Whether the card has hover effects
 * @param {number} [props.imageHeight=200] - Height of the image container in pixels
 */
const Card = ({
  image,
  imageAlt = 'Card image',
  title,
  description,
  category,
  link,
  linkText = 'Lire plus',
  footer,
  onClick,
  className = '',
  hoverable = true,
  imageHeight = 200,
  ...rest
}) => {
  // Description clamping helper (strict 150 chars fallback to CSS line-clamp)
  const truncateDesc = (text) => {
    if (!text) return '';
    return text.length > 150 ? text.substring(0, 147) + '...' : text;
  };

  // Hover and base styling
  const hoverStyles = hoverable
    ? 'hover:-translate-y-[8px] hover:border-[#D4AF37] hover:shadow-[0_12px_24px_rgba(212,175,55,0.15)] group cursor-pointer'
    : '';

  const baseStyles = 'bg-white rounded-lg border border-[#D4AF37]/20 shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col transition-all duration-300 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-[#D4AF37] focus-within:ring-offset-2';

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  // Dynamic content renderer for Footer/Link
  const renderFooter = () => {
    if (footer) return footer;

    if (link) {
      if (typeof link === 'string') {
        return (
          <Link
            to={link}
            className="mt-auto inline-flex items-center text-sm font-bold font-montserrat text-[#1B1B4D] group-hover:text-[#D4AF37] transition-colors focus:outline-none focus:underline"
          >
            {linkText}
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        );
      }
      if (typeof link === 'function') {
        return (
          <button
            onClick={link}
            className="mt-auto inline-flex items-center text-sm font-bold font-montserrat text-[#1B1B4D] group-hover:text-[#D4AF37] transition-colors focus:outline-none focus:underline"
          >
            {linkText}
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        );
      }
    }
    return null;
  };

  const interactiveProps = onClick ? { onClick, role: 'button', tabIndex: 0 } : {};

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`w-full lg:min-w-[280px] h-full ${baseStyles} ${hoverStyles} ${className}`}
      {...interactiveProps}
      {...rest}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {/* Top Image Section */}
      {image && (
        <div 
          className="w-full relative overflow-hidden bg-[#F5F3ED]"
          style={{ height: `${imageHeight}px` }}
        >
          {category && (
            <span className="absolute top-4 right-4 z-10 bg-[#D4AF37] text-[#1B1B4D] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-sm">
              {category}
            </span>
          )}
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category displayed above title if no image exists */}
        {!image && category && (
          <span className="inline-block bg-[#D4AF37] text-[#1B1B4D] px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm mb-3 w-max">
            {category}
          </span>
        )}
        
        <h4 className="font-playfair text-[#1B1B4D] text-[20px] leading-tight font-bold mb-3 group-hover:text-[#B85D3E] transition-colors line-clamp-2">
          {title}
        </h4>
        
        {description && (
          <p className="font-montserrat text-sm text-[#5C5C4C] mb-6 leading-relaxed flex-grow">
            {truncateDesc(description)}
          </p>
        )}

        {/* Dynamic Link / Button / Custom Footer */}
        {(link || footer) && (
          <div className="mt-auto pt-4 border-t border-[#D4AF37]/10 flex items-center flex-wrap">
            {renderFooter()}
          </div>
        )}
      </div>
    </motion.article>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  linkText: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  imageHeight: PropTypes.number
};

export default Card;

/*
// Example Usage
import Card from './Card';

<Card 
  title="Les Racines"
  description="Abraham en Afrique : Des Patriarches aux premières églises du Nil."
  image="/images/racines.jpg"
  imageAlt="Illustration des racines"
  category="Bible"
  link="/bible/racines"
  linkText="Découvrir"
/>
*/
