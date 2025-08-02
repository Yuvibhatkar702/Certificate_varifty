import React from 'react';
import './CertificateResult.css';

const CertificateResult = ({ result, formData, onGoBack }) => {
  if (!result) return null;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Function to download certificate as PDF
  const downloadCertificate = () => {
    // Create a printable HTML version of the certificate
    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Certificate - ${formData.name}</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            margin: 40px; 
            background: #f5f5f5; 
        }
        .certificate {
            background: white;
            border: 8px solid #2563eb;
            border-radius: 15px;
            padding: 40px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .logo { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2563eb; 
            margin-bottom: 5px; 
        }
        .subtitle { 
            font-size: 14px; 
            color: #666; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
        }
        .title { 
            font-size: 28px; 
            color: #1f2937; 
            margin: 20px 0; 
            text-align: center; 
        }
        .details { 
            margin: 30px 0; 
        }
        .detail-row { 
            display: flex; 
            justify-content: space-between; 
            margin: 15px 0; 
            padding: 10px 0; 
            border-bottom: 1px solid #e5e7eb; 
        }
        .label { 
            font-weight: bold; 
            color: #374151; 
        }
        .value { 
            color: #1f2937; 
        }
        .status { 
            color: #059669; 
            font-weight: bold; 
        }
        .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 2px solid #2563eb; 
        }
        .verified-seal { 
            background: #059669; 
            color: white; 
            padding: 10px 20px; 
            border-radius: 25px; 
            display: inline-block; 
            font-weight: bold; 
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">
            <div class="logo">PROGRENTURES</div>
            <div class="subtitle">SOLUTION</div>
        </div>
        
        <h1 class="title">Certificate of Achievement</h1>
        
        <div class="details">
            <div class="detail-row">
                <span class="label">Certificate Holder:</span>
                <span class="value">${formData.name}</span>
            </div>
            <div class="detail-row">
                <span class="label">Email Address:</span>
                <span class="value">${formData.email}</span>
            </div>
            <div class="detail-row">
                <span class="label">Certificate ID:</span>
                <span class="value">${formData.certificateId}</span>
            </div>
            <div class="detail-row">
                <span class="label">Verification Date:</span>
                <span class="value">${currentDate}</span>
            </div>
            <div class="detail-row">
                <span class="label">Status:</span>
                <span class="value status">Valid & Authenticated</span>
            </div>
        </div>
        
        <div class="footer">
            <div class="verified-seal">🏆 Digitally Verified</div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
                This certificate has been digitally verified through the Progrentures Certificate Verification Portal.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([certificateHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificate_${formData.certificateId}_${formData.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Function to share certificate result
  const shareResult = () => {
    const shareText = `🏆 Certificate Verified!\n\nName: ${formData.name}\nCertificate ID: ${formData.certificateId}\nStatus: Valid & Authenticated\nVerified on: ${currentDate}\n\nVerified through Progrentures Certificate Verification Portal`;
    
    if (navigator.share) {
      // Use native sharing if available
      navigator.share({
        title: 'Certificate Verification Result',
        text: shareText,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Certificate details copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Certificate details copied to clipboard!');
      });
    }
  };

  // Function to contact support
  const contactSupport = () => {
    const subject = 'Certificate Verification Support Request';
    const body = `Hello,\n\nI need assistance with certificate verification.\n\nDetails:\nName: ${formData.name}\nEmail: ${formData.email}\nCertificate ID: ${formData.certificateId}\nDate: ${currentDate}\n\nPlease help me resolve this issue.\n\nThank you.`;
    const mailtoUrl = `mailto:support@progrentures.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

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
              <button className="download-btn" onClick={downloadCertificate}>
                Download Certificate
              </button>
              <button className="share-btn" onClick={shareResult}>
                Share Result
              </button>
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
              <button className="support-btn" onClick={contactSupport}>Contact Support</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateResult;
