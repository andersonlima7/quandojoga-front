import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from './Routes.tsx';
import { theme } from './styles/theme.tsx';
import Header from './components/Header/Header.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Header />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
