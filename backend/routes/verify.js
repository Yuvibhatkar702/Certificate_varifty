const router = require('express').Router();
let Certificate = require('../models/certificate.model');

router.route('/').post((req, res) => {
  const { name, email, certificateId } = req.body;
  
  console.log('Verification request:', { name, email, certificateId });
  
  Certificate.findOne({ certificateId: certificateId })
    .then(certificate => {
      console.log('Found certificate:', certificate);
      
      if (certificate) {
        // Compare with case-insensitive matching
        const nameMatch = certificate.name.toLowerCase() === name.toLowerCase();
        const emailMatch = certificate.email.toLowerCase() === email.toLowerCase();
        
        console.log('Name match:', nameMatch, 'Email match:', emailMatch);
        
        if (nameMatch && emailMatch) {
          res.json({ valid: true, certificate: certificate });
        } else {
          res.json({ 
            valid: false, 
            message: 'Certificate found but name or email does not match',
            found: {
              name: certificate.name,
              email: certificate.email,
              certificateId: certificate.certificateId
            }
          });
        }
      } else {
        res.json({ 
          valid: false, 
          message: 'No certificate found with this ID' 
        });
      }
    })
    .catch(err => {
      console.error('Database error:', err);
      res.status(400).json('Error: ' + err);
    });
});

module.exports = router;
