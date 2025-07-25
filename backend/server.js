const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://yuvi7767055408:HZaANM9sxi8rKgVR@cluster0.gqehu6m.mongodb.net/certificateDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB database connection established successfully");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

const connection = mongoose.connection;
connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// API Routes
const verifyRouter = require('./routes/verify');
const certificateRouter = require('./routes/certificates');

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/api/verify', verifyRouter);
app.use('/api/certificates', certificateRouter);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
