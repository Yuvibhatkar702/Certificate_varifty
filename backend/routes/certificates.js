const router = require('express').Router();
let Certificate = require('../models/certificate.model');

router.route('/add').post((req, res) => {
  const { name, email, certificateId } = req.body;

  const newCertificate = new Certificate({
    name,
    email,
    certificateId,
  });

  newCertificate.save()
    .then(() => res.json('Certificate added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
