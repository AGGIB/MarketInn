// Mock data for Wyndham Garden Astana Dashboard
// This file provides functions that simulate API responses based on filters

// KPI Metrics
export const getMetricsData = (dateRange, roomType, bookingSource) => {
  // We're simulating that different filter combinations affect the data
  let baseOccupancy = 75;
  let baseADR = 25000;
  let baseRevPAR = 18750;
  let baseReturnRate = 32;
  
  // Adjust based on date range
  switch(dateRange) {
    case 'day':
      baseOccupancy = 82;
      baseADR = 27000;
      baseRevPAR = 22140;
      break;
    case 'week':
      baseOccupancy = 78;
      baseADR = 26000;
      baseRevPAR = 20280;
      break;
    case 'quarter':
      baseOccupancy = 72;
      baseADR = 24000;
      baseRevPAR = 17280;
      break;
    case 'year':
      baseOccupancy = 70;
      baseADR = 23500;
      baseRevPAR = 16450;
      break;
    default: // month
      break;
  }
  
  // Adjust based on room type
  switch(roomType) {
    case 'standard':
      baseOccupancy += 5;
      baseADR -= 5000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate += 3;
      break;
    case 'deluxe':
      baseOccupancy -= 2;
      baseADR += 8000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate += 5;
      break;
    case 'suite':
      baseOccupancy -= 8;
      baseADR += 20000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate += 8;
      break;
    case 'family':
      baseOccupancy += 2;
      baseADR += 5000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate -= 2;
      break;
    default: // all
      break;
  }
  
  // Adjust based on booking source
  switch(bookingSource) {
    case 'website':
      baseOccupancy -= 3;
      baseADR -= 1000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate += 10;
      break;
    case 'booking':
      baseOccupancy += 7;
      baseADR -= 3000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate -= 5;
      break;
    case 'expedia':
      baseOccupancy += 5;
      baseADR -= 2000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate -= 3;
      break;
    case 'airbnb':
      baseOccupancy -= 2;
      baseADR += 2000;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate -= 7;
      break;
    case 'phone':
      baseOccupancy -= 5;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate += 8;
      break;
    case 'agency':
      baseOccupancy += 3;
      baseADR -= 1500;
      baseRevPAR = baseOccupancy * baseADR / 100;
      baseReturnRate += 2;
      break;
    default: // all
      break;
  }
  
  // Add randomness to make data look more natural
  const randomFactor = (min, max) => Math.random() * (max - min) + min;
  
  return {
    occupancyRate: Math.round(baseOccupancy * randomFactor(0.98, 1.02)),
    averageDailyRate: Math.round(baseADR * randomFactor(0.97, 1.03)),
    revenuePerRoom: Math.round(baseRevPAR * randomFactor(0.96, 1.04)),
    returningGuestRate: Math.round(baseReturnRate * randomFactor(0.95, 1.05)),
    bookingsCount: Math.round(250 * randomFactor(0.9, 1.1))
  };
};

// Occupancy Chart Data
export const getOccupancyData = (dateRange, roomType, bookingSource) => {
  let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  let weeks = ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'];
  let days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  let categories;
  switch(dateRange) {
    case 'day':
      categories = ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'];
      break;
    case 'week':
      categories = days;
      break;
    case 'month':
      categories = weeks;
      break;
    case 'quarter':
      categories = months.slice(0, 3);
      break;
    case 'year':
      categories = months;
      break;
    default:
      categories = weeks;
  }
  
  // Generate occupancy data with reasonable fluctuations
  return categories.map((name, index) => {
    // Base values that reflect typical hotel patterns
    const getBaseOccupancy = () => {
      if (dateRange === 'week') {
        // Weekends typically have higher occupancy
        return index >= 4 ? 85 : 70; 
      }
      if (dateRange === 'year') {
        // Summer months and December have higher occupancy
        return (index >= 5 && index <= 7) || index === 11 ? 85 : 70;
      }
      return 75;
    };
    
    const baseOccupancy = getBaseOccupancy();
    const randomVariation = () => Math.random() * 15 - 7.5; // +/- 7.5%
    
    let occupancy = baseOccupancy + randomVariation();
    let previousYear = baseOccupancy - 5 + randomVariation();
    
    // Adjust based on room type and booking source for more variation
    if (roomType === 'suite') occupancy -= 5;
    if (roomType === 'standard') occupancy += 7;
    if (bookingSource === 'booking') occupancy += 5;
    if (bookingSource === 'phone') occupancy -= 3;
    
    return {
      name,
      occupancy: Math.min(100, Math.max(50, Math.round(occupancy))),
      previousYear: Math.min(100, Math.max(40, Math.round(previousYear)))
    };
  });
};

