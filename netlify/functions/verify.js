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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    await connectDB();
    
    const { name, email, certificateId } = JSON.parse(event.body);
    
    console.log('Verification request:', { name, email, certificateId });
    
    const certificate = await Certificate.findOne({ certificateId: certificateId });
    console.log('Found certificate:', certificate);
    
    if (certificate) {
      // Compare with case-insensitive matching
      const nameMatch = certificate.name.toLowerCase() === name.toLowerCase();
      const emailMatch = certificate.email.toLowerCase() === email.toLowerCase();
      
      console.log('Name match:', nameMatch, 'Email match:', emailMatch);
      
      if (nameMatch && emailMatch) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ valid: true, certificate: certificate })
        };
      } else {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            valid: false, 
            message: 'Certificate found but name or email does not match',
            found: {
              name: certificate.name,
              email: certificate.email,
              certificateId: certificate.certificateId
            }
          })
        };
      }
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          message: 'No certificate found with this ID' 
        })
      };
    }
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
