import express from 'express';
const router = express.Router();

import profileController from '../controllers/profileController.js';
import uploadsController from '../controllers/uploadsController.js';
import shortLinksController from '../controllers/shortLinksController.js';


// Define a route to handle the root path
router.get('/', (req, res) => {
  res.send('API is running.');
});

// Define a route to render the profile card
router.get('/profile', profileController);

router.post('/upload', uploadsController);

router.use('/shorten', shortLinksController);

export default router;