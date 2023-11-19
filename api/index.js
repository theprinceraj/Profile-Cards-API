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
    console.log(`****************************`);
    console.log(`Made with 💓 by Prince Raj!`);
    console.log(`****************************`);
});


module.exports = app;