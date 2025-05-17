// Mock data for Hotel Marketing Analytics Dashboard

// Social Media Analytics Data
export const getSocialMediaData = (dateRange) => {
  // Base followers for each platform
  const platforms = [
    { 
      id: 1,
      name: 'Instagram', 
      icon: 'instagram',
      account: '@wyndham_astana',
      followers: 24500, 
      growth: 5.2,
      engagementRate: 3.8,
      audienceHistory: [],
      engagement: {
        likes: 12340,
        comments: 3250,
        shares: 1870,
        savedPosts: 920
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 28 },
          { group: '25-34', percentage: 42 },
          { group: '35-44', percentage: 18 },
          { group: '45-54', percentage: 8 },
          { group: '55+', percentage: 4 }
        ],
        gender: [
          { type: 'Женщины', percentage: 65 },
          { type: 'Мужчины', percentage: 35 }
        ],
        locations: [
          { city: 'Астана', percentage: 42 },
          { city: 'Алматы', percentage: 18 },
          { city: 'Шымкент', percentage: 7 },
          { city: 'Караганда', percentage: 5 },
          { city: 'Другие', percentage: 28 }
        ]
      },
      reachData: {
        impressions: 156000,
        reach: 89200,
        profileVisits: 12300,
        websiteClicks: 3400
      },
      topPosts: [
        {
          id: 'post1',
          imageUrl: 'https://via.placeholder.com/300x300',
          title: 'Летний отдых в Wyndham Garden',
          date: '2023-06-15',
          likes: 1245,
          comments: 87,
          shares: 43,
          engagement: 5.2
        },
        {
          id: 'post2',
          imageUrl: 'https://via.placeholder.com/300x300',
          title: 'Бизнес конференции',
          date: '2023-05-22',
          likes: 985,
          comments: 52,
          shares: 36,
          engagement: 4.8
        },
        {
          id: 'post3',
          imageUrl: 'https://via.placeholder.com/300x300',
          title: 'Завтраки в отеле',
          date: '2023-04-10',
          likes: 1120,
          comments: 94,
          shares: 38,
          engagement: 4.9
        }
      ]
    },
    { 
      id: 2,
      name: 'Facebook', 
      icon: 'facebook',
      account: 'Wyndham Garden Astana',
      followers: 18200, 
      growth: 2.1,
      engagementRate: 1.9,
      audienceHistory: [],
      engagement: {
        likes: 8650,
        comments: 1840,
        shares: 2310,
        savedPosts: 560
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 14 },
          { group: '25-34', percentage: 32 },
          { group: '35-44', percentage: 28 },
          { group: '45-54', percentage: 16 },
          { group: '55+', percentage: 10 }
        ],
        gender: [
          { type: 'Женщины', percentage: 58 },
          { type: 'Мужчины', percentage: 42 }
        ],
        locations: [
          { city: 'Астана', percentage: 38 },
          { city: 'Алматы', percentage: 15 },
          { city: 'Шымкент', percentage: 6 },
          { city: 'Караганда', percentage: 7 },
          { city: 'Другие', percentage: 34 }
        ]
      },
      reachData: {
        impressions: 89400,
        reach: 52800,
        profileVisits: 7600,
        websiteClicks: 2100
      },
      topPosts: [
        {
          id: 'fbpost1',
          imageUrl: 'https://via.placeholder.com/300x300',
          title: 'Акция на проживание',
          date: '2023-07-05',
          likes: 865,
          comments: 42,
          shares: 123,
          engagement: 3.8
        },
        {
          id: 'fbpost2',
          imageUrl: 'https://via.placeholder.com/300x300',
          title: 'Конференц-залы',
          date: '2023-06-12',
          likes: 742,
          comments: 28,
          shares: 35,
          engagement: 3.4
        }
      ]
    },
    { 
      id: 3,
      name: '2GIS', 
      icon: '2gis',
      account: 'Wyndham Garden Hotel',
      followers: 32800, 
      growth: 7.6,
      engagementRate: 4.1,
      audienceHistory: [],
      engagement: {
        reviews: 2840,
        rating: 4.7,
        viewedPhotos: 15700,
        routesBuilt: 4230
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 18 },
          { group: '25-34', percentage: 36 },
          { group: '35-44', percentage: 24 },
          { group: '45-54', percentage: 14 },
          { group: '55+', percentage: 8 }
        ],
        gender: [
          { type: 'Женщины', percentage: 52 },
          { type: 'Мужчины', percentage: 48 }
        ],
        locations: [
          { city: 'Астана', percentage: 54 },
          { city: 'Алматы', percentage: 12 },
          { city: 'Шымкент', percentage: 6 },
          { city: 'Караганда', percentage: 5 },
          { city: 'Другие', percentage: 23 }
        ]
      },
      reachData: {
        impressions: 127500,
        clicks: 23400,
        calls: 1840,
        routeBuilds: 4230
      },
      topContent: [
        {
          id: 'gc1',
          title: 'Отзыв месяца',
          text: 'Отличный сервис и комфортное проживание...',
          date: '2023-07-18',
          rating: 5,
          likes: 34
        },
        {
          id: 'gc2',
          title: 'Популярное фото',
          imageUrl: 'https://via.placeholder.com/300x200',
          date: '2023-06-30',
          views: 1245
        }
      ]
    },
    { 
      id: 4,
      name: 'Booking.com', 
      icon: 'booking',
      account: 'Wyndham Garden Astana',
      followers: 42300, 
      growth: 3.9,
      engagementRate: 4.5,
      audienceHistory: [],
      engagement: {
        reviews: 3620,
        rating: 8.8,
        roomViews: 26500,
        bookingAttempts: 8740
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 12 },
          { group: '25-34', percentage: 31 },
          { group: '35-44', percentage: 28 },
          { group: '45-54', percentage: 18 },
          { group: '55+', percentage: 11 }
        ],
        gender: [
          { type: 'Женщины', percentage: 48 },
          { type: 'Мужчины', percentage: 52 }
        ],
        locations: [
          { city: 'Казахстан', percentage: 62 },
          { city: 'Россия', percentage: 14 },
          { city: 'Китай', percentage: 8 },
          { city: 'Европа', percentage: 10 },
          { city: 'Другие', percentage: 6 }
        ]
      },
      reachData: {
        impressions: 184000,
        pageViews: 56700,
        bookings: 4250,
        revenue: 127500000
      },
      topReviews: [
        {
          id: 'br1',
          author: 'Александр',
          country: 'Казахстан',
          date: '2023-07-10',
          text: 'Прекрасный отель, очень комфортные номера и отличный сервис.',
          rating: 9.2,
          helpful: 28
        },
        {
          id: 'br2',
          author: 'Elena',
          country: 'Россия',
          date: '2023-06-25',
          text: 'Хорошее месторасположение, чистые номера, внимательный персонал.',
          rating: 8.7,
          helpful: 15
        }
      ]
    },
    { 
      id: 5,
      name: 'TripAdvisor', 
      icon: 'tripadvisor',
      account: 'Wyndham Garden Astana',
      followers: 15800, 
      growth: 4.3,
      engagementRate: 3.7,
      audienceHistory: [],
      engagement: {
        reviews: 2240,
        rating: 4.5,
        photos: 1870,
        questions: 320
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 9 },
          { group: '25-34', percentage: 27 },
          { group: '35-44', percentage: 33 },
          { group: '45-54', percentage: 20 },
          { group: '55+', percentage: 11 }
        ],
        gender: [
          { type: 'Женщины', percentage: 51 },
          { type: 'Мужчины', percentage: 49 }
        ],
        locations: [
          { city: 'Казахстан', percentage: 45 },
          { city: 'Россия', percentage: 12 },
          { city: 'США', percentage: 10 },
          { city: 'Европа', percentage: 18 },
          { city: 'Другие', percentage: 15 }
        ]
      },
      reachData: {
        impressions: 67500,
        pageViews: 18900,
        bookingInquiries: 3150,
        photoViews: 24600
      },
      topReviews: [
        {
          id: 'ta1',
          author: 'JohnT',
          country: 'США',
          date: '2023-06-18',
          text: 'Great hotel with excellent amenities and friendly staff.',
          rating: 5,
          helpful: 42
        },
        {
          id: 'ta2',
          author: 'MariaK',
          country: 'Германия',
          date: '2023-07-02',
          text: 'Modern hotel with comfortable rooms and good breakfast.',
          rating: 4,
          helpful: 36
        }
      ]
    },
    { 
      id: 6,
      name: 'Google Maps', 
      icon: 'googlemaps',
      account: 'Wyndham Garden Astana',
      followers: 27400, 
      growth: 6.8,
      engagementRate: 3.4,
      audienceHistory: [],
      engagement: {
        reviews: 3150,
        rating: 4.6,
        photos: 2340,
        websiteClicks: 4870
      },
      demographicData: {
        age: [
          { group: '18-24', percentage: 16 },
          { group: '25-34', percentage: 34 },
          { group: '35-44', percentage: 26 },
          { group: '45-54', percentage: 15 },
          { group: '55+', percentage: 9 }
        ],
        gender: [
          { type: 'Женщины', percentage: 47 },
          { type: 'Мужчины', percentage: 53 }
        ],
        locations: [
          { city: 'Астана', percentage: 58 },
          { city: 'Алматы', percentage: 14 },
          { city: 'Международные', percentage: 28 }
        ]
      },
      reachData: {
        impressions: 152000,
        searches: 78500,
        directions: 12600,
        calls: 2780
      },
      topContent: [
        {
          id: 'gm1',
          type: 'Отзыв',
          author: 'Азамат К.',
          date: '2023-07-15',
          text: 'Отличный отель, удобно расположен в центре города.',
          rating: 5
        },
        {
          id: 'gm2',
          type: 'Фото',
          imageUrl: 'https://via.placeholder.com/300x200',
          views: 2450,
          date: '2023-05-20'
        }
      ]
    }
  ];

  // Generate audience history based on dateRange
  const days = dateRange === 'day' ? 24 : // hours in a day
               dateRange === 'week' ? 7 : // days in a week
               dateRange === 'month' ? 30 : // days in a month
               dateRange === 'quarter' ? 90 : // days in a quarter
               365; // days in a year

  const historyData = [];
  const dateFormat = dateRange === 'day' ? 
                    (i) => `${i}:00` :
                    (i) => {
                      const today = new Date();
                      const date = new Date();
                      date.setDate(today.getDate() - (days - i - 1));
                      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    };

  for (let i = 0; i < (dateRange === 'day' ? 24 : Math.min(days, 30)); i++) {
    const dataPoint = {
      date: dateFormat(i)
    };

    platforms.forEach(platform => {
      const platformName = platform.name.toLowerCase();
      const key = platformName === 'booking.com' ? 'booking' : 
                 platformName === '2gis' ? '2gis' :
                 platformName === 'tripadvisor' ? 'tripadvisor' :
                 platformName === 'google maps' ? 'googlemaps' : platformName;
      
      // Base value plus some random variations to make it look realistic
      const baseValue = platform.followers * 0.9;
      const rand = () => Math.random() * 0.2 - 0.1; // -10% to +10%
      
      dataPoint[key] = Math.floor(baseValue * (1 + rand()) + (i * platform.growth * 10));
    });
    
    historyData.push(dataPoint);
  }

  // Set audience history for each platform
  platforms.forEach(platform => {
    platform.audienceHistory = historyData;
  });

  return platforms;
};

