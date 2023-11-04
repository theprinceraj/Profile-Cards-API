const { createCanvas, loadImage } = require('@napi-rs/canvas');
const { join } = require('path');
const { fetchAndLoadImage } = require('../utilities/fetch-load-image.js');
/**
 * Asynchronously generates a profile card image using Canvas.
 * 
 * @return {Buffer} The image buffer of the generated profile card.
 */
async function generateProfileCard(image, name, location, title, socialMedia, socialMediaUsername, skills) {
    try {
        const canvas = createCanvas(350, 464);
        const context = canvas.getContext('2d');

        // Draw background
        const bgImage = await loadImage(join(__dirname, '../../template/Design1/props/BaseImage_Design1.png'));
        context.drawImage(bgImage, 0, 0, 350, 464);

        context.beginPath();
        context.strokeStyle = '#231e39';
        context.arc(175, 125, 100, 0, Math.PI * 2);
        context.closePath();
        context.stroke();

        // Draw text
        context.fillStyle = '#B3B8CD';
        context.font = '19px Arial';
        context.fillText(name, 125, 250);
        context.font = '11px Arial';
        context.fillText(location, 140, 270);
        context.font = '14px Arial';
        context.fillText(title, 50, 360);
        context.font = '13px Arial';
        context.fillText(socialMedia, 50, 390);
        context.fillText(socialMediaUsername, 50, 420);

        // Draw skills
        context.fillStyle = '#B3B8CD';
        context.font = '14px Montserrat';
        const skillsList = skills.split(',');
        skillsList.forEach((skill, index) => {
            context.fillText(skill, 100, 360 + index * 20); // Adjust the position as needed
        });

        // Create a clipping path to make the image a circle
        context.beginPath();
        context.arc(175, 125, 75, 0, Math.PI * 2);
        context.closePath();
        context.clip();

        // Draw the image inside the circle
        context.drawImage(image, 100, 50, 150, 150);

        const finalOutput = canvas.toBuffer('image/jpeg');
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

        const fetchedImage = await fetchAndLoadImage(imageLink);

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

// export getProfileCard function
module.exports = {
    getProfileCard
}
