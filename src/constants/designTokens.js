/**
 * Design Tokens for Jubilé 2033
 * Includes all styling constants (Colors, Typography, Spacing, Shadows, Animations, etc.)
 */

// 1. COLORS (palette Ndop + sémantique)
export const COLORS = {
  primary: {
    blue: '#1B1B4D',      // Bleu Indigo principal
    gold: '#D4AF37',      // Or Africain
    cream: '#F5F3ED',     // Crème/Écru
    terracotta: '#B85D3E', // Ocre
    sage: '#6B8069'       // Vert Sauge
  },
  text: {
    dark: '#2C2C1A',      // Texte principal
    muted: '#5C5C4C',     // Texte secondaire
    light: '#9B9B8B'      // Texte light
  },
  semantic: {
    success: '#22C55E',
    warning: '#EAB308',
    error: '#EF4444',
    info: '#3B82F6'
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB'
  }
};

// 2. TYPOGRAPHY
export const TYPOGRAPHY = {
  fontFamily: {
    serif: "'Playfair Display', serif",        // Titres
    body: "'Source Serif Pro', serif",         // Corps
    sans: "'Montserrat', sans-serif"           // Navigation
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '36px',
    '4xl': '48px'
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
    loose: 2
  }
};

// 3. SPACING (grille 8px)
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px'
};

// 4. SHADOWS
export const SHADOWS = {
  none: 'none',
  sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.12)',
  xl: '0 12px 32px rgba(0, 0, 0, 0.15)'
};

// 5. BORDER_RADIUS
export const BORDER_RADIUS = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px'
};

// 6. ANIMATIONS
export const ANIMATIONS = {
  duration: {
    instant: '100ms',
    fast: '200ms',
    base: '300ms',
    slow: '500ms',
    slower: '800ms'
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
  }
};

// 7. BREAKPOINTS (responsive)
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

// 8. Z_INDEX (layering)
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 500,
  fixed: 600,
  modal: 700,
  tooltip: 800,
  notification: 900
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
  ANIMATIONS,
  BREAKPOINTS,
  Z_INDEX
};
