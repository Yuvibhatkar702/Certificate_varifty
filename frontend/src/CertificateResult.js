import React from 'react';
import './CertificateResult.css';

const CertificateResult = ({ result, formData, onGoBack }) => {
  if (!result) return null;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="result-page">
      <div className="result-container">
        <button className="back-btn" onClick={onGoBack}>
          ← Back to Verification
        </button>

        {result.success ? (
          <div className="certificate-display">
            <div className="certificate-header">
              <div className="status-badge success">
                ✓ VERIFIED
              </div>
              <h1>Certificate Verification Successful</h1>
            </div>

            <div className="certificate-card">
              <div className="certificate-border">
                <div className="certificate-content">
                  <div className="logo-section">
                    <h2>PROGRENTURES</h2>
                    <span>SOLUTION</span>
                  </div>

                  <div className="certificate-title">
                    <h3>Certificate of Achievement</h3>
                    <div className="decorative-line"></div>
                  </div>

                  <div className="certificate-details">
                    <div className="detail-row">
                      <span className="label">Certificate Holder:</span>
                      <span className="value">{formData.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Email Address:</span>
                      <span className="value">{formData.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Certificate ID:</span>
                      <span className="value">{formData.certificateId}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Verification Date:</span>
                      <span className="value">{currentDate}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Status:</span>
                      <span className="value success-text">Valid & Authenticated</span>
                    </div>
                  </div>

                  <div className="certificate-footer">
                    <div className="verification-seal">
                      <div className="seal-icon">🏆</div>
                      <span>Digitally Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-section">
              <button className="download-btn">Download Certificate</button>
              <button className="share-btn">Share Result</button>
            </div>
          </div>
        ) : (
          <div className="error-display">
            <div className="error-header">
              <div className="status-badge error">
                ✗ NOT VERIFIED
              </div>
              <h1>Certificate Verification Failed</h1>
            </div>

            <div className="error-card">
              <div className="error-icon">⚠️</div>
              <h3>Certificate Not Found</h3>
              <p>The certificate with the provided details could not be verified in our database.</p>
              
              <div className="attempted-details">
                <h4>Details Attempted:</h4>
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{formData.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{formData.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Certificate ID:</span>
                  <span className="value">{formData.certificateId}</span>
                </div>
              </div>

              <div className="suggestions">
                <h4>Suggestions:</h4>
                <ul>
                  <li>Double-check the certificate ID for any typos</li>
                  <li>Ensure the name and email match exactly as registered</li>
                  <li>Contact support if you believe this is an error</li>
                </ul>
              </div>
            </div>

            <div className="action-section">
              <button className="retry-btn" onClick={onGoBack}>Try Again</button>
              <button className="support-btn">Contact Support</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateResult;
