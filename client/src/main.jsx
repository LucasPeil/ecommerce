import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth0ProviderComponent from './components/AuthProvider.jsx';
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1650,
      xxl: 2560,
    },
  },
  palette: {
    type: 'light',
    primary: {
      /*   main: "#012B41", */
      main: '#1b4168',
    },
    secondary: {
      main: '#24A849',
    },
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#f44336',
    },
    divider: '#000000',
    background: {
      default: '#f2f2f2',
    },
    darkColor: {
      main: '#000000',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#FFFFFF',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Auth0ProviderComponent>
              <App />
            </Auth0ProviderComponent>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
);
