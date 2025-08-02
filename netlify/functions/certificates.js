const mongoose = require('mongoose');

// MongoDB Schema
const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  certificateId: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

let Certificate;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://yuvi7767055408:HZaANM9sxi8rKgVR@cluster0.gqehu6m.mongodb.net/certificateDB?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    Certificate = mongoose.model('Certificate', certificateSchema);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    await connectDB();
    
    if (event.httpMethod === 'POST') {
      // Add new certificate
      const { name, email, certificateId } = JSON.parse(event.body);

      const newCertificate = new Certificate({
        name,
        email,
        certificateId,
      });

      await newCertificate.save();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Certificate added successfully!' })
      };
    } 
    
    if (event.httpMethod === 'GET') {
      // List all certificates (for debugging)
      const certificates = await Certificate.find();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(certificates)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error: ' + error.message })
    };
  }
};
