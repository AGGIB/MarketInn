import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';

const MetricCard = ({ title, value, unit, color, icon }) => {
  const getIcon = () => {
    switch(icon) {
      case 'occupancy':
        return <HotelIcon sx={{ fontSize: 40, color }} />;
      case 'price':
        return <AttachMoneyIcon sx={{ fontSize: 40, color }} />;
      case 'revenue':
        return <AccountBalanceWalletIcon sx={{ fontSize: 40, color }} />;
      case 'guests':
        return <PersonIcon sx={{ fontSize: 40, color }} />;
      default:
        return <HotelIcon sx={{ fontSize: 40, color }} />;
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {getIcon()}
        <Typography 
          variant="h6" 
          sx={{ ml: 1, fontWeight: 500, color: 'text.secondary' }}
        >
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ mt: 'auto' }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: 700, color }}>
          {value !== undefined ? value.toLocaleString() : '-'}{unit}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MetricCard; 