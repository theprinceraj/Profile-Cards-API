const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
const { fetchAndLoadImage } = require('../utilities/fetch-load-image.js');
const { logError } = require("../utilities/error-logger.js");

GlobalFonts.registerFromPath('template/Design1/Montserrat-Regular.ttf', 'Montserrat-Regular');
GlobalFonts.registerFromPath('template/Design1/Montserrat-Light.ttf', 'Montserrat-Light');
GlobalFonts.registerFromPath('template/Design1/Montserrat-Bold.ttf', 'Montserrat-Bold');
GlobalFonts.registerFromPath('template/Design1/Montserrat-SemiBold.ttf', 'Montserrat-SemiBold');

/**
 * Asynchronously generates a profile card image using Canvas.
 * 
 * @return {Buffer} The image buffer of the generated profile card.
 */
async function generateProfileCard(image, name, location, title, socialMedia, socialMediaUsername) {
    try {
        const canvas = createCanvas(350, 500);
        const context = canvas.getContext('2d');


        // Disable Anti-Aliasing
        context.imageSmoothingEnabled = false;
        // Use high-quality image interpolation
        context.imageSmoothingQuality = 'high';

        // Draw background
        context.fillStyle = '#28223F';
        context.fillRect(0, 0, 350, 500);
        context.fillStyle = '#1F1A36';
        context.fillRect(0, 375, 350, 125);

        // Draw text
        context.fillStyle = '#B3B8CD';
        context.font = '19px Montserrat-SemiBold.ttf';
        context.textAlign = 'center';
        context.fillText(name, 175, 250); // Name
        context.font = '11px Montserrat-SemiBold';
        context.fillText(location.toUpperCase(), 175, 270); // Location
        context.font = '12px Montserrat-SemiBold';
        context.fillText(title, 175, 295); // Title

        // Draw a rectangular box filled with cyan color
        context.fillStyle = '#03BFCB';
        context.fillRect(canvas.width / 11, canvas.height / 2 + 60, canvas.width / 2 - 40, 45);
        context.fillStyle = 'black';
        context.font = '16px Montserrat-Regular';
        context.fillText(socialMedia, canvas.width / 11 + 65, canvas.height / 2 + 87); // Social Media

        // Draw a rectangular box outlined with cyan colour
        context.lineWidth = 1.5;
        context.strokeStyle = '#03BFCB';
        context.strokeRect(canvas.width / 9 + (canvas.width / 2 - 40), canvas.height / 2 + 60, canvas.width / 2 - 40, 45);
        context.fillStyle = '#03BFCB';
        context.font = '16px Montserrat-Regular';
        context.fillText(socialMediaUsername, canvas.width / 9 + (canvas.width / 2 - 40) + 65, canvas.height / 2 + 87); // Social Media


        // Draw skills
        // context.fillStyle = '#B3B8CD';
        // context.font = '14px Montserrat-SemiBold';
        // const skillsList = skills.split(',');
        // skillsList.forEach((skill, index) => {
        //     context.fillText(skill, 100, 360 + index * 20); // Adjust the position as needed
        // });

        // Drawing border around the image
        context.beginPath();
        context.strokeStyle = '#00ffff';
        context.lineWidth = 1.5;
        context.arc(175, 125, 85, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        // Create a clipping path to make the image a circle
        context.beginPath();
        context.arc(175, 125, 75, 0, Math.PI * 2);
        context.closePath();
        context.clip();
        // Draw the image inside the circle
        context.drawImage(image, 100, 50, 150, 150);


        const finalOutput = canvas.toBuffer('image/png');
        return finalOutput;
    } catch (error) {
        logError(error, { customMessage: "Source: try/catch block of generateProfileCard() function" });
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
        const { imageLink, name, location, title, socialMedia, socialMediaUsername } = req.query;

        const requiredParameters = ['imageLink', 'name', 'location', 'title', 'socialMedia', 'socialMediaUsername'];
        const missingParameters = requiredParameters.filter(parameter => !req.query[parameter]);
        if (missingParameters.length > 0) {
            res.status(400).send('Missing parameters: ' + missingParameters.join(', '));
            return;
        }

        const fetchedImage = await fetchAndLoadImage(imageLink);

        const profileCardImageBuffer = await generateProfileCard(
            fetchedImage,
            name,
            location,
            title,
            socialMedia,
            socialMediaUsername
        );

        if (profileCardImageBuffer && Buffer.isBuffer(profileCardImageBuffer)) {
            res.set('Content-Type', 'image/png');
            res.send(profileCardImageBuffer);
        } else {
            res.status(500).send('Invalid or missing profile card image buffer.');
        }
    } catch (error) {
        logError(error, { customMessage: "Source: try/catch block of getProfileCard() function" });
        res.status(500).send('Internal Server Error');
    }
}

// export getProfileCard function
module.exports = {
    getProfileCard
}
