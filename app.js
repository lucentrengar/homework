const express = require('express');
const { UserService, PerformanceService, BookingService } = require('./services');

const app = express();
app.use(express.json());

const userService = new UserService();
const performanceService = new PerformanceService();
const bookingService = new BookingService();

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.register(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const profile = await userService.getProfile(token);
    res.json(profile);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post('/api/performances', async (req, res) => {
  try {
    const performance = await performanceService.createPerformance(req.body);
    res.status(201).json(performance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/performances', async (req, res) => {
  try {
    const performances = await performanceService.getAllPerformances();
    res.json(performances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/performances/search', async (req, res) => {
  try {
    const { query } = req.query;
    const performances = await performanceService.searchPerformances(query);
    res.json(performances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/performances/:id', async (req, res) => {
  try {
    const performance = await performanceService.getPerformanceById(req.params.id);
    res.json(performance);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await bookingService.getBookingsByUserId(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
