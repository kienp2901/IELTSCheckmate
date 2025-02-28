import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import './main.scss';
import { AlertProvider } from './contexts/AlertContext';
import { SnackbarProvider } from "notistack";
import  ConfirmDialog  from './components/ConfirmDialog';
import { CustomBreadcrumbProvider } from './contexts/CustomBreadcrumb';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SnackbarProvider maxSnack={10} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000}>
        <AlertProvider>
        
          <App />
        
        

        </AlertProvider>
        </SnackbarProvider>
        
      </UserProvider>
    </ThemeProvider>
  // </React.StrictMode>,
);
