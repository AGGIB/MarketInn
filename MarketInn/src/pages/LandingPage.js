import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import HotelIcon from '@mui/icons-material/Hotel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PublicIcon from '@mui/icons-material/Public';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleRegisterClick = () => {
    navigate('/register');
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} 
        sx={{ 
          backgroundColor: 'white', 
          color: 'primary.main', 
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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
          
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleLoginClick}
            >
              Войти
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRegisterClick}
            >
              Регистрация
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 10, 
          background: 'linear-gradient(120deg, #e0f7fa 0%, #f5f5f5 100%)',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Управляйте показателями отеля в реальном времени
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Интерактивный дашборд для мониторинга и анализа ключевых метрик эффективности отеля Wyndham Garden Astana
              </Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleRegisterClick}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Начать бесплатно
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  onClick={handleLoginClick}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Демо-доступ
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 4,
                height: 400,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h3" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Ключевые возможности дашборда
          </Typography>
          
          <Grid container spacing={4}>
            {/* Feature 1 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent>
                  <AssessmentIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" component="h4" gutterBottom>
                    Основные метрики
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Мониторинг заполняемости отеля, средней цены за номер (ADR), дохода на номер (RevPAR) и количества бронирований
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Feature 2 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent>
                  <TimelineIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" component="h4" gutterBottom>
                    Динамика показателей
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Отслеживание изменений ключевых показателей во времени с возможностью сравнения с предыдущими периодами
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Feature 3 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent>
                  <PeopleAltIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" component="h4" gutterBottom>
                    Анализ гостей
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Изучение структуры гостей по географии и уровня возвратных гостей для улучшения маркетинговых стратегий
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Dashboard Features Section */}
      <Box sx={{ py: 10, backgroundColor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Интерактивные графики и диаграммы
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Визуализация данных для быстрого анализа и принятия решений в управлении отелем
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Динамика заполняемости по месяцам" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Структура гостей по каналам продаж" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="География гостей (топ-5 стран/регионов)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Гибкие фильтры по дате, типу номера и источнику бронирования" />
                </ListItem>
              </List>
              
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleLoginClick}
                sx={{ mt: 2 }}
              >
                Попробовать дашборд
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ 
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  opacity: 0.1,
                  top: -20,
                  left: -20,
                  zIndex: 0
                }} />
                <Box sx={{ 
                  position: 'absolute',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                  opacity: 0.1,
                  bottom: -30,
                  right: -30,
                  zIndex: 0
                }} />
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Card sx={{ 
                      mb: 3, 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      borderRadius: 3
                    }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUpIcon sx={{ mr: 2, color: '#2e7d32' }} />
                        <Box>
                          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                            75%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Заполняемость
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                    <Card sx={{ 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      borderRadius: 3
                    }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <PublicIcon sx={{ mr: 2, color: '#9c27b0' }} />
                        <Box>
                          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                            32%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Возвратные гости
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      borderRadius: 3
                    }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <DataUsageIcon sx={{ mr: 2, color: '#1976d2' }} />
                        <Box>
                          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#1976d2' }}>
                            25000₸
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ADR
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Call to Action */}
      <Box sx={{ 
        py: 8, 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        textAlign: 'center' 
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Готовы улучшить управление данными вашего отеля?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
            Начните использовать интерактивный дашборд Wyndham Garden Astana прямо сейчас!
          </Typography>
          <Stack direction={isMobile ? "column" : "row"} spacing={3} justifyContent="center">
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={handleRegisterClick}
              sx={{ 
                px: 4, 
                py: 1.5,
                boxShadow: '0 4px 14px 0 rgba(245, 0, 87, 0.4)',
              }}
            >
              Зарегистрироваться
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={handleLoginClick}
              sx={{ 
                px: 4, 
                py: 1.5,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Войти в систему
            </Button>
          </Stack>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box component="footer" sx={{ 
        py: 4, 
        backgroundColor: '#1a1a1a',
        color: 'rgba(255, 255, 255, 0.7)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HotelIcon sx={{ mr: 2, fontSize: 30 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'white' }}>
                  Wyndham Garden Astana
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ maxWidth: 400 }}>
                Интерактивный дашборд для визуализации ключевых показателей работы отеля Wyndham Garden Astana и быстрого анализа данных.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="white" gutterBottom>
                    Контакты
                  </Typography>
                  <Typography variant="body2">
                    г. Астана, ул. Примерная, 123
                  </Typography>
                  <Typography variant="body2">
                    +7 (7172) 123-45-67
                  </Typography>
                  <Typography variant="body2">
                    info@example.com
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="white" gutterBottom>
                    Навигация
                  </Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    onClick={handleLoginClick}
                    sx={{
                      display: 'block',
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': { color: 'white' }
                    }}
                  >
                    Войти
                  </Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    onClick={handleRegisterClick}
                    sx={{
                      display: 'block',
                      cursor: 'pointer',
                      '&:hover': { color: 'white' }
                    }}
                  >
                    Регистрация
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Wyndham Garden Astana Dashboard. Все права защищены.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 