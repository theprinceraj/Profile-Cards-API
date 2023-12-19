import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

import apiRoute from '../src/routes/profile.js';
app.use('/api', apiRoute);

app.get('/:shortId', (req, res) => {

});

// Start the server
app.listen(port, () => {
    console.log(`****************************`);
    console.log(`Made with 💓 by Prince Raj!`);
    console.log(`****************************`);
});


export { app };