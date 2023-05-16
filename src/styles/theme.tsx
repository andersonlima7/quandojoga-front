// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

import { mode, GlobalStyleProps, Styles } from '@chakra-ui/theme-tools';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  },
  primary: {
    500: '#D72137'
  },
  gray: {
    850: '#292929',
    950: '#121212'
  }
};

const fonts = {
  heading: 'Roboto, sans-serif',
  body: 'Montserrat, sans-serif'
};

const fontSizes = {
  smm: '12px',
  sm: '14px',
  md: '16px',
  mdd: '18px',
  lg: '24px',
  xl: '32px'
};

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'gray.950')(props)
    }
  })
};

const components = {
  Card: {
    baseStyle: (props: GlobalStyleProps) => ({
      body: {
        bg: mode('white', 'gray.850')(props),
        borderRadius: '8px'
      }
    })
  },
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props: GlobalStyleProps) => ({
      dialog: {
        bg: mode('white', 'gray.950')(props)
      }
    })
  }
};
export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  components,
  styles
});
