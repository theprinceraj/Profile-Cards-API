const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Define your API routes
app.use('/api', require('../src/routes/profile'));

app.get('/', (req, res) => {
    res.send("Yea, I am here!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;