// Channel Conversion Data
export const getChannelConversions = (dateRange) => {
  // Base conversions
  const baseData = [
    {
      name: 'Instagram',
      impressions: 125000,
      clicks: 7500,
      conversions: 750,
      conversionRate: 10,
      costPerClick: 85,
      costPerConversion: 850
    },
    {
      name: 'Facebook',
      impressions: 95000,
      clicks: 4800,
      conversions: 520,
      conversionRate: 10.8,
      costPerClick: 92,
      costPerConversion: 850
    },
    {
      name: '2GIS',
      impressions: 72000,
      clicks: 8600,
      conversions: 1250,
      conversionRate: 14.5,
      costPerClick: 65,
      costPerConversion: 448
    },
    {
      name: 'Booking.com',
      impressions: 210000,
      clicks: 18500,
      conversions: 2800,
      conversionRate: 15.1,
      costPerClick: 105,
      costPerConversion: 695
    },
    {
      name: 'TripAdvisor',
      impressions: 68000,
      clicks: 5200,
      conversions: 580,
      conversionRate: 11.2,
      costPerClick: 78,
      costPerConversion: 696
    },
    {
      name: 'Google Ads',
      impressions: 185000,
      clicks: 14200,
      conversions: 1850,
      conversionRate: 13.0,
      costPerClick: 95,
      costPerConversion: 731
    },
    {
      name: 'Сайт отеля',
      impressions: 42000,
      clicks: 9800,
      conversions: 1450,
      conversionRate: 14.8,
      costPerClick: 0,
      costPerConversion: 0
    }
  ];

  // Adjust data based on dateRange
  const multiplier = dateRange === 'day' ? 0.03 : 
                    dateRange === 'week' ? 0.25 : 
                    dateRange === 'month' ? 1 : 
                    dateRange === 'quarter' ? 3 : 12;
  
  // Add some random variation
  const randomVariation = () => Math.random() * 0.4 + 0.8; // 80% to 120% of base value
  
  return baseData.map(channel => ({
    ...channel,
    impressions: Math.round(channel.impressions * multiplier * randomVariation()),
    clicks: Math.round(channel.clicks * multiplier * randomVariation()),
    conversions: Math.round(channel.conversions * multiplier * randomVariation()),
    // Recalculate conversion rate based on new values
    get conversionRate() {
      return parseFloat(((this.conversions / this.clicks) * 100).toFixed(1));
    }
  }));
};

