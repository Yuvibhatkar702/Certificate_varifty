# Certificate Verification Portal

A modern, professional certificate verification system built with React.js frontend and Node.js backend, featuring MongoDB database integration.

## 🚀 Features

- **Professional UI/UX** - Modern design matching Progrentures branding
- **Real-time Verification** - Instant certificate validation
- **Secure Database** - MongoDB Atlas integration
- **Responsive Design** - Works on all devices
- **Professional Certificate Display** - Beautiful result pages
- **Error Handling** - Comprehensive error messages and suggestions

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios for API calls
- CSS3 with modern styling
- Responsive design

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS enabled

### Database
- MongoDB Atlas

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Clone the Repository
```bash
git clone https://github.com/your-username/certificate-verification-portal.git
cd certificate-verification-portal
```

### Backend Setup
```bash
# Install backend dependencies
cd backend
npm install

# Update MongoDB connection string in server.js
# Replace the URI with your MongoDB Atlas connection string

# Start the backend server
npm start
```

### Frontend Setup
```bash
# Install frontend dependencies
cd frontend
npm install

# Start the frontend development server
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the URI in `backend/server.js`

## 📝 Usage

### Adding Certificates
Use the POST endpoint to add certificates:
```bash
POST http://localhost:5000/certificates/add
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "certificateId": "CERT12345"
}
```

### Verifying Certificates
1. Open the web application
2. Enter the certificate details:
   - Full Name
   - Email Address
   - Certificate ID
3. Click "Verify Certificate"
4. View the verification result

## 🎨 Design

The application features a modern, professional design with:
- Dark blue gradient background
- Glass-morphism effects
- Smooth animations
- Professional typography
- Certificate-style result display

## 📱 API Endpoints

### Verify Certificate
- **URL:** `/verify`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "certificateId": "string"
  }
  ```

### Add Certificate
- **URL:** `/certificates/add`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "certificateId": "string"
  }
  ```

## 🔒 Security Features

- Input validation
- CORS protection
- Secure database connections
- Error handling

## 📸 Screenshots

### Main Verification Page
Professional form interface with Progrentures branding.

### Success Page
Certificate-style display with verification details.

### Error Page
User-friendly error messages with helpful suggestions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Progrentures for design inspiration
- React community for excellent documentation
- MongoDB for reliable database services

## 📞 Support

If you have any questions or need help, please:
1. Check the existing issues
2. Create a new issue if needed
3. Contact support at your-email@example.com

---

Made with ❤️ for certificate verification
