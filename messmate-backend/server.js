const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const ratingRoutes = require('./routes/ratings');
const noticeRoutes = require('./routes/notices');
const suggestionRoutes = require('./routes/suggestions');
const rebateRoutes = require('./routes/rebates');
const billRoutes = require('./routes/bills');
const complaintsRoutes = require('./routes/complaints');
const inventoryRoutes = require('./routes/inventory');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');



const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // For development; restrict in production!
    methods: ["GET", "POST"]
  }
});

// Make io accessible in controllers
app.set('io', io);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/ai', aiRoutes);

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/rebates', rebateRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/inventory', inventoryRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack || err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