// Booking Source Chart Data
export const getBookingSourceData = (dateRange, roomType) => {
  // Base distribution of booking sources
  let sources = [
    { name: 'Booking.com', value: 35 },
    { name: 'Сайт отеля', value: 20 },
    { name: 'Expedia', value: 15 },
    { name: 'Турагентства', value: 12 },
    { name: 'Телефон', value: 10 },
    { name: 'Airbnb', value: 8 }
  ];
  
  // Adjust based on filters
  if (roomType === 'suite') {
    sources = sources.map(source => {
      if (source.name === 'Сайт отеля') return { ...source, value: source.value + 8 };
      if (source.name === 'Телефон') return { ...source, value: source.value + 5 };
      if (source.name === 'Booking.com') return { ...source, value: source.value - 8 };
      if (source.name === 'Airbnb') return { ...source, value: source.value - 5 };
      return source;
    });
  }
  
  if (roomType === 'standard') {
    sources = sources.map(source => {
      if (source.name === 'Booking.com') return { ...source, value: source.value + 5 };
      if (source.name === 'Expedia') return { ...source, value: source.value + 3 };
      if (source.name === 'Сайт отеля') return { ...source, value: source.value - 5 };
      if (source.name === 'Телефон') return { ...source, value: source.value - 3 };
      return source;
    });
  }
  
  if (dateRange === 'year') {
    sources = sources.map(source => {
      if (source.name === 'Турагентства') return { ...source, value: source.value + 5 };
      if (source.name === 'Airbnb') return { ...source, value: source.value - 5 };
      return source;
    });
  }
  
  // Normalize to 100%
  const total = sources.reduce((sum, source) => sum + source.value, 0);
  return sources.map(source => ({
    ...source,
    value: Math.round((source.value / total) * 100)
  }));
};

// Guest Geography Chart Data
export const getGuestGeographyData = (dateRange, roomType, bookingSource) => {
  // Base distribution of guests by country/region
  let regions = [
    { name: 'Казахстан', value: 45 },
    { name: 'Россия', value: 20 },
    { name: 'Китай', value: 12 },
    { name: 'Европа', value: 10 },
    { name: 'Ближний Восток', value: 8 },
    { name: 'Другие', value: 5 }
  ];
  
  // Adjust based on filters
  if (bookingSource === 'booking') {
    regions = regions.map(region => {
      if (region.name === 'Европа') return { ...region, value: region.value + 7 };
      if (region.name === 'Казахстан') return { ...region, value: region.value - 7 };
      return region;
    });
  }
  
  if (bookingSource === 'website') {
    regions = regions.map(region => {
      if (region.name === 'Казахстан') return { ...region, value: region.value + 10 };
      if (region.name === 'Россия') return { ...region, value: region.value + 5 };
      if (region.name === 'Китай') return { ...region, value: region.value - 7 };
      if (region.name === 'Европа') return { ...region, value: region.value - 8 };
      return region;
    });
  }
  
  if (roomType === 'suite') {
    regions = regions.map(region => {
      if (region.name === 'Ближний Восток') return { ...region, value: region.value + 10 };
      if (region.name === 'Европа') return { ...region, value: region.value + 5 };
      if (region.name === 'Казахстан') return { ...region, value: region.value - 10 };
      if (region.name === 'Россия') return { ...region, value: region.value - 5 };
      return region;
    });
  }
  
  // Normalize to 100%
  const total = regions.reduce((sum, region) => sum + region.value, 0);
  return regions.map(region => ({
    ...region,
    value: Math.round((region.value / total) * 100)
  }));
};

