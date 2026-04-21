require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route files
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('CRITICAL ERROR: MONGO_URI is not defined! Please check your Render environment variables.');
      process.exit(1);
    } else {
      console.log('Attempting to connect to MongoDB...');
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
    }
    
    app.listen(PORT, () => {
      console.log(`Server is live and running on port ${PORT}`);
    });
  } catch (error) {
    console.error('----------------------------------------------------');
    console.error('DATABASE CONNECTION FAILED!');
    console.error(`Error details: ${error.message}`);
    console.error('If this is a "timeout" or "refused" error, please ensure you have whitelisted IP 0.0.0.0/0 in MongoDB Atlas.');
    console.error('----------------------------------------------------');
    process.exit(1);
  }
};

startServer();
