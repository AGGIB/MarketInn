import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Avatar,
  Divider,
  Chip,
  Stack,
  Collapse,
  useTheme,
  Fade
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PublicIcon from '@mui/icons-material/Public';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupIcon from '@mui/icons-material/Group';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import GoogleIcon from '@mui/icons-material/Google';

// Language context
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';

const SocialMediaTab = ({ socialMediaData, loading, onSocialDataChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    icon: 'instagram',
    account: '',
    followers: 0,
    growth: 0,
    engagementRate: 0
  });
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Language context
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const theme = useTheme();
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleEditDialogOpen = (platform) => {
    setEditingPlatform({...platform});
    setEditDialogOpen(true);
  };
  
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingPlatform(null);
  };
  
  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };
  
  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
    setNewPlatform({
      name: '',
      icon: 'instagram',
      account: '',
      followers: 0,
      growth: 0,
      engagementRate: 0
    });
  };
  
  const handleSaveEdit = () => {
    // Find the index of the edited platform
    const index = socialMediaData.findIndex(p => p.id === editingPlatform.id);
    if (index !== -1) {
      // Create a new array with the updated platform
      const updatedData = [...socialMediaData];
      updatedData[index] = editingPlatform;
      
      // Update the parent component
      onSocialDataChange(updatedData);
    }
    handleEditDialogClose();
  };
  
  const handleCreatePlatform = () => {
    // Generate a new ID
    const newId = Math.max(...socialMediaData.map(p => p.id), 0) + 1;
    
    // Create new platform object
    const platformToAdd = {
      ...newPlatform,
      id: newId,
      audienceHistory: [],
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        savedPosts: 0
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 20 },
          { group: '25-34', percentage: 30 },
          { group: '35-44', percentage: 25 },
          { group: '45-54', percentage: 15 },
          { group: '55+', percentage: 10 }
        ],
        gender: [
          { type: 'Женщины', percentage: 50 },
          { type: 'Мужчины', percentage: 50 }
        ],
        locations: [
          { city: 'Астана', percentage: 40 },
          { city: 'Алматы', percentage: 20 },
          { city: 'Другие', percentage: 40 }
        ]
      },
      reachData: {
        impressions: 0,
        reach: 0,
        profileVisits: 0,
        websiteClicks: 0
      }
    };
    
    // Update the parent component
    onSocialDataChange([...socialMediaData, platformToAdd]);
    handleCreateDialogClose();
  };
  
  const handleDeletePlatform = (platformId) => {
    // Filter out the platform to delete
    const updatedData = socialMediaData.filter(p => p.id !== platformId);
    
    // Update the parent component
    onSocialDataChange(updatedData);
  };
  
  const handleExpandCard = (platformId) => {
    setExpandedCard(expandedCard === platformId ? null : platformId);
  };
  
  const getPlatformIcon = (iconName) => {
    switch(iconName) {
      case 'instagram':
        return <InstagramIcon sx={{ color: '#E1306C' }} />;
      case 'facebook':
        return <FacebookIcon sx={{ color: '#4267B2' }} />;
      case '2gis':
        return <TravelExploreIcon sx={{ color: '#3EBC42' }} />;
      case 'booking':
        return <BookOnlineIcon sx={{ color: '#003580' }} />;
      case 'tripadvisor':
        return <PublicIcon sx={{ color: '#00AA6C' }} />;
      case 'googlemaps':
        return <GoogleIcon sx={{ color: '#4285F4' }} />;
      default:
        return <TripOriginIcon sx={{ color: theme.palette.primary.main }} />;
    }
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
  
  // Account Performance Tab
  const renderAccountPerformance = () => {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            {t.accountPerformance}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleCreateDialogOpen}
          >
            {t.addAccount}
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {socialMediaData.map((platform) => (
            <Grid item xs={12} md={6} key={platform.id}>
              <Fade in={true} timeout={500}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 1,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          variant="rounded" 
                          sx={{ 
                            bgcolor: 'rgba(58, 123, 213, 0.1)', 
                            color: 'primary.main',
                            width: 48,
                            height: 48,
                            mr: 2
                          }}
                        >
                          {getPlatformIcon(platform.icon)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {platform.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {platform.account}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton size="small" onClick={() => handleEditDialogOpen(platform)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeletePlatform(platform.id)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Paper elevation={0} sx={{ p: 1.5, textAlign: 'center', bgcolor: 'rgba(58, 123, 213, 0.05)', borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {t.followers}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {formatValue(platform.followers)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper elevation={0} sx={{ p: 1.5, textAlign: 'center', bgcolor: 'rgba(58, 123, 213, 0.05)', borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {t.growth}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            fontWeight={600}
                            color={platform.growth >= 0 ? 'success.main' : 'error.main'}
                          >
                            {platform.growth > 0 ? '+' : ''}{platform.growth}%
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                    
                    {/* Engagement Stats */}
                    <Grid container spacing={2}>
                      {platform.engagement.likes && (
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <ThumbUpIcon sx={{ color: 'primary.main', fontSize: 18, mb: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {formatValue(platform.engagement.likes)}
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                      {platform.engagement.comments && (
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <CommentIcon sx={{ color: 'primary.main', fontSize: 18, mb: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {formatValue(platform.engagement.comments)}
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                      {platform.engagement.shares && (
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <ShareIcon sx={{ color: 'primary.main', fontSize: 18, mb: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {formatValue(platform.engagement.shares)}
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                      {platform.engagement.savedPosts && (
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <BookmarkIcon sx={{ color: 'primary.main', fontSize: 18, mb: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {formatValue(platform.engagement.savedPosts)}
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                    
                    {/* Expanded Content */}
                    <Collapse in={expandedCard === platform.id}>
                      <Box sx={{ mt: 3 }}>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                          {t.demographicData}
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="caption" color="text.secondary">
                              {t.audienceGender}
                            </Typography>
                            <ResponsiveContainer width="100%" height={100}>
                              <PieChart>
                                <Pie
                                  data={platform.demographicData.gender}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={30}
                                  dataKey="percentage"
                                  nameKey="type"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  labelLine={false}
                                >
                                  <Cell fill="#3a7bd5" />
                                  <Cell fill="#00d2ff" />
                                </Pie>
                                <RechartsTooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="caption" color="text.secondary">
                              {t.audienceAge}
                            </Typography>
                            <ResponsiveContainer width="100%" height={100}>
                              <BarChart 
                                data={platform.demographicData.age}
                                layout="vertical"
                                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="group" type="category" width={40} axisLine={false} tickLine={false} fontSize={10} />
                                <Bar dataKey="percentage" fill="#3a7bd5" radius={[0, 4, 4, 0]} barSize={10} label={{ position: 'right', fontSize: 9 }} />
                              </BarChart>
                            </ResponsiveContainer>
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            {t.location}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                            {platform.demographicData.locations.map((location, i) => (
                              <Chip 
                                key={i}
                                label={`${location.city} ${location.percentage}%`}
                                size="small"
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                    </Collapse>
                    
                    {/* Expand/Collapse Button */}
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Button
                        size="small"
                        onClick={() => handleExpandCard(platform.id)}
                        endIcon={expandedCard === platform.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{ fontSize: '0.75rem' }}
                      >
                        {expandedCard === platform.id ? t.less : t.more}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  // Content Performance Tab
  const renderContentPerformance = () => {
    const platformsWithPosts = socialMediaData.filter(platform => platform.topPosts || platform.topContent || platform.topReviews);
    
    return (
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          {t.contentPerformance}
        </Typography>
        
        <Grid container spacing={3}>
          {platformsWithPosts.map((platform) => (
            <Grid item xs={12} key={platform.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 1,
                  mb: 3,
                  p: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    variant="rounded" 
                    sx={{ 
                      bgcolor: 'rgba(58, 123, 213, 0.1)', 
                      color: 'primary.main',
                      width: 40,
                      height: 40,
                      mr: 1.5
                    }}
                  >
                    {getPlatformIcon(platform.icon)}
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    {platform.name} - {t.topPosts}
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {platform.topPosts && platform.topPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                      <Card elevation={0} sx={{ bgcolor: 'rgba(58, 123, 213, 0.03)', borderRadius: 2 }}>
                        <CardContent>
                          <Box 
                            sx={{ 
                              height: 150, 
                              backgroundImage: `url(${post.imageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: 1,
                              mb: 1.5
                            }}
                          />
                          <Typography variant="subtitle2" fontWeight={600} gutterBottom noWrap>
                            {post.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {post.date}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ThumbUpIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.light' }} />
                              <Typography variant="caption" color="text.secondary">
                                {formatValue(post.likes)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CommentIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.light' }} />
                              <Typography variant="caption" color="text.secondary">
                                {formatValue(post.comments)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ShareIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.light' }} />
                              <Typography variant="caption" color="text.secondary">
                                {formatValue(post.shares)}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                  {platform.topReviews && platform.topReviews.map((review) => (
                    <Grid item xs={12} sm={6} key={review.id}>
                      <Card elevation={0} sx={{ bgcolor: 'rgba(58, 123, 213, 0.03)', borderRadius: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {review.author}
                            </Typography>
                            <Chip 
                              label={typeof review.rating === 'number' ? `${review.rating}/5` : `${review.rating}/10`}
                              color="primary"
                              size="small"
                              sx={{ height: 20, fontSize: '0.625rem' }}
                            />
                          </Box>
                          
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            {review.country} - {review.date}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                            {review.text}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ThumbUpIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.light' }} />
                              <Typography variant="caption" color="text.secondary">
                                {review.helpful || 0}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  // Audience Tab
  const renderAudienceInsights = () => {
    // Prepare age distribution data across all platforms
    const ageGroups = {};
    socialMediaData.forEach(platform => {
      if (platform.demographicData && platform.demographicData.age) {
        platform.demographicData.age.forEach(age => {
          if (!ageGroups[age.group]) {
            ageGroups[age.group] = {
              ageGroup: age.group,
              totalPercentage: 0,
              count: 0
            };
          }
          ageGroups[age.group].totalPercentage += age.percentage;
          ageGroups[age.group].count += 1;
        });
      }
    });
    
    const aggregatedAgeData = Object.values(ageGroups).map(group => ({
      name: group.ageGroup,
      value: Math.round(group.totalPercentage / group.count)
    }));
    
    return (
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          {t.audienceInsights}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 1,
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {t.audienceAge}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={aggregatedAgeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value}%`, t.percentage]} />
                    <Bar 
                      dataKey="value" 
                      name={t.percentage}
                      fill="#3a7bd5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 1,
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {t.geographicDistribution}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Астана', value: 35 },
                          { name: 'Алматы', value: 20 },
                          { name: 'Шымкент', value: 10 },
                          { name: 'Караганда', value: 8 },
                          { name: 'Другие', value: 27 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          '#3a7bd5',
                          '#00d2ff',
                          '#6dd5ed',
                          '#2193b0',
                          '#0083B0'
                        ].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  return (
    <Box>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: 'divider',
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
        <Tab 
          label={t.accountPerformance} 
          icon={<GroupIcon />} 
          iconPosition="start"
        />
        <Tab 
          label={t.contentPerformance} 
          icon={<VisibilityIcon />}
          iconPosition="start"
        />
        <Tab 
          label={t.audienceInsights} 
          icon={<InsightsIcon />}
          iconPosition="start"
        />
      </Tabs>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {activeTab === 0 && renderAccountPerformance()}
          {activeTab === 1 && renderContentPerformance()}
          {activeTab === 2 && renderAudienceInsights()}
        </Box>
      )}
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t.editAccount}
          <IconButton
            aria-label="close"
            onClick={handleEditDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          {editingPlatform && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t.accountName}
                  fullWidth
                  value={editingPlatform.name || ''}
                  onChange={(e) => setEditingPlatform({...editingPlatform, name: e.target.value})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label={t.platform}
                  fullWidth
                  value={editingPlatform.icon || 'instagram'}
                  onChange={(e) => setEditingPlatform({...editingPlatform, icon: e.target.value})}
                  margin="normal"
                >
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="2gis">2GIS</MenuItem>
                  <MenuItem value="booking">Booking.com</MenuItem>
                  <MenuItem value="tripadvisor">TripAdvisor</MenuItem>
                  <MenuItem value="googlemaps">Google Maps</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label={t.accountUsername}
                  fullWidth
                  value={editingPlatform.account || ''}
                  onChange={(e) => setEditingPlatform({...editingPlatform, account: e.target.value})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  label={t.followers}
                  fullWidth
                  type="number"
                  value={editingPlatform.followers || 0}
                  onChange={(e) => setEditingPlatform({...editingPlatform, followers: Number(e.target.value)})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  label={t.growth}
                  fullWidth
                  type="number"
                  InputProps={{ endAdornment: '%' }}
                  value={editingPlatform.growth || 0}
                  onChange={(e) => setEditingPlatform({...editingPlatform, growth: Number(e.target.value)})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  label={t.engagementRate}
                  fullWidth
                  type="number"
                  InputProps={{ endAdornment: '%' }}
                  value={editingPlatform.engagementRate || 0}
                  onChange={(e) => setEditingPlatform({...editingPlatform, engagementRate: Number(e.target.value)})}
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleEditDialogClose}>{t.cancel}</Button>
          <Button 
            variant="contained"
            onClick={handleSaveEdit}
            disabled={!editingPlatform || !editingPlatform.name}
          >
            {t.save}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCreateDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t.addAccount}
          <IconButton
            aria-label="close"
            onClick={handleCreateDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t.accountName}
                fullWidth
                value={newPlatform.name}
                onChange={(e) => setNewPlatform({...newPlatform, name: e.target.value})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label={t.platform}
                fullWidth
                value={newPlatform.icon}
                onChange={(e) => setNewPlatform({...newPlatform, icon: e.target.value})}
                margin="normal"
              >
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="2gis">2GIS</MenuItem>
                <MenuItem value="booking">Booking.com</MenuItem>
                <MenuItem value="tripadvisor">TripAdvisor</MenuItem>
                <MenuItem value="googlemaps">Google Maps</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label={t.accountUsername}
                fullWidth
                value={newPlatform.account}
                onChange={(e) => setNewPlatform({...newPlatform, account: e.target.value})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label={t.followers}
                fullWidth
                type="number"
                value={newPlatform.followers}
                onChange={(e) => setNewPlatform({...newPlatform, followers: Number(e.target.value)})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label={t.growth}
                fullWidth
                type="number"
                InputProps={{ endAdornment: '%' }}
                value={newPlatform.growth}
                onChange={(e) => setNewPlatform({...newPlatform, growth: Number(e.target.value)})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label={t.engagementRate}
                fullWidth
                type="number"
                InputProps={{ endAdornment: '%' }}
                value={newPlatform.engagementRate}
                onChange={(e) => setNewPlatform({...newPlatform, engagementRate: Number(e.target.value)})}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>{t.cancel}</Button>
          <Button 
            variant="contained"
            onClick={handleCreatePlatform}
            disabled={!newPlatform.name}
          >
            {t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SocialMediaTab; 