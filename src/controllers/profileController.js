const { Canvas, loadFont } = require('canvas-constructor/cairo');
const { fetchAndLoadImage } = require('../utilities/fetch-load-image.js');
const { logError } = require('../utilities/error-logger.js');
const { join } = require('path');

const fontFiles = [
    'Montserrat-Regular.ttf',
    'Montserrat-Medium.ttf',
    'Montserrat-Light.ttf',
    'Montserrat-Bold.ttf',
    'Montserrat-SemiBold.ttf'
];
fontFiles.forEach(file => {
    loadFont(join(__dirname, `../../api/_template/Design1/${file}`), { family: file.replace('.ttf', '') });
});


/**
 * Asynchronously generates a profile card image using Canvas.
 *
 * @return {Buffer} The image buffer of the generated profile card.
 */
async function generateProfileCard(image, name, location, title, socialMedia, socialMediaUsername) {
    try {
        const canvas = new Canvas(350, 500)
            .setColor('#28223F')
            .printRectangle(0, 0, 350, 500) // Background

            .setColor('#1F1A36')
            .printRectangle(0, 375, 350, 125) // Lower Graphic

            .setColor('#B3B8CD')
            .setTextFont('19px Montserrat-Medium')
            .setTextAlign('center')
            .printText(name, 175, 250) // Name

            .setTextFont('11px Montserrat-Regular')
            .printText(location.toUpperCase(), 175, 270) // Location

            .setTextFont('12px Montserrat-SemiBold')
            .printText(title, 175, 295) // Title

        // Draw skills
        // canvas.setColor('#B3B8CD')
        // canvas.font = '14px Montserrat-SemiBold'
        // const skillsList = skills.split(',')
        // skillsList.forEach((skill, index) => {
        //     canvas.fillText(skill, 100, 360 + index * 20) // Adjust the position as needed
        // })


        if (socialMedia && socialMediaUsername) {
            // Draw social media links
            // Draw a rectangular box filled with cyan color
            canvas.setColor('#03BFCB')
                .printRoundedRectangle(
                    canvas.width / 11,
                    canvas.height / 2 + 60,
                    canvas.width / 2 - 40,
                    45,
                    10
                )
                .setColor('black')
                .setTextFont('16px Montserrat-Medium')
                .printText(socialMedia, canvas.width / 11 + 65, canvas.height / 2 + 87) // Social Media

            // Draw a rectangular box outlined with cyan colour
            canvas.setStrokeWidth(1.5)
                .setStroke('#03BFCB')
                .createRoundedPath(
                    canvas.width / 9 + (canvas.width / 2 - 40),
                    canvas.height / 2 + 60,
                    canvas.width / 2 - 40,
                    45,
                    10
                )
                .stroke()
                .setColor('#03BFCB')
                .setTextFont('16px Montserrat-Medium')
                .printText(socialMediaUsername, canvas.width / 9 + (canvas.width / 2 - 40) + 65, canvas.height / 2 + 87) // Social Media Username
        }

        // Creates border around person's image
        canvas.createCircularPath(175, 125, 90)
            .setStroke('#03BFCB')
            .stroke()
            .closePath()
        // Draws the person's image
        canvas.printCircularImage(image, 175, 125, 80);

        const buffer = await canvas.toBuffer('image/png');
        return buffer;
    } catch (error) {
        logError(error, { customMessage: 'Source: try/catch block of generateProfileCard() function' });
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
        const {
            imageLink = 'https://i.ibb.co/2tgNv2d/man-157699-640.png',
            name = 'Example Name',
            location = 'Earth',
            title = 'Coder',
            socialMedia,
            socialMediaUsername } = req.query;

        const fetchedImage = await fetchAndLoadImage(imageLink);
        if (!fetchedImage) {
            res.status(500).send('Failed to fetch or load the image.');
            return;
        }
        const profileCardImageBuffer = await generateProfileCard(
            fetchedImage,
            name,
            location,
            title,
            socialMedia,
            socialMediaUsername,
        );
        if (profileCardImageBuffer && Buffer.isBuffer(profileCardImageBuffer)) {
            res.set('Content-Type', 'image/png');
            res.send(profileCardImageBuffer);
        } else {
            res.status(500).send('Invalid or missing profile card image buffer.');
        }
    } catch (error) {
        logError(error, { customMessage: 'Source: try/catch block of getProfileCard() function' });
        res.status(500).send('Internal Server Error');
    }
}

// export getProfileCard function
module.exports = {
    getProfileCard,
};
