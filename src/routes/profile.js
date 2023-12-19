const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController.js');
const uploadsController = require('../controllers/uploadsController.js');
const shortLinksController = require('../controllers/shortLinksController.js');


// Define a route to handle the root path
router.get('/', (req, res) => {
  res.send('API is running.');
});

// Define a route to render the profile card
router.get('/profile', profileController.getProfileCard);

router.post('/upload', uploadsController.uploadFileToIMG_BB_Server);

router.use('/shorten', shortLinksController.shortenUrl);

module.exports = router;

