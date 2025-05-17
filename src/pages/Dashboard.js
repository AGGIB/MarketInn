import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Tooltip, useTheme, useMediaQuery, Toolbar } from '@mui/material';
import { format } from 'date-fns';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// Components
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import OccupancyChart from '../components/OccupancyChart';
import BookingSourceChart from '../components/BookingSourceChart';
import GuestGeographyChart from '../components/GuestGeographyChart';
import FilterPanel from '../components/FilterPanel';
import DataTable from '../components/DataTable.js';

// Mock data
import { getMetricsData, getOccupancyData, getBookingSourceData, getGuestGeographyData, getBookingsData } from '../data/mockData';

// Constants
const DRAWER_WIDTH = 240;

const Dashboard = ({ logout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const [dateRange, setDateRange] = useState('month');
  const [roomType, setRoomType] = useState('all');
  const [bookingSource, setBookingSource] = useState('all');
  const [metricsData, setMetricsData] = useState({});
  const [occupancyData, setOccupancyData] = useState([]);
  const [bookingSourceData, setBookingSourceData] = useState([]);
  const [guestGeographyData, setGuestGeographyData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  
  // Simulate data loading
  useEffect(() => {
    // Simulate API call with 500ms delay
    console.log('Loading data with filters:', { dateRange, roomType, bookingSource });
    const loadData = setTimeout(() => {
      const metrics = getMetricsData(dateRange, roomType, bookingSource);
      const occupancy = getOccupancyData(dateRange, roomType, bookingSource);
      const bookingSrc = getBookingSourceData(dateRange, roomType);
      const geoData = getGuestGeographyData(dateRange, roomType, bookingSource);
      const bookings = getBookingsData(dateRange, roomType, bookingSource);
      
      console.log('Metrics loaded:', metrics);
      console.log('Occupancy data:', occupancy);
      
      setMetricsData(metrics);
      setOccupancyData(occupancy);
      setBookingSourceData(bookingSrc);
      setGuestGeographyData(geoData);
      setBookingsData(bookings);
    }, 500);
    
    return () => clearTimeout(loadData);
  }, [dateRange, roomType, bookingSource]);
  
  const handleFilterChange = (filter, value) => {
    switch(filter) {
      case 'dateRange':
        setDateRange(value);
        break;
      case 'roomType':
        setRoomType(value);
        break;
      case 'bookingSource':
        setBookingSource(value);
        break;
      default:
        break;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBookingAdd = (newBooking) => {
    setBookingsData(prev => [
      { id: Date.now().toString(), ...newBooking },
      ...prev
    ]);
  };

  const handleBookingUpdate = (id, updatedBooking) => {
    setBookingsData(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
  };

  const handleBookingDelete = (id) => {
    setBookingsData(prev => prev.filter(booking => booking.id !== id));
  };

  const renderContent = () => {
    try {
      console.log('Rendering section:', activeSection);
      console.log('Current metrics data:', metricsData);
      
      switch(activeSection) {
        case 'dashboard':
          return (
            <>
              {/* eslint-disable-next-line react/no-unstable-nested-components */}
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {/* KPI Metrics */}
                {/* eslint-disable-next-line */}
                <Grid item xs={12} md={3}>
                  <MetricCard 
                    title="Заполняемость"
                    value={metricsData.occupancyRate}
                    unit="%"
                    color="#1976d2"
                    icon="occupancy"
                  />
                </Grid>
                {/* eslint-disable-next-line */}
                <Grid item xs={12} md={3}>
                  <MetricCard 
                    title="Средняя цена за номер"
                    value={metricsData.averageDailyRate}
                    unit="₸"
                    color="#2e7d32"
                    icon="price"
                  />
                </Grid>
                {/* eslint-disable-next-line */}
                <Grid item xs={12} md={3}>
                  <MetricCard 
                    title="Доход на номер"
                    value={metricsData.revenuePerRoom}
                    unit="₸"
                    color="#ed6c02"
                    icon="revenue"
                  />
                </Grid>
                {/* eslint-disable-next-line */}
                <Grid item xs={12} md={3}>
                  <MetricCard 
                    title="Возвратные гости"
                    value={metricsData.returningGuestRate}
                    unit="%"
                    color="#9c27b0"
                    icon="guests"
                  />
                </Grid>
                
                {/* Charts */}
                {/* eslint-disable-next-line */}
                <Grid item xs={12} md={8}>
                  <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Динамика заполняемости
                    </Typography>
                    <OccupancyChart data={occupancyData} />
                  </Paper>
                </Grid>
                
                {/* eslint-disable-next-line */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Структура по каналам продаж
                    </Typography>
                    <BookingSourceChart data={bookingSourceData} />
                  </Paper>
                </Grid>
                
                {/* eslint-disable-next-line */}
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      География гостей (топ-5 стран/регионов)
                    </Typography>
                    <GuestGeographyChart data={guestGeographyData} />
                  </Paper>
                </Grid>
              </Grid>
            </>
          );
        case 'bookings':
          return (
            <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
              <DataTable 
                data={bookingsData} 
                onAdd={handleBookingAdd} 
                onUpdate={handleBookingUpdate} 
                onDelete={handleBookingDelete}
              />
            </Paper>
          );
        case 'guests':
          return (
            <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Управление гостями
              </Typography>
              <Typography variant="body1">
                Этот раздел находится в разработке.
              </Typography>
            </Paper>
          );
        case 'reports':
          return (
            <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Отчеты и аналитика
              </Typography>
              <Typography variant="body1">
                Этот раздел находится в разработке.
              </Typography>
            </Paper>
          );
        case 'settings':
          return (
            <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Настройки
              </Typography>
              <Typography variant="body1">
                Этот раздел находится в разработке.
              </Typography>
            </Paper>
          );
        default:
          return null;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" color="error">Произошла ошибка при загрузке данных</Typography>
          <Typography variant="body1">Пожалуйста, попробуйте обновить страницу</Typography>
          <pre>{error.message}</pre>
        </Paper>
      );
    }
  };

  const drawer = (
    <Box>
      <Divider />
      <List>
        <ListItemButton
          selected={activeSection === 'dashboard'} 
          onClick={() => setActiveSection('dashboard')}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon color={activeSection === 'dashboard' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Дашборд" />
        </ListItemButton>
        <ListItemButton
          selected={activeSection === 'bookings'} 
          onClick={() => setActiveSection('bookings')}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon>
            <HotelIcon color={activeSection === 'bookings' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Бронирования" />
        </ListItemButton>
        <ListItemButton
          selected={activeSection === 'guests'} 
          onClick={() => setActiveSection('guests')}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon color={activeSection === 'guests' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Гости" />
        </ListItemButton>
        <ListItemButton
          selected={activeSection === 'reports'} 
          onClick={() => setActiveSection('reports')}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon>
            <BarChartIcon color={activeSection === 'reports' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Отчеты" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          selected={activeSection === 'settings'} 
          onClick={() => setActiveSection('settings')}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon>
            <SettingsIcon color={activeSection === 'settings' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Настройки" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header isAuthenticated={true} logout={logout} onMenuClick={handleDrawerToggle} showMenuIcon={isMobile} />
      
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: DRAWER_WIDTH, 
              boxSizing: 'border-box', 
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              marginTop: '64px', // Add top margin to account for the header height
              height: 'calc(100% - 64px)' // Adjust height to account for the header
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
      
      {/* Sidebar for mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              width: DRAWER_WIDTH, 
              boxSizing: 'border-box',
              marginTop: '64px', // Add top margin to account for the header height
              height: 'calc(100% - 64px)' // Adjust height to account for the header
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default', 
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          position: 'relative',
          zIndex: 1,
          marginTop: '64px' // Add top margin to account for the header height
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <Tooltip title="Открыть меню">
              <IconButton 
                color="primary" 
                aria-label="open drawer" 
                edge="start" 
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            {activeSection === 'dashboard' && 'Панель управления'}
            {activeSection === 'bookings' && 'Управление бронированиями'}
            {activeSection === 'guests' && 'Управление гостями'}
            {activeSection === 'reports' && 'Отчеты и аналитика'}
            {activeSection === 'settings' && 'Настройки'}
          </Typography>
        </Box>
        
        {activeSection === 'dashboard' && (
          <FilterPanel 
            dateRange={dateRange} 
            roomType={roomType} 
            bookingSource={bookingSource} 
            onFilterChange={handleFilterChange} 
          />
        )}
        
        {renderContent()}
        
        <Box component="footer" sx={{ py: 2, mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Последнее обновление данных: {format(new Date(), 'dd.MM.yyyy, HH:mm')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 