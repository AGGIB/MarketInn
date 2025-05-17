import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useTheme } from '@mui/material/styles';

const OccupancyChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
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
          domain={[0, 100]}
          tick={{ fill: theme.palette.text.secondary }}
          stroke={theme.palette.divider}
        />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'Заполняемость']}
          contentStyle={{ 
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="occupancy"
          name="Заполняемость"
          stroke={theme.palette.primary.main}
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="previousYear"
          name="Прошлый год"
          stroke={theme.palette.grey[500]}
          strokeDasharray="5 5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OccupancyChart; 