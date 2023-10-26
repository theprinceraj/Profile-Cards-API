const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Read the CORS environment variable
const allowedOrigin = process.env.CORS || '*';

// Enable CORS for all routes
app.use(cors({ origin: allowedOrigin }));

// Define your API routes
app.use('/api', require('./routes/profile'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
