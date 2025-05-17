import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Alert,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Avatar,
  Grid
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterPage = ({ register }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form validation
    if (!name.trim()) {
      setError('Пожалуйста, введите имя');
      return;
    }
    if (!email.trim()) {
      setError('Пожалуйста, введите email');
      return;
    }
    if (!validateEmail(email)) {
      setError('Пожалуйста, введите корректный email');
      return;
    }
    if (!password) {
      setError('Пожалуйста, введите пароль');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (!acceptTerms) {
      setError('Пожалуйста, примите условия использования');
      return;
    }

    // Attempt to register
    const success = register(email, password, name);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Ошибка регистрации. Возможно, этот email уже используется.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(120deg, rgba(224,247,250,0.8) 0%, rgba(245,245,245,0.8) 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
            <HotelIcon sx={{ mr: 1, fontSize: 30, color: 'primary.main' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Wyndham Garden Astana
            </Typography>
          </RouterLink>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
              Регистрация
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Создайте аккаунт для доступа к дашборду
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Имя и фамилия"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Подтверждение пароля"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            <FormControlLabel
              control={
                <Checkbox 
                  value="acceptTerms" 
                  color="primary" 
                  checked={acceptTerms} 
                  onChange={(e) => setAcceptTerms(e.target.checked)} 
                />
              }
              label={
                <Typography variant="body2">
                  Я согласен с {' '}
                  <Link href="#" sx={{ color: 'primary.main' }}>
                    Условиями использования
                  </Link>{' '}
                  и{' '}
                  <Link href="#" sx={{ color: 'primary.main' }}>
                    Политикой конфиденциальности
                  </Link>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              size="large"
            >
              Создать аккаунт
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ color: 'primary.main' }}>
                {"Уже есть аккаунт? Войдите"}
              </Link>
            </Box>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Wyndham Garden Astana Dashboard
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage; 