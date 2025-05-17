import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, Avatar, IconButton, Divider } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated = false, logout = null, onMenuClick = null, showMenuIcon = false }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    if (logout) {
      logout();
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    handleClose();
    // In a real app, navigate to a profile page
    // For now, just close the menu
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'white', color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {showMenuIcon && onMenuClick && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HotelIcon sx={{ mr: 2, fontSize: 36 }} />
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Wyndham Garden Astana
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Интерактивный Дашборд Отеля
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginLeft: 'auto' }}>
          {isAuthenticated && logout ? (
            <>
              <Button 
                color="inherit" 
                startIcon={<AccountCircleIcon />}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleMenu}
                sx={{ textTransform: 'none' }}
              >
                {userName || userEmail || 'Пользователь'}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Avatar sx={{ mr: 2, width: 24, height: 24, bgcolor: 'primary.main' }}>
                    {(userName && userName[0]) || (userEmail && userEmail[0]) || 'U'}
                  </Avatar>
                  Мой профиль
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button 
                color="primary" 
                variant="outlined" 
                sx={{ mr: 2 }}
                onClick={handleLoginClick}
              >
                Войти
              </Button>
              <Button 
                color="primary" 
                variant="contained"
                onClick={handleRegisterClick}
              >
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 