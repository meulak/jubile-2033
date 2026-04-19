import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

/**
 * Reusable Accessible Modal Component.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  buttons,
  size = 'md',
  closeButton = true,
  backdropClose = true,
}) => {
  const modalRef = useRef(null);

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus management: Traps focus to the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    // If user clicks exactly on the backdrop (not inside modal content)
    if (backdropClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Maps size prop to max-width
  const sizeClasses = {
    sm: 'max-w-[400px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[800px]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 sm:p-6">
          
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal Box */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
              relative flex flex-col w-full bg-white rounded-xl shadow-2xl focus:outline-none
              ${sizeClasses[size]}
            `}
          >
            {/* Header */}
            {(title || closeButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                {title ? (
                  <h3 id="modal-title" className="font-playfair text-2xl font-bold text-[#1B1B4D]">
                    {title}
                  </h3>
                ) : <div />}
                
                {closeButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer la modal"
                    className="ml-4 text-gray-400 hover:text-[#D4AF37] hover:bg-[#F5F3ED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-full p-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Body (Scrollable if height exceeds screen) */}
            <div className="px-6 py-6 overflow-y-auto max-h-[70vh] font-montserrat text-[#5C5C4C]">
              {children}
            </div>

            {/* Footer */}
            {(footer || buttons) && (
              <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0 rounded-b-xl space-x-3">
                {footer}
                {!footer && buttons && buttons.map((btn, idx) => (
                  <Button
                    key={idx}
                    variant={btn.variant || 'primary'}
                    onClick={btn.onClick}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string
  })),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  closeButton: PropTypes.bool,
  backdropClose: PropTypes.bool,
};

export default Modal;