// Bookings Data for the DataTable
export const getBookingsData = (dateRange, roomType, bookingSource) => {
  // Static mock data with reasonable variation
  const mockBookings = [
    {
      id: '1',
      guestName: 'Алексей Смирнов',
      roomType: 'standard',
      checkIn: '2023-11-15',
      checkOut: '2023-11-18',
      adults: 2,
      children: 0,
      source: 'booking',
      price: 75000,
      status: 'confirmed'
    },
    {
      id: '2',
      guestName: 'Анна Иванова',
      roomType: 'deluxe',
      checkIn: '2023-11-20',
      checkOut: '2023-11-25',
      adults: 2,
      children: 1,
      source: 'website',
      price: 125000,
      status: 'confirmed'
    },
    {
      id: '3',
      guestName: 'Жан Петров',
      roomType: 'suite',
      checkIn: '2023-12-01',
      checkOut: '2023-12-05',
      adults: 2,
      children: 0,
      source: 'agency',
      price: 200000,
      status: 'pending'
    },
    {
      id: '4',
      guestName: 'Мария Сидорова',
      roomType: 'family',
      checkIn: '2023-12-10',
      checkOut: '2023-12-15',
      adults: 2,
      children: 2,
      source: 'expedia',
      price: 150000,
      status: 'confirmed'
    },
    {
      id: '5',
      guestName: 'Сергей Козлов',
      roomType: 'standard',
      checkIn: '2023-11-22',
      checkOut: '2023-11-24',
      adults: 1,
      children: 0,
      source: 'phone',
      price: 50000,
      status: 'completed'
    },
    {
      id: '6',
      guestName: 'Ли Вэй',
      roomType: 'deluxe',
      checkIn: '2023-12-05',
      checkOut: '2023-12-10',
      adults: 2,
      children: 0,
      source: 'booking',
      price: 135000,
      status: 'confirmed'
    },
    {
      id: '7',
      guestName: 'Джон Смит',
      roomType: 'suite',
      checkIn: '2023-12-15',
      checkOut: '2023-12-20',
      adults: 2,
      children: 0,
      source: 'expedia',
      price: 225000,
      status: 'confirmed'
    },
    {
      id: '8',
      guestName: 'Елена Кузнецова',
      roomType: 'standard',
      checkIn: '2023-11-10',
      checkOut: '2023-11-12',
      adults: 2,
      children: 1,
      source: 'website',
      price: 60000,
      status: 'canceled'
    },
    {
      id: '9',
      guestName: 'Нурсултан Назарбаев',
      roomType: 'suite',
      checkIn: '2023-12-20',
      checkOut: '2023-12-25',
      adults: 2,
      children: 0,
      source: 'agency',
      price: 300000,
      status: 'pending'
    },
    {
      id: '10',
      guestName: 'Айгуль Жексенова',
      roomType: 'family',
      checkIn: '2023-12-24',
      checkOut: '2023-12-28',
      adults: 2,
      children: 3,
      source: 'phone',
      price: 180000,
      status: 'confirmed'
    },
    {
      id: '11',
      guestName: 'Александр Попов',
      roomType: 'standard',
      checkIn: '2023-12-01',
      checkOut: '2023-12-03',
      adults: 1,
      children: 0,
      source: 'booking',
      price: 55000,
      status: 'confirmed'
    },
    {
      id: '12',
      guestName: 'Мухаммед Али',
      roomType: 'deluxe',
      checkIn: '2023-12-10',
      checkOut: '2023-12-15',
      adults: 2,
      children: 0,
      source: 'airbnb',
      price: 140000,
      status: 'confirmed'
    },
    {
      id: '13',
      guestName: 'Амина Рахимова',
      roomType: 'standard',
      checkIn: '2023-11-25',
      checkOut: '2023-11-27',
      adults: 2,
      children: 0,
      source: 'website',
      price: 58000,
      status: 'completed'
    },
    {
      id: '14',
      guestName: 'Виктор Сергеев',
      roomType: 'family',
      checkIn: '2023-12-22',
      checkOut: '2023-12-28',
      adults: 2,
      children: 2,
      source: 'expedia',
      price: 175000,
      status: 'confirmed'
    },
    {
      id: '15',
      guestName: 'Адам Смит',
      roomType: 'suite',
      checkIn: '2023-12-28',
      checkOut: '2024-01-03',
      adults: 2,
      children: 0,
      source: 'booking',
      price: 280000,
      status: 'pending'
    },
    {
      id: '16',
      guestName: 'Ольга Белова',
      roomType: 'standard',
      checkIn: '2023-12-05',
      checkOut: '2023-12-08',
      adults: 1,
      children: 0,
      source: 'phone',
      price: 62000,
      status: 'confirmed'
    },
    {
      id: '17',
      guestName: 'Михаил Дорохов',
      roomType: 'deluxe',
      checkIn: '2023-12-15',
      checkOut: '2023-12-18',
      adults: 2,
      children: 1,
      source: 'website',
      price: 130000,
      status: 'confirmed'
    },
    {
      id: '18',
      guestName: 'Артур Ким',
      roomType: 'standard',
      checkIn: '2023-11-28',
      checkOut: '2023-11-30',
      adults: 2,
      children: 0,
      source: 'airbnb',
      price: 59000,
      status: 'canceled'
    },
    {
      id: '19',
      guestName: 'Карина Ахметова',
      roomType: 'family',
      checkIn: '2023-12-26',
      checkOut: '2023-12-30',
      adults: 2,
      children: 1,
      source: 'booking',
      price: 165000,
      status: 'confirmed'
    },
    {
      id: '20',
      guestName: 'Дмитрий Иванов',
      roomType: 'suite',
      checkIn: '2023-12-30',
      checkOut: '2024-01-05',
      adults: 2,
      children: 0,
      source: 'agency',
      price: 295000,
      status: 'pending'
    }
  ];

  // Filter based on room type
  let filteredBookings = [...mockBookings];
  
  if (roomType !== 'all') {
    filteredBookings = filteredBookings.filter(booking => booking.roomType === roomType);
  }
  
  // Filter based on booking source
  if (bookingSource !== 'all') {
    filteredBookings = filteredBookings.filter(booking => booking.source === bookingSource);
  }
  
  // For dateRange, we would need actual date filtering logic
  // This is simplified for the mock data
  
  return filteredBookings;
}; 