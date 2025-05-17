import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  Fade,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Tab,
  Tabs,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { format, subDays } from 'date-fns';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PublicIcon from '@mui/icons-material/Public';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TranslateIcon from '@mui/icons-material/Translate';

// Charts components
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// Custom components
import BrandPresence3D from '../components/BrandPresence3D';
import SocialMediaTab from '../components/SocialMediaTab';
import CampaignManagement from '../components/CampaignManagement';

// Import language context and translations
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';

// Mock data for marketing statistics
import { 
  getSocialMediaData,
  getChannelConversions,
  getMarketingCampaigns,
  getBookingTrends,
  getPerformanceStats
} from '../data/marketingData';

const MarketingDashboard = ({ logout }) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState('week');
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  // Data states
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [channelConversions, setChannelConversions] = useState([]);
  const [marketingCampaigns, setMarketingCampaigns] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [performanceStats, setPerformanceStats] = useState(null);

  // Language context
  const { language, toggleLanguage } = useContext(LanguageContext);
  const t = translations[language];

  useEffect(() => {
    // Load data
    const loadData = async () => {
      setLoading(true);

      // Simulate API fetch delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setSocialMediaData(getSocialMediaData(selectedDate));
      setChannelConversions(getChannelConversions(selectedDate));
      setMarketingCampaigns(getMarketingCampaigns(selectedDate));
      setBookingTrends(getBookingTrends(selectedDate));
      setPerformanceStats(getPerformanceStats(selectedDate));

      setLoading(false);

      // Trigger animations after data loads
      setTimeout(() => setFadeIn(true), 100);
    };

    loadData();
  }, [selectedDate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (dateRange) => {
    setSelectedDate(dateRange);
    handleMenuClose();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const formatValue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const renderDateRangeLabel = () => {
    const now = new Date();
    switch(selectedDate) {
      case 'day':
        return format(now, 'dd MMMM yyyy');
      case 'week':
        return `${format(subDays(now, 7), 'dd.MM')} - ${format(now, 'dd.MM.yyyy')}`;
      case 'month':
        return format(now, 'MMMM yyyy');
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `${quarter} квартал ${now.getFullYear()}`;
      case 'year':
        return now.getFullYear().toString();
      default:
        return t.selectPeriod;
    }
  };

  // Handle social media data changes
  const handleSocialMediaDataChange = (newData) => {
    setSocialMediaData(newData);
  };

  // Handle marketing campaigns data changes
  const handleMarketingCampaignsChange = (newData) => {
    setMarketingCampaigns(newData);
  };

  // Marketing Dashboard Content
  const renderDashboardContent = () => {
    switch(activeTab) {
      case 0: // Overview
        return (
          <Grid container spacing={3} sx={{ mt: 0 }}>
            {/* Social Media KPIs */}
            <Grid item xs={12} md={8}>
              <Fade in={fadeIn} timeout={800}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 1
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, maxWidth: '100%' }}>
                    {t.socialMediaAnalytics}
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2}>
                      {socialMediaData.slice(0, 4).map((platform) => (
                        <Grid item xs={6} md={3} key={platform.name}>
                          <Card 
                            elevation={0} 
                            sx={{ 
                              bgcolor: 'rgba(58, 123, 213, 0.04)',
                              borderRadius: theme.shape.borderRadius
                            }}
                          >
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                {platform.icon === 'instagram' && <InstagramIcon sx={{ color: '#E1306C' }} />}
                                {platform.icon === 'facebook' && <FacebookIcon sx={{ color: '#4267B2' }} />}
                                {platform.icon === '2gis' && <TravelExploreIcon sx={{ color: '#3EBC42' }} />}
                                {platform.icon === 'booking' && <BookOnlineIcon sx={{ color: '#003580' }} />}
                                {platform.icon === 'tripadvisor' && <PublicIcon sx={{ color: '#00AA6C' }} />}
                                <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 500 }}>
                                  {platform.name}
                                </Typography>
                              </Box>
                              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {formatValue(platform.followers)}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <ShowChartIcon 
                                  sx={{ 
                                    fontSize: 16, 
                                    mr: 0.5, 
                                    color: platform.growth >= 0 ? 'success.main' : 'error.main'
                                  }} 
                                />
                                <Typography 
                                  variant="caption" 
                                  sx={{ color: platform.growth >= 0 ? 'success.main' : 'error.main' }}
                                >
                                  {platform.growth > 0 ? '+' : ''}{platform.growth}%
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                    {t.audienceGrowth}
                  </Typography>
                  
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={socialMediaData[0]?.audienceHistory || []}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#999" />
                      <YAxis stroke="#999" />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          border: 'none'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="instagram" 
                        name="Instagram" 
                        stroke="#E1306C" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="facebook" 
                        name="Facebook"
                        stroke="#4267B2" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="2gis" 
                        name="2GIS"
                        stroke="#3EBC42"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="booking" 
                        name="Booking.com"
                        stroke="#003580" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tripadvisor" 
                        name="TripAdvisor"
                        stroke="#00AA6C" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Fade>
            </Grid>
            
            {/* 3D Visualization */}
            <Grid item xs={12} md={4}>
              <Fade in={fadeIn} timeout={1000}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '570px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 1,
                    overflow: 'auto'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, maxWidth: '100%' }}>
                    {t.brandPresence}
                  </Typography>
                  
                  <Box sx={{ 
                    flexGrow: 1, 
                    position: 'relative', 
                    height: '500px',
                    overflow: 'auto'
                  }}>
                    <BrandPresence3D 
                      data={socialMediaData}
                      loading={loading}
                    />
                  </Box>
                </Paper>
              </Fade>
            </Grid>
            
            {/* Conversions Chart */}
            <Grid item xs={12} md={6}>
              <Fade in={fadeIn} timeout={1200}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    position: 'relative',
                    borderRadius: 1
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, maxWidth: '100%' }}>
                    {t.channelConversions}
                  </Typography>
                  
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                      data={channelConversions}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      barGap={8}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <RechartsTooltip 
                        formatter={(value, name) => [formatValue(value), name]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          border: 'none'
                        }} 
                      />
                      <Legend />
                      <Bar 
                        dataKey="impressions" 
                        name={t.impressions}
                        fill="#3a7bd5"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="clicks" 
                        name={t.clicks}
                        fill="#00d2ff"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="conversions" 
                        name={t.conversions}
                        fill="#38ef7d"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Fade>
            </Grid>
            
            {/* Campaigns Performance */}
            <Grid item xs={12} md={6}>
              <Fade in={fadeIn} timeout={1400}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    position: 'relative',
                    borderRadius: 1
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, maxWidth: '100%' }}>
                    {t.campaignEffectiveness}
                  </Typography>
                  
                  {marketingCampaigns.filter(c => c.status === 'active').slice(0, 4).map((campaign) => (
                    <Box key={campaign.id} sx={{ mb: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EmojiEventsIcon sx={{ 
                            fontSize: 18, 
                            color: campaign.platform === 'instagram' ? '#E1306C' : 
                                  campaign.platform === 'facebook' ? '#4267B2' :
                                  campaign.platform === '2gis' ? '#3EBC42' : 
                                  campaign.platform === 'booking' ? '#003580' :
                                  campaign.platform === 'tripadvisor' ? '#00AA6C' :
                                  '#4285F4',
                            mr: 1 
                          }} />
                          <Typography variant="subtitle2">
                            {campaign.name}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: campaign.roi > 100 ? 'success.main' : 'text.primary'
                          }}
                        >
                          ROI: {campaign.roi}%
                        </Typography>
                      </Box>
                      
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: `${campaign.progress}%`,
                            height: 8,
                            bgcolor: campaign.platform === 'instagram' ? 'rgba(225, 48, 108, 0.7)' : 
                                  campaign.platform === 'facebook' ? 'rgba(66, 103, 178, 0.7)' :
                                  campaign.platform === '2gis' ? 'rgba(62, 188, 66, 0.7)' : 
                                  campaign.platform === 'tripadvisor' ? 'rgba(0, 170, 108, 0.7)' :
                                  'rgba(0, 53, 128, 0.7)',
                            borderRadius: 1,
                            transition: 'width 1s ease-in-out',
                            position: 'relative',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                              animation: 'shimmer 2s infinite',
                              borderRadius: 1,
                            }
                          }}
                        />
                        <Box
                          sx={{
                            width: `${100 - campaign.progress}%`,
                            height: 8,
                            bgcolor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 1
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {t.budget}: {formatValue(campaign.budget)} ₸
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.conversions}: {formatValue(campaign.conversions)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Fade>
            </Grid>
            
            {/* Booking Trends */}
            <Grid item xs={12}>
              <Fade in={fadeIn} timeout={1600}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3,
                    position: 'relative',
                    borderRadius: 1
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, maxWidth: '100%' }}>
                    {t.bookingTrends}
                  </Typography>
                  
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                      data={bookingTrends}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#999" />
                      <YAxis stroke="#999" />
                      <RechartsTooltip 
                        formatter={(value, name) => [formatValue(value), name]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          border: 'none'
                        }} 
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="direct"
                        name={t.directBookings}
                        stroke="#3a7bd5"
                        fill="#3a7bd5"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="social"
                        name={t.socialBookings}
                        stroke="#00d2ff"
                        fill="#00d2ff"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="booking"
                        name="Booking.com"
                        stroke="#003580"
                        fill="#003580"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="2gis"
                        name="2GIS"
                        stroke="#3EBC42"
                        fill="#3EBC42"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="tripadvisor"
                        name="TripAdvisor"
                        stroke="#00AA6C"
                        fill="#00AA6C"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        );
      case 1: // Social Media
        return (
          <SocialMediaTab 
            socialMediaData={socialMediaData}
            loading={loading}
            onSocialDataChange={handleSocialMediaDataChange}
          />
        );
      case 2: // Campaigns
        return (
          <CampaignManagement
            campaigns={marketingCampaigns}
            loading={loading}
            onCampaignsChange={handleMarketingCampaignsChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          color: 'text.primary'
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TripOriginIcon 
              sx={{ 
                mr: 1, 
                background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                borderRadius: '50%',
                p: 0.5,
                fontSize: 28,
                color: '#fff'
              }} 
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              MarketInn
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          
          {/* Language toggle */}
          <Box sx={{ mr: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: '20px', p: 0.5 }}>
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
          
          {/* Date range selector */}
          <Button
            startIcon={<DateRangeIcon />}
            onClick={handleMenuOpen}
            variant="outlined"
            sx={{ 
              mr: 2, 
              color: 'text.secondary',
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(58, 123, 213, 0.04)'
              }
            }}
          >
            {renderDateRangeLabel()}
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ 'aria-labelledby': 'date-range-button' }}
          >
            <MenuItem onClick={() => handleDateChange('day')}>{t.dateRanges.day}</MenuItem>
            <MenuItem onClick={() => handleDateChange('week')}>{t.dateRanges.week}</MenuItem>
            <MenuItem onClick={() => handleDateChange('month')}>{t.dateRanges.month}</MenuItem>
            <MenuItem onClick={() => handleDateChange('quarter')}>{t.dateRanges.quarter}</MenuItem>
            <MenuItem onClick={() => handleDateChange('year')}>{t.dateRanges.year}</MenuItem>
          </Menu>

          {/* User profile */}
          <Tooltip title={t.marketologist}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main',
                background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)'
              }}
            >
              <AccountCircle />
            </Avatar>
          </Tooltip>

          {/* Logout button */}
          <IconButton color="inherit" onClick={logout} sx={{ ml: 1 }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
        
        <Box sx={{ bgcolor: 'background.paper', px: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 0,
                py: 2,
                px: 3,
                fontWeight: 500
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)'
              }
            }}
          >
            <Tab label={t.overview} />
            <Tab label={t.socialMedia} />
            <Tab label={t.campaigns} />
          </Tabs>
        </Box>
      </AppBar>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3,
          pt: 0,
          width: '100%',
          mt: '116px' // Height of AppBar + Tabs
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : renderDashboardContent()}
        
        {/* Add CSS animations */}
        <style jsx="true">{`
          @keyframes shimmer {
            0% { transform: translateX(-100%) }
            100% { transform: translateX(100%) }
          }
        `}</style>
      </Box>
    </Box>
  );
};

export default MarketingDashboard; 