// Marketing Campaigns Data
export const getMarketingCampaigns = (dateRange) => {
  const baseCampaigns = [
    {
      id: 1,
      name: 'Летний отдых',
      platform: 'instagram',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      budget: 250000,
      spent: 175000,
      conversions: 420,
      leads: 840,
      impressions: 86000,
      clicks: 3200,
      roi: 187,
      progress: 70,
      ctr: 3.72,
      cpc: 54.69,
      cpac: 208.33,
      targetAudience: 'Семьи, пары, 25-45 лет',
      description: 'Летняя кампания для привлечения гостей на отдых',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'video', url: 'https://via.placeholder.com/1280x720' }
      ]
    },
    {
      id: 2,
      name: 'Бизнес-туристы',
      platform: 'facebook',
      status: 'active',
      startDate: '2023-05-15',
      endDate: '2023-09-15',
      budget: 180000,
      spent: 130000,
      conversions: 280,
      leads: 560,
      impressions: 72000,
      clicks: 2800,
      roi: 132,
      progress: 72,
      ctr: 3.89,
      cpc: 46.43,
      cpac: 232.14,
      targetAudience: 'Бизнес-путешественники, 30-55 лет',
      description: 'Кампания для привлечения бизнес-гостей',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'image', url: 'https://via.placeholder.com/800x600' }
      ]
    },
    {
      id: 3,
      name: 'Локальные гости',
      platform: '2gis',
      status: 'active',
      startDate: '2023-06-10',
      endDate: '2023-08-10',
      budget: 120000,
      spent: 90000,
      conversions: 310,
      leads: 620,
      impressions: 95000,
      clicks: 4200,
      roi: 169,
      progress: 75,
      ctr: 4.42,
      cpc: 21.43,
      cpac: 145.16,
      targetAudience: 'Локальные жители, 20-60 лет',
      description: 'Кампания для привлечения местных гостей',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'text', content: 'Специальные предложения для жителей города' }
      ]
    },
    {
      id: 4,
      name: 'Туристический сезон',
      platform: 'booking',
      status: 'active',
      startDate: '2023-04-01',
      endDate: '2023-10-31',
      budget: 350000,
      spent: 235000,
      conversions: 520,
      leads: 1040,
      impressions: 125000,
      clicks: 6800,
      roi: 142,
      progress: 67,
      ctr: 5.44,
      cpc: 34.56,
      cpac: 451.92,
      targetAudience: 'Международные туристы, 25-65 лет',
      description: 'Сезонная кампания для привлечения туристов',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'text', content: 'Специальные сезонные предложения' }
      ]
    },
    {
      id: 5,
      name: 'Конференц-услуги',
      platform: 'google',
      status: 'active',
      startDate: '2023-03-15',
      endDate: '2023-11-15',
      budget: 280000,
      spent: 160000,
      conversions: 180,
      leads: 360,
      impressions: 78000,
      clicks: 3400,
      roi: 125,
      progress: 57,
      ctr: 4.36,
      cpc: 47.06,
      cpac: 888.89,
      targetAudience: 'Корпоративные клиенты, 30-55 лет',
      description: 'Кампания для продвижения конференц-услуг отеля',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'document', url: 'https://example.com/conference_services.pdf' }
      ]
    },
    {
      id: 6,
      name: 'Свадебные мероприятия',
      platform: 'instagram',
      status: 'planned',
      startDate: '2023-09-01',
      endDate: '2023-12-31',
      budget: 150000,
      spent: 0,
      conversions: 0,
      leads: 0,
      impressions: 0,
      clicks: 0,
      roi: 0,
      progress: 0,
      ctr: 0,
      cpc: 0,
      cpac: 0,
      targetAudience: 'Пары, планирующие свадьбу, 22-40 лет',
      description: 'Кампания для продвижения свадебных услуг',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'video', url: 'https://via.placeholder.com/1280x720' }
      ]
    },
    {
      id: 7,
      name: 'Зимние праздники',
      platform: 'facebook',
      status: 'planned',
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      budget: 200000,
      spent: 0,
      conversions: 0,
      leads: 0,
      impressions: 0,
      clicks: 0,
      roi: 0,
      progress: 0,
      ctr: 0,
      cpc: 0,
      cpac: 0,
      targetAudience: 'Семьи, группы друзей, 20-60 лет',
      description: 'Новогодняя и зимняя праздничная кампания',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'text', content: 'Праздничные специальные предложения' }
      ]
    },
    {
      id: 8,
      name: 'Выходные в городе',
      platform: 'tripadvisor',
      status: 'completed',
      startDate: '2023-02-01',
      endDate: '2023-04-30',
      budget: 130000,
      spent: 130000,
      conversions: 240,
      leads: 480,
      impressions: 65000,
      clicks: 3200,
      roi: 158,
      progress: 100,
      ctr: 4.92,
      cpc: 40.63,
      cpac: 541.67,
      targetAudience: 'Городские жители, 25-45 лет',
      description: 'Кампания для продвижения городских выходных',
      content: [
        { type: 'image', url: 'https://via.placeholder.com/800x600' },
        { type: 'text', content: 'Идеальные выходные в городе' }
      ]
    }
  ];

  // Return appropriate data based on date range with more detail
  return baseCampaigns.map(campaign => {
    // If the date range is not year, filter out some planned campaigns for shorter periods
    if (dateRange !== 'year' && dateRange !== 'quarter' && campaign.status === 'planned') {
      // For shorter date ranges, show fewer planned campaigns (randomly)
      if (Math.random() < 0.5) return null;
    }
    
    // Add some randomness to stats for realism
    const randomFactor = 0.9 + Math.random() * 0.2;
    
    return {
      ...campaign,
      conversions: campaign.status === 'active' || campaign.status === 'completed' 
        ? Math.round(campaign.conversions * randomFactor) 
        : campaign.conversions,
      leads: campaign.status === 'active' || campaign.status === 'completed'
        ? Math.round(campaign.leads * randomFactor)
        : campaign.leads,
      impressions: campaign.status === 'active' || campaign.status === 'completed'
        ? Math.round(campaign.impressions * randomFactor)
        : campaign.impressions,
      clicks: campaign.status === 'active' || campaign.status === 'completed'
        ? Math.round(campaign.clicks * randomFactor)
        : campaign.clicks,
      roi: campaign.status === 'active' || campaign.status === 'completed'
        ? Math.round(campaign.roi * randomFactor)
        : campaign.roi
    };
  }).filter(Boolean); // Remove null items
};

