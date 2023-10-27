const { createCanvas, loadImage, createPNGStream } = require('@napi-rs/canvas');
const fetch = require('node-fetch');

/**
 * Asynchronously generates a profile card image using Puppeteer.
 * 
 * @return {Buffer} The image buffer of the generated profile card.
 */
async function generateProfileCard(image, name, location, title, socialMedia, socialMediaUsername, skills) {
    try {
        // Create a canvas
        const canvas = createCanvas(350, 464); // Adjust dimensions as needed
        const context = canvas.getContext('2d');

        // Draw background
        context.fillStyle = '#231E39';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Create a clipping path to make the image a circle
        context.beginPath();
        context.arc(175, 125, 75, 0, Math.PI * 2);
        context.closePath();
        context.clip();

        // Draw the image inside the circle
        context.drawImage(image, 100, 50, 150, 150);

        // Reset the clipping path
        context.restore(); // Restore previous canvas state

        // Draw text
        context.fillStyle = '#B3B8CD';
        context.font = '19px Montserrat';
        context.fillText(name, 50, 300);
        context.font = '11px Montserrat';
        context.fillText(location, 50, 330); // Adjust the position as needed
        context.font = '14px Montserrat';
        context.fillText(title, 50, 360); // Adjust the position as needed
        context.font = '13px Montserrat';
        context.fillText(socialMedia, 50, 390); // Adjust the position as needed
        context.fillText(socialMediaUsername, 50, 420); // Adjust the position as needed

        // Draw skills
        context.fillStyle = '#B3B8CD';
        context.font = '14px Montserrat';
        const skillsList = skills.split(',');
        skillsList.forEach((skill, index) => {
            context.fillText(skill, 100, 360 + index * 20); // Adjust the position as needed
        });

        const finalOutput = canvas.encode('jpeg');
        return finalOutput;
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

        if (!imageLink || !name || !location || !title || !socialMedia || !socialMediaUsername || !skills) {
            res.status(400).send('Invalid query parameters.');
            return;
        }

        const imageResponse = await fetch(imageLink);
        if (!imageResponse.ok) {
            res.status(500).send('Failed to fetch the image from the provided URL.');
            return;
        }

        const imageBuffer = await imageResponse.buffer();
        const fetchedImage = await loadImage(imageBuffer);

        const profileCardImageBuffer = await generateProfileCard(
            fetchedImage,
            name,
            location,
            title,
            socialMedia,
            socialMediaUsername,
            skills
        );

        if (profileCardImageBuffer) {
            res.set('Content-Type', 'image/png');
            res.send(profileCardImageBuffer);
        } else {
            res.status(500).send('Failed to generate the profile card image.');
        }
    } catch (error) {
        console.error('Error in getProfileCard controller:', error);
        res.status(500).send('Internal Server Error');
    }
}

// export getProfileCard function using ES6 syntax
module.exports = {
    getProfileCard
}
