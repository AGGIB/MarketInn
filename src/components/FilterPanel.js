import React from 'react';
import { Paper, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const FilterPanel = ({ dateRange, roomType, bookingSource, onFilterChange }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      {/* eslint-disable-next-line */}
      <Grid container spacing={3} alignItems="center">
        {/* eslint-disable-next-line */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterAltIcon sx={{ mr: 1 }} color="primary" />
            Фильтры:
          </Typography>
        </Grid>
        
        {/* eslint-disable-next-line */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="date-range-label">Период</InputLabel>
            <Select
              labelId="date-range-label"
              id="date-range"
              value={dateRange}
              label="Период"
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
            >
              <MenuItem value="day">Сегодня</MenuItem>
              <MenuItem value="week">Неделя</MenuItem>
              <MenuItem value="month">Месяц</MenuItem>
              <MenuItem value="quarter">Квартал</MenuItem>
              <MenuItem value="year">Год</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* eslint-disable-next-line */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="room-type-label">Тип номера</InputLabel>
            <Select
              labelId="room-type-label"
              id="room-type"
              value={roomType}
              label="Тип номера"
              onChange={(e) => onFilterChange('roomType', e.target.value)}
            >
              <MenuItem value="all">Все типы</MenuItem>
              <MenuItem value="standard">Стандартный</MenuItem>
              <MenuItem value="deluxe">Делюкс</MenuItem>
              <MenuItem value="suite">Люкс</MenuItem>
              <MenuItem value="family">Семейный</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* eslint-disable-next-line */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="booking-source-label">Источник бронирования</InputLabel>
            <Select
              labelId="booking-source-label"
              id="booking-source"
              value={bookingSource}
              label="Источник бронирования"
              onChange={(e) => onFilterChange('bookingSource', e.target.value)}
            >
              <MenuItem value="all">Все источники</MenuItem>
              <MenuItem value="website">Сайт отеля</MenuItem>
              <MenuItem value="booking">Booking.com</MenuItem>
              <MenuItem value="expedia">Expedia</MenuItem>
              <MenuItem value="airbnb">Airbnb</MenuItem>
              <MenuItem value="phone">Телефон</MenuItem>
              <MenuItem value="agency">Турагентства</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPanel; 