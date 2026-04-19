import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container component to constrain content width and center it.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be wrapped
 * @param {string} [props.className] - Additional CSS classes
 * @param {'sm'|'md'|'lg'|'xl'} [props.padding='md'] - Horizontal padding size
 */
const Container = ({ children, className = '', padding = 'md' }) => {
  const paddingClasses = {
    sm: 'px-4', // 16px
    md: 'px-6', // 24px
    lg: 'px-8', // 32px
    xl: 'px-12', // 48px
  };

  const selectedPadding = paddingClasses[padding] || paddingClasses.md;

  return (
    <div className={`w-full max-w-[1200px] mx-auto ${selectedPadding} ${className}`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

export default Container;

/*
// Example Usage:
import Container from './Container';

const App = () => (
  <Container padding="lg">
    <h1>Contenu</h1>
  </Container>
);
*/
