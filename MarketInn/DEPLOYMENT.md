# MarketInn Deployment Guide

This document provides detailed instructions for deploying the MarketInn Hotel Marketing Analytics Dashboard.

## Project Structure

```
MarketInn/
├── public/              # Static files
├── src/                 # Application source code
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── data/            # Mock data generators
│   ├── pages/           # Main application pages
│   └── utils/           # Utility functions
└── package.json         # Dependencies and scripts
```

## Key Files Explanation

- **src/App.js**: Main application component with routing
- **src/data/marketingData.js**: Contains all mock data generators for the marketing dashboard
- **src/data/translations.js**: Contains multilingual support (Russian/Kazakh)
- **src/components/BrandPresence3D.js**: The 3D visualization component using Three.js
- **src/pages/MarketingDashboard.js**: Main dashboard page
- **src/pages/LoginPage.js**: Authentication page

## Mock Data Implementation

This application operates entirely with front-end mock data generators, making it easy to deploy without backend dependencies. The data generation is handled in:

1. **src/data/marketingData.js**: Marketing KPIs, social media metrics, campaign data
2. **src/data/mockData.js**: Additional mock data utilities (if present)

Functions simulate API responses with realistic data variations based on:
- Selected date ranges (day, week, month, quarter, year)
- Filter selections
- Random variations for realism

## Deployment Options

### 1. Static Hosting (Recommended)

1. Build the application:
   ```
   npm run build
   ```

2. Deploy the generated `build` folder to:
   - Amazon S3
   - Google Firebase Hosting
   - Netlify
   - Vercel
   - GitHub Pages

### 2. Docker Deployment

1. Create a Dockerfile in the project root:
   ```dockerfile
   FROM node:16-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:stable-alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Build and run the Docker image:
   ```
   docker build -t marketinn .
   docker run -p 80:80 marketinn
   ```

## Post-Deployment Verification

After deploying, verify the following:
1. Login functionality works with test credentials
2. Dashboard loads correctly with mock data
3. 3D visualization renders properly
4. All charts and metrics display correctly
5. Language switching works between Russian and Kazakh

## Customization

To customize the mock data:
1. Modify values in `src/data/marketingData.js`
2. Adjust the random variation factors for more realistic data
3. Update the hotel branding in the UI components

## Connecting to a Real Backend (Future Enhancement)

The application is designed to work with mock data but could be extended to use a real backend:
1. Create API service files for each data type
2. Replace mock data function calls with API calls
3. Implement proper error handling and loading states

## Troubleshooting

- **3D Visualization Not Rendering**: Check that Three.js is properly loaded
- **Charts Not Displaying**: Verify that Recharts is installed correctly
- **Styling Issues**: Ensure Material UI is properly configured 