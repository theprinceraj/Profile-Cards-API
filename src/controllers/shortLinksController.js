import updateDatabase from '../utilities/database-functions.js';

/**
 * Generates a shortened URL based on the provided long URL.
 *
 * @param {Object} req - The request object containing the long URL.
 * @param {Object} res - The response object.
 * @return {Object} The response JSON object containing the shortened URL and unique ID.
 */
export default async function shortenUrl(req, res) {
    const originalUrl = req.query.longUrl;
    let baseUrl = 'http://localhost:3000';
    if (req) {
        baseUrl = `${req.protocol}://${req.get('host')}`;
    }
    const uniqueId = generateUniqueId(10);
    const shortUrl = `${baseUrl}/c/${uniqueId}`;

    await updateDatabase(originalUrl, shortUrl);
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