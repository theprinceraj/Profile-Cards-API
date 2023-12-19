const { updateDatabase } = require('../utilities/database-updater.mjs');

async function shortenUrl(req, res) {
    const originalUrl = req.body.longUrl;
    let baseUrl = 'http://localhost:3000';
    if (req) {
        baseUrl = `${req.protocol}://${req.get('host')}`;
    }
    const uniqueId = generateUniqueId(10);
    const shortUrl = `${baseUrl}/${uniqueId}`;

    updateDatabase(originalUrl, shortUrl);

    res.json({ shortUrl, uniqueId });
}

function generateUniqueId(idLength) {
    const units = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567'.split('');
    let uniqueId = '', unitsLength = units.length;
    for (let i = 0; i < idLength; i++) {
        uniqueId += units[Math.floor(Math.random() * unitsLength)];
    }
    return uniqueId;
}

module.exports = {
    shortenUrl
}