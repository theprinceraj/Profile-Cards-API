import { Express } from "express";
const router = Express.router();

import { fetchLongUrl } from '../utilities/database-functions.js';
router.use('/c/:shortId', async (req, res) => {
    const shortId_ = req.params.shortId;
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