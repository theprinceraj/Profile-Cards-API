import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

import apiRoute from '../src/routes/apiRoute.js';
app.use('/api', apiRoute);

import shortLinksRoute from '../src/routes/shortLinksRoute.js';
app.use('/c', shortLinksRoute);

// import { fetchLongUrl } from '../src/utilities/database-functions.js';
// app.get('/c/:shortId', async (req, res) => {
//     const shortId_ = req.params.shortId;
//     if (!shortId_) {
//         return res.status(400).send('Invalid shortId');
//     }

//     let baseUrl = 'http://localhost:3000';
//     if (req) {
//         baseUrl = `${req.protocol}://${req.get('host')}`;
//     }
//     const shortUrl = `${baseUrl}/c/${shortId_}`;

//     const longUrl = await fetchLongUrl(shortUrl);
//     res.redirect(longUrl);
// });

// Start the server
app.listen(port, () => {
    console.log(`****************************`);
    console.log(`Made with 💓 by Prince Raj!`);
    console.log(`****************************`);
});


export default app;