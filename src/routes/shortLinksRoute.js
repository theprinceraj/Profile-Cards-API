import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running.');
});

import { fetchLongUrl } from '../utilities/database-functions.js';
router.get('/:shortId', async (req, res) => {
    console.log('\n' + "VOXELLI ❤️ SARCASTER" + '\n');
    const shortId_ = req.params.shortId;
    console.log('\n' + shortId_ + '\n');
    if (!shortId_) {
        return res.status(400).send('Invalid shortId');
    }

    let baseUrl = 'http://localhost:3000';
    if (req) {
        baseUrl = `${req.protocol}://${req.get('host')}`;
    }
    const shortUrl = `${baseUrl}/c/${shortId_}`;

    const longUrl = await fetchLongUrl(shortUrl);
    res.redirect(longUrl);
});

export default router;