// Booking Trends Data
export const getBookingTrends = (dateRange) => {
  const days = dateRange === 'day' ? 24 : // hours in a day
               dateRange === 'week' ? 7 : // days in a week
               dateRange === 'month' ? 30 : // days in a month
               dateRange === 'quarter' ? 13 : // weeks in a quarter
               12; // months in a year

  const dateFormat = dateRange === 'day' ? 
                    (i) => `${i}:00` :
                    dateRange === 'quarter' ?
                    (i) => `Нед ${i+1}` :
                    dateRange === 'year' ?
                    (i) => {
                      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
                      return months[i];
                    } :
                    (i) => {
                      const today = new Date();
                      const date = new Date();
                      date.setDate(today.getDate() - (days - i - 1));
                      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    };

  const data = [];
  
  // Generate some realistic pattern for bookings
  for (let i = 0; i < days; i++) {
    // Create some patterns in the data
    const dayFactor = dateRange === 'week' ? 
                      // Weekend peak for weekly view
                      (i >= 5) ? 1.5 : 1 :
                      dateRange === 'year' ? 
                      // Summer peak and December peak for yearly view
                      (i >= 5 && i <= 7) ? 1.6 : (i === 11) ? 1.4 : 1 :
                      1;
    
    // Random component
    const rand = () => Math.random() * 0.3 + 0.85; // 85% to 115% randomness
    
    data.push({
      date: dateFormat(i),
      direct: Math.round(35 * dayFactor * rand()),
      social: Math.round(22 * dayFactor * rand()),
      booking: Math.round(48 * dayFactor * rand()),
      '2gis': Math.round(18 * dayFactor * rand()),
      tripadvisor: Math.round(12 * dayFactor * rand()),
      googlemaps: Math.round(15 * dayFactor * rand())
    });
  }
  
  return data;
};

