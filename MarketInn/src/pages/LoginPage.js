import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment,
  IconButton,
  Avatar,
  Fade,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TranslateIcon from '@mui/icons-material/Translate';

// Import language context and translations
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState('marketing@hotel.com');
  const [password, setPassword] = useState('hotelmarketing');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Get language context
  const { language, toggleLanguage } = useContext(LanguageContext);
  const t = translations[language];

  useEffect(() => {
    // Animation delay for page elements
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Form validation
    if (!email) {
      setError(t.invalidCredentials);
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError(t.invalidCredentials);
      setIsLoading(false);
      return;
    }

    // Simulate network delay for login
    setTimeout(() => {
      // Attempt to login
      const success = login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError(t.invalidCredentials);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, rgba(58, 123, 213, 0.07) 0%, rgba(0, 210, 255, 0.07) 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        py: 4
      }}
    >
      {/* Language toggle in the corner */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px', p: 0.5, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <TranslateIcon sx={{ mr: 1, ml: 1, color: 'text.secondary', fontSize: 18 }} />
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={toggleLanguage}
            size="small"
            sx={{ 
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '15px',
                px: 1.5,
                py: 0.5,
                minWidth: '35px',
                fontSize: '14px',
                fontWeight: 600,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }
              }
            }}
          >
            <ToggleButton value="ru">РУС</ToggleButton>
            <ToggleButton value="kk">ҚАЗ</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Animated background elements */}
      <Box sx={{ 
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(58, 123, 213, 0.1) 0%, rgba(0, 210, 255, 0.2) 100%)',
        top: '-20vw',
        left: '-20vw',
        animation: 'float 20s infinite ease-in-out'
      }} />
      
      <Box sx={{ 
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(58, 123, 213, 0.15) 100%)',
        bottom: '-15vw',
        right: '-15vw',
        animation: 'float 15s infinite ease-in-out reverse'
      }} />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={fadeIn} timeout={1000}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4,
              borderRadius: theme.shape.borderRadius * 2,
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.95)',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Avatar 
                sx={{ 
                  m: 1, 
                  width: 70, 
                  height: 70,
                  background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                  boxShadow: '0 5px 15px rgba(58, 123, 213, 0.3)'
                }}
              >
                <AnalyticsIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  mt: 2,
                  background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center'
                }}
              >
                Hotel Marketing Analytics
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                {t.loginSubtitle}
              </Typography>
            </Box>

            {error && (
              <Box 
                sx={{ 
                  mb: 3, 
                  p: 2, 
                  bgcolor: 'rgba(211, 47, 47, 0.1)', 
                  borderRadius: theme.shape.borderRadius,
                  color: 'error.main'
                }}
              >
                {error}
              </Box>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t.email}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: theme.shape.borderRadius }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t.password}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: theme.shape.borderRadius }
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 4, 
                  mb: 2, 
                  py: 1.5, 
                  position: 'relative', 
                  overflow: 'hidden',
                  fontSize: '16px'
                }}
                size="large"
                disabled={isLoading}
              >
                {isLoading ? t.loginLoading : t.loginButton}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    opacity: 0.1, 
                    background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)`,
                    animation: 'shimmer 2s infinite',
                    display: isLoading ? 'block' : 'none'
                  }} 
                />
              </Button>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HotelIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    Wyndham Garden Astana
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
        
        <Box sx={{ mt: 4, textAlign: 'center', opacity: 0.7 }}>
          <Typography variant="body2" color="text.secondary">
            {t.copyright.replace('{year}', new Date().getFullYear())}
          </Typography>
        </Box>
      </Container>
      
      {/* Add CSS animations */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5%, 5%);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>
    </Box>
  );
};

export default LoginPage; 