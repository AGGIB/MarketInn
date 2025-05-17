import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const GuestGeographyChart = ({ data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      {data.length === 0 ? (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%' 
          }}
        >
          Нет данных для отображения
        </Typography>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: theme.palette.text.secondary }}
              stroke={theme.palette.divider}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: theme.palette.text.secondary }}
              stroke={theme.palette.divider}
            />
            <Tooltip
              formatter={(value, name) => [`${value}%`, 'Процент гостей']}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Legend />
            <Bar 
              dataKey="value" 
              name="Процент гостей" 
              fill={theme.palette.primary.main} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default GuestGeographyChart; 