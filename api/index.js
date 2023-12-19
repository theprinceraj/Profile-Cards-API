const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

app.use('/api', require('../src/routes/profile'));

app.get('/:shortId', (req, res) => {
    
});

// Start the server
app.listen(port, () => {
    console.log(`****************************`);
    console.log(`Made with 💓 by Prince Raj!`);
    console.log(`****************************`);
});


module.exports = app;