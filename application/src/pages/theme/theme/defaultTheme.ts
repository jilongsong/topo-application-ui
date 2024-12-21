import { Theme } from '@topo/core';

const baseTokens = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  radius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '100%',
  },
};

const lightTokens: Theme = {
  ...baseTokens,
  colors: {
    primary: '#2c82e0',
    secondary: '#666E75',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#FFFFFF',
    backgroundElement: '#ECF0F1',
    backgroundBorder: '#DEE5F2',
    textPrimary: '#262824',
    textInverted: '#FFFFFF',
    focus: '#49A8FF',
    transparent: '#00000000',
    backgroundLanding: '#f4f9fc',
    backgroundLandingBorder: '#9BB3CE',
    backgroundSidebar: '#ECF0F1',
    accent: '#2c82e0',
    muted: '#9BBECE',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.4)',
  },
};

const darkTokens: Theme = {
  ...baseTokens,
  colors: {
    primary: '#2c82e0',
    secondary: '#666E75',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#FFFFFF',
    backgroundElement: '#ECF0F1',
    backgroundBorder: '#DEE5F2',
    textPrimary: '#262824',
    textInverted: '#FFFFFF',
    focus: '#49A8FF',
    transparent: '#00000000',
    backgroundLanding: '#f4f9fc',
    backgroundLandingBorder: '#9BB3CE',
    backgroundSidebar: '#ECF0F1',
    accent: '#2c82e0',
    muted: '#9BBECE',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgb(128, 128, 128)',
    md: '0 4px 6px rgb(128, 128, 128)',
    lg: '0 10px 15px rgb(128, 128, 128)',
    xl: '0 20px 25px rgb(128, 128, 128)',
    '2xl': '0 25px 30px rgb(128, 128, 128)',
  },
};

export const LIGHT_THEME = lightTokens;

export const DARK_THEME = darkTokens;
