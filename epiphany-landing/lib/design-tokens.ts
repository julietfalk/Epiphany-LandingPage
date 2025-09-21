// Central place to paste values from Figma Inspect (colors, typography, spacing, radii, shadows)
// Fill these with exact values from the "Landing Page – Prototype" frame.

export const colors = {
  // Brand - Updated from Figma
  heroBackground: '#0D1C31',
  textWhite: '#FFF',
  // Keep existing for other sections
  deepBlue: '#0f172a',
  darkTeal: '#0f4c75',
  charcoal: '#1e293b',
  brightWhite: '#f8fafc',
  paleBlue: '#e0f2fe',
  accentRed: '#dc2626',
};

export const typography = {
  // Families
  headingFamily: "'The Seasons', serif",
  bodyFamily: "'Poppins', sans-serif",

  // Hero - Updated from Figma
  heroTitle: {
    fontFamily: '"FONTSPRING DEMO - The Seasons"',
    fontSize: '60px',
    lineHeight: '80px', // 133.333%
    fontWeight: '700',
    fontStyle: 'normal',
    color: '#FFF',
  },
  heroTagline: {
    fontSize: '24px',
    lineHeight: '1.4',
    fontWeight: '400',
    letterSpacing: '0.06em',
  },

  // Section title
  sectionTitle: {
    fontSize: '40px',
    lineHeight: '1.2',
    letterSpacing: '0.05em',
    fontWeight: '400',
    textTransform: 'uppercase',
  },

  // Body copy
  bodyLg: { fontSize: '18px', lineHeight: '1.7', fontWeight: '400' },
  bodyMd: { fontSize: '16px', lineHeight: '1.6', fontWeight: '400' },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
};

export const shadows = {
  card: '0 4px 20px rgba(0,0,0,0.08)',
  cardHover: '0 20px 40px rgba(0,0,0,0.15)',
};

// If Figma uses variables, mirror their names here for clarity
export type DesignTokens = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: typeof shadows;
};

export const tokens: DesignTokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
};


