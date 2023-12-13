const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { uploadImageFile } = require('../controllers/uploadsController.js');


// Define a route to handle the root path
router.get('/', (req, res) => {
  res.send('API is running.');
});

// Define a route to render the profile card
router.get('/profile', profileController.getProfileCard);

router.post('/upload', uploadImageFile);

module.exports = router;

