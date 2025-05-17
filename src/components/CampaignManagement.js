import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Divider,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useTheme,
  Fade,
  Tabs,
  Tab
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PublicIcon from '@mui/icons-material/Public';
import GoogleIcon from '@mui/icons-material/Google';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// Language context
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';

const CampaignManagement = ({ campaigns, loading, onCampaignsChange }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    platform: 'instagram',
    status: 'planned',
    startDate: '',
    endDate: '',
    budget: 0,
    spent: 0,
    targetAudience: '',
    description: ''
  });
  
  // Language context
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const theme = useTheme();
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const handleEditDialogOpen = (campaign) => {
    setEditingCampaign({...campaign});
    setEditDialogOpen(true);
  };
  
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingCampaign(null);
  };
  
  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };
  
  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
    setNewCampaign({
      name: '',
      platform: 'instagram',
      status: 'planned',
      startDate: '',
      endDate: '',
      budget: 0,
      spent: 0,
      targetAudience: '',
      description: ''
    });
  };
  
  const handleSaveEdit = () => {
    // Find the index of the edited campaign
    const index = campaigns.findIndex(c => c.id === editingCampaign.id);
    if (index !== -1) {
      // Create a new array with the updated campaign
      const updatedData = [...campaigns];
      updatedData[index] = editingCampaign;
      
      // Update the parent component
      onCampaignsChange(updatedData);
    }
    handleEditDialogClose();
  };
  
  const handleCreateCampaign = () => {
    // Generate a new ID
    const newId = Math.max(...campaigns.map(c => c.id), 0) + 1;
    
    // Create new campaign with defaults
    const campaignToAdd = {
      ...newCampaign,
      id: newId,
      progress: 0,
      conversions: 0,
      leads: 0,
      impressions: 0,
      clicks: 0,
      roi: 0,
      ctr: 0,
      cpc: 0,
      cpac: 0,
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' }
      ]
    };
    
    // Update the parent component
    onCampaignsChange([...campaigns, campaignToAdd]);
    handleCreateDialogClose();
  };
  
  const handleDeleteCampaign = (campaignId) => {
    // Filter out the campaign to delete
    const updatedData = campaigns.filter(c => c.id !== campaignId);
    
    // Update the parent component
    onCampaignsChange(updatedData);
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
  
  const getPlatformIcon = (platform) => {
    switch(platform) {
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
      case 'google':
        return <GoogleIcon sx={{ color: '#4285F4' }} />;
      default:
        return <InstagramIcon sx={{ color: '#E1306C' }} />;
    }
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'active':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'paused':
        return <PauseCircleIcon sx={{ color: 'warning.main' }} />;
      case 'planned':
        return <ScheduleIcon sx={{ color: 'info.main' }} />;
      case 'completed':
        return <DoneAllIcon sx={{ color: 'text.secondary' }} />;
      default:
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'planned':
        return 'info';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'active':
        return t.active;
      case 'paused':
        return t.paused;
      case 'planned':
        return t.planned;
      case 'completed':
        return t.completed;
      default:
        return status;
    }
  };
  
  // Filter campaigns based on status tab
  const filteredCampaigns = () => {
    if (currentTab === 0) return campaigns;
    
    const statuses = ['active', 'paused', 'planned', 'completed'];
    return campaigns.filter(campaign => campaign.status === statuses[currentTab - 1]);
  };
  
  // Render campaign list
  const renderCampaignList = () => {
    return (
      <Grid container spacing={3}>
        {filteredCampaigns().map(campaign => (
          <Grid item xs={12} md={6} lg={4} key={campaign.id}>
            <Fade in={true} timeout={500}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: theme.shape.borderRadius * 1.5,
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
                      <Box sx={{ mr: 1.5 }}>
                        {getPlatformIcon(campaign.platform)}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {campaign.name}
                        </Typography>
                        <Chip 
                          icon={getStatusIcon(campaign.status)} 
                          label={getStatusText(campaign.status)}
                          size="small"
                          color={getStatusColor(campaign.status)}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditDialogOpen(campaign)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {campaign.description}
                  </Typography>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t.campaignStart}
                    </Typography>
                    <Typography variant="body2">
                      {campaign.startDate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t.campaignEnd}
                    </Typography>
                    <Typography variant="body2">
                      {campaign.endDate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t.budget}
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formatValue(campaign.budget)} ₸
                    </Typography>
                  </Box>
                  
                  {campaign.status !== 'planned' && (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {t.campaignSpent}
                        </Typography>
                        <Typography variant="body2">
                          {formatValue(campaign.spent)} ₸ ({Math.round((campaign.spent / campaign.budget) * 100)}%)
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 2, mb: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={campaign.progress} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: campaign.platform === 'instagram' ? 'linear-gradient(90deg, #E1306C, #F77737)' :
                                campaign.platform === 'facebook' ? 'linear-gradient(90deg, #4267B2, #8B9DC3)' :
                                campaign.platform === '2gis' ? 'linear-gradient(90deg, #3EBC42, #69F26D)' :
                                campaign.platform === 'tripadvisor' ? 'linear-gradient(90deg, #00AA6C, #7DCEA0)' :
                                campaign.platform === 'booking' ? 'linear-gradient(90deg, #003580, #00224F)' :
                                'linear-gradient(90deg, #4285F4, #34A853)'
                            }
                          }}
                        />
                      </Box>
                    </>
                  )}
                  
                  {campaign.status === 'active' && (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(58, 123, 213, 0.05)', borderRadius: 1 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {t.conversions}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {formatValue(campaign.conversions)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(58, 123, 213, 0.05)', borderRadius: 1 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            ROI
                          </Typography>
                          <Typography 
                            variant="h6" 
                            fontWeight={600}
                            color={campaign.roi >= 100 ? 'success.main' : 'text.primary'}
                          >
                            {campaign.roi}%
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  // Render campaign statistics
  const renderCampaignStats = () => {
    // Get active campaigns for stats
    const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'completed');
    
    // Skip if no active campaigns
    if (activeCampaigns.length === 0) return null;
    
    // Prepare ROI comparison data
    const roiData = activeCampaigns.map(c => ({
      name: c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name,
      roi: c.roi,
      budget: c.budget / 1000 // Convert to thousands for display
    }));
    
    // Prepare platform distribution data
    const platformCount = {};
    activeCampaigns.forEach(c => {
      platformCount[c.platform] = (platformCount[c.platform] || 0) + 1;
    });
    
    const platformData = Object.keys(platformCount).map(platform => ({
      name: platform,
      value: platformCount[platform]
    }));
    
    const COLORS = ['#E1306C', '#4267B2', '#3EBC42', '#003580', '#00AA6C', '#4285F4'];
    
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t.campaignInsights}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ p: 2, borderRadius: theme.shape.borderRadius * 1.5 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t.campaignComparison}
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={roiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={70}
                  />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <RechartsTooltip formatter={(value, name) => [value, name === 'roi' ? 'ROI %' : `${t.budget} (000's)`]} />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="roi" 
                    name="ROI %" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="budget" 
                    name={`${t.budget} (000's)`}
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ p: 2, borderRadius: theme.shape.borderRadius * 1.5, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t.platformDistribution}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          {t.campaigns}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateDialogOpen}
        >
          {t.addCampaign}
        </Button>
      </Box>
      
      <Tabs 
        value={currentTab} 
        onChange={handleTabChange}
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTab-root': {
            minWidth: 0,
            px: 3,
            fontWeight: 500
          }
        }}
      >
        <Tab label={t.all} />
        <Tab label={t.active} />
        <Tab label={t.paused} />
        <Tab label={t.planned} />
        <Tab label={t.completed} />
      </Tabs>
      
      {renderCampaignList()}
      
      {currentTab === 0 && renderCampaignStats()}
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t.editCampaign}
          <IconButton
            aria-label="close"
            onClick={handleEditDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          {editingCampaign && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t.campaignName}
                  fullWidth
                  value={editingCampaign.name || ''}
                  onChange={(e) => setEditingCampaign({...editingCampaign, name: e.target.value})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label={t.campaignPlatform}
                  fullWidth
                  value={editingCampaign.platform || 'instagram'}
                  onChange={(e) => setEditingCampaign({...editingCampaign, platform: e.target.value})}
                  margin="normal"
                >
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="2gis">2GIS</MenuItem>
                  <MenuItem value="booking">Booking.com</MenuItem>
                  <MenuItem value="tripadvisor">TripAdvisor</MenuItem>
                  <MenuItem value="google">Google</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label={t.campaignStatus}
                  fullWidth
                  value={editingCampaign.status || 'active'}
                  onChange={(e) => setEditingCampaign({...editingCampaign, status: e.target.value})}
                  margin="normal"
                >
                  <MenuItem value="active">{t.active}</MenuItem>
                  <MenuItem value="paused">{t.paused}</MenuItem>
                  <MenuItem value="planned">{t.planned}</MenuItem>
                  <MenuItem value="completed">{t.completed}</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t.campaignStart}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={editingCampaign.startDate || ''}
                  onChange={(e) => setEditingCampaign({...editingCampaign, startDate: e.target.value})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t.campaignEnd}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={editingCampaign.endDate || ''}
                  onChange={(e) => setEditingCampaign({...editingCampaign, endDate: e.target.value})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t.campaignBudget}
                  type="number"
                  fullWidth
                  value={editingCampaign.budget || 0}
                  onChange={(e) => setEditingCampaign({...editingCampaign, budget: Number(e.target.value)})}
                  margin="normal"
                  InputProps={{ endAdornment: '₸' }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t.campaignSpent}
                  type="number"
                  fullWidth
                  value={editingCampaign.spent || 0}
                  onChange={(e) => setEditingCampaign({...editingCampaign, spent: Number(e.target.value)})}
                  margin="normal"
                  InputProps={{ endAdornment: '₸' }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label={t.targetAudience}
                  fullWidth
                  value={editingCampaign.targetAudience || ''}
                  onChange={(e) => setEditingCampaign({...editingCampaign, targetAudience: e.target.value})}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label={t.description}
                  fullWidth
                  multiline
                  rows={3}
                  value={editingCampaign.description || ''}
                  onChange={(e) => setEditingCampaign({...editingCampaign, description: e.target.value})}
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
            disabled={!editingCampaign || !editingCampaign.name}
          >
            {t.save}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCreateDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t.addCampaign}
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
            <Grid item xs={12}>
              <TextField
                label={t.campaignName}
                fullWidth
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label={t.campaignPlatform}
                fullWidth
                value={newCampaign.platform}
                onChange={(e) => setNewCampaign({...newCampaign, platform: e.target.value})}
                margin="normal"
              >
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="2gis">2GIS</MenuItem>
                <MenuItem value="booking">Booking.com</MenuItem>
                <MenuItem value="tripadvisor">TripAdvisor</MenuItem>
                <MenuItem value="google">Google</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label={t.campaignStatus}
                fullWidth
                value={newCampaign.status}
                onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value})}
                margin="normal"
              >
                <MenuItem value="active">{t.active}</MenuItem>
                <MenuItem value="paused">{t.paused}</MenuItem>
                <MenuItem value="planned">{t.planned}</MenuItem>
                <MenuItem value="completed">{t.completed}</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label={t.campaignStart}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newCampaign.startDate}
                onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label={t.campaignEnd}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newCampaign.endDate}
                onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label={t.campaignBudget}
                type="number"
                fullWidth
                value={newCampaign.budget}
                onChange={(e) => setNewCampaign({...newCampaign, budget: Number(e.target.value)})}
                margin="normal"
                InputProps={{ endAdornment: '₸' }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label={t.targetAudience}
                fullWidth
                value={newCampaign.targetAudience}
                onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label={t.description}
                fullWidth
                multiline
                rows={3}
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>{t.cancel}</Button>
          <Button 
            variant="contained"
            onClick={handleCreateCampaign}
            disabled={!newCampaign.name}
          >
            {t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignManagement; 