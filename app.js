const express = require('express');
const { UserService, PerformanceService, BookingService } = require('./services');

const app = express();
app.use(express.json());

const userService = new UserService();
const performanceService = new PerformanceService();
const bookingService = new BookingService();

// 사용자 관리
app.post('/api/register', (req, res) => {
  // 회원가입 엔드포인트
});

app.post('/api/login', (req, res) => {
  // 로그인 엔드포인트
});

app.get('/api/profile', (req, res) => {
  // 프로필 조회 엔드포인트
});

// 공연 관리
app.post('/api/performances', (req, res) => {
  // 새 공연 등록 엔드포인트
});

app.get('/api/performances', (req, res) => {
  // 공연 목록 조회 엔드포인트
});

app.get('/api/performances/search', (req, res) => {
  // 공연 검색 엔드포인트
});

app.get('/api/performances/:id', (req, res) => {
  // 공연 상세 조회 엔드포인트
});

// 예매 관리
app.post('/api/bookings', (req, res) => {
  // 공연 예매 엔드포인트
});

app.get('/api/bookings', (req, res) => {
  // 예매 확인 엔드포인트
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;