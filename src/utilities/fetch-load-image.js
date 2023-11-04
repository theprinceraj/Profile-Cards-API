const { loadImage } = require('@napi-rs/canvas');
const fetch = require('node-fetch');

/**
 * Fetches and loads an image from the specified URL.
 *
 * @param {string} url - The URL of the image to fetch and load.
 * @return {Promise<Image|null>} A promise that resolves to the loaded image if successful, or null if there was an error.
 */
async function fetchAndLoadImage(url) {
    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'image/jpeg, image/png, image/webp',
            },
        });

        if (response.ok) {
            // Check if the response status is okay before loading the image
            return await loadImage(await response.arrayBuffer());
        } else {
            console.error('Error loading the image. Response status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching or loading the image:', error);
        return null;
    }
}

module.exports = {
    fetchAndLoadImage
}