import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from '@/theme';
import { App } from '@/App';
import { AuthenticateProvider, LanguageProvider, MovieProvider } from '@/hooks';

/* font */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthenticateProvider>
          <LanguageProvider>
            <MovieProvider>
              <App />
            </MovieProvider>
          </LanguageProvider>
        </AuthenticateProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