// Additional Performance Statistics
export const getPerformanceStats = (dateRange) => {
  // Calculate date multiplier
  const multiplier = dateRange === 'day' ? 0.03 : 
                    dateRange === 'week' ? 0.25 : 
                    dateRange === 'month' ? 1 : 
                    dateRange === 'quarter' ? 3 : 12;
  
  // Base stats
  const baseStats = {
    averageStay: 2.7,
    occupancyRate: 78,
    revenuePerAvailableRoom: 25600,
    averageDailyRate: 32800,
    repeatVisitors: 28,
    customerSatisfaction: 92,
    websiteTraffic: 45600,
    mobileTraffic: 32800,
    directBookingPercentage: 42,
    oTABookingPercentage: 58,
    peakBookingTimes: [
      { hour: '09:00', percentage: 8 },
      { hour: '12:00', percentage: 12 },
      { hour: '15:00', percentage: 15 },
      { hour: '18:00', percentage: 22 },
      { hour: '21:00', percentage: 18 },
      { hour: '23:00', percentage: 10 }
    ],
    marketingROI: 245,
    channelEfficiency: [
      { channel: 'Social Media', cost: 34, revenue: 128 },
      { channel: 'Search', cost: 42, revenue: 196 },
      { channel: 'Direct', cost: 12, revenue: 87 },
      { channel: 'Email', cost: 8, revenue: 63 },
      { channel: 'Referral', cost: 15, revenue: 52 }
    ],
    costPerAcquisition: {
      social: 2840,
      search: 3250,
      direct: 0,
      ota: 4125
    },
    campaignComparison: {
      budget: [250000, 180000, 120000, 350000, 280000],
      roi: [187, 132, 169, 142, 125],
      campaigns: ['Летний отдых', 'Бизнес-туристы', 'Локальные гости', 'Туристический сезон', 'Конференц-услуги']
    },
    geographicDistribution: {
      domestic: 62,
      international: 38,
      regions: [
        { name: 'Астана', percentage: 28 },
        { name: 'Алматы', percentage: 15 },
        { name: 'Другие города Казахстана', percentage: 19 },
        { name: 'Россия', percentage: 16 },
        { name: 'Европа', percentage: 12 },
        { name: 'Азия', percentage: 7 },
        { name: 'Другие', percentage: 3 }
      ]
    },
    bookingDevices: {
      mobile: 58,
      desktop: 32,
      tablet: 10
    }
  };
  
  // Random variation for each value
  const randomVariation = () => Math.random() * 0.2 + 0.9; // 90% to 110% of base value
  
  // Apply date range multiplier and randomness to certain fields
  return {
    ...baseStats,
    websiteTraffic: Math.round(baseStats.websiteTraffic * multiplier * randomVariation()),
    mobileTraffic: Math.round(baseStats.mobileTraffic * multiplier * randomVariation()),
    averageStay: parseFloat((baseStats.averageStay * randomVariation()).toFixed(1)),
    occupancyRate: Math.min(100, Math.round(baseStats.occupancyRate * randomVariation())),
    revenuePerAvailableRoom: Math.round(baseStats.revenuePerAvailableRoom * randomVariation()),
    averageDailyRate: Math.round(baseStats.averageDailyRate * randomVariation()),
    repeatVisitors: Math.min(100, Math.round(baseStats.repeatVisitors * randomVariation())),
    customerSatisfaction: Math.min(100, Math.round(baseStats.customerSatisfaction * randomVariation()))
  };
}; 