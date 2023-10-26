const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Define a route to handle the root path
router.get('/', (req, res) => {
  res.send('API is running.');
});

// Define a route to render the profile card
router.get('/profile', profileController.getProfileCard);

module.exports = router;

