const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const profileController = require('../controllers/profileController.js');
const uploadsController = require('../controllers/uploadsController.js');


// Define a route to handle the root path
router.get('/', (req, res) => {
  res.send('API is running.');
});

// Define a route to render the profile card
router.get('/profile', profileController.getProfileCard);

router.post('/upload', upload.single('image'), uploadsController.uploadChangeFile);

module.exports = router;

