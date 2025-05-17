import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import MarketingDashboard from './pages/MarketingDashboard';
import LoginPage from './pages/LoginPage';

// Context for language
import { LanguageContext } from './context/LanguageContext';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a7bd5',
    },
    secondary: {
      main: '#00d2ff',
    },
    background: {
      default: '#f5f8fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.4,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          padding: '10px 24px',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
          boxShadow: '0 4px 15px 0 rgba(58, 123, 213, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2d6ec7 0%, #00b8e5 100%)',
            boxShadow: '0 5px 20px 0 rgba(58, 123, 213, 0.4)',
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          '& .MuiTypography-h6': {
            wordBreak: 'break-word',
            hyphens: 'auto',
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 4
  },
  unstable_strictMode: false
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  // Language state (ru or kk)
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ru');
  
  // Function to toggle language
  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'kk' : 'ru';
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  // Single account for hotel marketing staff
  const validCredentials = {
    email: 'marketing@hotel.com',
    password: 'hotelmarketing'
  };

  const login = (email, password) => {
    if (email === validCredentials.email && password === validCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" replace /> : 
                  <LoginPage login={login} />
              } 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" replace /> : 
                  <LoginPage login={login} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                  <MarketingDashboard logout={logout} /> : 
                  <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </Router>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

export default App;
