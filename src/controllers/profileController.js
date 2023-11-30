const { Canvas, loadFont } = require('canvas-constructor/skia');
const { fetchAndLoadImage } = require('../utilities/fetch-load-image.js');
const { logError } = require('../utilities/error-logger.js');

loadFont('Montserrat-Regular', 'template/Design1/Montserrat-Regular.ttf');
loadFont('Montserrat-Light', 'template/Design1/Montserrat-Light.ttf');
loadFont('Montserrat-Bold', 'template/Design1/Montserrat-Bold.ttf');
loadFont('Montserrat-SemiBold', 'template/Design1/Montserrat-SemiBold.ttf');

/**
 * Asynchronously generates a profile card image using Canvas.
 *
 * @return {Buffer} The image buffer of the generated profile card.
 */
async function generateProfileCard(image, name, location, title, socialMedia, socialMediaUsername) {
  try {
    const canvas = new Canvas(350, 500)
      .setColor('#28223F') // Background
      .printRectangle(0, 0, 350, 500); //

    canvas.setColor('#1F1A36');
    canvas.printRectangle(0, 375, 350, 125);

    // Draw text
    canvas.setColor('#B3B8CD');
    canvas.setTextFont('19px Montserrat-SemiBold.ttf');
    canvas.setTextAlign('center');
    canvas.printText(name, 175, 250); // Name

    canvas.setTextFont('11px Montserrat-SemiBold');
    canvas.printText(location.toUpperCase(), 175, 270); // Location

    canvas.setTextFont('12px Montserrat-SemiBold');
    canvas.printText(title, 175, 295); // Title

    // Draw a rectangular box filled with cyan color
    canvas.setColor('#03BFCB');
    canvas.printRectangle(canvas.width / 11, canvas.height / 2 + 60, canvas.width / 2 - 40, 45);

    canvas.setColor('black');
    canvas.setTextFont('16px Montserrat-Regular');
    canvas.printText(socialMedia, canvas.width / 11 + 65, canvas.height / 2 + 87); // Social Media

    // Draw a rectangular box outlined with cyan colour
    canvas.setStrokeWidth(1.5);
    canvas.setStroke('#03BFCB');
    canvas.printStrokeRectangle(
      canvas.width / 9 + (canvas.width / 2 - 40),
      canvas.height / 2 + 60,
      canvas.width / 2 - 40,
      45,
    );

    canvas.setColor('#03BFCB');
    canvas.setTextFont('16px Montserrat-Regular');
    canvas.printText(socialMediaUsername, canvas.width / 9 + (canvas.width / 2 - 40) + 65, canvas.height / 2 + 87); // Social Media

    // Draw skills
    // canvas.setColor('#B3B8CD');
    // canvas.font = '14px Montserrat-SemiBold';
    // const skillsList = skills.split(',');
    // skillsList.forEach((skill, index) => {
    //     canvas.fillText(skill, 100, 360 + index * 20); // Adjust the position as needed
    // });

    // Drawing border around the image
    canvas.beginPath();
    canvas.setStroke('#00ffff');
    canvas.setLineWidth(1.5);
    canvas.arc(175, 125, 85, 0, Math.PI * 2);
    canvas.stroke();
    canvas.closePath();
    // Create a clipping path to make the image a circle
    canvas.beginPath();
    canvas.arc(175, 125, 75, 0, Math.PI * 2);
    canvas.closePath();
    canvas.clip();
    // Draw the image inside the circle
    canvas.printImage(image, 100, 50, 150, 150);

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
    const { imageLink, name, location, title, socialMedia, socialMediaUsername } = req.query;

    const requiredParameters = ['imageLink', 'name', 'location', 'title', 'socialMedia', 'socialMediaUsername'];
    const missingParameters = requiredParameters.filter(parameter => !req.query[parameter]);
    if (missingParameters.length > 0) {
      res.status(400).send('Missing parameters: ' + missingParameters.join(', '));
      return;
    }

    const fetchedImage = await fetchAndLoadImage(imageLink);
    console.log('Hello');
    const profileCardImageBuffer = await generateProfileCard(
      fetchedImage,
      name,
      location,
      title,
      socialMedia,
      socialMediaUsername,
    );
    console.log(profileCardImageBuffer);
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
