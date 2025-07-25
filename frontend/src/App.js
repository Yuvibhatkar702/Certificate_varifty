import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import CertificateResult from './CertificateResult';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    certificateId: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const response = await axios.post('http://localhost:5000/verify', formData);
      
      // Add a small delay to make it feel more realistic
      setTimeout(() => {
        setResult({
          success: response.data.valid,
          message: response.data.valid ? 'Certificate verified successfully!' : 'Certificate not found'
        });
        setLoading(false);
        setShowResult(true);
      }, 800);
      
    } catch (error) {
      console.error('Verification failed:', error);
      setTimeout(() => {
        setResult({
          success: false,
          message: 'Unable to verify certificate. Please try again.'
        });
        setLoading(false);
        setShowResult(true);
      }, 800);
    }
  };

  const handleGoBack = () => {
    setShowResult(false);
    setResult(null);
    setFormData({
      name: '',
      email: '',
      certificateId: ''
    });
  };

  // Show result page if verification is complete
  if (showResult && result) {
    return <CertificateResult result={result} formData={formData} onGoBack={handleGoBack} />;
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <h2>PROGRENTURES</h2>
            <span>SOLUTION</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">About us</a>
            <a href="#" className="nav-link">Services</a>
            <a href="#" className="nav-link">Certificate Verification</a>
            <a href="#" className="nav-link">More</a>
          </nav>
          <button className="enquiry-btn">Enquiry</button>
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-subtitle">Empowering Students & Businesses with Real Solutions</p>
              <h1 className="hero-title">Certificate Verification Portal</h1>
              <p className="hero-desc">
                Verify the authenticity of your digital certificates quickly and securely. 
                Our verification system ensures that your credentials are legitimate and recognized.
              </p>
            </div>

            <div className="verify-card">
              <h3>Verify Your Certificate</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="input-group">
                  <label>Certificate ID</label>
                  <input
                    type="text"
                    name="certificateId"
                    value={formData.certificateId}
                    onChange={handleChange}
                    placeholder="Enter certificate ID"
                    required
                    disabled={loading}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`verify-btn ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loader"></span>
                      Verifying...
                    </>
                  ) : (
                    'Verify Certificate'
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="cta-buttons">
            <button className="btn btn-primary">Explore Services</button>
            <button className="btn btn-secondary">Connect with us</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
