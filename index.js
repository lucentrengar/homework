class UserService {
    async register(username, email, password) {
      // 회원가입 로직 구현
    }
  
    async login(email, password) {
      // 로그인 로직 구현
    }
  
    async getProfile(userId) {
      // 프로필 조회 로직 구현
    }
  }
  
  class PerformanceService {
    async create(performance) {
      // 새 공연 등록 로직 구현
    }
  
    async getAll() {
      // 공연 목록 조회 로직 구현
    }
  
    async search(query) {
      // 공연 검색 로직 구현
    }
  
    async getById(id) {
      // 공연 상세 조회 로직 구현
    }
  }
  
  class BookingService {
    async book(userId, performanceId, seats) {
      // 예매 로직 구현
    }
  
    async getUserBookings(userId) {
      // 사용자의 예매 내역 조회 로직 구현
    }
  }
  
  module.exports = { UserService, PerformanceService, BookingService };