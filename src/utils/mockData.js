import { faker } from '@faker-js/faker/locale/ru';
import dayjs from 'dayjs';

// Generate a random list of bookings
const generateBookings = (count = 100) => {
  const statuses = ['confirmed', 'pending', 'cancelled', 'completed'];
  const roomTypes = ['standard', 'deluxe', 'suite', 'family'];
  const sources = ['booking', 'website', 'expedia', 'agency', 'phone', 'airbnb'];
  
  return Array.from({ length: count }, (_, index) => {
    const checkIn = faker.date.between({
      from: dayjs().subtract(30, 'days').toDate(), 
      to: dayjs().add(60, 'days').toDate()
    });
    
    const nights = faker.number.int({ min: 1, max: 14 });
    const checkOut = dayjs(checkIn).add(nights, 'days').toDate();
    const roomType = faker.helpers.arrayElement(roomTypes);
    
    // Price based on room type
    let basePrice;
    switch (roomType) {
      case 'standard': basePrice = 5000; break;
      case 'deluxe': basePrice = 8000; break;
      case 'suite': basePrice = 12000; break;
      case 'family': basePrice = 10000; break;
      default: basePrice = 5000;
    }
    
    const adults = faker.number.int({ min: 1, max: roomType === 'family' ? 4 : 2 });
    const children = faker.number.int({ min: 0, max: roomType === 'family' ? 3 : 1 });
    
    return {
      id: index + 1,
      guestName: faker.person.fullName(),
      checkIn,
      checkOut,
      nights,
      roomType,
      adults,
      children,
      source: faker.helpers.arrayElement(sources),
      price: basePrice * nights,
      status: faker.helpers.arrayElement(statuses),
      createdAt: faker.date.recent({ days: 30 }),
      notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 })
    };
  });
};

// Mock bookings data
const mockBookings = generateBookings();

// Filter bookings based on filters
export const getBookingsData = (filters = {}) => {
  const { dateRange, roomType, bookingSource } = filters;
  
  let filteredData = [...mockBookings];
  
  // Filter by date range
  if (dateRange && dateRange[0] && dateRange[1]) {
    const startDate = dayjs(dateRange[0]).startOf('day');
    const endDate = dayjs(dateRange[1]).endOf('day');
    
    filteredData = filteredData.filter(booking => {
      const checkIn = dayjs(booking.checkIn);
      return checkIn.isAfter(startDate) && checkIn.isBefore(endDate);
    });
  }
  
  // Filter by room type
  if (roomType) {
    filteredData = filteredData.filter(booking => booking.roomType === roomType);
  }
  
  // Filter by booking source
  if (bookingSource) {
    filteredData = filteredData.filter(booking => booking.source === bookingSource);
  }
  
  return new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
      resolve({
        data: filteredData,
        total: filteredData.length
      });
    }, 500);
  });
};

// Add a new booking
export const addBooking = (booking) => {
  const newBooking = {
    ...booking,
    id: mockBookings.length + 1,
    createdAt: new Date()
  };
  
  mockBookings.push(newBooking);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data: newBooking
      });
    }, 500);
  });
};

// Update an existing booking
export const updateBooking = (id, updatedFields) => {
  const index = mockBookings.findIndex(booking => booking.id === id);
  
  if (index !== -1) {
    mockBookings[index] = {
      ...mockBookings[index],
      ...updatedFields
    };
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockBookings[index]
        });
      }, 500);
    });
  }
  
  return Promise.reject({ success: false, message: 'Booking not found' });
};

// Delete a booking
export const deleteBooking = (id) => {
  const index = mockBookings.findIndex(booking => booking.id === id);
  
  if (index !== -1) {
    mockBookings.splice(index, 1);
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true
        });
      }, 500);
    });
  }
  
  return Promise.reject({ success: false, message: 'Booking not found' });
}; 