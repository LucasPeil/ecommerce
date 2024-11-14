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
    divider: '#24A849',
    background: {
      default: '#f2f2f2',
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
);
