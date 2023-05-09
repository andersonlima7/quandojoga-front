// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  },
  primary: {
    500: '#D72137'
  }
};

const fonts = {
  body: 'Roboto, sans-serif',
  heading: 'Montserrat, sans-serif'
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px'
};

export const theme = extendTheme({ colors, fonts, breakpoints });
