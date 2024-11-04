const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const users = [];
const performances = [];
const bookings = [];

class UserService {
 
}

class PerformanceService {
  async create(performance) {
    const newPerformance = {
      id: uuidv4(),
      ...performance,
      seats: this.initializeSeats(performance.totalSeats),
      createdAt: new Date()
    };
    performances.push(newPerformance);
    return newPerformance;
  }

  initializeSeats(totalSeats) {
    return Array(totalSeats).fill().map((_, index) => ({
      id: index + 1,
      isBooked: false
    }));
  }

  async getAll() {
    return performances;
  }

  async search(query) {
    return performances.filter(performance => 
      performance.title.toLowerCase().includes(query.toLowerCase()) ||
      performance.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getById(id) {
    const performance = performances.find(performance => performance.id === id);
    if (!performance) {
      throw new Error('공연을 찾을 수 없습니다.');
    }
    return performance;
  }

  async getSeatsInfo(performanceId) {
    const performance = await this.getById(performanceId);
    return performance.seats;
  }
}

class BookingService {
  async book(userId, performanceId, seatIds) {
    const performance = performances.find(p => p.id === performanceId);
    if (!performance) {
      throw new Error('공연을 찾을 수 없습니다.');
    }

    
    const unavailableSeats = seatIds.filter(seatId => 
      performance.seats[seatId - 1].isBooked
    );

    if (unavailableSeats.length > 0) {
      throw new Error(`좌석 ${unavailableSeats.join(', ')}는 이미 예약되었습니다.`);
    }

    
    const lock = await this.acquireLock(performanceId);
    try {
      
      seatIds.forEach(seatId => {
        performance.seats[seatId - 1].isBooked = true;
      });

      const newBooking = {
        id: uuidv4(),
        userId,
        performanceId,
        seats: seatIds,
        createdAt: new Date()
      };
      bookings.push(newBooking);
      return newBooking;
    } finally {
    
      await this.releaseLock(lock);
    }
  }

  async getUserBookings(userId) {
    return bookings.filter(booking => booking.userId === userId);
  }

  async cancelBooking(userId, bookingId) {
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId && booking.userId === userId);
    if (bookingIndex === -1) {
      throw new Error('예매 내역을 찾을 수 없습니다.');
    }

    const booking = bookings[bookingIndex];
    const performance = performances.find(p => p.id === booking.performanceId);

   
    const lock = await this.acquireLock(booking.performanceId);
    try {
      
      booking.seats.forEach(seatId => {
        performance.seats[seatId - 1].isBooked = false;
      });

      
      bookings.splice(bookingIndex, 1);

      return { message: '예매가 취소되었습니다.' };
    } finally {
      
      await this.releaseLock(lock);
    }
  }


  async acquireLock(resourceId) {
    
    return { resourceId, lockId: uuidv4() };
  }

  async releaseLock(lock) {
  
  }
}

module.exports = { UserService, PerformanceService, BookingService };
