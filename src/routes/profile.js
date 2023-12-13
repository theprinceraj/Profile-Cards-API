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

router.post('/upload', async (req, res) => {
  const response = await uploadImageFile(req, res);
  console.log(response);
  res.send(response);
});

module.exports = router;

