const router = require('express').Router();
let Certificate = require('../models/certificate.model');

router.route('/').post((req, res) => {
  Certificate.findOne({ certificateId: req.body.certificateId })
    .then(certificate => {
      if (certificate && certificate.name === req.body.name && certificate.email === req.body.email) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
