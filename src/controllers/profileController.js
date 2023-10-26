const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * Asynchronously generates a profile card image using Puppeteer.
 * 
 * @return {Buffer} The image buffer of the generated profile card.
 */
async function generateProfileCard(imageLink, name, location, title, socialMedia, socialMediaUsername, skills) {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // const htmlCode = ;

        // Replace placeholders in the HTML template with the provided values
        const customizedHtml = fs.readFileSync('public/index.html', 'utf-8')
            .replace('{{imageLink}}', imageLink)
            .replace('{{name}}', name)
            .replace('{{location}}', location)
            .replace('{{title}}', title)
            .replace('{{skills}}', convertSkilsToLiItems(skills || 'None'))
            .replace('{{socialMedia}}', socialMedia)
            .replace('{{socialMediaUsername}}', socialMediaUsername)

        await page.setContent(customizedHtml);
        await page.addStyleTag({ path: 'public/style.css' });
        await page.setViewport({ width: 350, height: 450, deviceScaleFactor: 2 });

        const imageBuffer = await page.screenshot();

        await browser.close();

        return imageBuffer;
    } catch (error) {
        console.error('Error generating the profile card image:', error);
        return null;
    }
}


/**
 * Asynchronously retrieves a profile card image and sends it as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A Promise that resolves when the image is sent as a response.
 */
async function getProfileCard(req, res) {
    try {
        const { imageLink, name, location, title, socialMedia, socialMediaUsername, skills } = req.query;
        const imageBuffer = await generateProfileCard(imageLink, name, location, title, socialMedia, socialMediaUsername, skills);

        if (imageBuffer) {
            res.set('Content-Type', 'image/png');
            res.send(imageBuffer);
        } else {
            res.status(500).send('Failed to generate the profile card image.');
        }
    } catch (error) {
        console.error('Error in getProfileCard controller:', error);
        res.status(500).send('Internal Server Error');
    }
}

function convertSkilsToLiItems(skillsString) {
    const skillsArray = skillsString?.split(',') || [];
    const liItems = skillsArray.map((skill) => `<li>${skill}</li>`);
    return liItems.join('');
}

module.exports = {
    getProfileCard,
};
