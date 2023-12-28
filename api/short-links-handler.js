export default async function handler(req, res) {
    if (req.method === 'GET') {
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

        res.redirect(307, { Location: longUrl });
        return res.end();
    }
}
